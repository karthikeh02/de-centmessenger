import { cn } from "@/lib/utils";

interface SlideTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  gradient?: boolean;
}

export const SlideTitle = ({ children, subtitle, className, gradient = true }: SlideTitleProps) => {
  return (
    <div className={cn("text-center mb-12", className)}>
      <h2 className={cn(
        "font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4",
        gradient ? "text-gradient" : "text-foreground"
      )}>
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
