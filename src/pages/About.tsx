import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Mail, ExternalLink } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary pt-12 pb-8 px-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-primary-foreground/10 rounded-xl flex items-center justify-center mb-4">
          <ArrowLeft className="w-5 h-5 text-primary-foreground" />
        </button>
        <h1 className="text-2xl font-bold text-primary-foreground">About</h1>
      </div>

      <div className="p-6 space-y-6">
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">HomePro Connect</h2>
          <p className="text-muted-foreground">Version 1.0.0</p>
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-card space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-1">Owner</h3>
            <p className="text-muted-foreground">Austin Chidera Unegbu</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-1">Support</h3>
            <a href="mailto:support@homeproconnect.com" className="text-primary flex items-center gap-1">
              <Mail className="w-4 h-4" /> support@homeproconnect.com
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-card rounded-xl p-4 flex items-center justify-between text-foreground shadow-card">
            <span>Privacy Policy</span>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="w-full bg-card rounded-xl p-4 flex items-center justify-between text-foreground shadow-card">
            <span>Terms of Service</span>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          © 2024 HomePro Connect. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default About;
