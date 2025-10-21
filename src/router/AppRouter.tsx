import { Dashboard } from "@/pages/DashboardPage";
import { MainPage } from "@/pages/MainPage";
import { RegistrationPage } from "@/pages/RegistrationPage";
import { BrowserRouter, Route, Routes } from "react-router";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
