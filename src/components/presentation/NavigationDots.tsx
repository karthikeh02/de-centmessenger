import { cn } from "@/lib/utils";

interface NavigationDotsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export const NavigationDots = ({ total, current, onChange }: NavigationDotsProps) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onChange(idx)}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            current === idx
              ? "bg-primary glow-cyan scale-125"
              : "bg-border hover:bg-primary/50"
          )}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
  );
};
