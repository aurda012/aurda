import EditArticle from '@/components/admin/EditArticle';
import { getArticleById } from '@/database/actions/article.actions';

interface Props {
  params: { id: string };
}

const EditArticlePage = async ({ params: { id } }: Props) => {
  const article = await getArticleById(id);
  if (!article) return <div>Article not found</div>;
  return (
    <>
      <EditArticle article={article} />
    </>
  );
};
export default EditArticlePage;
