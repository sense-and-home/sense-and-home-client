import Showcase1 from "@/assets/img/showcase-1.webp";
import Showcase2 from "@/assets/img/showcase-2.webp";
import Showcase3 from "@/assets/img/showcase-3.webp";
import Showcase4 from "@/assets/img/showcase-4.webp";
import Showcase5 from "@/assets/img/showcase-5.webp";
import Showcase6 from "@/assets/img/showcase-6.webp";
import Showcase7 from "@/assets/img/showcase-7.webp";

export function StepsSection() {
  return (
    <div
      id="steps-section"
      className="bg-background text-foreground flex flex-col gap-8 px-2 py-12 md:gap-16 md:px-4 md:py-20 lg:px-8"
    >
      <h2 className="heading mb-8 text-3xl md:mb-12 md:text-4xl lg:text-6xl">
        Этапы работ
      </h2>

      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <img
          className="rounded-secondary h-auto w-full max-w-full object-cover lg:max-w-[45%]"
          src={Showcase1}
          alt=""
        />

        <div className="relative w-full lg:w-auto">
          <div className="relative z-10 text-center lg:text-right">
            <h3 className="mb-4 text-2xl font-extrabold md:mb-6 md:text-3xl lg:text-4xl">
              Запрос исходных данных и их анализ
            </h3>

            <p className="text-lg text-pretty md:text-xl lg:text-2xl">
              Получение от застройщика архитектурных планов, чертежей,
              спецификаци отделочных материалов, панорамных видов с этажа,
              данных по инженерным сетям (расположение розеток, несущих стен).
              Анализ на возможность реализации "примерки" (замена материалов,
              мебели) и интеграции в движок реального времени.
            </p>
          </div>

          <span className="text-accent-tertiary/30 absolute -top-4 right-0 text-[120px] leading-[1] font-extrabold md:text-[200px] lg:top-0 lg:right-1/16 lg:text-[300px]">
            1
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <div className="relative order-2 w-full lg:order-1 lg:w-auto">
          <div className="relative z-10 text-center lg:text-left">
            <h3 className="mb-4 text-2xl font-extrabold md:mb-6 md:text-3xl lg:text-4xl">
              Согласование технического задания и подписание договора
            </h3>

            <p className="text-lg text-pretty md:text-xl lg:text-2xl">
              Фиксация всех интерактивных функций VR-тура: список заменяемых
              материалов, каталог мебели, возможность смены времени суток,
              интеграция с CRM застройщика для вызова консультанта. Определение
              формата поставки: standalone-приложение, веб-сборка или версия для
              VR-очков.
            </p>
          </div>

          <span className="text-accent/30 absolute -top-4 left-0 text-[120px] leading-[1] font-extrabold md:text-[200px] lg:top-0 lg:left-1/16 lg:text-[300px]">
            2
          </span>
        </div>

        <img
          className="rounded-secondary order-1 h-auto w-full max-w-full object-cover lg:order-2 lg:max-w-[45%]"
          src={Showcase2}
          alt=""
        />
      </div>

      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <img
          className="rounded-secondary h-auto w-full max-w-full object-cover lg:max-w-[45%]"
          src={Showcase3}
          alt=""
        />

        <div className="relative w-full lg:w-auto">
          <div className="relative z-10 text-center lg:text-right">
            <h3 className="mb-4 text-2xl font-extrabold md:mb-6 md:text-3xl lg:text-4xl">
              Моделирование проекта
            </h3>

            <p className="text-lg text-pretty md:text-xl lg:text-2xl">
              Создание точной 3D-модели квартиры и видов из окна на основе
              планов и данных LiDAR-сканирования. На этом этапе объект — это
              "цифровой двойник" с чистыми стенами, готовый к настройке
              интерактивности.
            </p>
          </div>

          <span className="text-accent-tertiary/30 absolute -top-4 right-0 text-[120px] leading-[1] font-extrabold md:text-[200px] lg:top-0 lg:right-1/16 lg:text-[300px]">
            3
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <div className="relative order-2 w-full lg:order-1 lg:w-auto">
          <div className="relative z-10 text-center lg:text-left">
            <h3 className="mb-4 text-2xl font-extrabold md:mb-6 md:text-3xl lg:text-4xl">
              Визуализация проекта
            </h3>

            <p className="text-lg text-pretty md:text-xl lg:text-2xl">
              Настройка в Unreal Engine 5 / Unity системы материалов, освещения
              Day/Night cycle и интерактивных элементов. Создание UI-интерфейса
              для пользователя, позволяющего менять отделку, мебель и время
              суток в реальном времени. Это не просто рендеры, а работающее
              приложение.
            </p>
          </div>

          <span className="text-accent/30 absolute -top-4 left-0 text-[120px] leading-[1] font-extrabold md:text-[200px] lg:top-0 lg:left-1/16 lg:text-[300px]">
            4
          </span>
        </div>

        <img
          className="rounded-secondary order-1 h-auto w-full max-w-full object-cover lg:order-2 lg:max-w-[45%]"
          src={Showcase4}
          alt=""
        />
      </div>

      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <img
          className="rounded-secondary h-auto w-full max-w-full object-cover lg:max-w-[45%]"
          src={Showcase5}
          alt=""
        />

        <div className="relative w-full lg:w-auto">
          <div className="relative z-10 text-center lg:text-right">
            <h3 className="mb-4 text-2xl font-extrabold md:mb-6 md:text-3xl lg:text-4xl">
              Согласование демо версии и правки
            </h3>

            <p className="text-lg text-pretty md:text-xl lg:text-2xl">
              Передача застройщику сборки виртуального шоурума. Правки касаются
              не только визуальной части (оттенок дерева, цвет обоев), но и
              удобства использования, работы интерфейса, корректности подмены
              объектов и скорости работы.
            </p>
          </div>

          <span className="text-accent-tertiary/30 absolute -top-4 right-0 text-[120px] leading-[1] font-extrabold md:text-[200px] lg:top-0 lg:right-1/16 lg:text-[300px]">
            5
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <div className="relative order-2 w-full lg:order-1 lg:w-auto">
          <div className="relative z-10 text-center lg:text-left">
            <h3 className="mb-4 text-2xl font-extrabold md:mb-6 md:text-3xl lg:text-4xl">
              Рендер и сборка проекта
            </h3>

            <p className="text-lg text-pretty md:text-xl lg:text-2xl">
              Финальная оптимизация приложения для целевых платформ (VR-шлемы,
              компьютеры в офисе, веб-браузеры). Упаковка готового продукта,
              создание инструкций для менеджеров застройщика и, при
              необходимости, развертывание на его серверах или в облаке.
            </p>
          </div>

          <span className="text-accent/30 absolute -top-4 left-0 text-[120px] leading-[1] font-extrabold md:text-[200px] lg:top-0 lg:left-1/16 lg:text-[300px]">
            6
          </span>
        </div>

        <img
          className="rounded-secondary order-1 h-auto w-full max-w-full object-cover lg:order-2 lg:max-w-[45%]"
          src={Showcase6}
          alt=""
        />
      </div>

      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <img
          className="rounded-secondary h-auto w-full max-w-full object-cover lg:max-w-[45%]"
          src={Showcase7}
          alt=""
        />

        <div className="relative w-full lg:w-auto">
          <div className="relative z-10 text-center lg:text-right">
            <h3 className="mb-4 text-2xl font-extrabold md:mb-6 md:text-3xl lg:text-4xl">
              Сдача проекта
            </h3>

            <p className="text-lg text-pretty md:text-xl lg:text-2xl">
              Обучение менеджеров застройщика работе с системой, передача всех
              исходников и прав на использование, подключение технической
              поддержки. Результат — полностью работающий "цифровой шоурум",
              интегрированный в продажи.
            </p>
          </div>

          <span className="text-accent-tertiary/30 absolute -top-4 right-0 text-[120px] leading-[1] font-extrabold md:text-[200px] lg:top-0 lg:right-1/16 lg:text-[300px]">
            7
          </span>
        </div>
      </div>

      <div className="mt-6 text-center md:mt-8">
        <a
          className="rounded-primary bg-accent inline-block px-6 py-3 text-lg font-bold text-black md:px-10 md:text-xl"
          href="#application-section"
        >
          Оставить заявку
        </a>
      </div>
    </div>
  );
}
