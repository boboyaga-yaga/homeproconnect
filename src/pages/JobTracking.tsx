import { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, MapPin, Clock, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusTracker } from '@/components/StatusTracker';
import { providers } from '@/data/mockData';

// Lazy load the map component
const MapView = lazy(() => import('@/components/MapView').then(m => ({ default: m.MapView })));

type JobStatus = 'confirmed' | 'on-the-way' | 'in-progress' | 'completed';

const JobTracking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<JobStatus>('confirmed');

  const { service, provider: selectedProvider, booking } = location.state || {};
  const provider = selectedProvider || providers[0];

  // Simulate status progression
  useEffect(() => {
    const timers = [
      setTimeout(() => setStatus('on-the-way'), 3000),
      setTimeout(() => setStatus('in-progress'), 8000),
      setTimeout(() => setStatus('completed'), 15000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (status === 'completed') {
      setTimeout(() => {
        navigate('/review', { state: { service, provider, booking } });
      }, 2000);
    }
  }, [status, navigate, service, provider, booking]);

  const statusMessages: Record<JobStatus, { title: string; subtitle: string }> = {
    confirmed: {
      title: 'Booking Confirmed',
      subtitle: `${provider.name} has accepted your request`,
    },
    'on-the-way': {
      title: 'On the Way',
      subtitle: `${provider.name} will arrive in ${provider.eta || '15 min'}`,
    },
    'in-progress': {
      title: 'Service in Progress',
      subtitle: 'Your professional is working on your request',
    },
    completed: {
      title: 'Service Completed',
      subtitle: 'How was your experience?',
    },
  };

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

  return (
    <div className="min-h-screen bg-muted pb-32">
      {/* Header */}
      <div className="bg-card pt-12 pb-6 px-6 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Live Tracking</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Status Header */}
      <div className="bg-primary px-6 py-8 text-center">
        <div className="animate-scale-in">
          <h2 className="text-xl font-bold text-primary-foreground mb-1">
            {statusMessages[status].title}
          </h2>
          <p className="text-primary-foreground/70">{statusMessages[status].subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Status Tracker */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <StatusTracker currentStatus={status} />
        </div>

        {/* Live Map */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-card">
          <div className="h-56 relative">
            <Suspense fallback={
              <div className="h-full w-full flex items-center justify-center bg-muted">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            }>
              <MapView 
                providerName={provider.name}
                isMoving={status === 'on-the-way'}
              />
            </Suspense>
            
            {status === 'on-the-way' && (
              <div className="absolute bottom-4 left-4 bg-card px-3 py-2 rounded-lg shadow-md flex items-center gap-2 z-[1000]">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">ETA: {provider.eta || '15 min'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Provider Card */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={provider.avatar || provider.avatar_url}
              alt={provider.name}
              className="w-14 h-14 rounded-2xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{provider.name}</h3>
              <p className="text-sm text-muted-foreground">
                ⭐ {provider.rating} • {provider.experience}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="secondary" className="flex-1">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <h3 className="font-semibold text-foreground mb-3">Service Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service</span>
              <span className="text-foreground font-medium flex items-center gap-2">
                <span>{getServiceIcon(service?.name || '')}</span>
                {service?.name || 'Service'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Booking ID</span>
              <span className="text-foreground font-medium">
                #{booking?.id?.slice(0, 8).toUpperCase() || 'BK-001'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="text-foreground font-bold">
                ₦{booking?.price?.toLocaleString() || service?.price_min?.toLocaleString() || '0'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Button */}
      {status !== 'completed' && status !== 'in-progress' && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/95 backdrop-blur-sm border-t border-border">
          <Button variant="outline" className="w-full text-destructive border-destructive/30">
            <X className="w-4 h-4 mr-2" />
            Cancel Booking
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobTracking;