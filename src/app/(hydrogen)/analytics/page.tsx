import AnalyticsDashboard from '@/app/shared/analytics-dashboard';
import { metaObject } from '@/config/site';

export const metadata = {
  ...metaObject('Analytics'),
};

export default function AnalyticsPage() {
  return (
    <>
      <AnalyticsDashboard />
    </>
  );
}
