import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideContainerProps {
  children: ReactNode;
  className?: string;
}

export const SlideContainer = ({ children, className }: SlideContainerProps) => {
  return (
    <div className={cn(
      "min-h-screen w-full flex flex-col items-center justify-center p-8 md:p-16 relative overflow-hidden bg-grid",
      className
    )}>
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="relative z-10 w-full max-w-6xl">
        {children}
      </div>
    </div>
  );
};
