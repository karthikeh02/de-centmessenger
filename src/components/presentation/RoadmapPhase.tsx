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
      <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-primary/30 to-transparent -z-10" />
      
      {/* Phase number circle */}
      <div className={cn(
        "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
        "font-display font-bold text-lg transition-all duration-300",
        isActive 
          ? "bg-primary text-primary-foreground shadow-medium glow-cyan" 
          : "bg-card border-2 border-border text-muted-foreground group-hover:border-primary/50"
      )}>
        {phase}
      </div>
      
      <div className="flex-1 pb-8">
        <div className={cn(
          "p-5 rounded-2xl transition-all duration-300",
          isActive 
            ? "bg-card shadow-medium border-glow" 
            : "bg-card shadow-soft border border-border/50 group-hover:shadow-medium group-hover:border-primary/20"
        )}>
          <div className="flex items-center gap-3 mb-2">
            <Icon className={cn(
              "w-5 h-5",
              isActive ? "text-primary" : "text-muted-foreground"
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
