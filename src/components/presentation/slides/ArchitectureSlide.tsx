import { SlideContainer } from "../SlideContainer";
import { SlideTitle } from "../SlideTitle";
import { ArchitectureLayer } from "../ArchitectureLayer";
import { 
  Smartphone, 
  Zap, 
  Eye, 
  Archive,
  Key
} from "lucide-react";

const layers = [
  {
    icon: Smartphone,
    title: "The Iron Core – Your Device (The Citadel)",
    description: "All private keys, mnemonics, messages NEVER leave your phone. Encrypted local storage with military-grade SQLCipher + Secure Enclave/Keystore.",
    level: "100% Decentralized",
    hype: "GOD MODE 💪",
  },
  {
    icon: Zap,
    title: "P2P Lightning Network (The Global Nervous System)",
    description: "Direct, unstoppable P2P connections using libp2p + WebRTC + hole-punching magic. Messages teleport without touching any central server.",
    level: "95%+ Decentralized",
    hype: "LIGHTNING FAST ⚡",
  },
  {
    icon: Eye,
    title: "Discovery Shield (Minimal Cloud – The Watchtower)",
    description: "ONLY public metadata lives here (usernames, public keys, addresses). Client-side encrypted – even if someone steals the server, it's useless garbage.",
    level: "80% Decentralized",
    hype: "IRON SHIELD 🛡️",
  },
  {
    icon: Archive,
    title: "Offline War Chest (Encrypted Queues – The Dead Drops)",
    description: "Encrypted message blobs stored temporarily in IPFS (fully decentralized). Self-destruct after delivery – no permanent trace.",
    level: "90% Decentralized",
    hype: "UNKILLABLE ☠️",
  },
  {
    icon: Key,
    title: "Crypto Backbone (Signal Protocol + BIP-39)",
    description: "Same encryption as Signal app, but decentralized. Forward secrecy, deniability, post-compromise security. Mnemonic phrases as your master key.",
    level: "100% Decentralized",
    hype: "FORTRESS ENGINE 🔐",
  },
];

export const ArchitectureSlide = () => {
  return (
    <SlideContainer>
      <SlideTitle 
        subtitle="This is not just an app. This is a global, censorship-resistant, privacy-first communication empire."
      >
        The Architecture
      </SlideTitle>
      
      <p className="text-center text-xl font-display text-foreground/80 mb-8">
        Behold: The HYPER-DECENTRALIZED FORTRESS
      </p>
      
      <div className="space-y-4 max-w-4xl mx-auto">
        {layers.map((layer, idx) => (
          <ArchitectureLayer
            key={idx}
            icon={layer.icon}
            title={layer.title}
            description={layer.description}
            level={layer.level}
            hype={layer.hype}
            index={idx}
          />
        ))}
      </div>
    </SlideContainer>
  );
};
