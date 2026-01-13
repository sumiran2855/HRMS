import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/components/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-0 disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed transition-all duration-300';

    const variants = {
      primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl focus-visible:ring-blue-500/50 active:scale-[0.98]',
      secondary: 'bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/30 hover:border-white/50 shadow-md hover:shadow-lg focus-visible:ring-white/30',
      outline: 'border-2 border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 text-slate-900 shadow-sm hover:shadow focus-visible:ring-slate-300',
      ghost: 'hover:bg-slate-100 text-slate-700 hover:text-slate-900 focus-visible:ring-slate-200'
    };

    const sizes = {
      sm: 'h-9 px-4 py-2 text-sm',
      md: 'h-11 px-6 py-3 text-base',
      lg: 'h-14 px-10 py-4 text-lg'
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };