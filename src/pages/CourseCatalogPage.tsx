import { getCourses } from "@/api/courseApi";
import { CourseCard } from "@/components/CourseCard";
import { useQuery } from "@tanstack/react-query";

export function CourseCatalogPage() {
  const { isPending, data } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(),
  });

  return (
    <div className="mb-16 p-4">
      <h1 className="heading">Онлайн-курсы по VR\AR турам</h1>
      <p className="text-2xl font-medium">
        Обучайтесь работе с VR турами и клиентами вместе с Sense&Home!
      </p>

      {isPending ? (
        <div>Загрузка</div>
      ) : (
        <div className="mt-8 grid grid-flow-row gap-4 lg:grid-cols-2 lg:gap-8">
          {data?.items?.map((course) => (
            <CourseCard
              key={course.id}
              title="Как работает VR-тур в глазах клиента?"
              id={String(course.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
