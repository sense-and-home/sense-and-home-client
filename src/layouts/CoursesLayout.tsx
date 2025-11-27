import { HeaderCourses } from "@/components/HeaderCourses";
import { Outlet } from "react-router";

export function CoursesLayout() {
  return (
    <div>
      <HeaderCourses />

      <Outlet />
    </div>
  );
}
