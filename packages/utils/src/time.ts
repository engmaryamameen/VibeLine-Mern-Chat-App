const clockFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit'
});

export const formatClock = (iso: string) => clockFormatter.format(new Date(iso));

export const formatRelative = (iso: string) => {
  const time = new Date(iso).getTime();
  const deltaMinutes = Math.floor((Date.now() - time) / 60000);

  if (deltaMinutes < 1) return 'just now';
  if (deltaMinutes < 60) return `${deltaMinutes}m`;
  if (deltaMinutes < 60 * 24) return `${Math.floor(deltaMinutes / 60)}h`;
  return `${Math.floor(deltaMinutes / (60 * 24))}d`;
};
