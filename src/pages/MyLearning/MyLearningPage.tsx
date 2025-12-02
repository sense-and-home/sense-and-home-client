import { getCourses } from "@/api/courseApi";
import { CourseProgressCard } from "@/components/CourseProgressCard";
import { useQuery } from "@tanstack/react-query";

export function MyLearningPage() {
  const { isPending, data } = useQuery({
    queryKey: ["my-courses"],
    queryFn: () => getCourses(/*{ onlyEnrolled: true }*/),
  });

  return (
    <div>
      <h1 className="heading mb-4">Моё обучение</h1>

      <div className="space-y-8">
        {isPending ? (
          <div className="p-32 text-center text-2xl font-semibold">
            Загрузка...
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
