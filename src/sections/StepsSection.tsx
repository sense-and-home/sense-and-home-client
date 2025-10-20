import Showcase1 from "@/assets/img/showcase-1.webp";
import Showcase2 from "@/assets/img/showcase-2.webp";
import Showcase3 from "@/assets/img/showcase-3.webp";
import Showcase4 from "@/assets/img/showcase-4.webp";
import Showcase5 from "@/assets/img/showcase-5.webp";
import Showcase6 from "@/assets/img/showcase-6.webp";
import Showcase7 from "@/assets/img/showcase-7.webp";

export function StepsSection() {
  return (
    <div className="bg-background text-foreground flex flex-col gap-16 px-8 py-20">
      <h2 className="heading mb-12">Этапы работ</h2>

      <div className="flex items-center gap-4">
        <img
          className="rounded-secondary grow-0 basis-1/3"
          src={Showcase1}
          alt=""
        />

        <div className="relative">
          <div className="relative z-10 text-right">
            <h3 className="mb-6 text-4xl font-extrabold">
              Запрос исходных данных и их анализ
            </h3>

            <p className="text-2xl text-pretty">
              Получение от застройщика архитектурных планов, чертежей,
              спецификаций отделочных материалов, панорамных видов с этажа,
              данных по инженерным сетям (расположение розеток, несущих стен).
              Анализ на возможность реализации "примерки" (замена материалов,
              мебели) и интеграции в движок реального времени.
            </p>
          </div>

          <span className="text-accent-tertiary/30 absolute top-0 right-1/16 text-[300px] leading-[1] font-extrabold">
            1
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="relative z-10 text-left">
            <h3 className="mb-6 text-4xl font-extrabold">
              Согласование технического задания и подписание договора
            </h3>

            <p className="text-2xl text-pretty">
              Фиксация всех интерактивных функций VR-тура: список заменяемых
              материалов, каталог мебели, возможность смены времени суток,
              интеграция с CRM застройщика для вызова консультанта. Определение
              формата поставки: standalone-приложение, веб-сборка или версия для
              VR-очков.
            </p>
          </div>

          <span className="text-accent/30 absolute top-0 left-1/16 text-[300px] leading-[1] font-extrabold">
            2
          </span>
        </div>

        <img
          className="rounded-secondary grow-0 basis-1/3"
          src={Showcase2}
          alt=""
        />
      </div>

      <div className="flex items-center gap-4">
        <img
          className="rounded-secondary grow-0 basis-1/3"
          src={Showcase3}
          alt=""
        />

        <div className="relative">
          <div className="relative z-10 text-right">
            <h3 className="mb-6 text-4xl font-extrabold">
              Моделирование проекта
            </h3>

            <p className="text-2xl text-pretty">
              Создание точной 3D-модели квартиры и видов из окна на основе
              планов и данных LiDAR-сканирования. На этом этапе объект — это
              "цифровой двойник" с чистыми стенами, готовый к настройке
              интерактивности.
            </p>
          </div>

          <span className="text-accent-tertiary/30 absolute top-0 right-1/16 text-[300px] leading-[1] font-extrabold">
            3
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="relative z-10 text-left">
            <h3 className="mb-6 text-4xl font-extrabold">
              Визуализация проекта
            </h3>

            <p className="text-2xl text-pretty">
              Настройка в Unreal Engine 5 / Unity системы материалов, освещения
              Day/Night cycle и интерактивных элементов. Создание UI-интерфейса
              для пользователя, позволяющего менять отделку, мебель и время
              суток в реальном времени. Это не просто рендеры, а работающее
              приложение.
            </p>
          </div>

          <span className="text-accent/30 absolute top-0 left-1/16 text-[300px] leading-[1] font-extrabold">
            4
          </span>
        </div>

        <img
          className="rounded-secondary grow-0 basis-1/3"
          src={Showcase4}
          alt=""
        />
      </div>

      <div className="flex items-center gap-4">
        <img
          className="rounded-secondary grow-0 basis-1/3"
          src={Showcase5}
          alt=""
        />

        <div className="relative">
          <div className="relative z-10 text-right">
            <h3 className="mb-6 text-4xl font-extrabold">
              Согласование демо версии и правки
            </h3>

            <p className="text-2xl text-pretty">
              Передача застройщику билда приложения. Правки касаются не только
              визуала (оттенок дерева, цвет обоев), но и юзабилити, работы
              интерфейса, корректности подмены объектов и скорости работы.
            </p>
          </div>

          <span className="text-accent-tertiary/30 absolute top-0 right-1/16 text-[300px] leading-[1] font-extrabold">
            5
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="relative z-10 text-left">
            <h3 className="mb-6 text-4xl font-extrabold">
              Рендер и сборка проекта
            </h3>

            <p className="text-2xl text-pretty">
              Финальная оптимизация приложения для целевых платформ (VR-шлемы,
              компьютеры в офисе, веб-браузеры). Упаковка готового продукта,
              создание инструкций для менеджеров застройщика и, при
              необходимости, развертывание на его серверах или в облаке.
            </p>
          </div>

          <span className="text-accent/30 absolute top-0 left-1/16 text-[300px] leading-[1] font-extrabold">
            6
          </span>
        </div>

        <img
          className="rounded-secondary grow-0 basis-1/3"
          src={Showcase6}
          alt=""
        />
      </div>

      <div className="flex items-center gap-4">
        <img
          className="rounded-secondary grow-0 basis-1/3"
          src={Showcase7}
          alt=""
        />

        <div className="relative">
          <div className="relative z-10 text-right">
            <h3 className="text-4xl leading-loose font-extrabold">
              Сдача проекта
            </h3>

            <p className="text-2xl text-pretty">
              Обучение менеджеров застройщика работе с системой, передача всех
              исходников и прав на использование, подключение технической
              поддержки. Результат — полностью работающий "цифровой шоурум",
              интегрированный в продажи.
            </p>
          </div>

          <span className="text-accent-tertiary/30 absolute top-0 right-1/16 text-[300px] leading-[1] font-extrabold">
            7
          </span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a
          className="rounded-primary bg-accent inline-block px-10 py-3 text-xl font-bold text-black"
          href="#"
        >
          Оставить заявку
        </a>
      </div>
    </div>
  );
}
