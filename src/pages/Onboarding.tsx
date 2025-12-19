import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserCheck, Shield, MapPin, ArrowRight } from 'lucide-react';

const slides = [
  {
    icon: UserCheck,
    title: 'Book Trusted Home Professionals',
    description:
      'Connect with verified experts for all your home service needs. Every professional is background-checked and rated.',
  },
  {
    icon: Shield,
    title: 'Fast, Safe & Verified Services',
    description:
      'All service providers undergo rigorous verification. Your safety and satisfaction are our top priority.',
  },
  {
    icon: MapPin,
    title: 'One Tap to Book, Real-Time Tracking',
    description:
      'Book instantly and track your professional in real-time. Know exactly when help arrives.',
  },
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/auth');
    }
  };

  const handleSkip = () => {
    navigate('/auth');
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Skip Button */}
      <div className="flex justify-end p-6">
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-32">
        <div
          key={currentSlide}
          className="animate-fade-up flex flex-col items-center text-center"
        >
          {/* Icon */}
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-10">
            <Icon className="w-16 h-16 text-primary" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground mb-4 leading-tight max-w-xs">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed max-w-sm">
            {slide.description}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-border hover:bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <Button variant="hero" size="xl" onClick={handleNext} className="w-full">
          {currentSlide < slides.length - 1 ? (
            <>
              Next
              <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            'Get Started'
          )}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
