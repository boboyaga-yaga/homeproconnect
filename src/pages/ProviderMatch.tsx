import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProviderCard } from '@/components/ProviderCard';
import { providers } from '@/data/mockData';

const ProviderMatch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(true);

  const { service, date, time } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    const provider = providers.find((p) => p.id === selectedProvider);
    navigate('/booking-confirmation', {
      state: { service, provider, date, time },
    });
  };

  if (isSearching) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse-soft">
          <Search className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Finding the Best Match</h2>
        <p className="text-muted-foreground text-center">
          We're connecting you with verified professionals nearby...
        </p>
        <div className="flex gap-1.5 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-soft"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="pt-12 pb-6 px-6 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Available Professionals</h1>
            <p className="text-sm text-muted-foreground">{providers.length} found near you</p>
          </div>
        </div>
      </div>

      {/* Provider List */}
      <div className="p-6 space-y-4">
        {providers.map((provider, index) => (
          <div
            key={provider.id}
            className="animate-fade-up opacity-0"
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
          >
            <ProviderCard
              provider={provider}
              selected={selectedProvider === provider.id}
              onClick={() => setSelectedProvider(provider.id)}
            />
          </div>
        ))}
      </div>

      {/* Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/95 backdrop-blur-sm border-t border-border">
        <Button
          variant="hero"
          size="xl"
          className="w-full"
          disabled={!selectedProvider}
          onClick={handleConfirm}
        >
          Confirm Selection
        </Button>
      </div>
    </div>
  );
};

export default ProviderMatch;
