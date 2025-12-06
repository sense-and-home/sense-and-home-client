import { getCourses } from "@/api/courseApi";
import { CourseProgressCard } from "@/components/CourseProgressCard";
import { CourseProgressCardSkeleton } from "@/components/skeletons/CourseProgressCardSkeleton";
import { useQuery } from "@tanstack/react-query";

export function FavoriteCoursesPage() {
  const { isPending, data } = useQuery({
    queryKey: ["favorite-courses"],
    queryFn: () => getCourses({ onlyFavorites: true /* onlyEnrolled: true */ }),
  });

  const skeletons = Array.from({ length: 3 });

  return (
    <div>
      <h1 className="heading mb-4">Избранное</h1>

      <div className="space-y-8">
        {isPending ? (
          <div className="mt-8 grid grid-flow-row gap-4">
            {skeletons.map((_, i) => (
              <CourseProgressCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {data?.courses.items?.length ? (
              <div className="mt-8 grid grid-flow-row gap-4">
                {data.courses.items.map((course) => (
                  <CourseProgressCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="p-32 text-center text-2xl font-semibold">
                Ничего не найдено :(
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
