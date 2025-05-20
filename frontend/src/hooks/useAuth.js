import { useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = authService.getAuthToken();
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      authService.setAuthToken(data.token);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.removeAuthToken();
    setIsAuthenticated(false);
    router.push("/login");
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};
