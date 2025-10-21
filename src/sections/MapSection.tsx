export function MapSection() {
  return (
    <div
      id="map-section"
      className="bg-background text-foreground px-4 py-8 md:px-8"
    >
      <div className="mb-6 max-w-full md:mb-4 lg:max-w-2/3">
        <h2 className="heading mb-4 text-2xl leading-tight md:text-3xl lg:text-4xl xl:text-6xl">
          Посетите офис и протестируйте VR тур на себе
        </h2>

        <p className="mb-6 text-lg md:mb-4 md:text-xl lg:text-2xl">
          Оставьте заявку с выбором "Я готов к 1 этапу" и после консультации
          получите приглашение на тестовый VR тур.
        </p>

        <a
          className="rounded-primary bg-accent-secondary inline-block px-6 py-3 text-lg font-bold text-black md:px-10 md:text-xl"
          href="#application-section"
        >
          Оставить заявку
        </a>
      </div>

      <div className="rounded-secondary w-full overflow-hidden">
        <div className="relative overflow-hidden">
          <iframe
            className="relative h-[300px] w-full md:h-[400px] lg:h-[440px]"
            src="https://yandex.ru/map-widget/v1/?ll=37.631452%2C55.743471&z=10"
            allowFullScreen
            title="Yandex map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
