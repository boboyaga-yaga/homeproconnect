import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6">
      <div className="animate-scale-in flex flex-col items-center">
        {/* Logo */}
        <div className="w-24 h-24 bg-primary-foreground/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 shadow-elevated">
          <Shield className="w-14 h-14 text-primary-foreground" />
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-bold text-primary-foreground mb-2 tracking-tight">
          HomePro Connect
        </h1>

        {/* Tagline */}
        <p className="text-primary-foreground/80 text-lg font-medium">
          Trusted. Skilled. Reliable.
        </p>
      </div>

      {/* Loading Indicator */}
      <div className="absolute bottom-20">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary-foreground/60 animate-pulse-soft"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Splash;
