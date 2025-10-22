import { tokenStorage } from "@/services/authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function Dashboard() {
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

  const handleLogout = () => {
    tokenStorage.clearTokens();
    navigate("/");
  };

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
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Личный кабинет</h1>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700"
          >
            Выйти
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Профиль</h2>
            <p className="text-muted-foreground">
              Управление личными данными и настройками аккаунта
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Бронирование</h2>
            <p className="text-muted-foreground">
              Просмотр и управление бронированиями офисных пространств
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Компания</h2>
            <p className="text-muted-foreground">
              Информация о вашей компании и коллегах
            </p>
          </div>
        </div>

        <div className="mt-8">
          <a href="/" className="text-blue-500 underline hover:text-blue-600">
            ← Вернуться на главную
          </a>
        </div>
      </div>
    </div>
  );
}
