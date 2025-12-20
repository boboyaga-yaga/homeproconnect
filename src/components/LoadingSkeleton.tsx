import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-muted',
        className
      )}
    />
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-card border border-border/30">
      <Skeleton className="w-12 h-12 rounded-xl mb-3" />
      <Skeleton className="h-4 w-20 mb-1" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

export function ProviderCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-card">
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

export function BookingCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-card">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-5 w-28 mb-2" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function ChatMessageSkeleton({ isOwn = false }: { isOwn?: boolean }) {
  return (
    <div className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}>
      <div className={cn(
        'max-w-[75%] rounded-2xl p-3',
        isOwn ? 'bg-primary/20' : 'bg-muted'
      )}>
        <Skeleton className="h-4 w-32 mb-1" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}
