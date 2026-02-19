import { UserTable } from '@/src/components/tables/user-table';

const UsersPage = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">User Management</h2>
      <p className="text-sm text-[rgb(var(--text-secondary))]">Review roles, lock accounts, and manage trust levels.</p>
      <UserTable />
    </section>
  );
};

export default UsersPage;
