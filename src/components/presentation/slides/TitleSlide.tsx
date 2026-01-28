import { SlideContainer } from "../SlideContainer";
import { Shield, Lock, MessageCircle, Link2 } from "lucide-react";

export const TitleSlide = () => {
  return (
    <SlideContainer>
      <div className="text-center">
        {/* Logo/Icon */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="relative w-32 h-32 rounded-2xl bg-dark-elevated border-glow flex items-center justify-center">
            <div className="relative">
              <MessageCircle className="w-12 h-12 text-neon-cyan" />
              <Link2 className="w-6 h-6 text-neon-purple absolute -bottom-1 -right-1" />
              <Shield className="w-6 h-6 text-neon-green absolute -top-1 -right-1" />
            </div>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4">
          <span className="text-gradient">De Messenger</span>
        </h1>
        
        {/* Subtitle */}
        <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-6">
          The Ultimate Decentralized E2EE Messaging Revolution
        </h2>
        
        {/* Tagline */}
        <p className="text-lg md:text-xl text-primary font-medium mb-8">
          Own Your Chats. No One Else Can.
        </p>
        
        {/* Keywords */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["Privacy", "Power", "Pure Decentralization"].map((word, idx) => (
            <span 
              key={word}
              className="px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary font-display text-sm"
            >
              {word}
            </span>
          ))}
        </div>
        
        {/* Presenter Info */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-muted-foreground mb-2">Presented by</p>
          <p className="font-display text-xl text-foreground">
            Karthik – <span className="text-primary">Founder & Visionary</span>
          </p>
          <p className="text-muted-foreground mt-2">
            Zan Services – Building the Future of Secure Communication
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};
