import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, CreditCard, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { currentUser } from '@/data/mockData';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const { service, provider, date, time } = location.state || {};

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/job-tracking', { state: { service, provider, date, time } });
    }, 1500);
  };

  const estimatedPrice = 120;

  return (
    <div className="min-h-screen bg-muted pb-32">
      {/* Header */}
      <div className="bg-card pt-12 pb-6 px-6 border-b border-border">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Confirm Booking</h1>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Service Details */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <h3 className="font-semibold text-foreground mb-4">Service Details</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{service?.name || 'Home Cleaning'}</p>
                <p className="text-sm text-muted-foreground">
                  {service?.duration || '2-4 hours'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Provider Details */}
        {provider && (
          <div className="bg-card rounded-2xl p-5 shadow-card">
            <h3 className="font-semibold text-foreground mb-4">Your Professional</h3>
            <div className="flex items-center gap-3">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-foreground">{provider.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>⭐ {provider.rating}</span>
                  <span>•</span>
                  <span>{provider.experience}</span>
                </div>
              </div>
              <span className="provider-badge">
                <Check className="w-3 h-3" />
                Verified
              </span>
            </div>
          </div>
        )}

        {/* Schedule & Address */}
        <div className="bg-card rounded-2xl p-5 shadow-card space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                {date ? new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                }) : 'Today'}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {time || '2:00 PM'}
              </p>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="font-medium text-foreground">{currentUser.addresses[0].label}</p>
              <p className="text-sm text-muted-foreground">
                {currentUser.addresses[0].full}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">•••• 4242</p>
                <p className="text-sm text-muted-foreground">Visa</p>
              </div>
            </div>
            <button className="text-primary text-sm font-medium">Change</button>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <h3 className="font-semibold text-foreground mb-4">Price Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service Fee</span>
              <span className="text-foreground">${estimatedPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Platform Fee</span>
              <span className="text-foreground">$5</span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-foreground">${estimatedPrice + 5}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/95 backdrop-blur-sm border-t border-border">
        <Button
          variant="hero"
          size="xl"
          className="w-full"
          onClick={handleConfirm}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            `Confirm & Pay $${estimatedPrice + 5}`
          )}
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
