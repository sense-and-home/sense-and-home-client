import { Footer } from "@/components/Footer";
import { ScrollManager } from "@/components/ScrollManager";
import { AboutSection } from "@/pages/Landing/sections/AboutSection";
import { ApplicationSection } from "@/pages/Landing/sections/ApplicationSection";
import { HeroSection } from "@/pages/Landing/sections/HeroSection";
import { MapSection } from "@/pages/Landing/sections/MapSection";
import { QuestionSection } from "@/pages/Landing/sections/QuestionSection";
import { StepsSection } from "@/pages/Landing/sections/StepsSection";
import { TechnologySection } from "@/pages/Landing/sections/TechnologySection";

export function LandingPage() {
  return (
    <div>
      <ScrollManager />
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
