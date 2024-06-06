import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlurImage from '@/modules/blog-generator/components/blur-image';
import {
  placeholderBlurhash,
  toDateString,
} from '@/modules/blog-generator/lib/utils';
import BlogCard from '@/modules/blog-generator/components/blog-card';
import Image from 'next/image';
import { getSiteData } from '@/modules/blog-generator/actions/site.actions';
import { getPostsForSite } from '@/modules/blog-generator/actions/blog-post.actions';

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const [data, posts] = await Promise.all([
    getSiteData(domain),
    getPostsForSite(domain),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="mb-20 w-full">
        {posts.length > 0 ? (
          <div className="mx-auto w-full max-w-screen-xl md:mb-28 lg:w-5/6">
            <Link href={`/${posts[0].slug}`}>
              {!(
                posts[0].image ===
                'https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/hxfcV5V-eInX3jbVUhjAt1suB7zB88uGd1j20b.png'
              ) && (
                <div className="sm:h-150 group relative mx-auto h-80 w-full overflow-hidden lg:rounded-xl">
                  <BlurImage
                    alt={posts[0].title ?? ''}
                    blurDataURL={posts[0].imageBlurhash ?? placeholderBlurhash}
                    className="h-full w-full object-cover group-hover:scale-105 group-hover:duration-300"
                    width={1300}
                    height={630}
                    placeholder="blur"
                    src={posts[0].image ?? '/placeholder.png'}
                  />
                </div>
              )}
              <div className="mx-auto mt-10 w-5/6 lg:w-full">
                <h2 className="font-title my-10 text-4xl dark:text-white md:text-6xl">
                  {posts[0].title}
                </h2>
                <p className="w-full text-base dark:text-white md:text-lg lg:w-2/3">
                  {posts[0].description}
                </p>
                <div className="flex w-full items-center justify-start space-x-4">
                  <div className="relative h-8 w-8 flex-none overflow-hidden rounded-full">
                    {data.user?.picture ? (
                      <BlurImage
                        alt={data.user?.name ?? 'User Avatar'}
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                        src={data.user?.picture ?? '/placeholder.png'}
                      />
                    ) : (
                      <div className="absolute flex h-full w-full select-none items-center justify-center bg-stone-100 text-4xl text-stone-500">
                        ?
                      </div>
                    )}
                  </div>
                  <p className="ml-3 inline-block whitespace-nowrap align-middle text-sm font-semibold dark:text-white md:text-base">
                    {data.user?.name}
                  </p>
                  <div className="h-6 border-l border-stone-600 dark:border-stone-400" />
                  <p className="m-auto my-5 w-10/12 text-sm font-light text-stone-500 dark:text-stone-400 md:text-base">
                    {toDateString(posts[0].createdAt)}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <Image
              alt="missing post"
              src="https://illustrations.popsy.co/gray/success.svg"
              width={400}
              height={400}
              className="dark:hidden"
            />
            <Image
              alt="missing post"
              src="https://illustrations.popsy.co/white/success.svg"
              width={400}
              height={400}
              className="hidden dark:block"
            />
            <p className="font-title text-2xl text-stone-600 dark:text-stone-400">
              No posts yet.
            </p>
          </div>
        )}
      </div>

      {posts.length > 1 && (
        <div className="mx-5 mb-20 max-w-screen-xl lg:mx-24 2xl:mx-auto">
          <h2 className="font-title mb-10 text-4xl dark:text-white md:text-5xl">
            More stories
          </h2>
          <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.slice(1).map((metadata: any, index: number) => (
              <BlogCard key={index} data={metadata} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
