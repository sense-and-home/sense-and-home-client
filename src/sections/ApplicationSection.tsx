import ApplicationBackground from "@/assets/img/application-background.webp";

export function ApplicationSection() {
  return (
    <div className="bg-background px-8 py-8" id="application-section">
      <div
        className="rounded-secondary grid min-h-[500px] grid-cols-2 place-content-center gap-4 bg-cover bg-bottom px-8 py-8"
        style={{
          backgroundImage: `url(${ApplicationBackground})`,
        }}
      >
        <div className="text-xl">
          <h3 className="text-4xl font-extrabold">
            Свяжитесь с нами для старта работ или персональной консультации!
          </h3>

          <div className="mb-4 text-5xl leading-none font-extrabold">,,</div>

          <p>
            Sense&Home - проверенный партнер в инновациях и повышении конверии
            продаж среди застройщиков.
          </p>

          <p>
            Для Вашего удобства, оставить заявку Вы можете как и с запросом на
            бесплатную консультацию, так и с возможностью обсуждения уже
            конкретных деталей.
          </p>

          <button
            type="button"
            className="rounded-primary mt-10 inline-block bg-black px-10 py-3 text-xl font-bold text-white hover:cursor-pointer"
          >
            Запросить звонок
          </button>
        </div>

        <div>
          <form
            className="rounded-secondary flex h-full flex-col gap-2 bg-white/10 p-6 text-xl shadow-lg backdrop-blur-lg"
            action="#"
          >
            <div className="rounded-primary bg-black/20 text-xl font-bold">
              <button
                type="button"
                className="bg-accent/70 w-1/2 rounded-[inherit] px-10 py-3 hover:cursor-pointer"
              >
                Мне нужна консультация
              </button>

              <button
                type="button"
                className="w-1/2 rounded-[inherit] px-10 py-3 hover:cursor-pointer"
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

            <button
              type="submit"
              className="rounded-primary mt-16 bg-black px-8 py-3 font-bold text-white hover:cursor-pointer"
            >
              Оставить заявку
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
