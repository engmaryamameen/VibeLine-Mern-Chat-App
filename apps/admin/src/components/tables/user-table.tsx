import { Button, Card } from '@vibeline/ui';

const rows = [
  { id: 'u_3021', name: 'Avery Kim', role: 'admin', status: 'active' },
  { id: 'u_4190', name: 'Mina Patel', role: 'user', status: 'active' },
  { id: 'u_5102', name: 'Theo Diaz', role: 'user', status: 'flagged' }
];

export const UserTable = () => (
  <Card className="overflow-hidden p-0">
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-900/80 text-[rgb(var(--text-secondary))]">
        <tr>
          <th className="px-4 py-3 font-medium">User</th>
          <th className="px-4 py-3 font-medium">Role</th>
          <th className="px-4 py-3 font-medium">Status</th>
          <th className="px-4 py-3 font-medium">Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border-t border-slate-800">
            <td className="px-4 py-3">{row.name}</td>
            <td className="px-4 py-3 uppercase text-[rgb(var(--text-secondary))]">{row.role}</td>
            <td className="px-4 py-3">{row.status}</td>
            <td className="px-4 py-3">
              <Button type="button" variant="ghost">
                Manage
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
);
