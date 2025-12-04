import { NavLink } from "react-router";

export function CoursesHeader() {
  return (
    <header>
      <nav className="relative flex flex-col items-center py-4 sm:flex-row sm:items-start sm:p-4">
        <NavLink
          to="/"
          className="mr-6 font-[Abhaya_Libre] text-[36px] leading-none font-extrabold hover:underline sm:absolute"
        >
          S&H
        </NavLink>

        <div className="m-auto px-4 sm:w-10/12">
          <ul className="mt-3 flex flex-wrap justify-center gap-4 sm:justify-center lg:justify-start">
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
                to="my-learning"
                className={({ isActive }) =>
                  `${isActive ? "font-bold" : "font-light"} hover:underline`
                }
                viewTransition
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
                viewTransition
              >
                На главную
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
