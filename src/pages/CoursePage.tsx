export function CoursePage() {
  return (
    <div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="course-page-title text-2xl font-semibold">
            Как работает VR-тур в глазах клиента?
          </h2>
          <p className="course-page-description">
            Курс по работе с системой и интерфейсом
          </p>
        </div>

        <ul className="course-page-badges flex gap-2 text-nowrap">
          <li className="rounded-lg bg-red-300 px-2 py-1">VR\AR</li>
          <li className="rounded-lg bg-blue-200 px-2 py-1">Коммуникация</li>
          <li className="rounded-lg bg-green-200 px-2 py-1">
            Управление туром
          </li>
        </ul>
      </div>

      <div className="rounded-secondary max-w-64 overflow-hidden">
        <img
          className="course-page-image"
          src="https://placehold.co/300x300"
          alt=""
        />
      </div>
    </div>
  );
}
