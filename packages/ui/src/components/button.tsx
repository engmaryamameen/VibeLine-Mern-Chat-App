import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@vibeline/utils';

type ButtonVariant = 'primary' | 'ghost' | 'danger';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400',
  ghost: 'bg-transparent text-slate-100 hover:bg-slate-800',
  danger: 'bg-rose-500 text-white hover:bg-rose-400'
};

export const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => (
  <button
    className={cn(
      'inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-40',
      variantStyles[variant],
      className
    )}
    {...props}
  />
);
