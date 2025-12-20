import { useState, useEffect, useRef } from 'react';
import { Shield } from 'lucide-react';

interface VideoSplashProps {
  onComplete: () => void;
  videoUrl?: string;
}

export function VideoSplash({ onComplete, videoUrl }: VideoSplashProps) {
  const [showSkip, setShowSkip] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasSeenIntro = localStorage.getItem('homepro-seen-intro');

  const texts = ['Trusted.', 'Skilled.', 'Reliable.'];

  useEffect(() => {
    // Skip if already seen
    if (hasSeenIntro) {
      onComplete();
      return;
    }

    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => setShowSkip(true), 2000);

    // Text animation cycle
    const textInterval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentText((prev) => {
          if (prev >= texts.length - 1) {
            clearInterval(textInterval);
            setTimeout(() => {
              localStorage.setItem('homepro-seen-intro', 'true');
              onComplete();
            }, 1000);
            return prev;
          }
          setFadeIn(true);
          return prev + 1;
        });
      }, 300);
    }, 1200);

    // Auto-complete after 5 seconds
    const completeTimer = setTimeout(() => {
      localStorage.setItem('homepro-seen-intro', 'true');
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(completeTimer);
      clearInterval(textInterval);
    };
  }, [onComplete, hasSeenIntro]);

  const handleSkip = () => {
    localStorage.setItem('homepro-seen-intro', 'true');
    onComplete();
  };

  if (hasSeenIntro) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0B1220] flex items-center justify-center overflow-hidden">
      {/* Video Background (placeholder - can be replaced with actual video) */}
      {videoUrl ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          autoPlay
          muted
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1220] via-[#0A2540] to-[#0B1220]">
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        {/* Logo */}
        <div className="mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl border border-white/10">
            <Shield className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Animated Text */}
        <div className="h-16 flex items-center justify-center">
          <h1 
            className={`text-4xl md:text-5xl font-bold text-white tracking-tight transition-all duration-300 ${
              fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {texts[currentText]}
          </h1>
        </div>

        {/* Brand Name */}
        <p className="text-white/60 text-lg mt-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          HomePro Connect
        </p>
      </div>

      {/* Skip Button */}
      {showSkip && (
        <button
          onClick={handleSkip}
          className="absolute bottom-12 right-8 text-white/50 hover:text-white text-sm font-medium transition-all duration-300 animate-fade-in"
        >
          Skip →
        </button>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-8 right-8">
        <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white/40 rounded-full transition-all duration-100"
            style={{ 
              width: `${((currentText + 1) / texts.length) * 100}%`,
              animation: 'progressGrow 5s linear forwards'
            }}
          />
        </div>
      </div>
    </div>
  );
}
