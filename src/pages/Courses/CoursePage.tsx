import {
  addCourseToFavorites,
  getCourseById,
  getCourses,
  removeCourseFromFavorites,
} from "@/api/courseApi";
import CoursePageBackground from "@/assets/img/course-page-background.webp";
import { CourseCard } from "@/components/CourseCard";
import { ClockIcon } from "@/components/icons/ClockIcon";
import { LevelIcon } from "@/components/icons/LevelIcon";
import { MagnifyingGlassIcon } from "@/components/icons/MagnifyingGlassIcon";
import { StarIcon } from "@/components/icons/StarIcon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { queryClient } from "@/main";
import type { Course } from "@/types/course";
import { useMutation, useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { HeartIcon, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { useCallback } from "react";
import { NavLink, useLocation, useParams } from "react-router";

export function CoursePage() {
  const { id } = useParams();

  const location = useLocation();
  const courseState = location.state;

  const { isLoading, data: course } = useQuery<Course>({
    queryKey: [`course-${id}`],
    queryFn: async () => {
      const response = await getCourseById(id as string);
      return response.course;
    },
    initialData: (courseState as Course) ?? undefined,
  });

  const { data: recommendedCourses } = useQuery({
    queryKey: ["recommendedCourses"],
    queryFn: () => getCourses({ sort: "popular", pageSize: 7 }),
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    dragFree: true,
  });

  const { mutate: addFavoriteMutate, isPending: addFavoriteIsLoading } =
    useMutation({
      mutationFn: (payload: { courseId: string }) =>
        addCourseToFavorites(payload),

      onSuccess: () => {
        queryClient.setQueryData<Course>([`course-${id}`], (old) =>
          old ? { ...old, isFavorite: true } : old,
        );
      },
    });

  const { mutate: removeFavoriteMutate, isPending: removeFavoriteIsLoading } =
    useMutation({
      mutationFn: (payload: { courseId: string }) =>
        removeCourseFromFavorites(payload),

      onSuccess: () => {
        queryClient.setQueryData<Course>([`course-${id}`], (old) =>
          old ? { ...old, isFavorite: false } : old,
        );
      },
    });

  const toggleFavorite = () => {
    if (!course) return;

    const payload = { courseId: course.id };

    if (course.isFavorite) {
      removeFavoriteMutate(payload);
    } else {
      addFavoriteMutate(payload);
    }
  };

  const isMutating = addFavoriteIsLoading || removeFavoriteIsLoading;

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="mb-16 space-y-16">
      <div
        className="text-surface-1-foreground grid grid-cols-1 gap-8 bg-cover px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${CoursePageBackground})`,
        }}
      >
        <div className="col-span-1 flex flex-col justify-between sm:col-span-2 lg:col-span-3">
          <div>
            <h1 className="course-page-title mb-4 text-3xl font-bold">
              {course.title}
            </h1>
            <p className="course-page-description mb-4">{course.description}</p>
          </div>

          <div className="mb-4 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <LevelIcon
                size={24}
                className="text-surface-1-foreground"
                strokeWidth={3}
              />
              <span className="font-bold">Начальный уровень</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon
                size={24}
                className="text-surface-1-foreground"
                strokeWidth={3}
              />
              <span className="font-bold">5 часов</span>
            </div>
            <div className="flex items-center gap-2">
              <MagnifyingGlassIcon
                size={24}
                className="text-surface-1-foreground"
                strokeWidth={4}
              />
              <span className="font-bold">Обязательно</span>
            </div>
          </div>

          <ul className="course-page-badges flex flex-wrap gap-2 text-nowrap">
            {course.tags.map((tag: string) => (
              <Badge tone="dark" key={tag} text={tag} />
            ))}
          </ul>
        </div>
        <div className="rounded-secondary col-span-1 flex max-h-64 w-full items-center justify-center overflow-hidden">
          <img
            className="course-page-image h-full w-full object-cover object-center"
            src={course.imageUrl}
            alt=""
          />
        </div>
      </div>

      <div className="flex gap-8 px-6 lg:px-24">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Чему вы научитесь?</h2>

          <div className="flex flex-col items-start gap-8 md:flex-row">
            <ul className="space-y-2 font-medium">
              <li className="inline-flex items-center gap-3">
                <StarIcon size={32} className="shrink-0" />
                <span>
                  Как быстро ориентироваться в VR‑туре, переключать планировки,
                  этажи, виды и сценарии показа под разные типы клиентов.
                </span>
              </li>
              <li className="inline-flex items-center gap-3">
                <StarIcon size={32} className="shrink-0" />
                <span>
                  Как презентовать квартиру в VR так, чтобы снять ключевые
                  возражения: площадь, планировка, вид из окон, расстановка
                  мебели.
                </span>
              </li>
              <li className="inline-flex items-center gap-3">
                <StarIcon size={32} className="shrink-0" />
                <span>
                  Как объяснять ценность VR руководству и клиенту: какие метрики
                  смотреть, как аргументировать рост конверсии и экономию
                  времени.
                </span>
              </li>
            </ul>

            <div className="mt-0 w-full flex-shrink-0 space-y-2 sm:space-y-3 md:w-fit">
              <Button
                asChild
                className="bg-action text-action-foreground hover:bg-action/85 w-full text-center transition-colors sm:text-xl"
              >
                <NavLink
                  className="block"
                  to={`/courses/${course.id}/steps/${course?.lastStepId || course?.steps?.[0]?.id}`}
                  state={course}
                  viewTransition
                  prefetch="render"
                >
                  Начать обучение
                </NavLink>
              </Button>

              <Button
                onClick={toggleFavorite}
                disabled={isMutating}
                className={`${
                  course.isFavorite
                    ? "bg-action text-action-foreground hover:bg-action/85 hover:border-action/85"
                    : "text-action hover:bg-action/15"
                } border-action flex w-full items-center justify-center gap-4 border-2 transition-colors sm:text-lg`}
              >
                {course.isFavorite ? "В избранном" : "Пройду позже"}
                <HeartIcon className="fill-action-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-8">
        <h2 className="px-6 text-3xl font-bold lg:px-24">Похожие курсы</h2>

        <div className="overflow-hidden select-none" ref={emblaRef}>
          <div className="mr-6 flex items-stretch gap-4 px-6 py-2 sm:mr-24 sm:gap-8 lg:px-24">
            {recommendedCourses?.courses.items.map((course) => {
              if (course.id === id) return;

              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  className="xs:basis-3/4 flex-shrink-0 basis-full xl:basis-3/7"
                />
              );
            })}
          </div>
        </div>

        <div className="flex justify-between px-4 sm:justify-start lg:px-20">
          <button
            className="p-2 hover:cursor-pointer"
            type="button"
            onClick={scrollPrev}
          >
            <MoveLeftIcon size={48} />
          </button>
          <button
            className="p-2 hover:cursor-pointer"
            type="button"
            onClick={scrollNext}
          >
            <MoveRightIcon size={48} />
          </button>
        </div>
      </div>
    </div>
  );
}
