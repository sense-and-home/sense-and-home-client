import ApplicationBackground from "@/assets/img/application-background.webp";
import { useState } from "react";

type TMode = "consultation" | "ready";

export function ApplicationSection() {
  const [mode, setMode] = useState<TMode>("consultation");

  return (
    <div className="bg-background px-8 py-8" id="application-section">
      <div
        className="rounded-secondary grid min-h-[500px] grid-cols-2 place-content-center gap-4 bg-cover bg-bottom px-8 py-8"
        style={{
          backgroundImage: `url(${ApplicationBackground})`,
        }}
      >
        <div className="flex h-full flex-col justify-between text-xl">
          <div>
            <h3 className="text-4xl font-extrabold">
              Свяжитесь с нами для старта работ или персональной консультации!
            </h3>

            <div className="mb-4 text-5xl leading-none font-extrabold">,,</div>

            <p>
              Sense&Home — проверенный партнер в инновациях и повышении
              конверсии продаж среди застройщиков.
            </p>

            <p>
              Для вашего удобства оставить заявку вы можете как с запросом на
              бесплатную консультацию, так и с возможностью обсуждения уже
              конкретных деталей.
            </p>
          </div>

          <button
            type="button"
            className="rounded-primary mt-10 inline-block w-fit bg-black px-10 py-3 text-xl font-bold text-white hover:cursor-pointer"
          >
            Запросить звонок
          </button>
        </div>

        <div>
          <form
            className="rounded-secondary flex h-full flex-col gap-3 bg-white/10 p-6 text-xl backdrop-blur-2xl"
            action="#"
          >
            <div className="rounded-primary bg-black/20 p-[2px] text-xl font-bold">
              <button
                type="button"
                className={`${mode == "consultation" ? "bg-accent/70" : ""} w-1/2 rounded-[inherit] px-10 py-3 transition-colors hover:cursor-pointer`}
                onClick={() => setMode("consultation")}
              >
                Мне нужна консультация
              </button>

              <button
                type="button"
                className={`${mode == "ready" ? "bg-accent/70" : ""} w-1/2 rounded-[inherit] px-10 py-3 transition-colors hover:cursor-pointer`}
                onClick={() => setMode("ready")}
              >
                Я готов к 1 этапу
              </button>
            </div>

            <input
              className="bg-foreground rounded-primary inline-block min-w-md px-8 py-3 text-black"
              type="text"
              placeholder="Имя Фамилия"
            />

            <input
              className="bg-foreground rounded-primary inline-block min-w-md px-8 py-3 text-black"
              type="tel"
              placeholder="+7 (---) --- -- --"
            />

            <input
              className="bg-foreground rounded-primary inline-block min-w-md px-8 py-3 text-black"
              type="email"
              placeholder="----------@mail.ru"
            />

            <label
              htmlFor="customFileInput"
              className={`${mode === "consultation" ? "invisible opacity-0" : "opacity-100"} bg-foreground rounded-primary inline-flex min-w-md items-center justify-between px-8 py-3 text-black/50 transition-opacity hover:cursor-pointer`}
            >
              <span>Прикрепите информацию о проекте</span>

              <svg width="21" height="25" viewBox="0 0 23 27" fill="none">
                <path
                  d="M7.7002 5.6998L11.6002 1.7998M11.6002 1.7998L15.5002 5.6998M11.6002 1.7998V14.7998M5.10049 10.8998C3.88905 10.8998 3.28332 10.8998 2.80552 11.0977C2.16844 11.3616 1.66199 11.8681 1.39811 12.5051C1.2002 12.9829 1.2002 13.5884 1.2002 14.7998V21.0398C1.2002 22.4959 1.2002 23.2235 1.48358 23.7797C1.73285 24.2689 2.13031 24.6674 2.61953 24.9167C3.17516 25.1998 3.90289 25.1998 5.35618 25.1998H17.8448C19.2981 25.1998 20.0248 25.1998 20.5804 24.9167C21.0697 24.6674 21.4678 24.2689 21.7171 23.7797C22.0002 23.224 22.0002 22.4971 22.0002 21.0438V14.7998C22.0002 13.5884 22.0001 12.9829 21.8021 12.5051C21.5383 11.8681 21.0322 11.3616 20.3952 11.0977C19.9174 10.8998 19.3116 10.8998 18.1002 10.8998"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>

            <input type="file" id="customFileInput" className="hidden" />

            <button
              type="submit"
              className="rounded-primary bg-black px-8 py-3 font-bold text-white hover:cursor-pointer"
            >
              Оставить заявку
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
