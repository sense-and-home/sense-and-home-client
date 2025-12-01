import CoursePageBackground from "@/assets/img/course-page-background.webp";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/Button";
import useEmblaCarousel from "embla-carousel-react";
import {
  HeartIcon,
  MoveLeftIcon,
  MoveRightIcon,
  SparkleIcon,
} from "lucide-react";
import { useCallback } from "react";
import { NavLink } from "react-router";

const titles = [
  "Похожий курс",
  "Ну очень похожий курс",
  "Курс с ооооочень длинным названием",
  "Похожий курс 2",
  "Ну очень похожий курс 2",
  "Курс о курсах",
];

export function CoursePage() {
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
              Как работает VR-тур в глазах клиента?
            </h1>
            <p className="course-page-description mb-4">
              Курс по работе с системой и интерфейсом Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Aliquid quo dignissimos quis
              quisquam expedita vero nam, laboriosam sit labore quae possimus
              accusamus, sapiente minus eaque quos in! Eveniet, quasi
              consequatur.
            </p>
          </div>

          <ul className="course-page-badges flex flex-wrap gap-2 text-nowrap">
            <li className="rounded-lg bg-red-700/50 px-2 py-1">VR\AR</li>
            <li className="rounded-lg bg-blue-700/50 px-2 py-1">
              Коммуникация
            </li>
            <li className="rounded-lg bg-green-700/50 px-2 py-1">
              Управление туром
            </li>
          </ul>
        </div>

        <div className="rounded-secondary col-span-1 flex max-h-64 w-full items-center justify-center overflow-hidden">
          <img
            className="course-page-image h-full w-full object-cover object-center"
            src="https://placehold.co/300x300"
            alt=""
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 px-6 md:flex-row lg:px-24">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Чему вы научитесь?</h2>

          <ul className="space-y-2 font-medium">
            <li className="flex gap-1">
              <SparkleIcon fill="text-surface-1-foreground" /> Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Laboriosam illo earum
              maxime perspiciatis aut rerum labore modi quia consequatur
              impedit. Laborum quos quod magnam esse! Deserunt facilis quisquam
              amet totam.
            </li>
            <li className="flex gap-1">
              <SparkleIcon fill="text-surface-1-foreground" /> Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Laboriosam illo earum
              maxime perspiciatis aut rerum labore modi quia consequatur
              impedit. Laborum quos quod magnam esse! Deserunt facilis quisquam
              amet totam.
            </li>
            <li className="flex gap-1">
              <SparkleIcon fill="text-surface-1-foreground" /> Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Laboriosam illo earum
              maxime perspiciatis aut rerum labore modi quia consequatur
              impedit. Laborum quos quod magnam esse! Deserunt facilis quisquam
              amet totam.
            </li>
          </ul>
        </div>

        <div className="w-full flex-shrink-0 space-y-2 sm:space-y-3 md:w-fit">
          <Button className="bg-action text-action-foreground w-full sm:text-xl">
            <NavLink
              className="border-none outline-none"
              to="/my-learning"
              viewTransition
            >
              Начать обучение
            </NavLink>
          </Button>
          <Button className="border-action text-action flex w-full items-center justify-center gap-4 border-2 sm:text-lg">
            Пройду позже <HeartIcon />
          </Button>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-8">
        <h2 className="px-6 text-3xl font-bold lg:px-24">Похожие курсы</h2>

        <div className="overflow-hidden select-none" ref={emblaRef}>
          <div className="mr-6 flex items-stretch gap-4 px-6 py-2 sm:mr-24 sm:gap-8 lg:px-24">
            {titles.map((title) => (
              <CourseCard
                className="xs:basis-3/4 flex-shrink-0 basis-full xl:basis-3/7"
                key={title}
                title={title}
                id={title}
              />
            ))}
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
