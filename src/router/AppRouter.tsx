import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LandingPage } from "@/landing/LandingPage";
import { CoursesLayout } from "@/layouts/CoursesLayout";
import { AuthPage } from "@/pages/AuthPage";
import { CourseCatalogPage } from "@/pages/CourseCatalogPage";
import { CoursePage } from "@/pages/CoursePage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ManagerDashboardPage } from "@/pages/ManagerDashboardPage";
import { MapPage } from "@/pages/MapPage";
import { StudyingPage } from "@/pages/StudyingPage";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/registration",
    element: <AuthPage />,
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/manager-dashboard",
        element: <ManagerDashboardPage />,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
    ],
  },
  {
    element: <CoursesLayout />,
    children: [
      {
        path: "/courses",
        element: <CourseCatalogPage />,
      },
      {
        path: "/courses/:id",
        element: <CoursePage />,
      },
      {
        path: "/studying",
        element: <StudyingPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
