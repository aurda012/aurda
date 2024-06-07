'use client';

import { type Value } from '@udecode/plate-common';
import { PlateEditor } from '@/components/admin/PlateEditor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IArticle } from '@/database/models/article.model';
import { addArticle, updateArticle } from '@/database/actions/article.actions';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/utils';

const EditArticle = ({ article }: { article: IArticle }) => {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [picture, setPicture] = useState(article.picture);
  const [description, setDescription] = useState(article.description);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>(article.tags);
  const [content, setContent] = useState<Value>(
    JSON.parse(article.content) as Value
  );

  const publish = async () => {
    const updatedArticle: Partial<IArticle> = {
      _id: article._id,
      slug: slugify(title),
      title,
      picture,
      description,
      tags,
      content: JSON.stringify(content),
    };

    await updateArticle(updatedArticle);

    router.push('/admin/articles');
  };

  const addTag = () => {
    setTags((prev) => [...prev, tag]);
    setTag('');
  };

  const deleteTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col justify-center gap-4 py-6">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(() => e.target.value)}
      />
      <Input
        placeholder="Picture"
        value={picture}
        onChange={(e) => setPicture(() => e.target.value)}
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(() => e.target.value)}
      />
      <div className="flex gap-2">
        <Input
          placeholder="Tag"
          value={tag}
          onChange={(e) => setTag(() => e.target.value)}
        />
        <Button onClick={addTag}>Add Tag</Button>
      </div>
      <div className="flex gap-2">
        {tags.map((t, index) => (
          <div key={index} className="rounded-md bg-gray-200 p-2">
            {t}
            <span className="pl-2" onClick={() => deleteTag(t)}>
              X
            </span>
          </div>
        ))}
      </div>
      <PlateEditor content={content} setContent={setContent} />
      <Button onClick={publish}>Publish</Button>
    </div>
  );
};
export default EditArticle;
