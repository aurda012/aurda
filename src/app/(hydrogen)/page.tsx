import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  return <FileDashboard />;
}
