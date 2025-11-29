import { CoursesHeader } from "@/components/CoursesHeader";
import { Outlet, ScrollRestoration } from "react-router";

export function CoursesLayout() {
  return (
    <div>
      <ScrollRestoration />
      <CoursesHeader />

      <Outlet />
    </div>
  );
}
