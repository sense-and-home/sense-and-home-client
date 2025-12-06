import { useEffect, useRef } from "react";

const YANDEX_API_KEY = import.meta.env.VITE_YANDEX_MAPS_API_KEY;

const office = {
  office_id: 5,
  lat: "55.755800",
  lon: "37.617300",
  region: "Московская область",
  country: "Россия",
  description: "Офис",
  image: "https://i.ibb.co/DDzr8z9n/Rectangle-240654600.png",
};

interface MapComponentProps {
  className?: string;
}

export function MapFiller({ className = "" }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const ymapsScriptRef = useRef<HTMLScriptElement | null>(null);
  const mapInstanceRef = useRef<any>(null);

  function loadYMapsScript(): Promise<void> {
    if ((window as any).ymaps) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const hasApiKey = YANDEX_API_KEY ? `&apikey=${YANDEX_API_KEY}` : "";
      const src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU` + hasApiKey;
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
      ymapsScriptRef.current = script;
    });
  }

  useEffect(() => {
    let destroyed = false;

    async function init() {
      try {
        await loadYMapsScript();
        (window as any).ymaps.ready(() => {
          if (destroyed) return;
          const ymaps = (window as any).ymaps;

          const center = [parseFloat(office.lat), parseFloat(office.lon)];
          const map = new ymaps.Map(
            mapRef.current,
            {
              center,
              zoom: 9,
              controls: ["zoomControl"],
            },
            {
              suppressMapOpenBlock: true,
            },
          );
          mapInstanceRef.current = map;

          const balloonHtml = `
            <div class="max-w-xs p-4 shadow-lg bg-white">
              <div class="flex gap-3 items-start">
                <img src="${office.image}" alt="${office.description}" class="w-20 h-20 rounded-lg object-cover" />
                <div class="flex-1">
                  <div class="font-semibold text-base">${office.description}</div>
                  <div class="text-sm text-gray-500">${office.region}, ${office.country}</div>
                  <a class="inline-block mt-3 px-3 py-2 rounded-lg font-medium text-white bg-[#ef5d6b] hover:bg-[#ef5d6b]/85" href="https://yandex.ru/maps/?ll=${office.lon}%2C${office.lat}&z=17" target="_blank" rel="noreferrer">Открыть в Яндекс.Картах</a>
                </div>
              </div>
            </div>
          `;

          const svgIcon = `data:image/svg+xml;utf8,
<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 96 96'>
<path d='M48 88C47.0667 88 46.2667 87.7333 45.6 87.2C44.9333 86.6667 44.4333 85.9667 44.1 85.1C42.8333 81.3667 41.2333 77.8667 39.3 74.6C37.4333 71.3333 34.8 67.5 31.4 63.1C28 58.7 25.2333 54.5 23.1 50.5C21.0333 46.5 20 41.6667 20 36C20 28.2 22.7 21.6 28.1 16.2C33.5667 10.7333 40.2 8 48 8C55.8 8 62.4 10.7333 67.8 16.2C73.2667 21.6 76 28.2 76 36C76 42.0667 74.8333 47.1333 72.5 51.2C70.2333 55.2 67.6 59.1667 64.6 63.1C61 67.9 58.2667 71.9 56.4 75.1C54.6 78.2333 53.1 81.5667 51.9 85.1C51.5667 86.0333 51.0333 86.7667 50.3 87.3C49.6333 87.7667 48.8667 88 48 88ZM48 46C50.8 46 53.1667 45.0333 55.1 43.1C57.0333 41.1667 58 38.8 58 36C58 33.2 57.0333 30.8333 55.1 28.9C53.1667 26.9667 50.8 26 48 26C45.2 26 42.8333 26.9667 40.9 28.9C38.9667 30.8333 38 33.2 38 36C38 38.8 38.9667 41.1667 40.9 43.1C42.8333 45.0333 45.2 46 48 46Z'
fill='%23E1150B'/>
</svg>`;

          const placemark = new ymaps.Placemark(
            center,
            {
              hintContent: office.description,
            },
            {
              iconLayout: "default#image",
              iconImageHref: svgIcon,
              iconImageSize: [48, 48],
              iconImageOffset: [-24, -48],
            },
          );

          placemark.events.add("click", function () {
            map.balloon.close();
            map.balloon.open(
              center,
              {
                contentBody: balloonHtml,
              },
              {
                closeButton: true,
                autoPan: true,
                maxWidth: 320,
                offset: [0, -20],
              },
            );
          });

          map.geoObjects.add(placemark);

          map.balloon.open(
            center,
            { contentBody: balloonHtml },
            {
              closeButton: true,
              autoPan: true,
              maxWidth: 320,
              offset: [0, -20],
            },
          );
        });
      } catch (err) {
        console.error("Не удалось загрузить Yandex.Maps API:", err);
      }
    }

    init();

    return () => {
      destroyed = true;
      try {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.destroy();
          mapInstanceRef.current = null;
        }
      } catch (e) {
        console.error(e);
      }
    };
  }, []);

  return (
    <div
      className={`${className} rounded-secondary h-full w-full overflow-hidden`}
    >
      <div className="relative h-full overflow-hidden">
        <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}
