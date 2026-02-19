import { Card } from '@vibeline/ui';

const bars = [46, 62, 55, 71, 58, 77, 69];

export const ActivityChart = () => (
  <Card>
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold">Message volume (7 days)</h3>
      <p className="text-xs text-[rgb(var(--text-secondary))]">UTC</p>
    </div>

    <div className="mt-6 grid grid-cols-7 gap-2" role="img" aria-label="Bar chart of message volume in past seven days">
      {bars.map((height, index) => (
        <div key={index} className="space-y-2">
          <div className="h-40 rounded-lg bg-slate-800/60 p-1">
            <div className="h-full w-full rounded-md bg-cyan-500/30">
              <div className="ml-auto h-full w-full origin-bottom rounded-md bg-cyan-400 transition" style={{ transform: `scaleY(${height / 100})` }} />
            </div>
          </div>
          <p className="text-center text-xs text-[rgb(var(--text-secondary))]">D{index + 1}</p>
        </div>
      ))}
    </div>
  </Card>
);
