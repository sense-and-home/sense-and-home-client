import { cn } from "@/utils";
import { NavLink } from "react-router";

interface CourseCardProps {
  title: string;
  id: string;
  className?: string;
}

export function CourseCard({ title, id, className }: CourseCardProps) {
  return (
    <NavLink
      to={`/courses/${id}`}
      className={cn(
        "rounded-secondary flex flex-col gap-2 p-4 shadow-[0_0_4px_rgba(0,0,0,0.25)] sm:flex-row sm:place-items-start sm:gap-4",
        className,
      )}
      viewTransition
    >
      <div className="flex h-full flex-1 flex-col justify-between space-y-2">
        <div>
          <h2 className="course-title text-2xl font-semibold">{title}</h2>
          <p className="course-description">
            Курс по работе с системой и интерфейсом
          </p>
        </div>

        <ul className="course-badges flex flex-wrap gap-2 text-nowrap">
          <li className="rounded-lg bg-red-300 px-2 py-1">VR\AR</li>
          <li className="rounded-lg bg-blue-200 px-2 py-1">Коммуникация</li>
          <li className="rounded-lg bg-green-200 px-2 py-1">
            Управление туром
          </li>
        </ul>
      </div>

      <div className="rounded-secondary mt-2 h-full max-h-48 w-full flex-shrink-0 overflow-hidden sm:mt-0 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56">
        <img
          className="course-image h-full w-full object-cover object-center"
          src="https://placehold.co/300x300"
          alt=""
        />
      </div>
    </NavLink>
  );
}
