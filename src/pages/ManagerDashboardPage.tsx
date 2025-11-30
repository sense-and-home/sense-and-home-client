import { getManagerProfile } from "@/api/userApi";
import ArrowBackIcon from "@/assets/icons/arrow-back.svg";
import ManagerDashboardBackground from "@/assets/img/manager-dashboard-background.webp";
import { CustomMarquee } from "@/components/CustomMarquee";
import { CustomSelect } from "@/components/CustomSelect";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import type {
  ManagerProfileQueryParameters,
  ManagerProfileResponse,
} from "@/types/manager";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router";

const periodOptions = [
  { value: "today", label: "сегодня", text: "сегодня" },
  { value: "week", label: "эта неделя", text: "эту неделю" },
  { value: "month", label: "этот месяц", text: "этот месяц" },
];

const cityOptions = [
  { value: "moscow", label: "Москва" },
  { value: "spb", label: "Санкт-Петербург" },
  { value: "kazan", label: "Казань" },
];

const cityMap: Record<string, string> = {
  moscow: "Moscow",
  spb: "Saint Petersburg",
  kazan: "Kazan",
};

function computeDateRange(period: string) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const toIsoDate = (d: Date) => {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  const today = new Date();
  if (period === "today") {
    return { date_from: toIsoDate(today), date_to: toIsoDate(today) };
  }
  if (period === "week") {
    const from = new Date();
    from.setDate(today.getDate() - 6);
    return { date_from: toIsoDate(from), date_to: toIsoDate(today) };
  }
  const from = new Date();
  from.setDate(today.getDate() - 29);
  return { date_from: toIsoDate(from), date_to: toIsoDate(today) };
}

export function ManagerDashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [selectedCity, setSelectedCity] = useState(cityOptions[0]);
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);

  const displayName = useMemo(
    () => user?.firstName || user?.lastName || "Имя",
    [user],
  );

  const managerQueryParams = useMemo<ManagerProfileQueryParameters>(() => {
    const { date_from, date_to } = computeDateRange(selectedPeriod.value);
    return {
      city: cityMap[selectedCity.value] ?? selectedCity.value,
      date_from,
      date_to,
    };
  }, [selectedCity, selectedPeriod]);

  const managerProfileQuery = useQuery<ManagerProfileResponse>({
    queryKey: [
      "manager-profile",
      user?.id,
      selectedCity.value,
      selectedPeriod.value,
      managerQueryParams.dateFrom,
      managerQueryParams.dateTo,
    ],
    queryFn: async () => {
      return await getManagerProfile(user!.id, managerQueryParams);
    },
    enabled: !!user?.id && !!selectedCity?.value,
  });

  const isStatsLoading = managerProfileQuery.isLoading;
  const error = managerProfileQuery.error;
  const managerData = managerProfileQuery.data;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-surface-1">
      <div
        className="relative min-h-screen overflow-hidden bg-cover text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${ManagerDashboardBackground})`,
        }}
      >
        <div className="relative mb-8 flex items-center justify-between px-2 py-6 md:px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-white hover:underline"
            >
              <img src={ArrowBackIcon} alt="Назад" className="h-6 w-6" />
              <span className="text-sm font-medium">На главную</span>
            </NavLink>

            <button
              onClick={handleLogout}
              className="hidden rounded-md border border-white/20 px-3 py-1 text-sm hover:bg-white/5 md:inline-block"
            >
              Выйти
            </button>
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
                Здравствуйте, {displayName}!
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
                    <div className="h-8 animate-pulse rounded bg-gray-200" />
                    <div className="h-8 animate-pulse rounded bg-gray-200" />
                  </div>
                ) : error ? (
                  <div className="text-red-400">
                    Не удалось загрузить статистику
                  </div>
                ) : (
                  <div className="space-y-2 text-xl font-bold text-white">
                    <p>
                      Заявок за {selectedPeriod.text || selectedPeriod.label}:{" "}
                      {managerData?.stats?.totalRequests ?? 0}
                    </p>
                    <p>
                      Обработано заявок за{" "}
                      {selectedPeriod.text || selectedPeriod.label}:{" "}
                      {managerData?.stats?.newRequestsCount ?? 0}
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
                  value={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()}
                  readOnly
                  className="bg-surface-2 rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                  placeholder="Имя Фамилия"
                />

                {user?.phone && (
                  <input
                    type="tel"
                    value={user.phone}
                    readOnly
                    className="bg-surface-2 rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                    placeholder="+7 (---) --- -- --"
                  />
                )}

                <input
                  type="email"
                  value={user?.email ?? ""}
                  readOnly
                  className="bg-surface-2 rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                  placeholder="-------@gmail.com"
                />

                <input
                  type="text"
                  value={user?.specialization?.title ?? ""}
                  readOnly
                  className="bg-surface-2 rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
                  placeholder="Специализация"
                />
              </div>
            </div>
          </div>
        </div>

        <CustomMarquee className="absolute! bottom-0" />
      </div>

      <div className="pt-16">
        <Footer />
      </div>
    </div>
  );
}
