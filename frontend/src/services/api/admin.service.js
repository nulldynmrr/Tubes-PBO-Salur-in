import { API_BASE_URL, API_ENDPOINTS } from "@/lib/constants/api";
import { authService } from "../auth.service";

const getHeaders = () => {
  const token = authService.getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const adminService = {
  // Delete user
  async deleteUser(id) {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.ADMIN.USERS.DELETE(id)}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus user");
      }

      return true;
    } catch (error) {
      throw error;
    }
  },
};
