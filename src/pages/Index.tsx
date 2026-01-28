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

const Index = () => {
  return (
    <div className="w-full bg-background">
      <TitleSlide />
      <VisionSlide />
      <ArchitectureSlide />
      <OnboardingSlide />
      <DiscoverySlide />
      <MessagingSlide />
      <OfflineSlide />
      <SecuritySlide />
      <RoadmapSlide />
      <CTASlide />
    </div>
  );
};

export default Index;
