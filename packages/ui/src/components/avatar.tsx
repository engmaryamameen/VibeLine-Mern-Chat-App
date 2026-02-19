import { cn } from '@vibeline/utils';

type AvatarProps = {
  name: string;
  src?: string;
  className?: string;
};

export const Avatar = ({ name, src, className }: AvatarProps) => {
  const fallback = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  if (src) {
    return <img src={src} alt={name} className={cn('h-9 w-9 rounded-full object-cover', className)} />;
  }

  return (
    <div
      aria-label={name}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-cyan-200',
        className
      )}
    >
      {fallback}
    </div>
  );
};
