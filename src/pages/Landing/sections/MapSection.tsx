import { MapFiller } from "@/components/fillers/MapFiller";

export function MapSection() {
  return (
    <div
      id="map-section"
      className="bg-surface-1 text-surface-1-foreground px-2 py-8 md:px-4 lg:px-8"
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
          className="rounded-primary bg-accent-2 inline-block px-6 py-3 text-lg font-bold text-black md:px-10 md:text-xl"
          href="#application-section"
        >
          Оставить заявку
        </a>
      </div>

      <div className="rounded-secondary h-[400px] w-full overflow-hidden lg:h-[500px]">
        <MapFiller />
      </div>
    </div>
  );
}
