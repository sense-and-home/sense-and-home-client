import { AboutSection } from "@/sections/AboutSection";
import { HeroSection } from "@/sections/HeroSection";
import { StepsSection } from "@/sections/StepsSection";

export function MainPage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <StepsSection />

      <p className="px-4 py-10">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus
        eligendi veniam suscipit eum, maiores quae inventore. Nisi magnam
        consectetur amet. Architecto aspernatur voluptatibus ipsam error ut
        tempore tempora accusamus veritatis?
      </p>
    </div>
  );
}
