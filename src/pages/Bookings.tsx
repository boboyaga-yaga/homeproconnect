import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Loader2 } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { useBookings } from '@/hooks/useBookings';
import { format } from 'date-fns';

const tabs = ['Upcoming', 'Completed', 'Cancelled'];

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const navigate = useNavigate();
  const { data: bookings, isLoading } = useBookings();

  const getStatusForTab = (tab: string) => {
    switch (tab) {
      case 'Upcoming':
        return ['pending', 'confirmed', 'in_progress'];
      case 'Completed':
        return ['completed'];
      case 'Cancelled':
        return ['cancelled'];
      default:
        return [];
    }
  };

  const filteredBookings = bookings?.filter((booking) => 
    getStatusForTab(activeTab).includes(booking.status)
  ) || [];

  const getServiceIcon = (serviceName: string) => {
    const iconMap: Record<string, string> = {
      'Clothes Selling': '👕',
      'Shoes & Sneakers': '👟',
      'Laptop Repair': '💻',
      'Bubu Gown & Ankara': '✨',
      'Lash Fixing': '👁️',
      'Hair Styling': '💇',
      'Makeup Services': '💄',
      'Phone Repair': '📱',
    };
    return iconMap[serviceName] || '🛠️';
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'confirmed':
        return 'bg-primary/10 text-primary';
      case 'in_progress':
        return 'bg-accent/10 text-accent-foreground';
      case 'completed':
        return 'bg-success/10 text-success';
      case 'cancelled':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-muted pb-24">
      {/* Header */}
      <div className="bg-card pt-12 pb-4 px-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground mb-4">My Bookings</h1>

        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="p-6 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-1">No {activeTab.toLowerCase()} bookings</h3>
            <p className="text-sm text-muted-foreground">
              Your {activeTab.toLowerCase()} bookings will appear here
            </p>
          </div>
        ) : (
          filteredBookings.map((booking, index) => (
            <div
              key={booking.id}
              className="bg-card rounded-2xl p-5 shadow-card animate-fade-up opacity-0"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="flex gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{getServiceIcon(booking.services?.name || '')}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {booking.services?.name || 'Service'}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {booking.providers?.name || 'Provider'}
                      </p>
                    </div>
                    <span className={`status-badge flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                      {formatStatus(booking.status)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>{format(new Date(booking.scheduled_date), 'MMM d, yyyy')}</span>
                  <span>•</span>
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>{booking.scheduled_time}</span>
                </div>
                {booking.notes && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{booking.notes}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="font-bold text-foreground">
                  ₦{booking.price?.toLocaleString() || '0'}
                </span>
                {booking.status === 'completed' && (
                  <button
                    onClick={() => navigate(`/service/${booking.service_id}`)}
                    className="text-primary font-medium text-sm"
                  >
                    Book Again
                  </button>
                )}
                {['pending', 'confirmed', 'in_progress'].includes(booking.status) && (
                  <button
                    onClick={() => navigate('/job-tracking', { 
                      state: { 
                        service: booking.services, 
                        provider: booking.providers,
                        booking 
                      } 
                    })}
                    className="text-primary font-medium text-sm"
                  >
                    Track
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Bookings;