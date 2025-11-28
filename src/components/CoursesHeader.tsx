import { NavLink, useLocation } from "react-router";
import { CoursesSearchbar } from "./CoursesSearchBar";

export function CoursesHeader() {
  const location = useLocation();

  const hasSearchBar = location.pathname === "/courses";

  return (
    <header>
      <nav className="relative flex flex-col items-center py-4 sm:flex-row sm:items-start sm:p-4">
        <NavLink
          to="/"
          className="mr-6 font-[Abhaya_Libre] text-[36px] leading-none font-extrabold hover:underline lg:absolute"
        >
          S&H
        </NavLink>

        <div className="m-auto grid w-full grid-flow-row px-4 sm:w-10/12">
          <ul className="mt-3 flex flex-wrap justify-center gap-4 sm:justify-start">
            <li>
              <NavLink
                to="courses"
                className={({ isActive }) =>
                  `${isActive ? "font-bold" : "font-light"} hover:underline`
                }
                viewTransition
              >
                Каталог
              </NavLink>
            </li>

            <li>
              <NavLink
                to="studying"
                className={({ isActive }) =>
                  `${isActive ? "font-bold" : "font-light"} hover:underline`
                }
              >
                Моё обучение
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? "font-bold" : "font-light"} hover:underline`
                }
              >
                На главную
              </NavLink>
            </li>
          </ul>

          {hasSearchBar && (
            <div className="mt-4">
              <CoursesSearchbar />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
