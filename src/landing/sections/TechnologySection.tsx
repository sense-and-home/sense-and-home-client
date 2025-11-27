import Technology1 from "@/assets/img/tech-1.webp";
import Technology2 from "@/assets/img/tech-2.webp";
import Technology3 from "@/assets/img/tech-3.webp";

export function TechnologySection() {
  return (
    <div id="technology-section" className="px-2 py-8 md:px-4 lg:px-8">
      <h2 className="heading mb-6 text-3xl md:text-4xl lg:text-6xl">
        О технологии
      </h2>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-4">
        <div className="space-y-4 text-lg font-bold md:text-xl lg:col-span-2 lg:text-2xl">
          <p>
            Наша технология создает точную цифровую копию объекта на основе
            архитектурных чертежей и данных 3D-сканирования. В движке реального
            времени (Unreal Engine 5) мы разворачиваем интерактивную среду, где
            можно в режиме реального времени менять отделку, материалы и
            расстановку мебели, управлять освещением и временем суток, а также
            получать информацию о свойствах пространства через AR-подсказки.
          </p>

          <p>
            Каждый проект разрабатывается индивидуально под каждый объект
            индивидуально с особенностями стройтельных условий и возможностей.
          </p>
        </div>

        <div className="grid grid-cols-2 place-items-end gap-2 lg:col-span-1 lg:grid-cols-2 lg:gap-4">
          <img src={Technology1} alt="" className="h-auto w-full" />
          <img src={Technology2} alt="" className="h-auto w-full" />
          <img className="col-span-2 w-full" src={Technology3} alt="" />
        </div>
      </div>
    </div>
  );
}
