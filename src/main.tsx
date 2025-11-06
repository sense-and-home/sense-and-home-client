import { AuthProvider } from "@/context/AuthContext";
import "@/index.css";
import { AppRouter } from "@/router/AppRouter";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>,
);
