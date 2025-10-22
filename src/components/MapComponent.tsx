interface MapComponentProps {
  className?: string;
}

export function MapComponent({ className }: MapComponentProps) {
  return (
    <div
      className={`${className} rounded-secondary h-full w-full overflow-hidden`}
    >
      <div className="relative h-full overflow-hidden">
        <iframe
          className="relative h-full w-full"
          src="https://yandex.ru/map-widget/v1/?ll=37.631452%2C55.743471&z=10"
          allowFullScreen
          title="Yandex map"
        ></iframe>
      </div>
    </div>
  );
}
