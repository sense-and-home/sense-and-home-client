import { tokenStorage } from "@/services/tokenStorage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface AuthUser {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = tokenStorage.getUser();
    const accessToken = tokenStorage.getAccessToken();

    if (storedUser && accessToken) {
      setUser(storedUser);
    }

    setIsLoading(false);
  }, []);

  const logout = () => {
    tokenStorage.clearTokens();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
