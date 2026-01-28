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
                "w-18 h-18 rounded-2xl flex items-center justify-center mb-3",
                "bg-card shadow-soft border border-border/50",
                "hover:shadow-medium hover:border-primary/30 transition-all duration-300"
              )}>
                <step.icon className="w-9 h-9 text-primary" />
              </div>
              <span className="font-display text-sm font-semibold text-foreground">{step.label}</span>
              <span className="text-xs text-muted-foreground text-center max-w-24 mt-1">{step.desc}</span>
            </div>
            {idx < steps.length - 1 && (
              <ArrowRight className="w-6 h-6 text-primary/40 hidden md:block" />
            )}
          </div>
        ))}
      </div>
      
      {/* Mnemonic Warning */}
      <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-destructive/5 border border-destructive/20 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <Key className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-destructive mb-2">
              ⚠️ CRITICAL WARNING
            </h4>
            <p className="text-sm text-foreground/80">
              WRITE DOWN YOUR MNEMONIC PHRASE – NEVER SHARE IT! This is your ONLY way to recover your account. 
              Lose it, and your messages are gone forever.
            </p>
          </div>
        </div>
      </div>
      
      {/* Login/Recovery Info */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div className="p-5 rounded-2xl bg-card shadow-soft border border-border/50">
          <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Quick Login
          </h4>
          <p className="text-sm text-muted-foreground">
            Just enter your PIN → Instant access to your encrypted kingdom
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-card shadow-soft border border-border/50">
          <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
            <Key className="w-5 h-5 text-neon-purple" />
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
