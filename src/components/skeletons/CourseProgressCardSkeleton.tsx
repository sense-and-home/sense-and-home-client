export function CourseProgressCardSkeleton() {
  return (
    <div className="block w-full animate-pulse space-y-4 rounded-lg px-2 py-4 text-center shadow-[0_0_4px_rgba(0,0,0,0.25)] sm:px-4 sm:text-start">
      <div className="grid items-center gap-4 sm:grid-flow-col sm:justify-between">
        <div className="mx-auto h-6 w-40 rounded bg-gray-300 sm:mx-0 sm:h-8 sm:w-64" />
        <div className="rounded-secondary h-36 w-full overflow-hidden bg-gray-200 sm:h-32 sm:w-40" />
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-lg bg-gray-200">
        <div className="bg-action h-full w-1/2 rounded-lg" />
      </div>

      <div className="space-y-1">
        <div className="mx-auto h-4 w-24 rounded bg-gray-300 sm:mx-0" />
        <div className="mx-auto h-4 w-16 rounded bg-gray-300 sm:mx-0" />
      </div>

      <div className="mx-auto h-10 w-full max-w-[200px] rounded-lg bg-gray-300 sm:mx-0" />
    </div>
  );
}
