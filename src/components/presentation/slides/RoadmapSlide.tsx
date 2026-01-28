import { SlideContainer } from "../SlideContainer";
import { SlideTitle } from "../SlideTitle";
import { RoadmapPhase } from "../RoadmapPhase";
import { 
  UserPlus, 
  Zap, 
  Archive, 
  Shield,
  Globe
} from "lucide-react";

const phases = [
  {
    phase: 1,
    title: "Onboarding & Core Crypto Fortress",
    description: "User registration, mnemonic generation, PIN setup, and secure local storage implementation",
    icon: UserPlus,
  },
  {
    phase: 2,
    title: "P2P Messaging Engine & Discovery Shield",
    description: "libp2p integration, WebRTC connections, relay nodes, and public key discovery system",
    icon: Zap,
  },
  {
    phase: 3,
    title: "Offline Queues & IPFS Integration",
    description: "Encrypted message queuing, IPFS dead drops, push notifications, and auto-cleanup mechanisms",
    icon: Archive,
  },
  {
    phase: 4,
    title: "Security Audit & Beta Launch",
    description: "Third-party security audit, bug bounty program, and private beta with selected users",
    icon: Shield,
  },
  {
    phase: 5,
    title: "Global Rollout & Community Conquest",
    description: "Public launch, community building, open-source release, and world domination",
    icon: Globe,
  },
];

export const RoadmapSlide = () => {
  return (
    <SlideContainer>
      <SlideTitle 
        subtitle="The Path to World Domination (Messaging Edition)"
      >
        Roadmap Highlights
      </SlideTitle>
      
      <div className="max-w-2xl mx-auto">
        {phases.map((phase, idx) => (
          <RoadmapPhase
            key={idx}
            phase={phase.phase}
            title={phase.title}
            description={phase.description}
            icon={phase.icon}
            isActive={idx === 0}
          />
        ))}
      </div>
    </SlideContainer>
  );
};
