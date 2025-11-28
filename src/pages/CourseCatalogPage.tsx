import { CourseCard } from "@/components/CourseCard";
import { Footer } from "@/components/Footer";

export function CourseCatalogPage() {
  return (
    <div>
      <div className="mb-16 p-4">
        <h1 className="heading">Онлайн-курсы по VR\AR турам</h1>
        <p className="text-2xl font-medium">
          Обучайтесь работе с VR турами и клиентами вместе с Sense&Home!
        </p>

        <div className="mt-8 grid grid-flow-row gap-4 lg:grid-cols-2 lg:gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <CourseCard key={i} id={String(i)} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
