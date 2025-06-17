const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const CAMPAIGN_ENDPOINTS = {
  BASE: "/api/campaigners/campaigns",
  MY: "/api/campaigners/campaigns/my",
  DETAIL: (id) => `/api/campaigners/campaigns/${id}`,
};

const getToken = () => localStorage.getItem("auth_token");

export const campaignService = {
  create: async (data) => {
    const res = await fetch(`${API_BASE_URL}${CAMPAIGN_ENDPOINTS.BASE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Gagal membuat campaign");
    return result;
  },

  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}${CAMPAIGN_ENDPOINTS.BASE}`);
    return await res.json();
  },

  getMine: async () => {
    const res = await fetch(`${API_BASE_URL}${CAMPAIGN_ENDPOINTS.MY}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return await res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE_URL}${CAMPAIGN_ENDPOINTS.DETAIL(id)}`);
    return await res.json();
  },

  update: async (id, data) => {
    const res = await fetch(`${API_BASE_URL}${CAMPAIGN_ENDPOINTS.DETAIL(id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  remove: async (id) => {
    const res = await fetch(`${API_BASE_URL}${CAMPAIGN_ENDPOINTS.DETAIL(id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Gagal menghapus campaign");
  },
};
