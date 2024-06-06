import { notFound, redirect } from 'next/navigation';
import Form from '@/modules/blog-generator/components/form';
import {
  getPost,
  updatePostMetadata,
} from '@/modules/blog-generator/actions/blog-post.actions';
import DeletePostForm from '@/modules/blog-generator/components/form/delete-post-form';

export default async function PostSettings({
  params,
}: {
  params: { id: string };
}) {
  const data = await getPost(params.id);
  if (!data) {
    notFound();
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Post Settings
        </h1>
        <Form
          title="Post Slug"
          description="The slug is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens."
          helpText="Please use a slug that is unique to this post."
          inputAttrs={{
            name: 'slug',
            type: 'text',
            defaultValue: data?.slug!,
            placeholder: 'slug',
          }}
          handleSubmit={updatePostMetadata}
        />

        <Form
          title="Thumbnail image"
          description="The thumbnail image for your post. Accepted formats: .png, .jpg, .jpeg"
          helpText="Max file size 4MB. Recommended size 1200x630."
          inputAttrs={{
            name: 'image',
            type: 'file',
            defaultValue: data?.image!,
          }}
          handleSubmit={updatePostMetadata}
        />

        <DeletePostForm postName={data?.title!} />
      </div>
    </div>
  );
}
