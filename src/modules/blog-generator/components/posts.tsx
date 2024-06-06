import PostCard from './post-card';
import Image from 'next/image';
import { getPosts } from '../actions/blog-post.actions';

export default async function Posts({
  siteId,
  limit,
}: {
  siteId?: string;
  limit?: number;
}) {
  const posts = await getPosts(limit, siteId);

  return posts.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post._id} data={post} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">No Posts Yet</h1>
      <Image
        alt="missing post"
        src="https://illustrations.popsy.co/gray/graphic-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        You do not have any posts yet. Create one to get started.
      </p>
    </div>
  );
}
