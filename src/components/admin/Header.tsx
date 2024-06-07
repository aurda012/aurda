import Link from 'next/link';
import { Button } from '../ui/button';

const AdminHeader = () => {
  return (
    <header className="fixed top-0 z-[10001] w-[calc(100vw-325px)] border-b border-neutral-200 bg-transparent dark:border-white/[0.1]">
      <div className="container mx-auto flex h-16 max-w-[88rem] items-center justify-center">
        <div className="flex gap-4">
          <Link href="/admin/articles">
            <Button variant="ghost" className="justify-start text-base">
              Articles
            </Button>
          </Link>
          <Link href="/admin/projects">
            <Button variant="ghost" className="justify-start text-base">
              Projects
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default AdminHeader;
