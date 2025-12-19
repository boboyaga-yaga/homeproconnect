import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { services, providers } from '@/data/mockData';

const tabs = ['Upcoming', 'Completed', 'Cancelled'];

const mockBookings = [
  {
    id: '1',
    service: services[0],
    provider: providers[0],
    status: 'upcoming',
    date: 'Dec 20, 2024',
    time: '2:00 PM',
    address: '123 Oak Street, Apt 4B',
    price: 120,
  },
  {
    id: '2',
    service: services[1],
    provider: providers[1],
    status: 'completed',
    date: 'Dec 15, 2024',
    time: '10:00 AM',
    address: '123 Oak Street, Apt 4B',
    price: 95,
  },
  {
    id: '3',
    service: services[2],
    provider: providers[2],
    status: 'completed',
    date: 'Dec 10, 2024',
    time: '3:00 PM',
    address: '456 Market Street',
    price: 150,
  },
];

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const navigate = useNavigate();

  const filteredBookings = mockBookings.filter((booking) => {
    if (activeTab === 'Upcoming') return booking.status === 'upcoming';
    if (activeTab === 'Completed') return booking.status === 'completed';
    return booking.status === 'cancelled';
  });

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
        {filteredBookings.length === 0 ? (
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
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{booking.service.name}</h3>
                      <p className="text-sm text-muted-foreground">{booking.provider.name}</p>
                    </div>
                    <span
                      className={`status-badge ${
                        booking.status === 'upcoming'
                          ? 'status-active'
                          : booking.status === 'completed'
                          ? 'status-completed'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{booking.date}</span>
                  <span>•</span>
                  <Clock className="w-4 h-4" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{booking.address}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="font-bold text-foreground">${booking.price}</span>
                {booking.status === 'completed' && (
                  <button
                    onClick={() => navigate(`/service/${booking.service.id}`)}
                    className="text-primary font-medium text-sm"
                  >
                    Book Again
                  </button>
                )}
                {booking.status === 'upcoming' && (
                  <button
                    onClick={() => navigate('/job-tracking', { state: { service: booking.service, provider: booking.provider } })}
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
