import ArrowBackIcon from "@/assets/icons/arrow-back.svg";
import HeroBackground from "@/assets/img/hero-background.webp";
import { CustomMarquee } from "@/components/CustomMarquee";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { NavLink, useNavigate } from "react-router";

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const displayName = user?.firstName || user?.lastName || "Имя";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-surface-1">
      <div
        className="relative min-h-screen overflow-hidden bg-cover text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${HeroBackground})`,
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
            <div className="order-2 space-y-8 lg:order-1">
              <div className="bg-surface-1-foreground/90 rounded-2xl border border-white/20 p-8 backdrop-blur-sm">
                <h1 className="heading mb-8 font-bold text-black">
                  Сейчас в работе
                </h1>
                <div className="space-y-4 font-bold lg:text-xl">
                  <div className="rounded-primary border-2 border-black px-4 py-2">
                    <span className="text-black">
                      1. Запрос и анализ исходных данных
                    </span>
                  </div>
                  <div className="rounded-primary border-2 border-black/50 px-4 py-2">
                    <span className="text-black/50">
                      2. Согласование тз и подписание договора
                    </span>
                  </div>
                  <div className="rounded-primary border-2 border-black/50 px-4 py-2">
                    <span className="text-black/50">
                      3. Моделирование проекта
                    </span>
                  </div>
                  <div className="rounded-primary border-2 border-black/50 px-4 py-2">
                    <span className="text-black/50">
                      4. Визуализация проекта
                    </span>
                  </div>
                  <div className="rounded-primary border-2 border-black/50 px-4 py-2">
                    <span className="text-black/50">
                      5. Согласование демоверсии и правки
                    </span>
                  </div>
                  <div className="rounded-primary border-2 border-black/50 px-4 py-2">
                    <span className="text-black/50">
                      6. Рендер и сборка проектов
                    </span>
                  </div>
                  <div className="rounded-primary border-2 border-black/50 px-4 py-2">
                    <span className="text-black/50">7. Сдача проекта</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 space-y-8 lg:order-2">
              <h2 className="heading text-center leading-tight font-bold text-white lg:text-right">
                Здравствуйте, {displayName}!
              </h2>

              <div className="space-y-2">
                <input
                  type="text"
                  value={
                    user?.firstName ??
                    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
                  }
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

              <div className="flex justify-end">
                <NavLink
                  to="/map"
                  className="flex items-center gap-2 text-white transition-colors hover:text-white/80"
                >
                  <span className="text-lg font-bold italic">
                    На карту объектов
                  </span>
                  <img
                    src={ArrowBackIcon}
                    alt="Вперед"
                    className="h-6 w-6 rotate-180"
                  />
                </NavLink>
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
