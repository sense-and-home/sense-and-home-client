import MyLearningImage from "@/assets/img/my-learning.webp";
import { BookOpenIcon, HouseIcon, MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router";

export function MyLearningSidebarLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="bg-surface-2-secondary flex items-center justify-between px-4 py-2 md:hidden">
        <img src={MyLearningImage} alt="" className="h-8" />
        <button
          className="hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon className="h-8 w-8" />
        </button>
      </div>

      <aside
        className={`bg-surface-2 absolute top-0 left-0 z-50 flex h-full w-full transform flex-col space-y-3 px-4 py-8 sm:max-w-72 md:col-span-1 md:flex ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:static md:h-auto md:translate-x-0`}
      >
        <button
          className="absolute right-0 -mt-4 p-4 hover:cursor-pointer md:hidden"
          type="button"
          onClick={() => setIsOpen(false)}
        >
          <XIcon className="h-8 w-8" />
        </button>

        <img src={MyLearningImage} alt="" className="hidden md:block" />

        <NavLink
          className="text-action flex items-center gap-2 text-lg font-semibold hover:underline"
          to="/my-learning"
          onClick={() => setIsOpen(false)}
        >
          <HouseIcon strokeWidth={3} className="w-5" />
          <span>Моё обучение</span>
        </NavLink>

        <div className="grow">
          <div className="text-action mb-2 flex items-center gap-2 text-lg font-medium">
            <BookOpenIcon strokeWidth={2} className="w-5" />
            <span>Курсы</span>
          </div>

          <div className="ml-7 flex flex-col gap-1">
            {[
              { to: "/my-learning", label: "Прохожу" },
              { to: "/my-learning/required-courses", label: "Обязательные" },
              { to: "/my-learning/favorite-courses", label: "Избранное" },
              { to: "/my-learning/completed-courses", label: "Пройдено" },
            ].map((link) => (
              <NavLink
                key={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${isActive ? "font-medium" : "opacity-60"} py-1 transition-colors hover:underline hover:opacity-100`
                }
                to={link.to}
                end
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <a
            href="https://t.me/Sense_home_support"
            target="_blank"
            rel="noopener noreferrer"
          >
            Помощь
          </a>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 w-full bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
