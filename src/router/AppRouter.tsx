import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LandingPage } from "@/landing/LandingPage";
import { MainCoursesLayout } from "@/layouts/MainCoursesLayout";
import { MyLearningSidebarLayout } from "@/layouts/MyLearningSidebarLayout";
import { AuthPage } from "@/pages/AuthPage";
import { CompletedCoursesPage } from "@/pages/CompletedCoursesPage";
import { CourseCatalogPage } from "@/pages/CourseCatalogPage";
import { CoursePage } from "@/pages/CoursePage";
import { DashboardPage } from "@/pages/DashboardPage";
import { FavoriteCoursesPage } from "@/pages/FavoriteCoursesPage";
import { ManagerDashboardPage } from "@/pages/ManagerDashboardPage";
import { MapPage } from "@/pages/MapPage";
import { MyLearningPage } from "@/pages/MyLearningPage";
import { RequiredCoursesPage } from "@/pages/RequiredCoursesPage";
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
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainCoursesLayout />,
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
            element: <MyLearningSidebarLayout />,
            children: [
              {
                path: "/my-learning",
                element: <MyLearningPage />,
              },
              {
                path: "/my-learning/required-courses",
                element: <RequiredCoursesPage />,
              },
              {
                path: "/my-learning/favorite-courses",
                element: <FavoriteCoursesPage />,
              },
              {
                path: "/my-learning/completed-courses",
                element: <CompletedCoursesPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
