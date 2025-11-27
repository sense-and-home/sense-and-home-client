import { CoursesHeader } from "@/components/CoursesHeader";
import { Outlet } from "react-router";

export function CoursesLayout() {
  return (
    <div>
      <CoursesHeader />

      <Outlet />
    </div>
  );
}
