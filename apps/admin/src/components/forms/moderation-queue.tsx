import { Button, Card } from '@vibeline/ui';

const reports = [
  {
    id: 'rep_120',
    reason: 'Harassment',
    excerpt: 'Repeated insults in #general',
    createdAt: '4m ago'
  },
  {
    id: 'rep_121',
    reason: 'Spam',
    excerpt: 'Repeated link posts',
    createdAt: '12m ago'
  }
];

export const ModerationQueue = () => (
  <div className="space-y-3">
    {reports.map((report) => (
      <Card key={report.id} className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium">{report.reason}</p>
          <p className="text-sm text-[rgb(var(--text-secondary))]">{report.excerpt}</p>
          <p className="mt-1 text-xs text-[rgb(var(--text-secondary))]">{report.createdAt}</p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="ghost">
            Dismiss
          </Button>
          <Button type="button" variant="danger">
            Escalate
          </Button>
        </div>
      </Card>
    ))}
  </div>
);
