import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  ChevronRight,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: 'How do I book a service?',
    answer: 'Browse services on the home page, select a service, choose a date and time, then confirm your booking.',
  },
  {
    question: 'How do I cancel a booking?',
    answer: 'Go to My Bookings, find the booking you want to cancel, and tap the Cancel button.',
  },
  {
    question: 'How do I contact a provider?',
    answer: 'Once a booking is confirmed, you can chat with your provider through the in-app messaging.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept cards, mobile money, and bank transfers.',
  },
];

const Support = () => {
  const navigate = useNavigate();

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
          <h1 className="text-xl font-bold text-foreground">Help & Support</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Contact Options */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
            Contact Us
          </h2>
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            <button className="w-full flex items-center gap-4 p-4 border-b border-border hover:bg-muted/50 transition-colors">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <span className="font-medium text-foreground">Live Chat</span>
                <p className="text-sm text-muted-foreground">Chat with our support team</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center gap-4 p-4 border-b border-border hover:bg-muted/50 transition-colors">
              <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1 text-left">
                <span className="font-medium text-foreground">Call Us</span>
                <p className="text-sm text-muted-foreground">+234 XXX XXX XXXX</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 text-left">
                <span className="font-medium text-foreground">Email</span>
                <p className="text-sm text-muted-foreground">support@homeproconnect.com</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
            Frequently Asked Questions
          </h2>
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`p-4 ${index !== faqs.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
            Legal
          </h2>
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            <button 
              onClick={() => navigate('/about')}
              className="w-full flex items-center gap-4 p-4 border-b border-border hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-foreground" />
              </div>
              <span className="flex-1 text-left font-medium text-foreground">About Us</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center gap-4 p-4 border-b border-border hover:bg-muted/50 transition-colors">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-foreground" />
              </div>
              <span className="flex-1 text-left font-medium text-foreground">Terms of Service</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-foreground" />
              </div>
              <span className="flex-1 text-left font-medium text-foreground">Privacy Policy</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
