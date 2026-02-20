type TypingIndicatorProps = {
  names: string[];
};

const TypingDots = () => (
  <span className="ml-1 inline-flex gap-0.5">
    <span className="h-1 w-1 animate-pulse-subtle rounded-full bg-content-muted" style={{ animationDelay: '0ms' }} />
    <span className="h-1 w-1 animate-pulse-subtle rounded-full bg-content-muted" style={{ animationDelay: '150ms' }} />
    <span className="h-1 w-1 animate-pulse-subtle rounded-full bg-content-muted" style={{ animationDelay: '300ms' }} />
  </span>
);

export const TypingIndicator = ({ names }: TypingIndicatorProps) => {
  if (names.length === 0) {
    return <div className="h-5" />;
  }

  const displayNames = names.length > 2 ? `${names.slice(0, 2).join(', ')} and others` : names.join(' and ');
  const verb = names.length === 1 ? 'is' : 'are';

  return (
    <div className="flex h-5 items-center px-4">
      <p className="text-xs text-content-secondary">
        <span className="font-medium">{displayNames}</span> {verb} typing
        <TypingDots />
      </p>
    </div>
  );
};
