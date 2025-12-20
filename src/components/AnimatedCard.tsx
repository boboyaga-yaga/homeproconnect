import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'glass';
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, className, delay = 0, onClick, variant = 'default' }, ref) => {
    const variants = {
      default: 'bg-card shadow-card border border-border/30',
      elevated: 'bg-card shadow-elevated',
      glass: 'bg-card/80 backdrop-blur-sm border border-border/50 shadow-card',
    };

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          'rounded-2xl transition-all duration-300',
          'hover:shadow-elevated hover:-translate-y-0.5',
          'active:scale-[0.98]',
          'opacity-0 animate-fade-up',
          onClick && 'cursor-pointer',
          variants[variant],
          className
        )}
        style={{ 
          animationDelay: `${delay}s`, 
          animationFillMode: 'forwards' 
        }}
      >
        {children}
      </div>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';
