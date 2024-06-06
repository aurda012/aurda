'use server';

import { connectToDatabase } from '@/database';
import User from '@/database/models/user.model';
import { auth } from '@clerk/nextjs/server';
import Site, { ISite } from '../models/site.model';
import { revalidateTag, unstable_cache } from 'next/cache';
import {
  addDomainToVercel,
  // getApexDomain,
  removeDomainFromVercelProject,
  // removeDomainFromVercelTeam,
  validDomainRegex,
} from '../lib/domains';
import { getBlurDataURL } from '../lib/utils';
import { utapi } from '@/server/uploadthing';

export async function getSiteData(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
    : null;

  try {
    await connectToDatabase();

    return await unstable_cache(
      async () => {
        return Site.findOne(
          subdomain ? { subdomain } : { customDomain: domain }
        ).populate({
          path: 'user',
          model: User,
        });
      },
      [`${domain}-metadata`],
      {
        revalidate: 900,
        tags: [`${domain}-metadata`],
      }
    )();
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

export const createSite = async (formData: FormData) => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: 'Not authenticated',
    };
  }
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const subdomain = formData.get('subdomain') as string;
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return {
        error: 'User not found',
      };
    }
    const response = await Site.create({
      name,
      description,
      subdomain,
      user: user._id,
    });
    await revalidateTag(
      `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
    );
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    console.log(error.message);
    return {
      error: error.message,
    };
  }
};

export const updateSite = async (
  formData: FormData,
  site: Partial<ISite>,
  key: string
) => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: 'Not authenticated',
    };
  }

  const value = formData.get(key) as string;

  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return {
        error: 'User not found',
      };
    }
    if (site.user?.toString() !== user._id.toString()) {
      return {
        error: 'Not authorized',
      };
    }
    let response;

    if (key === 'customDomain') {
      if (value.includes('vercel.pub')) {
        return {
          error: 'Cannot use vercel.pub subdomain as your custom domain',
        };

        // if the custom domain is valid, we need to add it to Vercel
      } else if (validDomainRegex.test(value)) {
        response = await Site.findByIdAndUpdate(
          site._id,
          {
            customDomain: value,
          },
          { new: true }
        );
        await Promise.all([
          addDomainToVercel(value),
          // Optional: add www subdomain as well and redirect to apex domain
          // addDomainToVercel(`www.${value}`),
        ]);

        // empty value means the user wants to remove the custom domain
      } else if (value === '') {
        response = await Site.findByIdAndUpdate(
          site._id,
          {
            customDomain: null,
          },
          { new: true }
        );
      }

      // if the site had a different customDomain before, we need to remove it from Vercel
      if (site.customDomain && site.customDomain !== value) {
        response = await removeDomainFromVercelProject(site.customDomain);
      }
    } else if (key === 'image' || key === 'logo') {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return {
          error:
            'Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd',
        };
      }

      const file = formData.get(key) as File;

      const { data } = await utapi.uploadFiles(file);
      if (!data) {
        return {
          error: 'Error uploading file',
        };
      }

      const blurhash = key === 'image' ? await getBlurDataURL(data.url) : null;

      response = await Site.findByIdAndUpdate(
        site._id,
        {
          [key]: data.url,
          ...(blurhash && { imageBlurhash: blurhash }),
        },
        { new: true }
      );
    } else {
      response = await Site.findByIdAndUpdate(
        site._id,
        {
          [key]: value,
        },
        { new: true }
      );
    }
    console.log(
      'Updated site data! Revalidating tags: ',
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
      `${site.customDomain}-metadata`
    );
    await revalidateTag(
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
    );
    site.customDomain && (await revalidateTag(`${site.customDomain}-metadata`));

    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    if (error.code === 'P2002') {
      return {
        error: `This ${key} is already taken`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const deleteSite = async (siteId: string) => {
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
        error: 'User not found',
      };
    }
    const site = await Site.findById(siteId);
    if (!site) {
      return {
        error: 'Site not found',
      };
    }
    if (site.user?.toString() !== user._id.toString()) {
      return {
        error: 'Not authorized',
      };
    }
    const response = await Site.findByIdAndDelete(site._id);
    await revalidateTag(
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
    );
    response.customDomain &&
      (await revalidateTag(`${site.customDomain}-metadata`));
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    console.log(error.message);
    return {
      error: error.message,
    };
  }
};

export const getSiteCount = async () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Not authenticated');
  }
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    const sites = await Site.countDocuments({
      user: user._id,
    });
    return sites;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getSites = async (limit: number = 10) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Not authenticated');
  }
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    const sites = await Site.find({
      user: user._id,
    })
      .sort({ createdAt: 'asc' })
      .limit(limit);
    return JSON.parse(JSON.stringify(sites)) as ISite[];
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getSite = async (id: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Not authenticated');
  }
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    const site = await Site.findById(id);
    return JSON.parse(JSON.stringify(site)) as ISite;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
