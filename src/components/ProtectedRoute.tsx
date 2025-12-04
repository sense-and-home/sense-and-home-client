import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles?: string[];
  redirectRoles?: Record<string, string>;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  redirectRoles,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="bg-surface-1 h-screen" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && redirectRoles && redirectRoles[user.role]) {
    return <Navigate to={redirectRoles[user.role]} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}
