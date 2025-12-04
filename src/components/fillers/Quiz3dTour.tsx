import { Button } from "@/components/ui/Button";
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";

const quizQuestions = [
  {
    id: 1,
    question: "Что является главным преимуществом 3D-тура?",
    options: [
      "Статичные изображения интерьера",
      "Возможность свободно перемещаться по квартире",
      "Только просмотр мебели",
      "Случайные ракурсы комнат",
    ],
    correct: 1,
  },
  {
    id: 2,
    question: "Почему 3D-тур помогает избежать ошибок при ремонте?",
    options: [
      "Позволяет оценить взаимодействие элементов интерьера заранее",
      "Так как это просто красивый эффект",
      "Он заменяет работу дизайнера",
      "Помогает выбрать цвет обоев",
    ],
    correct: 0,
  },
  {
    id: 3,
    question: "Что 3D-тур передаёт лучше, чем обычные рендеры?",
    options: [
      "Цвет мебели",
      "Размер телевизора",
      "Реалистичное ощущение масштаба и атмосферы",
      "Только расположение света",
    ],
    correct: 2,
  },
];

export function Quiz3DTour({ onFinish }: { onFinish?: () => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    quizQuestions.map(() => null),
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const allAnswered = answers.every((a) => a !== null);

  const score = answers.reduce((acc, answer, i) => {
    return answer === quizQuestions[i].correct ? (acc as number) + 1 : acc;
  }, 0);

  function submitQuiz() {
    setIsSubmitted(true);
    if (onFinish) {
      onFinish();
    }
  }

  function selectAnswer(questionIndex: number, optionIndex: number) {
    if (isSubmitted) return;
    setAnswers((prev) => {
      const copy = [...prev];
      copy[questionIndex] = optionIndex;
      return copy;
    });
  }

  return (
    <div className="space-y-4">
      {quizQuestions.map((q, qi) => (
        <div key={q.id} className="space-y-2">
          <div className="text-lg font-semibold">{q.question}</div>

          <div>
            {q.options.map((opt, oi) => {
              const isChosen = answers[qi] === oi;
              const isCorrect = q.correct === oi;

              return (
                <div
                  key={oi}
                  onClick={() => selectAnswer(qi, oi)}
                  className="flex w-full cursor-pointer items-center gap-3 py-2"
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${
                      isSubmitted
                        ? isCorrect
                          ? "border-green-600"
                          : isChosen
                            ? "border-red-600"
                            : "border-action"
                        : isChosen
                          ? "border-orange-500"
                          : "border-action"
                    } `}
                  >
                    {(isChosen || (isSubmitted && isCorrect)) && (
                      <div
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          isSubmitted
                            ? isCorrect
                              ? "bg-green-600"
                              : isChosen
                                ? "bg-red-600"
                                : ""
                            : "bg-orange-500"
                        } `}
                      />
                    )}
                  </div>

                  <span className="flex-1">{opt}</span>

                  {isSubmitted && isCorrect && (
                    <CheckIcon className="text-green-600" />
                  )}
                  {isSubmitted && isChosen && !isCorrect && (
                    <XIcon className="text-red-600" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {!isSubmitted && (
        <Button
          disabled={!allAnswered}
          onClick={submitQuiz}
          className="border-action text-action hover:bg-action/15 w-full border-2 sm:w-fit"
        >
          Завершить тест
        </Button>
      )}

      {isSubmitted && (
        <div className="text-lg font-semibold">
          Ваш результат: {score} из {quizQuestions.length}
        </div>
      )}
    </div>
  );
}
