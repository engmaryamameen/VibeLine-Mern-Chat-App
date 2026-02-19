import { ActivityChart } from '@/src/components/charts/activity-chart';
import { StatCard } from '@/src/components/common/stat-card';

const DashboardPage = () => {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Active users" value="1,284" />
        <StatCard label="Messages / day" value="18,902" />
        <StatCard label="Open reports" value="24" tone="alert" />
      </div>

      <ActivityChart />
    </section>
  );
};

export default DashboardPage;
