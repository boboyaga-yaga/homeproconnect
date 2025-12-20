import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  Eye, 
  Vibrate,
  ChevronRight 
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useState } from 'react';

const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-card pt-12 pb-6 px-6 border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Appearance */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
            Appearance
          </h2>
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <Moon className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Theme</span>
                  <p className="text-sm text-muted-foreground">Light, dark, or system</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <Eye className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Reduced Motion</span>
                  <p className="text-sm text-muted-foreground">Limit animations</p>
                </div>
              </div>
              <Switch 
                checked={reducedMotion} 
                onCheckedChange={setReducedMotion}
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
            Notifications
          </h2>
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Notifications</span>
                  <p className="text-sm text-muted-foreground">Enable all notifications</p>
                </div>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Push Notifications</span>
                  <p className="text-sm text-muted-foreground">Booking updates</p>
                </div>
              </div>
              <Switch 
                checked={pushNotifications} 
                onCheckedChange={setPushNotifications}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <Vibrate className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Haptic Feedback</span>
                  <p className="text-sm text-muted-foreground">Vibration on actions</p>
                </div>
              </div>
              <Switch 
                checked={hapticFeedback} 
                onCheckedChange={setHapticFeedback}
              />
            </div>
          </div>
        </div>

        {/* Language & Region */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
            Language & Region
          </h2>
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-foreground" />
                </div>
                <div className="text-left">
                  <span className="font-medium text-foreground">Language</span>
                  <p className="text-sm text-muted-foreground">English</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
            Security
          </h2>
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-foreground" />
                </div>
                <div className="text-left">
                  <span className="font-medium text-foreground">Privacy & Security</span>
                  <p className="text-sm text-muted-foreground">Manage your data</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">HomePro Connect v1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">Built with ❤️ for campus life</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
