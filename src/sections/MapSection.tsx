export function MapSection() {
  return (
    <div id="map-section" className="bg-background text-foreground px-8 py-8">
      <div className="mb-4 max-w-2/3">
        <h2 className="heading mb-4 leading-tight">
          Посетите наш офис и протестируйте VR тур на себе
        </h2>

        <p className="mb-4 text-2xl">
          Оставьте заявку с выбором “Я готов к 1 этапу” и после консультации
          получите приглашение на тестовый VR тур.
        </p>

        <a
          className="rounded-primary bg-accent-secondary inline-block px-10 py-3 text-xl font-bold text-black"
          href="#application-section"
        >
          Оставить заявку
        </a>
      </div>

      <div className="rounded-secondary w-full overflow-hidden">
        <div className="relative overflow-hidden">
          <iframe
            className="relative"
            src="https://yandex.ru/map-widget/v1/?ll=37.631452%2C55.743471&z=10"
            width="100%"
            height="440"
            allowFullScreen
            title="Yandex map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
