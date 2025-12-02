import { logIn } from "@/api/authApi";
import { AuthContext } from "@/hooks/useAuth";
import { tokenStorage } from "@/services/tokenStorage";
import type { AuthContextType } from "@/types/auth";
import type { User } from "@/types/user";
import React, { useEffect, useState } from "react";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = tokenStorage.getUser();
    const accessToken = tokenStorage.getAccessToken();

    if (storedUser && accessToken) {
      setUser(storedUser);
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await logIn({ email, password });
    tokenStorage.setAccessToken(response.accessToken);

    const userData = tokenStorage.getUser();
    setUser(userData);
  };

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
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
