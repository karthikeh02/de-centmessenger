import { SlideContainer } from "../SlideContainer";
import { SlideTitle } from "../SlideTitle";
import { 
  Search, 
  UserPlus, 
  Bell, 
  Check, 
  Link2,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { icon: Search, title: "Search", desc: "Type username, public key, or address" },
  { icon: Users, title: "Discover", desc: "Results from the Watchtower – see public profiles" },
  { icon: UserPlus, title: "Request", desc: "Send encrypted friend request via P2P" },
  { icon: Bell, title: "Alert", desc: "Receiver gets battle alert – Accept / Decline / Block" },
  { icon: Link2, title: "Connect", desc: "Automatic key exchange (Signal Protocol) → Chat unlocks" },
];

export const DiscoverySlide = () => {
  return (
    <SlideContainer>
      <SlideTitle 
        subtitle="No phone numbers. No emails. Pure crypto identity."
      >
        Discovery & Connection
      </SlideTitle>
      
      {/* Connection Flow */}
      <div className="relative max-w-4xl mx-auto">
        {/* Connecting line */}
        <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden lg:block" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="relative flex flex-col items-center text-center"
            >
              <div className={cn(
                "w-20 h-20 rounded-2xl flex items-center justify-center mb-4",
                "bg-dark-elevated border-2 border-border",
                "hover:border-primary hover:glow-cyan transition-all duration-300",
                "relative z-10"
              )}>
                <step.icon className="w-10 h-10 text-neon-cyan" />
                <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
              </div>
              <h4 className="font-display font-semibold text-foreground mb-1">{step.title}</h4>
              <p className="text-xs text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Accept Alliance Mockup */}
      <div className="mt-12 max-w-sm mx-auto">
        <div className="p-6 rounded-2xl bg-card border-glow text-center">
          <div className="w-16 h-16 rounded-full bg-dark-elevated border border-primary/50 mx-auto mb-4 flex items-center justify-center">
            <Users className="w-8 h-8 text-neon-cyan" />
          </div>
          <h4 className="font-display text-lg font-semibold text-foreground mb-2">
            @crypto_warrior
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            wants to form an alliance
          </p>
          <div className="flex gap-3 justify-center">
            <button className="px-6 py-2 rounded-lg bg-neon-green/20 text-neon-green border border-neon-green/30 font-display text-sm font-semibold hover:bg-neon-green/30 transition-colors">
              <Check className="w-4 h-4 inline mr-2" />
              Accept
            </button>
            <button className="px-6 py-2 rounded-lg bg-destructive/20 text-destructive border border-destructive/30 font-display text-sm font-semibold hover:bg-destructive/30 transition-colors">
              Decline
            </button>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};
