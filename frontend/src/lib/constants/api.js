export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER_CAMPAIGN: "/auth/register/campaign",
    REGISTER_ADMIN: "/auth/register/admin",
  },
  CAMPAIGN: {
    LIST: "/campaigns",
    DETAIL: (id) => `/campaigns/${id}`,
    CREATE: "/campaigns",
    UPDATE: (id) => `/campaigns/${id}`,
    DELETE: (id) => `/campaigns/${id}`,
  },
  DONATION: {
    CREATE: "/donations",
    LIST: "/donations",
    DETAIL: (id) => `/donations/${id}`,
  },
};

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
