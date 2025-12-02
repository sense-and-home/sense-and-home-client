import { getCourseById, getCourses } from "@/api/courseApi";
import CoursePageBackground from "@/assets/img/course-page-background.webp";
import { CourseCard } from "@/components/CourseCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import {
  HeartIcon,
  MoveLeftIcon,
  MoveRightIcon,
  SparkleIcon,
} from "lucide-react";
import { useCallback, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router";

export function CoursePage() {
  const { id } = useParams();

  const location = useLocation();
  const courseState = location.state;

  const { isLoading, data: course } = useQuery({
    queryKey: [`course-${id}`],
    queryFn: async () => {
      const response = await getCourseById(id as string);
      return response.course;
    },
    enabled: !courseState,
    initialData: courseState ?? undefined,
  });

  const { data: recommendedCourses } = useQuery({
    queryKey: ["recommendedCourses"],
    queryFn: () => getCourses({ sort: "popular", pageSize: 7 }),
  });

  const [isFavorite, setIsFavorite] = useState(course?.isFavorite ?? false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    dragFree: true,
  });

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
        className="text-surface-1-foreground grid grid-cols-1 gap-8 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${CoursePageBackground})`,
        }}
      >
        <div className="col-span-1 flex flex-col justify-between sm:col-span-2 lg:col-span-3">
          <div>
            <h1 className="course-page-title mb-4 text-3xl font-bold">
              {course.title}
            </h1>
            <p className="course-page-description mb-4">{course.description}</p>
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

      <div className="flex flex-col items-center justify-between gap-8 px-6 md:flex-row lg:px-24">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Чему вы научитесь?</h2>

          <ul className="space-y-2 font-medium">
            <li className="inline-flex items-start gap-2">
              <SparkleIcon fill="text-surface-1-foreground" size={48} />
              <span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam illo earum maxime perspiciatis aut rei quia
                consequatur impedit. Laborum quos quod magnam esse! Deserunt
                facilis quisquam amet totam.
              </span>
            </li>
            <li className="inline-flex items-start gap-2">
              <SparkleIcon fill="text-surface-1-foreground" size={48} />
              <span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam illo earum maxime perspiciatis aut rei quia
                consequatur impedit. Laborum quos quod magnam esse! Deserunt
                facilis quisquam amet totam.
              </span>
            </li>
            <li className="inline-flex items-start gap-2">
              <SparkleIcon fill="text-surface-1-foreground" size={48} />
              <span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam illo earum maxime perspiciatis aut rei quia
                consequatur impedit. Laborum quos quod magnam esse! Deserunt
                facilis quisquam amet totam.
              </span>
            </li>
          </ul>
        </div>

        <div className="w-full flex-shrink-0 space-y-2 sm:space-y-3 md:w-fit">
          <Button
            tabIndex={-1}
            className="bg-action text-action-foreground w-full sm:text-xl"
          >
            <NavLink
              className="border-none outline-none"
              to="/my-learning"
              viewTransition
            >
              Начать обучение
            </NavLink>
          </Button>
          <Button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`${isFavorite ? "bg-action text-action-foreground hover:bg-action/85" : "border-action text-action hover:bg-action/15"} flex w-full items-center justify-center gap-4 border-2 transition-colors sm:text-lg`}
          >
            Пройду позже <HeartIcon className="fill-action-foreground" />
          </Button>
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
