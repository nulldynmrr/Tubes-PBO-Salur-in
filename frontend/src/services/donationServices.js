const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const DONATION_ENDPOINTS = {
  BASE: "/api/donaters/donations",
  MY: "/api/donaters/donations/my",
  DETAIL: (id) => `/api/donaters/donations/${id}`,
};

const getToken = () => localStorage.getItem("auth_token");

export const donationService = {
  donate: async (data) => {
    try {
      const res = await fetch(`${API_BASE_URL}${DONATION_ENDPOINTS.BASE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Gagal berdonasi");
      return result;
    } catch (error) {
      console.log("Backend tidak tersedia, menggunakan data dummy");
      throw error;
    }
  },

  getAll: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}${DONATION_ENDPOINTS.BASE}`);
      return await res.json();
    } catch (error) {
      console.log("Backend tidak tersedia, menggunakan data dummy");
      throw error;
    }
  },

  getMine: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}${DONATION_ENDPOINTS.MY}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return await res.json();
    } catch (error) {
      console.log("Backend tidak tersedia, menggunakan data dummy");
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}${DONATION_ENDPOINTS.DETAIL(id)}`
      );
      return await res.json();
    } catch (error) {
      console.log("Backend tidak tersedia, menggunakan data dummy");
      throw error;
    }
  },
};
