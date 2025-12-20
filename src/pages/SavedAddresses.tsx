import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Plus, Trash2, Star, Loader2, Home, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Address {
  id: string;
  label: string;
  full_address: string;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  is_default: boolean | null;
}

const SavedAddresses = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    full_address: '',
    city: '',
    state: '',
    zip_code: '',
  });

  const fetchAddresses = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });
    
    if (data) {
      setAddresses(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, [user]);

  const handleAddAddress = async () => {
    if (!user || !newAddress.full_address) return;
    
    const { error } = await supabase
      .from('addresses')
      .insert({
        user_id: user.id,
        label: newAddress.label,
        full_address: newAddress.full_address,
        city: newAddress.city || null,
        state: newAddress.state || null,
        zip_code: newAddress.zip_code || null,
        is_default: addresses.length === 0,
      });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to add address',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Address added successfully',
      });
      setShowAddForm(false);
      setNewAddress({ label: 'Home', full_address: '', city: '', state: '', zip_code: '' });
      fetchAddresses();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete address',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Deleted',
        description: 'Address removed',
      });
      fetchAddresses();
    }
  };

  const handleSetDefault = async (id: string) => {
    if (!user) return;
    
    // First, unset all defaults
    await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', user.id);
    
    // Set new default
    const { error } = await supabase
      .from('addresses')
      .update({ is_default: true })
      .eq('id', id);

    if (!error) {
      toast({
        title: 'Updated',
        description: 'Default address changed',
      });
      fetchAddresses();
    }
  };

  const getLabelIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'home':
        return Home;
      case 'work':
        return Briefcase;
      default:
        return MapPin;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
          <h1 className="text-xl font-bold text-foreground">Saved Addresses</h1>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Add Button */}
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          variant="outline"
          className="w-full h-14 border-dashed"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Address
        </Button>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-card rounded-2xl p-5 space-y-4 animate-fade-up">
            <div className="flex gap-2">
              {['Home', 'Work', 'Other'].map((label) => (
                <button
                  key={label}
                  onClick={() => setNewAddress({ ...newAddress, label })}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    newAddress.label === label
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <Input
              placeholder="Full address"
              value={newAddress.full_address}
              onChange={(e) => setNewAddress({ ...newAddress, full_address: e.target.value })}
              className="h-12"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                className="h-12"
              />
              <Input
                placeholder="State"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                className="h-12"
              />
            </div>
            <Input
              placeholder="Zip Code"
              value={newAddress.zip_code}
              onChange={(e) => setNewAddress({ ...newAddress, zip_code: e.target.value })}
              className="h-12"
            />
            <Button onClick={handleAddAddress} className="w-full h-12" variant="hero">
              Save Address
            </Button>
          </div>
        )}

        {/* Addresses List */}
        {addresses.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-1">No saved addresses</h3>
            <p className="text-sm text-muted-foreground">
              Add your first address to get started
            </p>
          </div>
        ) : (
          addresses.map((address) => {
            const Icon = getLabelIcon(address.label);
            return (
              <div
                key={address.id}
                className="bg-card rounded-2xl p-5 shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground">{address.label}</span>
                      {address.is_default && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {address.full_address}
                    </p>
                    {(address.city || address.state) && (
                      <p className="text-sm text-muted-foreground">
                        {[address.city, address.state, address.zip_code].filter(Boolean).join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!address.is_default && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                      >
                        <Star className="w-5 h-5 text-muted-foreground" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SavedAddresses;
