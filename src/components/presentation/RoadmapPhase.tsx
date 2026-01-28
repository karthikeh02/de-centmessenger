import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface RoadmapPhaseProps {
  phase: number;
  title: string;
  description: string;
  icon: LucideIcon;
  isActive?: boolean;
}

export const RoadmapPhase = ({ 
  phase, 
  title, 
  description, 
  icon: Icon,
  isActive = false 
}: RoadmapPhaseProps) => {
  return (
    <div className="relative flex items-start gap-4 group">
      {/* Connector line */}
      <div className="absolute left-6 top-14 w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent -z-10" />
      
      {/* Phase number circle */}
      <div className={cn(
        "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
        "font-display font-bold text-lg transition-all duration-300",
        isActive 
          ? "bg-primary text-primary-foreground glow-cyan-intense" 
          : "bg-dark-elevated border border-border text-muted-foreground group-hover:border-primary/50"
      )}>
        {phase}
      </div>
      
      <div className="flex-1 pb-8">
        <div className={cn(
          "p-5 rounded-xl transition-all duration-300",
          isActive 
            ? "bg-card border-glow" 
            : "bg-card/50 border border-border/50 group-hover:border-primary/30"
        )}>
          <div className="flex items-center gap-3 mb-2">
            <Icon className={cn(
              "w-5 h-5",
              isActive ? "text-neon-cyan" : "text-muted-foreground"
            )} />
            <h4 className="font-display font-semibold text-foreground">
              {title}
            </h4>
          </div>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
