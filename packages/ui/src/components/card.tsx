import type { PropsWithChildren } from 'react';

import { cn } from '@vibeline/utils';

type CardProps = PropsWithChildren<{ className?: string }>;

export const Card = ({ className, children }: CardProps) => (
  <section className={cn('rounded-2xl border border-slate-800 bg-slate-900/70 p-5', className)}>{children}</section>
);
