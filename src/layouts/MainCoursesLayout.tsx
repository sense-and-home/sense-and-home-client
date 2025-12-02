import { CoursesHeader } from "@/components/CoursesHeader";
import { Footer } from "@/components/Footer";
import { Outlet, ScrollRestoration } from "react-router";

export function MainCoursesLayout() {
  return (
    <div>
      <ScrollRestoration />
      <CoursesHeader />

      <Outlet />

      <Footer />
    </div>
  );
}
