import { Footer } from "@/components/Footer";
import { AboutSection } from "@/landing/sections/AboutSection";
import { ApplicationSection } from "@/landing/sections/ApplicationSection";
import { HeroSection } from "@/landing/sections/HeroSection";
import { MapSection } from "@/landing/sections/MapSection";
import { QuestionSection } from "@/landing/sections/QuestionSection";
import { StepsSection } from "@/landing/sections/StepsSection";
import { TechnologySection } from "@/landing/sections/TechnologySection";

export function LandingPage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <StepsSection />
      <TechnologySection />
      <MapSection />
      <ApplicationSection />
      <QuestionSection />
      <Footer />
    </div>
  );
}
