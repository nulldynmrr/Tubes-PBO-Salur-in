import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/constants/api";

export const authService = {
  login: async (email, password) => {
    const res = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
      email,
      password,
    });
    return res.data;
  },

  loginAdmin: async (email, password) => {
    const res = await axios.post(`${API_BASE_URL}/auth/login/admin`, {
      email,
      password,
    });
    return res.data;
  },

  register: async (userData) => {
    const res = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`,
      userData
    );
    return res.data;
  },

  setAuthToken: (token) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  getAuthToken: () => {
    return localStorage.getItem("token");
  },

  clearAuth: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    delete axios.defaults.headers.common["Authorization"];
  },
};
