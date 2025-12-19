import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Users, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services, timeSlots } from '@/data/mockData';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const service = services.find((s) => s.id === id) || services[0];

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate().toString(),
      full: date.toISOString().split('T')[0],
    };
  });

  const handleBookNow = () => {
    if (selectedDate && selectedTime) {
      navigate('/provider-match', { state: { service, date: selectedDate, time: selectedTime } });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-primary pt-12 pb-24 px-6 relative">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-primary-foreground/10 rounded-xl flex items-center justify-center mb-4"
        >
          <ArrowLeft className="w-5 h-5 text-primary-foreground" />
        </button>
        <h1 className="text-2xl font-bold text-primary-foreground">{service.name}</h1>
        <p className="text-primary-foreground/70 mt-1">{service.description}</p>
      </div>

      {/* Stats Card */}
      <div className="mx-6 -mt-12 bg-card rounded-2xl p-5 shadow-elevated mb-6">
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
                {(service.bookings / 1000).toFixed(1)}k
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
              <p className="text-2xl font-bold text-foreground">{service.priceRange}</p>
            </div>
            <button className="flex items-center gap-1 text-primary font-medium text-sm">
              View Details
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Select Date
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6">
          {dates.map((date, index) => (
            <button
              key={date.full}
              onClick={() => setSelectedDate(date.full)}
              className={`flex flex-col items-center min-w-[60px] py-3 px-4 rounded-2xl transition-all duration-200 ${
                selectedDate === date.full
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card border border-border hover:border-primary/30'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span
                className={`text-xs mb-1 ${
                  selectedDate === date.full ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}
              >
                {date.day}
              </span>
              <span className="text-lg font-bold">{date.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Select Time
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => slot.available && setSelectedTime(slot.time)}
              disabled={!slot.available}
              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedTime === slot.time
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : slot.available
                  ? 'bg-card border border-border hover:border-primary/30'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>

      {/* Book Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/95 backdrop-blur-sm border-t border-border">
        <Button
          variant="hero"
          size="xl"
          className="w-full"
          disabled={!selectedDate || !selectedTime}
          onClick={handleBookNow}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default ServiceDetail;
