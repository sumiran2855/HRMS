import * as React from 'react'

import { cn } from '../utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                'file:text-foreground placeholder:text-slate-400 selection:bg-blue-100 selection:text-blue-900 border-slate-200 h-12 w-full min-w-0 rounded-xl border-2 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50',
                'hover:border-slate-300',
                'focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-500/10',
                'aria-invalid:ring-red-500/20 aria-invalid:border-red-500',
                className,
            )}
            {...props}
        />
    )
}

export { Input }