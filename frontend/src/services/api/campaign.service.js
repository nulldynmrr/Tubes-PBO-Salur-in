import { API_BASE_URL, API_ENDPOINTS } from "@/lib/constants/api";
import { authService } from "../auth.service";

const getHeaders = () => {
  const token = authService.getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const campaignService = {
  // Get all campaigns
  async getCampaigns() {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.CAMPAIGN.LIST}`,
        {
          headers: getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch campaigns");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Get campaign by ID
  async getCampaignById(id) {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.CAMPAIGN.DETAIL(id)}`,
        {
          headers: getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch campaign");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Create new campaign
  async createCampaign(campaignData) {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.CAMPAIGN.CREATE}`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(campaignData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create campaign");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Update campaign
  async updateCampaign(id, campaignData) {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.CAMPAIGN.UPDATE(id)}`,
        {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify(campaignData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update campaign");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Delete campaign
  async deleteCampaign(id) {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.CAMPAIGN.DELETE(id)}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete campaign");
      }

      return true;
    } catch (error) {
      throw error;
    }
  },
};
