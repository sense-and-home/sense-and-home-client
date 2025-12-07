import { Badge } from "@/components/ui/Badge";
import type { Course } from "@/types/course";
import { cn } from "@/utils";
import { NavLink } from "react-router";

interface CourseCardProps {
  course: Course;
  className?: string;
}

export function CourseCard({ course, className }: CourseCardProps) {
  return (
    <NavLink
      to={`/courses/${course.id}`}
      state={course}
      className={cn(
        "rounded-secondary flex flex-col gap-2 p-4 shadow-[0_0_4px_rgba(0,0,0,0.25)] sm:flex-row sm:place-items-start sm:gap-4",
        className,
      )}
      viewTransition
    >
      <div className="flex h-full flex-1 flex-col justify-between space-y-2">
        <div>
          <h2 className={`course-title text-2xl font-semibold`}>
            {course.title}
          </h2>
          <p className="course-description">{course.shortDescription}</p>
        </div>

        <ul className="course-badges flex flex-wrap gap-2 text-nowrap">
          {course.tags.map((tag) => (
            <Badge key={tag} text={tag} />
          ))}
        </ul>
      </div>

      <div className="rounded-secondary relative mt-2 h-48 min-h-24 w-full overflow-hidden sm:mt-0 sm:h-40 sm:w-40 sm:flex-shrink-0 md:h-48 md:w-48 lg:h-56 lg:w-56">
        <img
          className="course-image h-full w-full bg-gray-200 object-cover object-center"
          src={course.thumbnailUrl}
          alt=""
        />
      </div>
    </NavLink>
  );
}
