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
        "block w-full space-y-4 rounded-lg p-4 shadow-[0_0_4px_rgba(0,0,0,0.25)]",
        className,
      )}
      viewTransition
    >
      <div className="grid grid-flow-col items-center justify-between gap-4">
        <h2 className="course-title w-fit text-3xl font-semibold">
          {course.title}
        </h2>

        <div className="rounded-secondary h-full max-h-[100px] w-full max-w-[150px] overflow-hidden">
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
