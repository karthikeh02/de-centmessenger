import { SlideContainer } from "../SlideContainer";
import { SlideTitle } from "../SlideTitle";
import { ComparisonTable } from "../ComparisonTable";
import { 
  Shield, 
  Server, 
  Gavel, 
  Eye,
  Code
} from "lucide-react";

const comparisonData = [
  { 
    feature: "End-to-End Encryption", 
    whatsapp: true, 
    telegram: "partial" as const, 
    signal: true, 
    demessenger: true 
  },
  { 
    feature: "Fully Decentralized", 
    whatsapp: false, 
    telegram: false, 
    signal: false, 
    demessenger: true 
  },
  { 
    feature: "No Phone/Email Required", 
    whatsapp: false, 
    telegram: false, 
    signal: false, 
    demessenger: true 
  },
  { 
    feature: "Offline Message Queues", 
    whatsapp: true, 
    telegram: true, 
    signal: true, 
    demessenger: true 
  },
  { 
    feature: "IPFS Integration", 
    whatsapp: false, 
    telegram: false, 
    signal: false, 
    demessenger: true 
  },
  { 
    feature: "Gov-Proof Architecture", 
    whatsapp: false, 
    telegram: false, 
    signal: "partial" as const, 
    demessenger: true 
  },
];

const defenses = [
  { icon: Shield, label: "E2EE Everywhere – Signal Protocol" },
  { icon: Server, label: "No Central Storage" },
  { icon: Gavel, label: "Gov-Proof Design" },
  { icon: Eye, label: "Zero-Knowledge Discovery" },
  { icon: Code, label: "Open-Source Potential" },
];

export const SecuritySlide = () => {
  return (
    <SlideContainer>
      <SlideTitle 
        subtitle="We built De Messenger to survive ANY attack."
      >
        Security & Privacy
      </SlideTitle>
      
      <p className="text-center text-xl font-display text-foreground/80 mb-8">
        The <span className="text-primary font-semibold">Ultimate</span> Fortress
      </p>
      
      {/* Key Defenses */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {defenses.map((def, idx) => (
          <div 
            key={idx}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card shadow-soft border border-border/50"
          >
            <def.icon className="w-4 h-4 text-primary" />
            <span className="text-xs text-foreground font-medium">{def.label}</span>
          </div>
        ))}
      </div>
      
      {/* Comparison Table */}
      <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-card shadow-soft border border-border/50">
        <h3 className="font-display text-lg font-semibold text-center mb-6 text-foreground">
          De Messenger vs The Competition
        </h3>
        <ComparisonTable data={comparisonData} />
      </div>
    </SlideContainer>
  );
};
