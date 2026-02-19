import { ModerationQueue } from '@/src/components/forms/moderation-queue';

const ReportsPage = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Moderation Queue</h2>
      <p className="text-sm text-[rgb(var(--text-secondary))]">Handle message reports and enforce community policy.</p>
      <ModerationQueue />
    </section>
  );
};

export default ReportsPage;
