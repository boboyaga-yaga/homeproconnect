import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, ChevronRight, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { BottomNav } from '@/components/BottomNav';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AnimatedCard } from '@/components/AnimatedCard';
import { ServiceCardSkeleton } from '@/components/LoadingSkeleton';
import { useServices } from '@/hooks/useServices';
import { useAuth } from '@/contexts/AuthContext';
import { useBookings } from '@/hooks/useBookings';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: bookings } = useBookings();

  const filteredServices = services?.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const recentBooking = bookings?.[0];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatPrice = (min: number, max: number) => {
    if (min === max) return `$${min}`;
    return `$${min}-$${max}`;
  };

  return (
    <div className="min-h-screen bg-muted pb-24">
      {/* Header */}
      <div className="bg-primary pt-12 pb-8 px-6 rounded-b-3xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/70 text-sm">{getGreeting()}</p>
            <h1 className="text-xl font-bold text-primary-foreground">
              Hi, {user?.user_metadata?.full_name?.split(' ')[0] || 'there'} 👋
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="relative w-11 h-11 bg-primary-foreground/10 rounded-xl flex items-center justify-center transition-transform active:scale-95">
              <Bell className="w-5 h-5 text-primary-foreground" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-primary" />
            </button>
          </div>
        </div>

        {/* Location */}
        <button className="flex items-center gap-2 text-primary-foreground/80 mb-4 transition-opacity hover:opacity-100">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Set your location</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 bg-card border-0 shadow-elevated rounded-2xl text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6">
        {/* Quick Actions */}
        <AnimatedCard variant="elevated" className="p-4 mb-6" delay={0.1}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Need urgent help?</h3>
                <p className="text-sm text-muted-foreground">Get connected in 30 minutes</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/service/1')}
              className="bg-accent text-accent-foreground px-4 py-2 rounded-xl font-medium text-sm transition-all hover:bg-accent/90 active:scale-95"
            >
              Book Now
            </button>
          </div>
        </AnimatedCard>

        {/* Services Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">All Services</h2>
            <button className="text-sm text-primary font-medium">See All</button>
          </div>

          {servicesLoading ? (
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ServiceCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {filteredServices.map((service, index) => (
                <AnimatedCard
                  key={service.id}
                  delay={index * 0.05}
                  onClick={() => navigate(`/service/${service.id}`)}
                  className="p-3 text-center overflow-hidden"
                >
                  <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="font-medium text-foreground text-xs mb-1 line-clamp-2 leading-tight min-h-[2rem]">
                    {service.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {formatPrice(Number(service.price_min), Number(service.price_max))}
                  </p>
                </AnimatedCard>
              ))}
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        {recentBooking && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            </div>

            <AnimatedCard 
              delay={0.3} 
              className="p-4"
              onClick={() => navigate('/bookings')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  recentBooking.status === 'completed' 
                    ? 'bg-success/10' 
                    : recentBooking.status === 'in_progress'
                    ? 'bg-accent/10'
                    : 'bg-warning/10'
                }`}>
                  <span className="text-2xl">{recentBooking.services?.icon || '📋'}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">
                    {recentBooking.services?.name || 'Service'}
                  </h4>
                  <p className="text-sm text-muted-foreground capitalize">
                    {recentBooking.status.replace('_', ' ')} • {new Date(recentBooking.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <button className="text-primary text-sm font-medium">View</button>
              </div>
            </AnimatedCard>
          </div>
        )}

        {/* Empty state for no recent bookings */}
        {!recentBooking && !servicesLoading && (
          <AnimatedCard delay={0.3} className="p-6 text-center">
            <div className="text-4xl mb-3">🏠</div>
            <h3 className="font-semibold text-foreground mb-1">No bookings yet</h3>
            <p className="text-sm text-muted-foreground">
              Book your first home service above!
            </p>
          </AnimatedCard>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
