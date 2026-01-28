import { useState, useEffect, useCallback } from "react";
import { NavigationDots } from "@/components/presentation/NavigationDots";
import { TitleSlide } from "@/components/presentation/slides/TitleSlide";
import { VisionSlide } from "@/components/presentation/slides/VisionSlide";
import { ArchitectureSlide } from "@/components/presentation/slides/ArchitectureSlide";
import { OnboardingSlide } from "@/components/presentation/slides/OnboardingSlide";
import { DiscoverySlide } from "@/components/presentation/slides/DiscoverySlide";
import { MessagingSlide } from "@/components/presentation/slides/MessagingSlide";
import { OfflineSlide } from "@/components/presentation/slides/OfflineSlide";
import { SecuritySlide } from "@/components/presentation/slides/SecuritySlide";
import { RoadmapSlide } from "@/components/presentation/slides/RoadmapSlide";
import { CTASlide } from "@/components/presentation/slides/CTASlide";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  TitleSlide,
  VisionSlide,
  ArchitectureSlide,
  OnboardingSlide,
  DiscoverySlide,
  MessagingSlide,
  OfflineSlide,
  SecuritySlide,
  RoadmapSlide,
  CTASlide,
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Wheel navigation
  useEffect(() => {
    let lastWheelTime = 0;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime < 800) return; // Debounce
      lastWheelTime = now;

      if (e.deltaY > 0) {
        nextSlide();
      } else if (e.deltaY < 0) {
        prevSlide();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [nextSlide, prevSlide]);

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Slide Container */}
      <div 
        className={cn(
          "w-full h-full transition-all duration-500 ease-out",
          isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        )}
      >
        <CurrentSlideComponent />
      </div>

      {/* Navigation Dots */}
      <NavigationDots 
        total={slides.length} 
        current={currentSlide} 
        onChange={goToSlide} 
      />

      {/* Arrow Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-4">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
            currentSlide === 0
              ? "bg-muted/50 text-muted-foreground cursor-not-allowed"
              : "bg-card border border-border hover:border-primary hover:glow-cyan text-foreground"
          )}
          aria-label="Previous slide"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
            currentSlide === slides.length - 1
              ? "bg-muted/50 text-muted-foreground cursor-not-allowed"
              : "bg-card border border-border hover:border-primary hover:glow-cyan text-foreground"
          )}
          aria-label="Next slide"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="fixed bottom-8 right-8 z-50 font-display text-sm text-muted-foreground">
        <span className="text-primary">{currentSlide + 1}</span>
        <span> / {slides.length}</span>
      </div>

      {/* Keyboard hints */}
      <div className="fixed bottom-8 left-8 z-50 hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
        <span className="px-2 py-1 rounded bg-muted/30">↑↓</span>
        <span>or</span>
        <span className="px-2 py-1 rounded bg-muted/30">Space</span>
        <span>to navigate</span>
      </div>
    </div>
  );
};

export default Index;
