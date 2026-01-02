import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const AnimatedButton = React.forwardRef(({ className, children, disabled, isLoading, variant = 'default', ...props }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        // Base styles
        "relative overflow-hidden group rounded-md px-4 py-2 text-sm font-medium transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        
        // Variant: Default (Primary Brand Color)
        variant === 'default' && [
          "bg-brand-primary text-white hover:bg-brand-primary-dark shadow-sm",
          // Shine effect
          "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
          // Hover lift
          "hover:-translate-y-0.5 hover:shadow-md"
        ],
        
        // Variant: Outline
        variant === 'outline' && [
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          "hover:border-brand-primary/50"
        ],

        // Loading state
        isLoading && "cursor-not-allowed opacity-70",
        
        className
      )}
      {...props}
    >
      <div className="relative flex items-center justify-center gap-2">
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </div>
    </button>
  );
});

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
