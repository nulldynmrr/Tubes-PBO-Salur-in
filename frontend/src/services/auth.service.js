const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AUTH_ENDPOINTS = {
  LOGIN: (role) => `/auth/login/${role}`,
  REGISTER: (role) => `/auth/register/${role}`,
  LOGOUT: "/auth/logout",
  ME: "/auth/me",
};

export const authService = {
  login: async (email, password, role) => {
    try {
      const res = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.LOGIN(role)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login gagal");
      }

      if (data.token) {
        authService.setAuthToken(data.token);
        authService.setUser(data.user);
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

<<<<<<< HEAD
  // ✅ Add this below the regular login
  loginAdmin: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login admin gagal");
    return res.json();
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("Registrasi gagal");
    return res.json();
=======
  register: async (userData, role) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}${AUTH_ENDPOINTS.REGISTER(role)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch (err) {
        throw new Error("Gagal membaca respon dari server.");
      }

      if (!res.ok) {
        throw new Error(data.message || data.error || "Registrasi gagal");
      }

      return data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("withdrawalStatus");
    localStorage.clear();
    // Redirect to home page
    window.location.href = "/";
>>>>>>> 44c46147c3a8b5b92e15f23789ee508033e2bbe2
  },

  setAuthToken: (token) => {
    localStorage.setItem("auth_token", token);
  },

  getAuthToken: () => {
    return localStorage.getItem("auth_token");
  },

  removeAuthToken: () => {
    localStorage.removeItem("auth_token");
  },

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getCurrentUser: async () => {
    try {
      // First try to get from localStorage
      const cachedUser = authService.getUser();
      if (cachedUser) {
        return cachedUser;
      }

      // If not in localStorage, try to fetch from API
      const token = authService.getAuthToken();
      if (!token) {
        return null;
      }

      const res = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.ME}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await res.json();
      authService.setUser(data);
      return data;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  },

  isAuthenticated: () => {
    return !!authService.getAuthToken();
  },
};
