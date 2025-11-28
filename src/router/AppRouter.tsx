import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LandingPage } from "@/landing/LandingPage";
import { CoursesLayout } from "@/layouts/CoursesLayout";
import { AuthPage } from "@/pages/AuthPage";
import { CourseCatalogPage } from "@/pages/CourseCatalogPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ManagerDashboardPage } from "@/pages/ManagerDashboardPage";
import { MapPage } from "@/pages/MapPage";
import { StudyingPage } from "@/pages/StudyingPage";
import { BrowserRouter, Route, Routes } from "react-router";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/registration" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/manager-dashboard" element={<ManagerDashboardPage />} />
          <Route path="/map" element={<MapPage />} />
        </Route>

        {/* <Route element={<ProtectedRoute />}> */}
        <Route element={<CoursesLayout />}>
          <Route path="/courses" element={<CourseCatalogPage />} />
          <Route path="/studying" element={<StudyingPage />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
