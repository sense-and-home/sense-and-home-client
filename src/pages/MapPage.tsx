import ArrowBackIcon from "@/assets/icons/arrow-back.svg";
import { CustomMarquee } from "@/components/CustomMarquee";
import { Footer } from "@/components/Footer";
import { MapComponent } from "@/components/MapComponent";
import { tokenStorage } from "@/services/authService";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";

export function MapPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenStorage.isAuthenticated()) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  return (
    <div className="bg-background">
      <div className="relative min-h-screen overflow-hidden bg-cover text-white">
        <div className="relative mb-8 flex items-center justify-between px-2 py-6 md:px-4 lg:px-8">
          <div className="flex items-center">
            <NavLink
              to="/dashboard"
              className="flex items-center gap-2 text-white hover:underline"
            >
              <img src={ArrowBackIcon} alt="Назад" className="h-6 w-6" />
              <span className="text-sm font-medium">В личный кабинет</span>
            </NavLink>
          </div>

          <a
            href="/"
            className="top-4 left-1/2 text-center font-[Abhaya_Libre] text-[50px] leading-none font-extrabold hover:underline md:absolute md:-translate-x-1/2"
          >
            S&H
          </a>
        </div>

        <div className="mx-auto h-[700px] px-2 py-8 md:px-4">
          <MapComponent />
        </div>

        <CustomMarquee className="absolute! bottom-0" />
      </div>
      <div className="pt-16">
        <Footer />
      </div>
    </div>
  );
}
