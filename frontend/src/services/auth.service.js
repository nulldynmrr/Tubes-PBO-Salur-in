import { dataAdmin } from "@/data/admin";
import { dataCampaign } from "@/data/campaign";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AUTH_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  LOGIN_ADMIN: "/api/auth/admin/login",
  REGISTER: "/api/auth/register",
  LOGOUT: "/api/auth/logout",
  ME: "/api/auth/me",
};

export const authService = {
  login: async (email, password, role) => {
    try {
      const endpoint =
        role === "admin" ? AUTH_ENDPOINTS.LOGIN_ADMIN : AUTH_ENDPOINTS.LOGIN;
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
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
      console.log("Backend tidak tersedia, menggunakan data dummy");

      // Fallback ke data dummy
      if (role === "admin") {
        if (email === dataAdmin.email && password === dataAdmin.password) {
          const userData = {
            id: dataAdmin.id,
            name: dataAdmin.name,
            email: dataAdmin.email,
            role: "admin",
          };
          authService.setAuthToken("dummy_token");
          authService.setUser(userData);
          return { token: "dummy_token", user: userData };
        }
      } else {
        const user = dataCampaign.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          const userData = {
            id: user.id,
            name: user.nama,
            email: user.email,
            role: "campaign",
            organization: user.namaCampaign,
            phone: user.nomorTelepon,
            alamat: user.alamat,
            fotoKTP: user.fotoKTP,
            pengajuanDonasi: user.pengajuanDonasi || [],
          };
          console.log("Storing user data:", userData);
          authService.setAuthToken("dummy_token");
          authService.setUser(userData);
          return { token: "dummy_token", user: userData };
        }
      }
      throw new Error("Email atau password salah");
    }
  },

  register: async (userData, role) => {
    try {
      const res = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REGISTER}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

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
      console.log("Backend tidak tersedia, menggunakan data dummy");

      if (role === "campaign") {
        const existingUser = dataCampaign.find(
          (u) => u.email === userData.email
        );
        if (existingUser) {
          throw new Error("Email sudah terdaftar");
        }

        const newUser = {
          id: String(dataCampaign.length + 1),
          name: userData.name,
          email: userData.email,
          role: "campaign",
          organization: userData.organization,
          phone: userData.phone,
          alamat: userData.alamat,
          fotoKTP: userData.fotoKTP,
          pengajuanDonasi: [],
        };
        return newUser;
      }
      throw new Error("Registrasi tidak tersedia untuk role ini");
    }
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("withdrawalStatus");
    localStorage.clear();
    window.location.href = "/";
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
    console.log("Setting user data in localStorage:", user);
    if (user && typeof user === "object") {
      if (!user.pengajuanDonasi) {
        user.pengajuanDonasi = [];
      }
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      console.error("Invalid user data:", user);
    }
  },

  getUser: () => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        console.log("Retrieved user data from localStorage:", parsedUser);
        if (!parsedUser.pengajuanDonasi) {
          parsedUser.pengajuanDonasi = [];
        }
        return parsedUser;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
    return null;
  },

  getCurrentUser: async () => {
    try {
      const cachedUser = authService.getUser();
      if (cachedUser) {
        console.log("Using cached user data:", cachedUser);
        return cachedUser;
      }

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
      console.log("Backend tidak tersedia, menggunakan data dari localStorage");
      const user = authService.getUser();
      console.log("Retrieved user from localStorage:", user);
      return user;
    }
  },

  isAuthenticated: () => {
    return !!authService.getAuthToken();
  },
};
