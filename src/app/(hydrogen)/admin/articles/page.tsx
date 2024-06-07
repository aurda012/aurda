import { Button } from '@/components/ui/button';
import { getArticles } from '@/database/actions/article.actions';
import Image from 'next/image';
import Link from 'next/link';

const AdminArticlesPage = async () => {
  const articles = await getArticles();

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Link href="/admin/articles/add-new">
          <Button>Add New</Button>
        </Link>
      </div>
      <div className="flex flex-col">
        {articles.map((article) => (
          <div
            key={article._id}
            className="flex w-full items-center justify-between gap-4 border-b border-gray-200 py-4"
          >
            <Image
              src={article.picture}
              width={100}
              height={100}
              alt={article.title}
            />
            <p>{article.title}</p>
            <Link href={`/admin/articles/${article._id}`}>
              <Button>Edit</Button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
export default AdminArticlesPage;
