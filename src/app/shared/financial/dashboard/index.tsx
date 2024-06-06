import Burn from '@/app/shared/financial/dashboard/burn';
import Spending from '@/app/shared/financial/dashboard/spending';
import Exchange from '@/app/shared/financial/dashboard/exchange';
import CashFlow from '@/app/shared/financial/dashboard/cash-flow';
import Investment from '@/app/shared/financial/dashboard/investment/investment';
import CashInBank from '@/app/shared/financial/dashboard/cash-in-bank';
import BudgetStatus from '@/app/shared/financial/dashboard/budget-status';
import FinancialStats from '@/app/shared/financial/dashboard/transaction-states';
import ExpenseHistory from '@/app/shared/financial/dashboard/expense-history';
import TotalStatistics from '@/app/shared/financial/dashboard/total-statistics';
import TransactionHistoryTable from '@/app/shared/financial/dashboard/transaction-history-table';
import IncomeStatement from '@/app/shared/financial/dashboard/income-statement';

export default function FinancialDashboard() {
  return (
    <div className="grid grid-cols-6 gap-6 @container">
      <FinancialStats className="col-span-full" />
      <TotalStatistics className="col-span-full @[90rem]:col-span-4" />
      <BudgetStatus className="col-span-full @[59rem]:col-span-3 @[90rem]:col-span-2" />
      <CashFlow className="col-span-full" />
      <CashInBank className="col-span-full @[59rem]:col-span-3 @[90rem]:col-span-2" />
      <Burn className="col-span-full @[59rem]:col-span-3 @[90rem]:col-span-2" />
      <ExpenseHistory className="col-span-full @[59rem]:col-span-3 @[59rem]:col-start-4 @[59rem]:row-start-3 @[90rem]:col-span-2 @[90rem]:col-start-auto @[90rem]:row-start-auto" />
      <IncomeStatement className="col-span-full" />
      <TransactionHistoryTable className="col-span-full" />
      <Spending className="col-span-full @[59rem]:col-span-3 @[90rem]:col-span-2" />
      <Exchange className="col-span-full  @[59rem]:col-span-3 @[90rem]:col-span-2" />
      <Investment className="col-span-full  @[59rem]:col-span-3 @[90rem]:col-span-2" />
    </div>
  );
}
