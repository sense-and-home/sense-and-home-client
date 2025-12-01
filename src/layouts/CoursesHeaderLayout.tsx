import { CoursesHeader } from "@/components/CoursesHeader";
import { Outlet, ScrollRestoration } from "react-router";

export function CoursesHeaderLayout() {
  return (
    <div>
      <ScrollRestoration />
      <CoursesHeader />

      <Outlet />
    </div>
  );
}
