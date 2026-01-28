import { SlideContainer } from "../SlideContainer";
import { 
  Rocket, 
  Shield, 
  Globe,
  MessageCircle,
  Link2
} from "lucide-react";

export const CTASlide = () => {
  return (
    <SlideContainer>
      <div className="text-center">
        {/* Icon */}
        <div className="relative inline-flex items-center justify-center mb-10">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
          <div className="relative w-44 h-44 rounded-3xl bg-card shadow-medium border-glow flex items-center justify-center">
            <div className="relative">
              <MessageCircle className="w-20 h-20 text-primary" />
              <Link2 className="w-10 h-10 text-neon-purple absolute -bottom-2 -right-2" />
              <Shield className="w-10 h-10 text-neon-green absolute -top-2 -right-2" />
            </div>
          </div>
        </div>
        
        {/* Main Message */}
        <h2 className="font-display text-4xl md:text-6xl font-black mb-8">
          <span className="text-gradient">De Messenger</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-foreground/80 mb-4">
          is more than an app.
        </p>
        
        <p className="text-2xl md:text-3xl font-display text-foreground mb-2">
          It's a <span className="text-primary font-bold">movement</span>.
        </p>
        
        <p className="text-2xl md:text-3xl font-display text-foreground mb-10">
          It's <span className="text-neon-purple font-bold">freedom</span> in your pocket.
        </p>
        
        {/* Next Steps */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { icon: Rocket, label: "Prototype onboarding & P2P core" },
            { icon: Shield, label: "Build the unbreakable fortress" },
            { icon: Globe, label: "Launch the most private messenger" },
          ].map((step, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-card shadow-soft border border-border/50 hover:shadow-medium hover:border-primary/30 transition-all"
            >
              <step.icon className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground font-medium">{step.label}</span>
            </div>
          ))}
        </div>
        
        {/* Final Quote */}
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-card shadow-medium border-glow">
          <p className="font-display text-3xl md:text-4xl text-gradient font-bold mb-8">
            "OWN YOUR CHATS. FOREVER."
          </p>
          
          <div className="pt-6 border-t border-border/50">
            <p className="font-display text-xl text-foreground font-semibold">
              Presented by <span className="text-primary">Karthik</span>
            </p>
            <p className="text-primary mt-2 font-display font-medium">
              Zan Services – Where Privacy Meets Power
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};
