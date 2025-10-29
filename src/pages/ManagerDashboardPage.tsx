import ArrowBackIcon from "@/assets/icons/arrow-back.svg";
import ManagerDashboardBackground from "@/assets/img/manager-dashboard-background.webp";
import { CustomMarquee } from "@/components/CustomMarquee";
import { CustomSelect } from "@/components/CustomSelect";
import { FooterSection } from "@/sections/FooterSection";
import { tokenStorage } from "@/services/authService";
import { managerAPI } from "@/services/managerService";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone?: string;
  specialization: {
    id: number;
    title: string;
  };
  is_active: boolean;
}

interface Stats {
  totalRequests: number;
  processedRequests: number;
}

const periodOptions = [
  { value: "today", label: "сегодня" },
  { value: "week", label: "эта неделя", text: "эту неделю" },
  { value: "month", label: "этот месяц" },
];

const cityOptions = [
  { value: "moscow", label: "Москва" },
  { value: "spb", label: "Санкт-Петербург" },
  { value: "kazan", label: "Казань" },
];

export function ManagerDashboardPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCity, setSelectedCity] = useState(cityOptions[0]);
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isStatsLoading, setIsStatsLoading] = useState(true);

  useEffect(() => {
    if (!tokenStorage.isAuthenticated()) {
      navigate("/login");
      return;
    }
    const userData = localStorage.getItem("user_data");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      setIsStatsLoading(true);
      try {
        const data = await managerAPI.getStats(
          selectedCity.value,
          selectedPeriod.value,
        );
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats(null);
      } finally {
        setIsStatsLoading(false);
      }
    };

    if (!isLoading) {
      fetchStats();
    }
  }, [isLoading, selectedCity, selectedPeriod]);

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
      <div
        className="relative min-h-screen overflow-hidden bg-cover text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${ManagerDashboardBackground})`,
        }}
      >
        <div className="relative mb-8 flex items-center justify-between px-2 py-6 md:px-4 lg:px-8">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-white hover:underline"
            >
              <img src={ArrowBackIcon} alt="Назад" className="h-6 w-6" />
              <span className="text-sm font-medium">На главную</span>
            </NavLink>
          </div>

          <NavLink
            to="/"
            className="top-4 left-1/2 text-center font-[Abhaya_Libre] text-[50px] leading-none font-extrabold hover:underline md:absolute md:-translate-x-1/2"
          >
            S&H
          </NavLink>
        </div>

        <div className="mx-auto px-2 py-8 md:px-4 lg:px-8">
          <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="order-2 space-y-8 text-white lg:order-1">
              <h2 className="heading space-y-8 text-center leading-tight font-bold lg:text-left">
                Здравствуйте, {user?.first_name || "Имя"}!
              </h2>

              <div className="flex flex-col gap-3 space-y-8 lg:w-2/3 lg:flex-row lg:gap-0">
                <CustomSelect
                  options={cityOptions}
                  value={selectedCity}
                  onChange={(option) => setSelectedCity(option)}
                  placeholder="Выберите город"
                />
                <CustomSelect
                  options={periodOptions}
                  value={selectedPeriod}
                  onChange={(option) => setSelectedPeriod(option)}
                  placeholder="Выберите период"
                />
              </div>

              <div>
                {isStatsLoading ? (
                  <div className="space-y-2">
                    <div className="h-8 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-8 animate-pulse rounded bg-gray-200"></div>
                  </div>
                ) : (
                  <div className="space-y-2 text-xl font-bold text-white">
                    <p>
                      Заявок за {selectedPeriod.text || selectedPeriod.label}:{" "}
                      {stats?.totalRequests ?? 0}
                    </p>
                    <p>
                      Обработано заявок за{" "}
                      {selectedPeriod.text || selectedPeriod.label}:{" "}
                      {stats?.processedRequests ?? 0}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="order-1 space-y-8 lg:order-2">
              <h2 className="heading text-center leading-tight font-bold text-white lg:text-right">
                Заявка от 00.00.00
              </h2>
              <div className="space-y-2">
                <input
                  type="text"
                  value={user?.full_name || ""}
                  readOnly
                  className="bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                  placeholder="Имя Фамилия"
                />
                {user?.phone && (
                  <input
                    type="tel"
                    value={user.phone}
                    readOnly
                    className="bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                    placeholder="+7 (---) --- -- --"
                  />
                )}
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                  placeholder="-------@gmail.com"
                />
                <input
                  type="text"
                  value={user?.specialization?.title || ""}
                  readOnly
                  className="bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                  placeholder="Компания*"
                />
              </div>
            </div>
          </div>
        </div>
        <CustomMarquee className="absolute! bottom-0" />
      </div>

      <div className="pt-16">
        <FooterSection />
      </div>
    </div>
  );
}
