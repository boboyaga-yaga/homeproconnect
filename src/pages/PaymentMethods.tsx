import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Plus, Trash2, Check, Smartphone, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockPaymentMethods = [
  {
    id: '1',
    type: 'card',
    label: 'Visa ending in 4242',
    icon: CreditCard,
    isDefault: true,
  },
  {
    id: '2',
    type: 'mobile',
    label: 'MTN Mobile Money',
    icon: Smartphone,
    isDefault: false,
  },
];

const PaymentMethods = () => {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

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
          <h1 className="text-xl font-bold text-foreground">Payment Methods</h1>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Add Button */}
        <Button
          variant="outline"
          className="w-full h-14 border-dashed"
          onClick={() => {
            // In a real app, this would open a payment method form
          }}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Payment Method
        </Button>

        {/* Payment Methods List */}
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div
              key={method.id}
              className="bg-card rounded-2xl p-5 shadow-card"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{method.label}</span>
                    {method.isDefault && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground capitalize">{method.type}</p>
                </div>
                <div className="flex gap-2">
                  {!method.isDefault && (
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                    >
                      <Check className="w-5 h-5 text-muted-foreground" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(method.id)}
                    className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bank Transfer Option */}
        <div className="bg-card rounded-2xl p-5 shadow-card opacity-60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <span className="font-semibold text-foreground">Bank Transfer</span>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
