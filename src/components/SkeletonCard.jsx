import { cn } from '../utils/cn';

export function SkeletonCard({ className }) {
  return (
    <div className={cn('animate-pulse bg-slate-200 rounded-xl', className)} />
  );
}

export function SkeletonLines({ count = 3, className }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-4 bg-slate-200 rounded animate-pulse" style={{ width: i === count - 1 && count > 1 ? '75%' : '100%' }} />
      ))}
    </div>
  );
}
