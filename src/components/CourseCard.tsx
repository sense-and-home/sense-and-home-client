export function CourseCard() {
  return (
    <div className="rounded-secondary flex justify-between gap-4 p-4 shadow-[0_0_4px_rgba(0,0,0,0.25)]">
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Как работает VR-тур в глазах клиента?
          </h2>
          <p>Курс по работе с системой и интерфейсом</p>
        </div>

        <ul className="flex gap-2 text-nowrap">
          <li className="rounded-lg bg-red-300 px-2 py-1">VR\AR</li>
          <li className="rounded-lg bg-blue-200 px-2 py-1">Коммуникация</li>
          <li className="rounded-lg bg-green-200 px-2 py-1">
            Управление туром
          </li>
        </ul>
      </div>

      <div className="rounded-secondary max-w-64 overflow-hidden">
        <img src="https://placehold.co/300x300" alt="" />
      </div>
    </div>
  );
}
