import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const StarRating = ({
  rating,
  onRate,
  size = 'md',
  interactive = false,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const gaps = {
    sm: 'gap-0.5',
    md: 'gap-1',
    lg: 'gap-2',
  };

  return (
    <div className={`flex items-center ${gaps[size]}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || rating);

        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onRate?.(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`transition-all duration-200 ${
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            }`}
          >
            <Star
              className={`${sizes[size]} transition-colors duration-200 ${
                isFilled ? 'text-warning fill-warning' : 'text-border'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
