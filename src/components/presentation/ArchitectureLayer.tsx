import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ArchitectureLayerProps {
  icon: LucideIcon;
  title: string;
  description: string;
  level: string;
  hype: string;
  index: number;
}

export const ArchitectureLayer = ({ 
  icon: Icon, 
  title, 
  description, 
  level, 
  hype,
  index 
}: ArchitectureLayerProps) => {
  return (
    <div 
      className={cn(
        "group relative flex items-start gap-4 p-5 rounded-xl",
        "bg-gradient-to-r from-card/80 to-transparent",
        "border-l-2 border-primary/50 hover:border-primary",
        "transition-all duration-300 hover:translate-x-2"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-dark-elevated border border-border flex items-center justify-center group-hover:glow-cyan transition-all duration-300">
        <Icon className="w-6 h-6 text-neon-cyan" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h4 className="font-display text-base font-semibold text-foreground">
            {title}
          </h4>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
            {level}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {description}
        </p>
        <p className="text-xs font-display text-neon-purple">
          {hype}
        </p>
      </div>
    </div>
  );
};
