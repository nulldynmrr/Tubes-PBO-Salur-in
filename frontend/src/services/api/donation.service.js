import { API_BASE_URL, API_ENDPOINTS } from "@/lib/constants/api";
import { authService } from "../auth.service";

const getHeaders = () => {
  const token = authService.getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const donationService = {
  // Create new donation
  async createDonation(donationData) {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.DONATER.DONATIONS.CREATE}`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(donationData),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal membuat donasi");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Get all donations
  async getDonations() {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.DONATION.LIST}`,
        {
          headers: getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil daftar donasi");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Get my donations
  async getMyDonations() {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.DONATER.DONATIONS.MY_DONATIONS}`,
        {
          headers: getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil daftar donasi saya");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Get donation detail
  async getDonationDetail(id) {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.DONATION.DETAIL(id)}`,
        {
          headers: getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil detail donasi");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
