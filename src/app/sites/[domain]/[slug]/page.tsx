import { notFound } from 'next/navigation';
import BlogCard from '@/modules/blog-generator/components/blog-card';
import BlurImage from '@/modules/blog-generator/components/blur-image';
import MDX from '@/modules/blog-generator/components/mdx';
import {
  placeholderBlurhash,
  toDateString,
} from '@/modules/blog-generator/lib/utils';
import { getSiteData } from '@/modules/blog-generator/actions/site.actions';
import { getPostData } from '@/modules/blog-generator/actions/fetchers.actions';

export async function generateMetadata({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);

  const [data, siteData] = await Promise.all([
    getPostData(domain, slug),
    getSiteData(domain),
  ]);
  if (!data || !siteData) {
    return null;
  }
  const { title, description } = data;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    // Optional: Set canonical URL to custom domain if it exists
    // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    //   siteData.customDomain && {
    //     alternates: {
    //       canonical: `https://${siteData.customDomain}/${params.slug}`,
    //     },
    //   }),
  };
}

export default async function SitePostPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);
  const data = await getPostData(domain, slug);

  if (!data) {
    notFound();
  }

  const doc = data._doc;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="m-auto w-full text-center md:w-7/12">
          <p className="m-auto my-5 w-10/12 text-sm font-light text-stone-500 dark:text-stone-400 md:text-base">
            {toDateString(doc.createdAt)}
          </p>
          <h1 className="font-title mb-10 text-3xl font-bold text-stone-800 dark:text-white md:text-6xl">
            {doc.title}
          </h1>
          <p className="text-md m-auto w-10/12 text-stone-600 dark:text-stone-400 md:text-lg">
            {doc.description}
          </p>
        </div>
        <div className="my-8">
          <div className="relative inline-block h-8 w-8 overflow-hidden rounded-full align-middle md:h-12 md:w-12">
            {doc.user?.picture ? (
              <BlurImage
                alt={doc.user?.picture ?? 'User Avatar'}
                height={80}
                src={doc.user.picture}
                width={80}
              />
            ) : (
              <div className="absolute flex h-full w-full select-none items-center justify-center bg-stone-100 text-4xl text-stone-500">
                ?
              </div>
            )}
          </div>
          <div className="text-md ml-3 inline-block align-middle dark:text-white md:text-lg">
            by <span className="font-semibold">{doc.user?.name}</span>
          </div>
        </div>
      </div>
      {!(
        doc.image ===
        'https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/hxfcV5V-eInX3jbVUhjAt1suB7zB88uGd1j20b.png'
      ) && (
        <div className="sm:h-150 group relative mx-auto h-80 w-full overflow-hidden lg:rounded-xl">
          <BlurImage
            alt={doc.title ?? ''}
            blurDataURL={doc.imageBlurhash ?? placeholderBlurhash}
            className="h-full w-full object-cover group-hover:scale-105 group-hover:duration-300"
            width={1200}
            height={630}
            placeholder="blur"
            src={doc.image ?? '/placeholder.png'}
          />
        </div>
      )}

      <MDX source={data.mdxSource} />

      {data.adjacentPosts.length > 0 && (
        <div className="relative mb-20 mt-10 sm:mt-20">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-stone-300 dark:border-stone-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-sm text-stone-500 dark:bg-black dark:text-stone-400">
              Continue Reading
            </span>
          </div>
        </div>
      )}
      {data.adjacentPosts && (
        <div className="mx-5 mb-20 grid max-w-screen-xl grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:mx-auto xl:grid-cols-3">
          {data.adjacentPosts.map((data: any, index: number) => (
            <BlogCard key={index} data={data} />
          ))}
        </div>
      )}
    </>
  );
}
