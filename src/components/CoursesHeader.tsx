import { NavLink, useLocation } from "react-router";
import { CoursesSearchbar } from "./CoursesSearchBar";

export function CoursesHeader() {
  const location = useLocation();

  const hasSearchBar = location.pathname === "/courses";

  return (
    <header>
      <nav className="p-4 align-bottom">
        <NavLink
          to="/"
          className="mr-6 font-[Abhaya_Libre] text-[36px] leading-none font-extrabold hover:underline"
        >
          S&H
        </NavLink>

        <div className="grid grid-flow-row">
          <ul className="flex gap-4">
            <li>
              <NavLink
                to="courses"
                className={({ isActive }) =>
                  `${isActive ? "font-bold" : "font-light"} hover:underline`
                }
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

          {hasSearchBar && <CoursesSearchbar />}
        </div>
      </nav>
    </header>
  );
}
