import { AboutSection } from "@/sections/AboutSection";
import { FooterSection } from "@/sections/FooterSection";
import { HeroSection } from "@/sections/HeroSection";
import { MapSection } from "@/sections/MapSection";
import { QuestionSection } from "@/sections/QuestionSection";
import { StepsSection } from "@/sections/StepsSection";
import { TechnologySection } from "@/sections/TechnologySection";

export function MainPage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <StepsSection />
      <TechnologySection />
      <MapSection />
      <QuestionSection />
      <FooterSection />
    </div>
  );
}
