import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  MapPin,
  CreditCard,
  Clock,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Shield,
  Loader2,
} from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const menuItems = [
  { icon: User, label: 'Personal Information', path: '/profile/personal' },
  { icon: MapPin, label: 'Saved Addresses', path: '/profile/addresses' },
  { icon: CreditCard, label: 'Payment Methods', path: '/profile/payments' },
  { icon: Clock, label: 'Booking History', path: '/bookings' },
  { icon: HelpCircle, label: 'Help & Support', path: '/support' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

interface Profile {
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
}

interface Stats {
  bookings: number;
  avgRating: number;
  reviews: number;
}

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<Stats>({ bookings: 0, avgRating: 0, reviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndStats = async () => {
      if (!user) return;

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name, phone, avatar_url')
        .eq('id', user.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch stats
      const { count: bookingsCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const { count: reviewsCount } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('rating')
        .eq('user_id', user.id);

      const avgRating = reviewsData && reviewsData.length > 0
        ? reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length
        : 0;

      setStats({
        bookings: bookingsCount || 0,
        avgRating: Number(avgRating.toFixed(1)),
        reviews: reviewsCount || 0,
      });

      setLoading(false);
    };

    fetchProfileAndStats();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate('/auth', { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted pb-24">
      {/* Header */}
      <div className="bg-primary pt-12 pb-8 px-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-primary-foreground/10 rounded-xl flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <h1 className="text-xl font-bold text-primary-foreground">Profile</h1>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name || 'User'}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-primary-foreground/20"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-primary-foreground/20 flex items-center justify-center border-4 border-primary-foreground/20">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-success rounded-full flex items-center justify-center border-2 border-primary">
              <Shield className="w-4 h-4 text-success-foreground" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary-foreground">
              {profile?.full_name || 'Welcome!'}
            </h2>
            <p className="text-primary-foreground/70 text-sm">{user?.email}</p>
            {profile?.phone && (
              <p className="text-primary-foreground/70 text-sm">{profile.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="p-6">
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 flex items-center justify-center gap-2 p-4 bg-destructive/10 rounded-2xl text-destructive font-medium hover:bg-destructive/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <h3 className="font-semibold text-foreground mb-4">Your Activity</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{stats.bookings}</p>
              <p className="text-xs text-muted-foreground">Bookings</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">{stats.avgRating || '-'}</p>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">{stats.reviews}</p>
              <p className="text-xs text-muted-foreground">Reviews</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
