export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  priceRange: string;
  duration: string;
  rating: number;
  bookings: number;
}

export interface Provider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  experience: string;
  verified: boolean;
  specialties: string[];
  eta: string;
  distance: string;
}

export interface Booking {
  id: string;
  service: Service;
  provider: Provider;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  date: string;
  time: string;
  address: string;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  label: string;
  full: string;
  isDefault: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}
