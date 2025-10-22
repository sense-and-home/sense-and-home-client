import ArrowBackIcon from "@/assets/icons/arrow-back.svg";
import { CustomMarquee } from "@/components/CustomMarquee";
import { MapComponent } from "@/components/MapComponent";
import { FooterSection } from "@/sections/FooterSection";
import { tokenStorage } from "@/services/authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function MapPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!tokenStorage.isAuthenticated()) {
      navigate("/login");
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="bg-background text-foreground flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-foreground mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="text-lg">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="relative min-h-screen overflow-hidden bg-cover text-white">
        <div className="relative mb-8 flex items-center justify-between px-4 py-6 md:px-8">
          <div className="flex items-center">
            <a
              href="/dashboard"
              className="flex items-center gap-2 text-white hover:underline"
            >
              <img src={ArrowBackIcon} alt="Назад" className="h-6 w-6" />
              <span className="text-sm font-medium">В личный кабинет</span>
            </a>
          </div>

          <a
            href="/"
            className="top-4 left-1/2 text-center font-[Abhaya_Libre] text-[50px] leading-none font-extrabold hover:underline md:absolute md:-translate-x-1/2"
          >
            S&H
          </a>
        </div>

        <div className="mx-auto h-[700px] px-4 py-8">
          <MapComponent />
        </div>

        <CustomMarquee className="absolute! bottom-0" />
      </div>
      <div className="pt-16">
        <FooterSection />
      </div>
    </div>
  );
}
