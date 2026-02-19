import { Spinner } from '@vibeline/ui';

const AdminLoading = () => (
  <div className="grid h-64 place-items-center text-sm text-[rgb(var(--text-secondary))]">
    <div className="flex items-center gap-2">
      <Spinner />
      Loading dashboard...
    </div>
  </div>
);

export default AdminLoading;
