import { Check, Clock, Truck, Wrench, CheckCircle2 } from 'lucide-react';

type Status = 'pending' | 'confirmed' | 'on-the-way' | 'in-progress' | 'completed';

interface StatusTrackerProps {
  currentStatus: Status;
}

const steps = [
  { id: 'confirmed', label: 'Confirmed', icon: Check },
  { id: 'on-the-way', label: 'On the Way', icon: Truck },
  { id: 'in-progress', label: 'In Progress', icon: Wrench },
  { id: 'completed', label: 'Completed', icon: CheckCircle2 },
];

const statusOrder: Status[] = ['pending', 'confirmed', 'on-the-way', 'in-progress', 'completed'];

export const StatusTracker = ({ currentStatus }: StatusTrackerProps) => {
  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="flex items-center justify-between relative">
      {/* Progress Line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-border mx-8">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{
            width: `${Math.max(0, ((currentIndex - 1) / (steps.length - 1)) * 100)}%`,
          }}
        />
      </div>

      {steps.map((step, index) => {
        const stepIndex = statusOrder.indexOf(step.id as Status);
        const isCompleted = currentIndex > stepIndex;
        const isCurrent = currentStatus === step.id;
        const Icon = step.icon;

        return (
          <div key={step.id} className="flex flex-col items-center z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isCompleted
                  ? 'bg-success text-success-foreground'
                  : isCurrent
                  ? 'bg-primary text-primary-foreground animate-pulse-soft'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span
              className={`text-xs mt-2 font-medium ${
                isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
