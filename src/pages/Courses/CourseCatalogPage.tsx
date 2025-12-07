import { getCourses } from "@/api/courseApi";
import { CourseCard } from "@/components/CourseCard";
import { CoursesSearchBar } from "@/components/CoursesSearchBar";
import { CourseCardSkeleton } from "@/components/skeletons/CourseCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function CourseCatalogPage() {
  const [search, setSearch] = useState("");

  const { isPending, data } = useQuery({
    queryKey: ["courses", search],
    queryFn: () => getCourses({ search }),
  });

  const skeletons = Array.from({ length: 4 });

  return (
    <div>
      <div className="m-auto px-2 sm:w-10/12 sm:px-4">
        <CoursesSearchBar value={search} onChange={setSearch} />
      </div>

      <div className="mb-16 p-4">
        <h1 className="heading">Онлайн-курсы по VR\AR турам</h1>
        <p className="text-2xl font-medium">
          Обучайтесь работе с VR турами и клиентами вместе с Sense&Home!
        </p>

        {isPending ? (
          <div className="mt-8 grid grid-flow-row gap-4 lg:grid-cols-2 lg:gap-8">
            {skeletons.map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {data?.courses.items?.length ? (
              <div className="mt-8 grid grid-flow-row gap-4 lg:grid-cols-2 lg:gap-8">
                {data.courses.items.map((course) => (
                  <CourseCard key={course.id} course={course} />
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
