import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Users, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useService } from '@/hooks/useServices';
import { Skeleton } from '@/components/LoadingSkeleton';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';

const timeSlots = [
  { id: '1', time: '08:00 AM', available: true },
  { id: '2', time: '09:00 AM', available: true },
  { id: '3', time: '10:00 AM', available: true },
  { id: '4', time: '11:00 AM', available: false },
  { id: '5', time: '12:00 PM', available: true },
  { id: '6', time: '01:00 PM', available: true },
  { id: '7', time: '02:00 PM', available: true },
  { id: '8', time: '03:00 PM', available: false },
  { id: '9', time: '04:00 PM', available: true },
  { id: '10', time: '05:00 PM', available: true },
  { id: '11', time: '06:00 PM', available: true },
  { id: '12', time: '07:00 PM', available: true },
];

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const { data: service, isLoading } = useService(id || '');

  const handleBookNow = () => {
    if (selectedDate && selectedTime && service) {
      navigate('/provider-match', { 
        state: { 
          service, 
          date: format(selectedDate, 'yyyy-MM-dd'), 
          time: selectedTime 
        } 
      });
    }
  };

  const formatPrice = (min: number, max: number) => {
    if (min === max) return `$${min}`;
    return `$${min}-$${max}`;
  };

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 30);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary pt-12 pb-24 px-6">
          <Skeleton className="w-10 h-10 rounded-xl mb-4" />
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="mx-6 -mt-12 bg-card rounded-2xl p-5 shadow-elevated mb-6">
          <div className="flex justify-between">
            <Skeleton className="h-12 w-20" />
            <Skeleton className="h-12 w-20" />
            <Skeleton className="h-12 w-20" />
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Service not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-primary pt-12 pb-24 px-6 relative">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-primary-foreground/10 rounded-xl flex items-center justify-center mb-4 transition-transform active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-primary-foreground" />
        </button>
        <h1 className="text-2xl font-bold text-primary-foreground">{service.name}</h1>
        <p className="text-primary-foreground/70 mt-1">{service.description}</p>
      </div>

      {/* Stats Card */}
      <div className="mx-6 -mt-12 bg-card rounded-2xl p-5 shadow-elevated mb-6 animate-scale-in">
        <div className="flex justify-between">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-5 h-5 text-warning fill-warning" />
              <span className="text-lg font-bold text-foreground">{service.rating}</span>
            </div>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-lg font-bold text-foreground">{service.duration}</span>
            </div>
            <p className="text-xs text-muted-foreground">Duration</p>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-5 h-5 text-success" />
              <span className="text-lg font-bold text-foreground">
                {(service.bookings_count / 1000).toFixed(1)}k
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Bookings</p>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="px-6 mb-6">
        <div className="bg-muted rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Estimated Price</p>
              <p className="text-2xl font-bold text-foreground">
                {formatPrice(Number(service.price_min), Number(service.price_max))}
              </p>
            </div>
            <button className="flex items-center gap-1 text-primary font-medium text-sm transition-opacity hover:opacity-80">
              View Details
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Date Selection */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Select Date</h3>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <button className={cn(
              "w-full p-4 rounded-2xl border text-left transition-all",
              selectedDate 
                ? "bg-primary/5 border-primary text-foreground" 
                : "bg-card border-border text-muted-foreground hover:border-primary/30"
            )}>
              {selectedDate ? (
                <span className="font-medium">
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </span>
              ) : (
                <span>Choose a date for your service</span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-2xl" align="center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setCalendarOpen(false);
              }}
              disabled={(date) => 
                isBefore(date, today) || isBefore(maxDate, date)
              }
              initialFocus
              className="rounded-2xl"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Selection */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Select Time</h3>
        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => slot.available && setSelectedTime(slot.time)}
              disabled={!slot.available}
              className={cn(
                "py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200",
                selectedTime === slot.time
                  ? "bg-primary text-primary-foreground shadow-lg scale-[1.02]"
                  : slot.available
                  ? "bg-card border border-border hover:border-primary/30 active:scale-95"
                  : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
              )}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>

      {/* Book Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-background/95 backdrop-blur-sm border-t border-border">
        <Button
          variant="hero"
          size="xl"
          className="w-full"
          disabled={!selectedDate || !selectedTime}
          onClick={handleBookNow}
        >
          {(!selectedDate || !selectedTime) ? 'Select date & time' : 'Continue to Book'}
        </Button>
      </div>
    </div>
  );
};

export default ServiceDetail;
