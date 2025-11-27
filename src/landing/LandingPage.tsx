import { Footer } from "@/components/Footer";
import { AboutSection } from "./sections/AboutSection";
import { ApplicationSection } from "./sections/ApplicationSection";
import { HeroSection } from "./sections/HeroSection";
import { MapSection } from "./sections/MapSection";
import { QuestionSection } from "./sections/QuestionSection";
import { StepsSection } from "./sections/StepsSection";
import { TechnologySection } from "./sections/TechnologySection";

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
