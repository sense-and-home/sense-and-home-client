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

  // TODO handle stepId properly, assuming it's always returned from the backend
  const { isLoading, data: course } = useQuery<Course>({
    queryKey: [`course-${id}`],
    queryFn: async () => {
      const response = await getCourseById(id as string);
      return response.course;
    },
  });

  if (isLoading || !course || !course.steps || course.steps.length === 0) {
    return <div className="bg-surface-1 h-screen" />;
  }

  const currentStepId =
    stepId && stepId !== "undefined" ? stepId : course.steps[0].id;

  const currentStepIndex = course.steps.findIndex(
    (step) => step.id === currentStepId,
  );

  const safeStepIndex = currentStepIndex >= 0 ? currentStepIndex : 0;
  const currentStep = course.steps[safeStepIndex];
  const prevStep = course.steps[safeStepIndex - 1];
  const nextStep = course.steps[safeStepIndex + 1];

  // TODO create separate components
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

          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            {prevStep ? (
              <Button
                asChild
                className="border-action text-action hover:bg-action/15 border-2"
              >
                <NavLink
                  className="flex items-center justify-center gap-2"
                  to={`/courses/${course.id}/steps/${prevStep?.id}`}
                  viewTransition
                >
                  <ArrowLeftIcon />
                  <span>Предыдущий шаг</span>
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
                  className="flex items-center justify-center gap-2"
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

          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            {prevStep ? (
              <Button
                asChild
                className="border-action text-action hover:bg-action/15 border-2"
              >
                <NavLink
                  className="flex items-center justify-center gap-2"
                  to={`/courses/${course.id}/steps/${prevStep?.id}`}
                  viewTransition
                >
                  <ArrowLeftIcon />
                  <span>Предыдущий шаг</span>
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
                  className="flex items-center justify-center gap-2"
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

          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            {prevStep ? (
              <Button
                asChild
                className="border-action text-action hover:bg-action/15 border-2"
              >
                <NavLink
                  className="flex items-center justify-center gap-2"
                  to={`/courses/${course.id}/steps/${prevStep?.id}`}
                  viewTransition
                >
                  <ArrowLeftIcon />
                  <span>Предыдущий шаг</span>
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
                  className="flex items-center justify-center gap-2"
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
