import cn from '@/utils/class-names';
import StatsCards from '@/app/shared/executive/stats-cards';
import RevenueExpense from '@/app/shared/executive/revenue-expense';
import Forecast from '@/app/shared/executive/forecast';
import OperatingCashFlow from '@/app/shared/executive/operating-cash-flow';
import ArrBySignUp from '@/app/shared/executive/arr-by-signup';
import ActiveUsers from '@/app/shared/executive/active-users';
import MRRReport from '@/app/shared/executive/mrr-report';
import SocialFollowers from '@/app/shared/executive/social-followers';
import WebAnalytics from '@/app/shared/executive/web-analytics';
import BiggestDeal from '@/app/shared/executive/biggest-deal';
import RecentCustomers from '@/app/shared/executive/recent-customers';
import TotalProfitLoss from '@/app/shared/executive/total-profit-loss';
import MonthlySalesGrowth from '@/app/shared/executive/monthly-sales-growth';
import SalesByCategory from '@/app/shared/executive/sales-by-category';

interface IndexProps {
  className?: string;
}

export default function ExecutiveDashboard({ className }: IndexProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7',
        className
      )}
    >
      <StatsCards />
      <div className="grid grid-cols-1 gap-5 @4xl:grid-cols-2 2xl:gap-x-6 2xl:gap-y-7">
        <RevenueExpense />
        <Forecast />
      </div>
      <TotalProfitLoss />
      <div className="grid grid-cols-1 gap-5 @4xl:grid-cols-2 @7xl:grid-cols-4 2xl:gap-x-6 2xl:gap-y-7">
        <MRRReport />
        <SocialFollowers />
        <WebAnalytics />
        <BiggestDeal />
      </div>
      <div className="grid grid-cols-1 gap-5 @4xl:grid-cols-2 2xl:gap-x-6 2xl:gap-y-7">
        <SalesByCategory />
        <MonthlySalesGrowth />
      </div>
      <OperatingCashFlow />
      <div className="grid grid-cols-1 gap-5 @4xl:grid-cols-2 2xl:gap-x-6 2xl:gap-y-7">
        <ArrBySignUp />
        <ActiveUsers />
      </div>
      <RecentCustomers />
    </div>
  );
}
