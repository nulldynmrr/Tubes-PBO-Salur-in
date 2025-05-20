import { API_BASE_URL, API_ENDPOINTS } from "@/lib/constants/api";

export const authService = {
  // Login
  async login(email, password) {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Register Campaign
  async registerCampaign(userData) {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER_CAMPAIGN}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Register Admin
  async registerAdmin(userData) {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER_ADMIN}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Set auth token
  setAuthToken(token) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `auth_token=${token}; expires=${expires.toUTCString()}; path=/`;
  },

  // Get auth token
  getAuthToken() {
    const cookies = document.cookie.split(";");
    const authCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("auth_token=")
    );
    return authCookie ? authCookie.split("=")[1] : null;
  },

  // Remove auth token
  removeAuthToken() {
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },
};
