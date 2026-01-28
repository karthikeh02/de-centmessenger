import { SlideContainer } from "../SlideContainer";
import { SlideTitle } from "../SlideTitle";
import { 
  MessageCircle, 
  Lock, 
  Zap, 
  WifiOff,
  Image,
  Mic,
  Timer
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  { icon: MessageCircle, label: "Text Messages" },
  { icon: Image, label: "Images (E2EE)" },
  { icon: Mic, label: "Voice Notes (E2EE)" },
  { icon: Timer, label: "Self-Destruct Timers" },
];

export const MessagingSlide = () => {
  return (
    <SlideContainer>
      <SlideTitle 
        subtitle="Once connected, messages become invisible to the world."
      >
        Secure Messaging
      </SlideTitle>
      
      {/* How It Works */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
        <div className="p-6 rounded-xl bg-card/50 border border-border/50 text-center">
          <div className="w-14 h-14 rounded-xl bg-dark-elevated border border-border mx-auto mb-4 flex items-center justify-center">
            <Lock className="w-7 h-7 text-neon-cyan" />
          </div>
          <h4 className="font-display font-semibold text-foreground mb-2">Compose</h4>
          <p className="text-sm text-muted-foreground">
            Encrypt with recipient's public key
          </p>
        </div>
        
        <div className="p-6 rounded-xl bg-card/50 border border-border/50 text-center">
          <div className="w-14 h-14 rounded-xl bg-dark-elevated border border-border mx-auto mb-4 flex items-center justify-center">
            <Zap className="w-7 h-7 text-neon-purple" />
          </div>
          <h4 className="font-display font-semibold text-foreground mb-2">Send</h4>
          <p className="text-sm text-muted-foreground">
            Online → P2P lightning<br />
            Offline → Queue in war chest
          </p>
        </div>
        
        <div className="p-6 rounded-xl bg-card/50 border border-border/50 text-center">
          <div className="w-14 h-14 rounded-xl bg-dark-elevated border border-border mx-auto mb-4 flex items-center justify-center">
            <WifiOff className="w-7 h-7 text-neon-green" />
          </div>
          <h4 className="font-display font-semibold text-foreground mb-2">Receive</h4>
          <p className="text-sm text-muted-foreground">
            Decrypt locally → Read → Ack → Blob self-destructs
          </p>
        </div>
      </div>
      
      {/* Features */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {features.map((f, idx) => (
          <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-elevated border border-border/50">
            <f.icon className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-foreground">{f.label}</span>
          </div>
        ))}
      </div>
      
      {/* Chat Mockup */}
      <div className="max-w-sm mx-auto">
        <div className="rounded-2xl bg-dark-base border border-border overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-dark-elevated border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">KA</span>
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-foreground">@karthik_dev</p>
              <p className="text-xs text-neon-green flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                Online • E2EE Active
              </p>
            </div>
          </div>
          
          {/* Messages */}
          <div className="p-4 space-y-3">
            <div className="flex justify-end">
              <div className="max-w-[70%] px-4 py-2 rounded-2xl rounded-br-sm bg-primary text-primary-foreground text-sm">
                Hey! Testing the encrypted channel 🔐
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[70%] px-4 py-2 rounded-2xl rounded-bl-sm bg-dark-elevated text-foreground text-sm">
                Works perfectly! No one can intercept this 💪
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[70%] px-4 py-2 rounded-2xl rounded-br-sm bg-primary text-primary-foreground text-sm flex items-center gap-2">
                <Timer className="w-3 h-3" />
                Self-destructs in 24h
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};
