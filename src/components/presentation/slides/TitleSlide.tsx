import { SlideContainer } from "../SlideContainer";
import { Shield, Lock, MessageCircle, Link2 } from "lucide-react";

export const TitleSlide = () => {
  return (
    <SlideContainer>
      <div className="text-center">
        {/* Logo/Icon */}
        <div className="relative inline-flex items-center justify-center mb-10">
          <div className="absolute inset-0 bg-primary/15 rounded-full blur-[80px] animate-pulse-glow" />
          <div className="relative w-36 h-36 rounded-3xl bg-card shadow-medium border-glow flex items-center justify-center">
            <div className="relative">
              <MessageCircle className="w-14 h-14 text-primary" />
              <Link2 className="w-7 h-7 text-neon-purple absolute -bottom-1 -right-1" />
              <Shield className="w-7 h-7 text-neon-green absolute -top-1 -right-1" />
            </div>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
          <span className="text-gradient">De Messenger</span>
        </h1>
        
        {/* Subtitle */}
        <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-6">
          The Ultimate Decentralized E2EE Messaging Revolution
        </h2>
        
        {/* Tagline */}
        <p className="text-lg md:text-xl text-primary font-semibold mb-10">
          Own Your Chats. No One Else Can.
        </p>
        
        {/* Keywords */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["Privacy", "Power", "Pure Decentralization"].map((word) => (
            <span 
              key={word}
              className="px-5 py-2.5 rounded-full bg-primary/10 text-primary font-display text-sm font-semibold shadow-soft"
            >
              {word}
            </span>
          ))}
        </div>
        
        {/* Presenter Info */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <p className="font-display text-xl text-foreground font-semibold">
            Presented by <span className="text-primary">Karthik</span>
          </p>
          <p className="text-muted-foreground mt-2 font-medium">
            Zan Services – Building the Future of Secure Communication
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};
