import { getCourseById } from "@/api/courseApi";
import type { Course } from "@/types/course";
import { useQuery } from "@tanstack/react-query";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router";

export function LessonLayout() {
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const courseState = location.state;

  const { isLoading, data: course } = useQuery<Course>({
    queryKey: [`course-${id}`],
    queryFn: async () => {
      const response = await getCourseById(id as string);
      return response.course;
    },
    enabled: !courseState,
    initialData: (courseState as Course) ?? undefined,
  });

  if (isLoading) {
    return <div className="bg-surface-1 h-screen" />;
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="bg-surface-2-secondary flex items-center justify-between px-4 py-2 md:hidden">
        {/*
        <img src={course.imageUrl} alt="" className="h-8" />
        */}
        <button
          className="ml-auto hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon className="h-8 w-8" />
        </button>
      </div>

      <aside
        className={`bg-surface-2 md:bg-surface-2-secondary absolute top-0 left-0 z-50 flex h-full w-full transform flex-col space-y-3 px-4 py-4 sm:max-w-72 md:col-span-1 md:flex ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:static md:h-auto md:translate-x-0`}
      >
        <button
          className="absolute right-0 -mt-4 p-4 hover:cursor-pointer md:hidden"
          type="button"
          onClick={() => setIsOpen(false)}
        >
          <XIcon className="h-8 w-8" />
        </button>

        {/*
        <div className="max-h-[150px] w-full overflow-hidden rounded-lg">
          <img
            src={course.imageUrl}
            alt=""
            className="hidden h-full w-full object-cover object-center md:block"
          />
        </div>
        */}

        <NavLink
          to={`/courses/${course.id}`}
          className="pr-8 text-xl font-black hover:underline"
          viewTransition
        >
          {course.title}
        </NavLink>

        <ul className="w-full">
          {course?.steps?.map((step, i) => (
            <li className="text-lg font-bold" key={step.id}>
              <NavLink
                onClick={() => setIsOpen(!isOpen)}
                className={({ isActive }) =>
                  `${isActive ? "underline" : ""} block py-1 hover:underline`
                }
                to={`/courses/${course.id}/steps/${step.id}`}
              >
                {i + 1}. {step.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 w-full bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <main className="flex-1 px-2 py-4 sm:px-4">
        <Outlet />
      </main>
    </div>
  );
}
