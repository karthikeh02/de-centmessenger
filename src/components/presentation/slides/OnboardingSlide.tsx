import { SlideContainer } from "../SlideContainer";
import { SlideTitle } from "../SlideTitle";
import { 
  Rocket, 
  User, 
  Key, 
  Lock, 
  Upload,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { icon: Rocket, label: "Launch", desc: "Welcome warrior!" },
  { icon: User, label: "Username", desc: "Choose your battle name (@karthik_de)" },
  { icon: Key, label: "Mnemonic", desc: "Generate 12-24 word phrase – YOUR MASTER KEY" },
  { icon: Lock, label: "PIN", desc: "Set your castle gate (6-10 digits)" },
  { icon: Upload, label: "Sync", desc: "Upload only your public shield" },
];

export const OnboardingSlide = () => {
  return (
    <SlideContainer>
      <SlideTitle 
        subtitle="One-time, ultra-secure entry into the De Messenger universe"
      >
        Onboarding Flow
      </SlideTitle>
      
      {/* Step Flow */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-16 h-16 rounded-xl flex items-center justify-center mb-2",
                "bg-dark-elevated border border-border",
                "hover:border-primary hover:glow-cyan transition-all duration-300"
              )}>
                <step.icon className="w-8 h-8 text-neon-cyan" />
              </div>
              <span className="font-display text-sm font-semibold text-foreground">{step.label}</span>
              <span className="text-xs text-muted-foreground text-center max-w-24">{step.desc}</span>
            </div>
            {idx < steps.length - 1 && (
              <ArrowRight className="w-6 h-6 text-primary/50 hidden md:block" />
            )}
          </div>
        ))}
      </div>
      
      {/* Mnemonic Warning */}
      <div className="max-w-2xl mx-auto p-6 rounded-xl bg-destructive/10 border border-destructive/30 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center flex-shrink-0">
            <Key className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-destructive mb-2">
              ⚠️ CRITICAL WARNING
            </h4>
            <p className="text-sm text-destructive/80">
              WRITE DOWN YOUR MNEMONIC PHRASE – NEVER SHARE IT! This is your ONLY way to recover your account. 
              Lose it, and your messages are gone forever.
            </p>
          </div>
        </div>
      </div>
      
      {/* Login/Recovery Info */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div className="p-5 rounded-xl bg-card/50 border border-border/50">
          <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-neon-cyan" />
            Quick Login
          </h4>
          <p className="text-sm text-muted-foreground">
            Just enter your PIN → Instant access to your encrypted kingdom
          </p>
        </div>
        <div className="p-5 rounded-xl bg-card/50 border border-border/50">
          <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
            <Key className="w-4 h-4 text-neon-purple" />
            Account Recovery
          </h4>
          <p className="text-sm text-muted-foreground">
            Mnemonic phrase → Restore everything (even if phone dies)
          </p>
        </div>
      </div>
    </SlideContainer>
  );
};
