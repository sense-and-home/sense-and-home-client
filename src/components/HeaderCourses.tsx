import { NavLink } from "react-router";

export function HeaderCourses() {
  return (
    <header>
      <nav className="flex items-end p-4 align-bottom">
        <NavLink
          to="/"
          className="mr-6 font-[Abhaya_Libre] text-[36px] leading-none font-extrabold hover:underline"
        >
          S&H
        </NavLink>

        <div>
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
        </div>
      </nav>
    </header>
  );
}
