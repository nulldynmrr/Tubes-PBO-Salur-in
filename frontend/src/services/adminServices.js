const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getToken = () => localStorage.getItem("auth_token");

export const ADMIN_ENDPOINTS = {
  GET_CAMPAIGNS: "/api/admin/campaigns",
  GET_USERS: "/api/admin/users",
  GET_CURRENT_ADMIN: "/api/admin/me",
  DELETE_USER: (id) => `/api/admin/${id}`,
};

export const adminService = {
  getAllCampaigns: async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}${ADMIN_ENDPOINTS.GET_CAMPAIGNS}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      if (!res.ok) throw new Error("Gagal ambil data campaign");
      return res.json();
    } catch (error) {
      console.log("Backend tidak tersedia, menggunakan data dummy");
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}${ADMIN_ENDPOINTS.GET_USERS}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Gagal ambil data user");
      return res.json();
    } catch (error) {
      console.log("Backend tidak tersedia, menggunakan data dummy");
      throw error;
    }
  },

  getCurrentAdmin: async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}${ADMIN_ENDPOINTS.GET_CURRENT_ADMIN}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      if (!res.ok) throw new Error("Gagal ambil data admin");
      return res.json();
    } catch (error) {
      console.log("Backend tidak tersedia, menggunakan data dummy");
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}${ADMIN_ENDPOINTS.DELETE_USER(id)}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      if (!res.ok) throw new Error("Gagal menghapus user");
    } catch (error) {
      console.log("Backend tidak tersedia, menggunakan data dummy");
      throw error;
    }
  },
};
