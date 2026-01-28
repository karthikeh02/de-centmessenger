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

  const bgColors = {
    cyan: "bg-neon-cyan/10",
    purple: "bg-neon-purple/10", 
    green: "bg-neon-green/10",
  };

  return (
    <div className={cn(
      "group relative p-6 rounded-2xl bg-card shadow-soft border border-border/50",
      "hover:shadow-medium hover:border-primary/30 transition-all duration-300",
      className
    )}>
      <div className={cn(
        "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
        bgColors[iconColor],
        "group-hover:scale-110 transition-transform duration-300"
      )}>
        <Icon className={cn("w-7 h-7", iconColors[iconColor])} />
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
