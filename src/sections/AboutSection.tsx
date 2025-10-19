import AboutBackground from "@/assets/img/about-background.webp";

export function AboutSection() {
  return (
    <div className="bg-white px-8 py-20 text-center text-black">
      <h2 className="heading leading-relaxed font-extrabold">О нас</h2>

      <p className="mb-10 text-2xl">
        Sense Home это инновационное VR\AR решение для увеличения конверсии
        продаж застройщикам и агенствам недвижимости. Мы позволяем ощутить
        пространственность жилья, “примерить” интерьер в режиме реального
        времени, почувствовать время суток\года для конечного потребителя. Мы
        предлагаем полный цикл разработки цифорвого решения для каждого объекта
        индивидуально с сопровождением в эксплуатации.
      </p>

      <div className="mb-10">
        <div
          className="rounded-primary mx-auto grid grid-cols-3 gap-8 bg-cover bg-center px-4 py-10"
          style={{ backgroundImage: `url(${AboutBackground})` }}
        >
          <div className="text-center">
            <div className="heading font-extrabold">1000+</div>
            <div className="text-xl">Индивидуальных решений</div>
          </div>

          <div className="text-center">
            <div className="heading font-extrabold">85%</div>
            <div className="text-xl">Успешного увеличения конверсии продаж</div>
          </div>

          <div className="text-center">
            <div className="heading font-extrabold">1</div>
            <div className="text-xl">На рынке в VR\AR</div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            className="rounded-primary bg-accent/50 inline-block px-10 py-3 text-xl font-bold"
            href="#"
          >
            Подробнее о технологии
          </a>
        </div>
      </div>
    </div>
  );
}
