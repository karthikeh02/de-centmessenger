import { SlideContainer } from "../SlideContainer";
import { SlideTitle } from "../SlideTitle";
import { FeatureCard } from "../FeatureCard";
import { 
  EyeOff, 
  Lock, 
  UserX, 
  Zap, 
  WifiOff,
  Wallet 
} from "lucide-react";

const corePromises = [
  {
    icon: EyeOff,
    title: "Zero Big Tech Spying",
    description: "No WhatsApp, No Telegram central servers watching your every move",
    iconColor: "cyan" as const,
  },
  {
    icon: Lock,
    title: "True End-to-End Encryption",
    description: "Even we (the creators) can't read your messages. Ever.",
    iconColor: "purple" as const,
  },
  {
    icon: UserX,
    title: "No Phone, No Email Required",
    description: "Only usernames & crypto keys. True anonymity by design.",
    iconColor: "green" as const,
  },
  {
    icon: Zap,
    title: "Peer-to-Peer Power",
    description: "Messages fly directly between devices like magic lightning",
    iconColor: "cyan" as const,
  },
  {
    icon: WifiOff,
    title: "Offline-Proof",
    description: "Messages never die – they wait for you like loyal soldiers",
    iconColor: "purple" as const,
  },
  {
    icon: Wallet,
    title: "Future-Proof Design",
    description: "Built for seamless wallet integration in future phases",
    iconColor: "green" as const,
  },
];

export const VisionSlide = () => {
  return (
    <SlideContainer>
      <SlideTitle 
        subtitle="De Messenger is NOT just another chat app. It is the Fort Knox of messaging – a fully decentralized, military-grade E2EE fortress where YOUR conversations belong ONLY to YOU."
      >
        The Vision
      </SlideTitle>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {corePromises.map((promise, idx) => (
          <FeatureCard
            key={idx}
            icon={promise.icon}
            title={promise.title}
            description={promise.description}
            iconColor={promise.iconColor}
          />
        ))}
      </div>
      
      {/* Target Audience */}
      <div className="text-center mt-8 p-6 rounded-xl bg-card/50 border border-border/50">
        <p className="text-muted-foreground mb-3">Target Audience</p>
        <p className="text-lg text-foreground">
          Privacy warriors, crypto natives, activists, professionals, and{" "}
          <span className="text-primary font-semibold">anyone who hates being watched</span>.
        </p>
      </div>
      
      {/* Quote */}
      <blockquote className="mt-8 text-center">
        <p className="font-display text-2xl md:text-3xl text-gradient italic">
          "In a world of surveillance, De Messenger is freedom."
        </p>
      </blockquote>
    </SlideContainer>
  );
};
