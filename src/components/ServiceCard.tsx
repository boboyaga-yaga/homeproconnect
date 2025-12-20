import { 
  Sparkles, 
  Shirt, 
  Footprints, 
  Laptop, 
  Eye, 
  Scissors, 
  Palette, 
  Smartphone,
  ShoppingBag,
  Settings
} from 'lucide-react';
import { Service } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  sparkles: Sparkles,
  shirt: Shirt,
  footprints: Footprints,
  laptop: Laptop,
  eye: Eye,
  scissors: Scissors,
  palette: Palette,
  smartphone: Smartphone,
  shopping: ShoppingBag,
  settings: Settings,
};

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

export const ServiceCard = ({ service, onClick }: ServiceCardProps) => {
  const Icon = iconMap[service.icon] || Sparkles;

  return (
    <button
      onClick={onClick}
      className="service-card flex flex-col items-center text-center w-full"
    >
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <span className="text-sm font-medium text-foreground leading-tight">
        {service.name}
      </span>
    </button>
  );
};
