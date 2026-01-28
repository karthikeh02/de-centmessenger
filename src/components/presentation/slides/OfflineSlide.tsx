import { SlideContainer } from "../SlideContainer";
import { SlideTitle } from "../SlideTitle";
import { 
  Archive, 
  Bell, 
  Globe, 
  Trash2,
  CheckCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Archive,
    title: "Local Queue",
    description: "Messages wait on sender's device like loyal soldiers",
  },
  {
    icon: Bell,
    title: "Push Wake-Up",
    description: "Silent alarm: 'You have new intel' – wakes recipient",
  },
  {
    icon: Globe,
    title: "IPFS Dead Drops",
    description: "Encrypted blobs pinned to the global decentralized web",
  },
  {
    icon: Trash2,
    title: "Auto-Cleanup",
    description: "Blobs vanish after delivery or timeout – no trace",
  },
];

export const OfflineSlide = () => {
  return (
    <SlideContainer>
      <SlideTitle 
        subtitle="Even if the internet dies, your conversations survive."
      >
        Offline Mastery
      </SlideTitle>
      
      <p className="text-center text-xl font-display text-foreground/80 mb-12">
        The <span className="text-neon-green">Unkillable</span> Message System
      </p>
      
      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
        {features.map((feature, idx) => (
          <div 
            key={idx}
            className={cn(
              "p-6 rounded-xl bg-card/50 border border-border/50",
              "hover:border-primary/50 hover:glow-cyan transition-all duration-300",
              "flex items-start gap-4"
            )}
          >
            <div className="w-12 h-12 rounded-lg bg-dark-elevated border border-border flex items-center justify-center flex-shrink-0">
              <feature.icon className="w-6 h-6 text-neon-cyan" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-foreground mb-1">
                {feature.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Result Banner */}
      <div className="max-w-xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-neon-green/10 to-neon-cyan/10 border border-neon-green/30">
        <div className="flex items-center justify-center gap-4">
          <CheckCheck className="w-8 h-8 text-neon-green" />
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-foreground">
              Delivery Rate: <span className="text-neon-green">&gt;99%</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Even in war zones or internet blackouts
            </p>
          </div>
        </div>
      </div>
      
      {/* Animation visualization */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground italic">
          💬 Message in a bottle → Floats across oceans → Finds recipient 📬
        </p>
      </div>
    </SlideContainer>
  );
};
