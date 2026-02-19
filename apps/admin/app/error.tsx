'use client';

import { Button } from '@vibeline/ui';

const AdminError = ({ reset }: { reset: () => void }) => (
  <div className="space-y-3 rounded-xl border border-rose-400/30 bg-rose-500/10 p-4">
    <h2 className="text-lg font-semibold">Admin page crashed</h2>
    <p className="text-sm text-[rgb(var(--text-secondary))]">Refresh the module state and retry.</p>
    <Button onClick={reset} type="button" variant="danger">
      Retry
    </Button>
  </div>
);

export default AdminError;
