import { getCourseById } from "@/api/courseApi";
import { LessonFiller } from "@/components/fillers/LessonFiller";
import { Quiz3DTour } from "@/components/fillers/Quiz3dTour";
import { Button } from "@/components/ui/Button";
import type { Course } from "@/types/course";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { NavLink, useParams } from "react-router";

export function LessonPage() {
  const { id, stepId } = useParams();

  const { isLoading, data: course } = useQuery<Course>({
    queryKey: [`course-${id}`],
    queryFn: async () => {
      const response = await getCourseById(id as string);
      return response.course;
    },
  });

  if (isLoading || !course) {
    return <div className="bg-surface-1 h-screen" />;
  }

  const currentStepIndex = course.steps.findIndex((step) => step.id === stepId);
  const currentStep = course.steps[currentStepIndex ?? 0];

  const prevStep = course.steps[currentStepIndex - 1];
  const nextStep = course.steps[currentStepIndex + 1];

  switch (currentStep?.stepType) {
    case "video":
      return (
        <div className="space-y-4 lg:px-4">
          <div className="text-lg font-bold">
            {(currentStepIndex ?? 0) + 1}. {currentStep?.title}
          </div>

          <div className="aspect-video h-full max-h-[600px] w-full">
            <iframe
              className="h-full w-full rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/jwI2PHoT_xY?si=u0RNXS0pUIrXz-m1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <div>
            Когда мало просто 3D-визуализаций интерьера на помощь приходит
            3D-тур по вашей будущей квартире. Если вы задумались, хотите ли
            рассмотреть всю свою квартиру в подробностях, ощутить себя в ней и
            еще до окончания ремонта понять, какая она будет -- вам однозначно
            нужен 3Д-тур по всем комнатам. А мы же сейчас расскажем в
            подробностях, насколько это невероятно!
          </div>

          <div className="flex justify-between gap-2">
            {prevStep ? (
              <Button
                asChild
                className="border-action text-action hover:bg-action/15 border-2"
              >
                <NavLink
                  className="flex gap-2"
                  to={`/courses/${course.id}/steps/${prevStep?.id}`}
                  viewTransition
                >
                  <span>Предыдущий шаг</span>
                  <ArrowLeftIcon />
                </NavLink>
              </Button>
            ) : (
              <div></div>
            )}

            {nextStep ? (
              <Button
                asChild
                className="border-action text-action hover:bg-action/15 border-2"
              >
                <NavLink
                  className="flex gap-2"
                  to={`/courses/${course.id}/steps/${nextStep?.id}`}
                  viewTransition
                >
                  <span>Следующий шаг</span>
                  <ArrowRightIcon />
                </NavLink>
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      );
    case "text":
      return (
        <div className="space-y-4 lg:px-4">
          <div className="text-lg font-bold">{currentStep?.title}</div>

          <LessonFiller />

          <div className="flex justify-between gap-2">
            {prevStep ? (
              <Button
                asChild
                className="border-action text-action hover:bg-action/15 border-2"
              >
                <NavLink
                  className="flex gap-2"
                  to={`/courses/${course.id}/steps/${prevStep?.id}`}
                  viewTransition
                >
                  <span>Предыдущий шаг</span>
                  <ArrowLeftIcon />
                </NavLink>
              </Button>
            ) : (
              <div></div>
            )}

            {nextStep ? (
              <Button
                asChild
                className="border-action text-action hover:bg-action/15 border-2"
              >
                <NavLink
                  className="flex gap-2"
                  to={`/courses/${course.id}/steps/${nextStep?.id}`}
                  viewTransition
                >
                  <span>Следующий шаг</span>
                  <ArrowRightIcon />
                </NavLink>
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      );
    case "quiz":
      return (
        <div className="space-y-4 lg:px-4">
          <div className="text-lg font-bold">{currentStep?.title}</div>

          <Quiz3DTour />

          <div className="flex justify-between gap-2">
            {prevStep ? (
              <Button
                asChild
                className="border-action text-action hover:bg-action/15 border-2"
              >
                <NavLink
                  className="flex gap-2"
                  to={`/courses/${course.id}/steps/${prevStep?.id}`}
                  viewTransition
                >
                  <span>Предыдущий шаг</span>
                  <ArrowLeftIcon />
                </NavLink>
              </Button>
            ) : (
              <div></div>
            )}

            {nextStep ? (
              <Button
                asChild
                className="border-action text-action hover:bg-action/15 border-2"
              >
                <NavLink
                  className="flex gap-2"
                  to={`/courses/${course.id}/steps/${nextStep?.id}`}
                  viewTransition
                >
                  <span>Следующий шаг</span>
                  <ArrowRightIcon />
                </NavLink>
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      );
    default:
      return <div>Урок не найден :(</div>;
  }
}
