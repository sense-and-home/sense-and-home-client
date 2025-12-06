// AppRouter.tsx
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LessonLayout } from "@/layouts/LessonLayout";
import { MainCoursesLayout } from "@/layouts/MainCoursesLayout";
import { MyLearningSidebarLayout } from "@/layouts/MyLearningSidebarLayout";
import { AuthPage } from "@/pages/Auth/AuthPage";
import { CourseCatalogPage } from "@/pages/Courses/CourseCatalogPage";
import { CoursePage } from "@/pages/Courses/CoursePage";
import { DashboardPage } from "@/pages/Dashboards/DashboardPage";
import { ManagerDashboardPage } from "@/pages/Dashboards/ManagerDashboardPage";
import { MapPage } from "@/pages/Dashboards/MapPage";
import { LandingPage } from "@/pages/Landing/LandingPage";
import { LessonPage } from "@/pages/Lessons/LessonPage";
import { CompletedCoursesPage } from "@/pages/MyLearning/CompletedCoursesPage";
import { FavoriteCoursesPage } from "@/pages/MyLearning/FavoriteCoursesPage";
import { MyLearningPage } from "@/pages/MyLearning/MyLearningPage";
import { RequiredCoursesPage } from "@/pages/MyLearning/RequiredCoursesPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/auth", element: <AuthPage /> },
  { path: "/registration", element: <AuthPage /> },
  { path: "/login", element: <AuthPage /> },

  {
    element: <ProtectedRoute />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/map", element: <MapPage /> },

      {
        element: (
          <ProtectedRoute
            allowedRoles={["manager"]}
            redirectRoles={{ user: "/dashboard" }}
          />
        ),
        children: [
          { path: "/manager-dashboard", element: <ManagerDashboardPage /> },
        ],
      },

      {
        element: <MainCoursesLayout />,
        children: [
          { path: "/courses", element: <CourseCatalogPage /> },
          { path: "/courses/:id", element: <CoursePage /> },

          {
            element: <LessonLayout />,
            children: [
              { path: "/courses/:id/steps/:stepId", element: <LessonPage /> },
            ],
          },

          {
            element: <MyLearningSidebarLayout />,
            children: [
              { path: "/my-learning", element: <MyLearningPage /> },
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

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
