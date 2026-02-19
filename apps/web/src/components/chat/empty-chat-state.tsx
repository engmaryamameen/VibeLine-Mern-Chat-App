import Link from 'next/link';

export const EmptyChatState = () => (
  <section className="flex h-full items-center justify-center p-6">
    <div className="max-w-sm space-y-4 text-center">
      <h2 className="text-2xl font-semibold">Pick a room to get started</h2>
      <p className="text-sm text-[rgb(var(--text-secondary))]">
        Rooms keep conversations focused. Start with General or jump into a dedicated channel.
      </p>
      <Link
        className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
        href="/general"
      >
        Open General
      </Link>
    </div>
  </section>
);
