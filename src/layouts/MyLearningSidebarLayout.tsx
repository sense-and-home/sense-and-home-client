import MyLearningImage from "@/assets/img/my-learning.webp";
import { BookOpen, HouseIcon } from "lucide-react";
import { NavLink, Outlet } from "react-router";

export function MyLearningSidebarLayout() {
  return (
    <div className="grid grid-cols-5">
      <aside className="bg-surface-2-secondary col-span-1 h-full min-h-screen space-y-3 px-4 py-8">
        <img src={MyLearningImage} alt="" />

        <NavLink
          className="text-action flex items-center gap-2 text-lg font-semibold hover:underline"
          to="/my-learning"
        >
          <HouseIcon strokeWidth={3} className="w-5" />

          <span>Моё обучение</span>
        </NavLink>

        <div>
          <div className="text-action mb-2 flex items-center gap-2 text-lg font-medium">
            <BookOpen strokeWidth={2} className="w-5" />

            <span>Курсы</span>
          </div>

          <div className="ml-7 flex flex-col gap-1">
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "font-medium" : "opacity-60"} transition-colors hover:underline hover:opacity-100`
              }
              to="/current"
            >
              Прохожу
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `${isActive ? "font-medium" : "opacity-60"} transition-colors hover:underline hover:opacity-100`
              }
              to="/obligatory"
            >
              Обязательные
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `${isActive ? "font-medium" : "opacity-60"} transition-colors hover:underline hover:opacity-100`
              }
              to="/favorites"
            >
              Избранное
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `${isActive ? "font-medium" : "opacity-60"} transition-colors hover:underline hover:opacity-100`
              }
              to="/finished"
            >
              Пройдено
            </NavLink>
          </div>
        </div>
      </aside>

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
