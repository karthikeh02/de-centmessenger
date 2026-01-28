import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconColor?: "cyan" | "purple" | "green";
}

export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  className,
  iconColor = "cyan"
}: FeatureCardProps) => {
  const iconColors = {
    cyan: "text-neon-cyan",
    purple: "text-neon-purple", 
    green: "text-neon-green",
  };

  return (
    <div className={cn(
      "group relative p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50",
      "hover:border-primary/50 hover:glow-cyan transition-all duration-300",
      className
    )}>
      <div className={cn(
        "w-12 h-12 rounded-lg bg-dark-elevated flex items-center justify-center mb-4",
        "group-hover:scale-110 transition-transform duration-300"
      )}>
        <Icon className={cn("w-6 h-6", iconColors[iconColor])} />
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};
