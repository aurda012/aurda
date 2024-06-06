import { metaObject } from '@/config/site';
import ExecutiveDashboard from '@/app/shared/executive';

export const metadata = {
  ...metaObject('Executive Dashboard'),
};

export default function ExecutiveDashboardPage() {
  return <ExecutiveDashboard />;
}
