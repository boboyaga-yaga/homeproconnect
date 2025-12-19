import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ServiceCard } from '@/components/ServiceCard';
import { BottomNav } from '@/components/BottomNav';
import { services, currentUser } from '@/data/mockData';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted pb-24">
      {/* Header */}
      <div className="bg-primary pt-12 pb-8 px-6 rounded-b-3xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/70 text-sm">Good morning</p>
            <h1 className="text-xl font-bold text-primary-foreground">
              Hi, {currentUser.name.split(' ')[0]} 👋
            </h1>
          </div>
          <button className="relative w-11 h-11 bg-primary-foreground/10 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary-foreground" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-primary" />
          </button>
        </div>

        {/* Location */}
        <button className="flex items-center gap-2 text-primary-foreground/80 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{currentUser.addresses[0].full.slice(0, 35)}...</span>
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
            className="pl-12 h-14 bg-card border-0 shadow-elevated rounded-2xl"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6">
        {/* Quick Actions */}
        <div className="bg-card rounded-2xl p-4 shadow-card mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Need urgent help?</h3>
              <p className="text-sm text-muted-foreground">Get connected in 30 minutes</p>
            </div>
            <button className="bg-accent text-accent-foreground px-4 py-2 rounded-xl font-medium text-sm transition-all hover:bg-accent/90 active:scale-95">
              Book Now
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">All Services</h2>
            <button className="text-sm text-primary font-medium">See All</button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                className="animate-fade-up opacity-0"
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
              >
                <ServiceCard
                  service={service}
                  onClick={() => navigate(`/service/${service.id}`)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">Home Cleaning</h4>
                <p className="text-sm text-muted-foreground">Completed • Dec 15</p>
              </div>
              <button className="text-primary text-sm font-medium">Book Again</button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
