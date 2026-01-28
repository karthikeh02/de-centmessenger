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
        "group relative flex items-start gap-4 p-5 rounded-2xl",
        "bg-card shadow-soft border border-border/50",
        "hover:shadow-medium hover:border-primary/30",
        "transition-all duration-300 hover:translate-x-2"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-neon-cyan/10 flex items-center justify-center group-hover:bg-neon-cyan/15 transition-all duration-300">
        <Icon className="w-7 h-7 text-neon-cyan" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h4 className="font-display text-base font-semibold text-foreground">
            {title}
          </h4>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
            {level}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {description}
        </p>
        <p className="text-xs font-display text-neon-purple font-medium">
          {hype}
        </p>
      </div>
    </div>
  );
};
