import { Card } from '@vibeline/ui';

type StatCardProps = {
  label: string;
  value: string;
  tone?: 'default' | 'alert';
};

export const StatCard = ({ label, value, tone = 'default' }: StatCardProps) => (
  <Card className={tone === 'alert' ? 'border-rose-400/40' : ''}>
    <p className="text-sm text-[rgb(var(--text-secondary))]">{label}</p>
    <p className="mt-3 text-2xl font-semibold">{value}</p>
  </Card>
);
