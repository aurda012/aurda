import { connectToDatabase } from '@/database';
import { unstable_cache } from 'next/cache';
import BlogPost from '../models/blog-post.model';
import User from '@/database/models/user.model';
import { serialize } from 'next-mdx-remote/serialize';
import { replaceTweets } from '../lib/remark-plugins';
import Site from '../models/site.model';

export async function getPostData(domain: string, slug: string) {
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
        const data = await BlogPost.findOne({
          site: site._id,
          slug,
          published: true,
        })
          .populate({
            path: 'site',
            model: Site,
          })
          .populate({
            path: 'user',
            model: User,
          });

        if (!data) return null;

        const [mdxSource, adjacentPosts] = await Promise.all([
          getMdxSource(data.content!),
          BlogPost.find({
            site: site._id,
            published: true,
            _id: { $ne: data._id },
          }),
        ]);

        return {
          ...data,
          mdxSource,
          adjacentPosts,
        };
      },
      [`${domain}-${slug}`],
      {
        revalidate: 900, // 15 minutes
        tags: [`${domain}-${slug}`],
      }
    )();
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

async function getMdxSource(postContents: string) {
  // transforms links like <link> to [link](link) as MDX doesn't support <link> syntax
  // https://mdxjs.com/docs/what-is-mdx/#markdown
  const content =
    postContents?.replaceAll(/<(https?:\/\/\S+)>/g, '[$1]($1)') ?? '';
  // Serialize the content string into MDX
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [replaceTweets],
    },
  });

  return mdxSource;
}
