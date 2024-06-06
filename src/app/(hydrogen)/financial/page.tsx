import FinancialDashboard from '@/app/shared/financial/dashboard';
import { metaObject } from '@/config/site';

export const metadata = {
  ...metaObject('Financial'),
};

export default function FinancialPage() {
  return <FinancialDashboard />;
}
