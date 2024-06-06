import ActiveUsers from './active-users';
import AllJobsTable from './alljobs-table';
import DeviceAnalytics from './device-analytics';
import JobOverview from './job-overview';
import JobStats from './job-stats';
import OpenJobOverview from './open-job-status';
import JobScheduleList from './schedule-list';
import TopReferrers from './top-referrers';

export default function JobDashboard() {
  return (
    <div className="grid grid-cols-12 gap-6 @container @[59rem]:gap-7">
      <JobStats className="col-span-full" />
      <div className="col-span-full @[90rem]:col-span-8">
        <JobOverview />
        <div className="mt-6 grid grid-cols-1 gap-6 @4xl:grid-cols-2">
          <DeviceAnalytics />
          <TopReferrers />
        </div>
      </div>
      <JobScheduleList className="col-span-full @[90rem]:col-span-4" />
      <AllJobsTable className="col-span-full" />
      <OpenJobOverview className="col-span-full  @[64rem]:col-span-6" />
      <ActiveUsers className="col-span-full  @[64rem]:col-span-6" />
    </div>
  );
}
