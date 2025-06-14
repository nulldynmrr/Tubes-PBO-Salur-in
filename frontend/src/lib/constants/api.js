export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  CAMPAIGNER: {
    CAMPAIGNS: {
      CREATE: "/campaigners/campaigns",
      MY_CAMPAIGNS: "/campaigners/campaigns/my",
    },
  },
  DONATER: {
    DONATIONS: {
      CREATE: "/donaters/donations",
      MY_DONATIONS: "/donaters/donations/my",
    },
  },
  ADMIN: {
    USERS: {
      DELETE: (id) => `/admin/users/${id}`,
    },
  },
};

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
