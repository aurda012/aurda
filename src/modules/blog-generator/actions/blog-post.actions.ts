'use server';

import { revalidateTag, unstable_cache } from 'next/cache';
import { connectToDatabase } from '@/database';
import BlogPost, {
  IBlogPost,
  IBlogPostPopulated,
} from '../models/blog-post.model';
import Site, { ISite } from '../models/site.model';
import { auth } from '@clerk/nextjs/server';
import User from '@/database/models/user.model';
import { utapi } from '@/server/uploadthing';
import { getBlurDataURL } from '../lib/utils';

export const getPost = async (postId: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('User not found');
  }
  try {
    await connectToDatabase();
    const post = await BlogPost.findOne({
      _id: postId,
    });

    return JSON.parse(JSON.stringify(post)) as IBlogPost;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getPostWithSite = async (postId: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('User not found');
  }
  try {
    await connectToDatabase();
    const post = await BlogPost.findOne({
      _id: postId,
    }).populate({ path: 'site', model: Site });

    return JSON.parse(JSON.stringify(post)) as IBlogPostPopulated;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export async function getPostsForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
    : null;

  try {
    await connectToDatabase();

    const site = await Site.findOne(
      subdomain ? { subdomain } : { customDomain: domain }
    );
    return await unstable_cache(
      async () => {
        return BlogPost.find({
          site: site._id,
          published: true,
        }).sort({ createdAt: 'desc' });
      },
      [`${domain}-posts`],
      {
        revalidate: 900,
        tags: [`${domain}-posts`],
      }
    )();
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

export const getSiteFromPostId = async (postId: string) => {
  try {
    await connectToDatabase();
    const post = await BlogPost.findOne({
      _id: postId,
    });
    return JSON.parse(JSON.stringify(post.site)) as string;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const createPost = async (siteId: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('User not found');
  }

  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    const site = await Site.findById(siteId);

    if (!user) {
      throw new Error('User not found');
    }

    const response = await BlogPost.create({
      site: site._id,
      user: user._id,
    });

    await Site.findByIdAndUpdate(siteId, {
      $push: { posts: response._id },
    });

    await revalidateTag(
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`
    );
    site.customDomain && (await revalidateTag(`${site.customDomain}-posts`));

    return JSON.parse(JSON.stringify(response)) as IBlogPost;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

// creating a separate function for this because we're not using FormData
export const updatePost = async (data: Partial<IBlogPostPopulated>) => {
  console.log('INSIDE UPDATE POST');
  const { userId } = auth();
  if (!userId) {
    return {
      error: 'Not authenticated',
    };
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return {
        error: 'User Not Found',
      };
    }

    const post = await BlogPost.findById(data._id);
    if (!post || post.user.toString() !== user._id.toString()) {
      return {
        error: 'Post not found',
      };
    }

    const response = await BlogPost.findByIdAndUpdate(
      data._id,
      {
        title: data.title,
        description: data.description,
        content: data.content,
      },
      { new: true }
    );

    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`
    );
    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`
    );

    // if the site has a custom domain, we need to revalidate those tags too
    post.site?.customDomain &&
      (await revalidateTag(`${post.site?.customDomain}-posts`),
      await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

    return JSON.parse(JSON.stringify(response)) as IBlogPost;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updatePostMetadata = async (
  formData: FormData,
  post: Partial<IBlogPostPopulated>,
  key: string
) => {
  const value = formData.get(key) as string;

  const { userId } = auth();
  if (!userId) {
    return {
      error: 'Not authenticated',
    };
  }

  try {
    await connectToDatabase();
    let response;
    if (key === 'image') {
      const file = formData.get('image') as File;

      const { data } = await utapi.uploadFiles(file);
      if (!data) {
        return {
          error: 'Error uploading file',
        };
      }
      const blurhash = await getBlurDataURL(data.url);

      response = await BlogPost.findByIdAndUpdate(
        post._id,
        {
          image: data.url,
          imageBlurhash: blurhash,
        },
        { new: true }
      );
    } else {
      response = await BlogPost.findByIdAndUpdate(
        post._id,
        {
          [key]: key === 'published' ? value === 'true' : value,
        },
        { new: true }
      );
    }

    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`
    );
    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`
    );

    // if the site has a custom domain, we need to revalidate those tags too
    post.site?.customDomain &&
      (await revalidateTag(`${post.site?.customDomain}-posts`),
      await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    if (error.code === 'P2002') {
      return {
        error: `This slug is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const deletePost = async (postId: string) => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: 'Not authenticated',
    };
  }

  try {
    await connectToDatabase();

    const response = await BlogPost.findByIdAndDelete(postId);

    await Site.findByIdAndUpdate(response.site, {
      $pull: { posts: response._id },
    });

    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    console.log(error.message);
    return {
      error: error.message,
    };
  }
};

export const getPosts = async (limit: number = 10, siteId?: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Not authenticated');
  }
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    let query;
    if (!siteId) {
      query = { user: user._id };
    } else {
      query = { user: user._id, site: siteId };
    }
    const sites = await BlogPost.find(query)
      .sort({ createdAt: 'desc' })
      .limit(limit)
      .populate({ path: 'site', model: Site });
    return JSON.parse(JSON.stringify(sites)) as IBlogPostPopulated[];
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
