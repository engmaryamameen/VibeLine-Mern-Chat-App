const ChatLoadingSkeleton = () => (
  <div className="flex h-full flex-col animate-fade-in">
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-surface-panel px-4">
      <div className="skeleton h-4 w-4 rounded" />
      <div className="skeleton h-4 w-32 rounded" />
    </header>

    <div className="flex-1 space-y-4 p-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-3">
          <div className="skeleton h-8 w-8 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <div className="skeleton h-4 w-24 rounded" />
              <div className="skeleton h-3 w-12 rounded" />
            </div>
            <div className="skeleton h-4 rounded" style={{ width: `${60 + Math.random() * 30}%` }} />
            {i % 2 === 0 && (
              <div className="skeleton h-4 rounded" style={{ width: `${40 + Math.random() * 20}%` }} />
            )}
          </div>
        </div>
      ))}
    </div>

    <div className="border-t border-border bg-surface-panel p-4">
      <div className="skeleton h-12 w-full rounded-lg" />
    </div>
  </div>
);

export default ChatLoadingSkeleton;
