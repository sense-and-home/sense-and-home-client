import Technology1 from "@/assets/img/tech-1.webp";
import Technology2 from "@/assets/img/tech-2.webp";
import Technology3 from "@/assets/img/tech-3.webp";

export function TechnologySection() {
  return (
    <div id="technology-section" className="px-8 py-8">
      <h2 className="heading mb-6">О технологии</h2>

      <div className="grid grid-cols-3 items-start gap-4">
        <div className="col-span-2 text-2xl font-bold">
          <p>
            Наша технология создает точную цифровую копию объекта на основе
            архитектурных чертежей и данных 3D-сканирования. В движке реального
            времени (Unreal Engine 5) мы разворачиваем интерактивную среду, где
            можно в режиме реального времени менять отделку, материалы и
            расстановку мебели, управлять освещением и временем суток, а также
            получать информацию о свойствах пространства через AR-подсказки.
          </p>

          <p>
            Каждый проект расзрабатывается индивидуально под каждый объект
            индивидуально с особенностями стройтельных условий и возможностей.
          </p>
        </div>

        <div className="col-span-1 grid grid-cols-2 place-items-end">
          <img src={Technology1} alt="" />
          <img src={Technology2} alt="" />
          <img className="col-span-2" src={Technology3} alt="" />
        </div>
      </div>
    </div>
  );
}
