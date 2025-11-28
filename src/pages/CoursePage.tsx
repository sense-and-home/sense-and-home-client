import CoursePageBackground from "@/assets/img/course-page-background.webp";

export function CoursePage() {
  return (
    <div
      className="text-surface-1-foreground grid grid-cols-1 gap-8 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-24"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${CoursePageBackground})`,
      }}
    >
      <div className="col-span-1 flex flex-col justify-between sm:col-span-2 lg:col-span-3">
        <div>
          <h1 className="course-page-title mb-4 text-3xl font-bold">
            Как работает VR-тур в глазах клиента?
          </h1>
          <p className="course-page-description mb-4">
            Курс по работе с системой и интерфейсом Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Aliquid quo dignissimos quis quisquam
            expedita vero nam, laboriosam sit labore quae possimus accusamus,
            sapiente minus eaque quos in! Eveniet, quasi consequatur.
          </p>
        </div>

        <ul className="course-page-badges flex flex-wrap gap-2 text-nowrap">
          <li className="rounded-lg bg-red-700/50 px-2 py-1">VR\AR</li>
          <li className="rounded-lg bg-blue-700/50 px-2 py-1">Коммуникация</li>
          <li className="rounded-lg bg-green-700/50 px-2 py-1">
            Управление туром
          </li>
        </ul>
      </div>

      <div className="rounded-secondary col-span-1 flex max-h-64 w-full items-center justify-center overflow-hidden">
        <img
          className="course-page-image h-full w-full object-cover object-center"
          src="https://placehold.co/300x300"
          alt=""
        />
      </div>
    </div>
  );
}
