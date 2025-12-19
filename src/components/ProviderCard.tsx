import { Star, Shield, Clock, MapPin } from 'lucide-react';
import { Provider } from '@/types';

interface ProviderCardProps {
  provider: Provider;
  selected?: boolean;
  onClick?: () => void;
}

export const ProviderCard = ({ provider, selected, onClick }: ProviderCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
        selected
          ? 'border-primary bg-primary/5 shadow-elevated'
          : 'border-border bg-card hover:border-primary/30 hover:shadow-card'
      }`}
    >
      <div className="flex gap-4">
        <div className="relative">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-16 h-16 rounded-2xl object-cover"
          />
          {provider.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-card">
              <Shield className="w-3 h-3 text-success-foreground" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{provider.name}</h3>
            {provider.verified && (
              <span className="provider-badge">
                <Shield className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-warning fill-warning" />
              <span className="font-medium text-foreground">{provider.rating}</span>
              <span>({provider.reviews})</span>
            </div>
            <span>•</span>
            <span>{provider.experience}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>ETA: {provider.eta}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{provider.distance}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-3 flex-wrap">
        {provider.specialties.map((specialty) => (
          <span
            key={specialty}
            className="px-2 py-1 bg-secondary rounded-lg text-xs text-secondary-foreground"
          >
            {specialty}
          </span>
        ))}
      </div>
    </button>
  );
};
