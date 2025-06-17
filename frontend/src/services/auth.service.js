import { API_BASE_URL, API_ENDPOINTS } from "@/lib/constants/api";

export const authService = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login gagal");
    return res.json();
  },

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
  },

  setAuthToken: (token) => {
    document.cookie = `auth_token=${token}; path=/; Secure`;
  },

  getAuthToken: () => {
    const cookies = document.cookie.split(";");
    const authCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("auth_token=")
    );
    return authCookie ? authCookie.split("=")[1] : null;
  },
};
