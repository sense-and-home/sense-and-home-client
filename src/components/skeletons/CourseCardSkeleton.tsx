export function CourseCardSkeleton() {
  return (
    <div className="rounded-secondary flex animate-pulse flex-col gap-2 p-4 shadow-[0_0_4px_rgba(0,0,0,0.25)] sm:flex-row sm:items-start sm:gap-4">
      <div className="flex flex-1 flex-col justify-between space-y-2">
        <div>
          <div className="mb-2 h-6 w-3/4 rounded bg-gray-300" />
          <div className="mb-1 h-4 w-full max-w-[400px] rounded bg-gray-200" />
          <div className="h-4 w-full max-w-[350px] rounded bg-gray-200" />
        </div>

        <ul className="flex flex-wrap gap-2">
          <li className="h-5 w-16 rounded bg-gray-300" />
          <li className="h-5 w-12 rounded bg-gray-300" />
          <li className="h-5 w-20 rounded bg-gray-300" />
        </ul>
      </div>

      <div className="rounded-secondary mt-2 h-full max-h-48 w-full flex-shrink-0 overflow-hidden bg-gray-200 sm:mt-0 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56" />
    </div>
  );
}
