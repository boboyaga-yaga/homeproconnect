import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from '@/components/StarRating';
import { providers } from '@/data/mockData';

const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { provider: selectedProvider } = location.state || {};
  const provider = selectedProvider || providers[0];

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="animate-scale-in">
          <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-14 h-14 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Thank You!</h1>
          <p className="text-muted-foreground">
            Your review helps us maintain quality service
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="pt-12 pb-8 px-6 text-center border-b border-border">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Service Completed!</h1>
        <p className="text-muted-foreground">How was your experience?</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Provider */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-4">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-16 h-16 rounded-2xl object-cover"
            />
            <div>
              <h3 className="font-semibold text-foreground text-lg">{provider.name}</h3>
              <p className="text-sm text-muted-foreground">Your Professional</p>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="bg-card rounded-2xl p-6 shadow-card text-center">
          <h3 className="font-semibold text-foreground mb-4">Rate your experience</h3>
          <div className="flex justify-center mb-2">
            <StarRating rating={rating} onRate={setRating} size="lg" interactive />
          </div>
          <p className="text-sm text-muted-foreground">
            {rating === 0
              ? 'Tap to rate'
              : rating <= 2
              ? 'We appreciate your honesty'
              : rating <= 4
              ? 'Thank you for your feedback!'
              : 'Excellent! Glad you had a great experience'}
          </p>
        </div>

        {/* Feedback */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <h3 className="font-semibold text-foreground mb-3">Share your feedback</h3>
          <Textarea
            placeholder="Tell us about your experience (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[120px] resize-none bg-muted border-0"
          />
        </div>

        {/* Quick Tags */}
        <div className="flex flex-wrap gap-2">
          {['On time', 'Professional', 'Clean work', 'Great communication', 'Value for money'].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => setFeedback((prev) => (prev ? `${prev}, ${tag}` : tag))}
                className="px-4 py-2 bg-secondary rounded-full text-sm text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                {tag}
              </button>
            )
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/95 backdrop-blur-sm border-t border-border">
        <Button
          variant="hero"
          size="xl"
          className="w-full"
          onClick={handleSubmit}
          disabled={rating === 0}
        >
          Submit Review
        </Button>
      </div>
    </div>
  );
};

export default Review;
