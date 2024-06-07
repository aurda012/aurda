import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AdminProjectsPage = () => {
  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/admin/projects/add-new">
          <Button>Add New</Button>
        </Link>
      </div>
    </>
  );
};
export default AdminProjectsPage;
