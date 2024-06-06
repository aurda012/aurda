import { notFound } from 'next/navigation';
import Editor from '@/modules/blog-generator/components/editor';
import { getPostWithSite } from '@/modules/blog-generator/actions/blog-post.actions';

export default async function PostPage({ params }: { params: { id: string } }) {
  const data = await getPostWithSite(params.id);

  if (!data) {
    notFound();
  }

  return <Editor post={data} />;
}
