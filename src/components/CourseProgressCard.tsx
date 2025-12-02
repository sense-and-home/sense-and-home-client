import { Button } from "@/components/ui/Button";
import type { Course } from "@/types/course";
import { cn } from "@/utils";
import { NavLink } from "react-router";

interface CourseProgressCardProps {
  course: Course;
  className?: string;
}

export function CourseProgressCard({
  course,
  className,
}: CourseProgressCardProps) {
  return (
    <NavLink
      to={`/courses/${course.id}`}
      className={cn(
        "block w-full space-y-4 rounded-lg px-2 py-4 text-center shadow-[0_0_4px_rgba(0,0,0,0.25)] sm:px-4",
        className,
      )}
      viewTransition
    >
      <div className="grid items-center gap-4 sm:grid-flow-col sm:justify-between">
        <h2 className="course-title mx-auto w-fit text-center text-xl font-semibold sm:text-3xl">
          {course.title}
        </h2>

        <div className="rounded-secondary h-full max-h-[200px] w-full overflow-hidden sm:max-h-[150px] sm:max-w-[200px]">
          <img
            className="course-image h-full w-full object-cover object-center"
            src={course.imageUrl}
            alt=""
          />
        </div>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-lg bg-gray-200">
        <div
          className="bg-action h-full rounded-lg transition-all duration-300"
          style={{ width: `${10}%` }}
        />
      </div>

      <div>
        <p>
          <span className="font-semibold">{course.progressPercent}%</span>{" "}
          материала пройдено
        </p>
        <p>
          <span className="font-semibold">???/100</span> баллов
        </p>
      </div>

      <Button className="bg-action/20 hover:bg-action/35 transition-colors">
        Продолжить
      </Button>
    </NavLink>
  );
}
