import AboutBackground from "@/assets/img/about-background.webp";

export function AboutSection() {
  return (
    <div
      id="about-section"
      className="bg-white px-2 py-12 text-center text-black md:px-4 md:py-20 lg:px-8"
    >
      <h2 className="heading mb-6 text-3xl leading-relaxed font-extrabold md:mb-8 md:text-4xl lg:text-6xl">
        О нас
      </h2>

      <p className="mx-auto mb-8 max-w-4xl text-lg md:mb-10 md:text-xl lg:text-2xl">
        Sense Home это инновационное VR\AR решение для увеличения конверсии
        продаж застройщикам и агенствам недвижимости. Мы позволяем ощутить
        пространство жилья, "примерить" интерьер в режиме реального времени,
        почувствовать время суток\года для конечного потребителя. Мы предлагаем
        полный цикл разработки цифорвого решения для каждого объекта
        индивидуально с сопровождением в эксплуатации.
      </p>

      <div className="mb-8 md:mb-10">
        <div
          className="rounded-primary mx-auto grid grid-cols-1 gap-4 bg-cover bg-center px-4 py-8 md:grid-cols-3 md:gap-8 md:py-10"
          style={{ backgroundImage: `url(${AboutBackground})` }}
        >
          <div className="text-center">
            <div className="heading text-3xl font-extrabold md:text-4xl lg:text-6xl">
              1000+
            </div>
            <div className="text-lg md:text-xl">Индивидуальных решений</div>
          </div>

          <div className="text-center">
            <div className="heading text-3xl font-extrabold md:text-4xl lg:text-6xl">
              85%
            </div>
            <div className="text-lg md:text-xl">
              Успешного увеличения конверсии продаж
            </div>
          </div>

          <div className="text-center">
            <div className="heading text-3xl font-extrabold md:text-4xl lg:text-6xl">
              1
            </div>
            <div className="text-lg md:text-xl">На рынке в VR\AR</div>
          </div>
        </div>

        <div className="mt-6 text-center md:mt-8">
          <a
            className="rounded-primary bg-accent/50 inline-block px-6 py-3 text-lg font-bold md:px-10 md:text-xl"
            href="#technology-section"
          >
            Подробнее о технологии
          </a>
        </div>
      </div>
    </div>
  );
}
