const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { dataCampaign } from "@/data/campaign";
import { dataUsers } from "@/data/users";

export const CAMPAIGN_ENDPOINTS = {
  BASE: "/api/campaigners/campaigns",
  MY: "/api/campaigners/campaigns/my",
  DETAIL: (id) => `/api/campaigners/campaigns/${id}`,
};

const getToken = () => localStorage.getItem("auth_token");

export const campaignService = {
  create: async (data) => {
    try {
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
      console.log("Campaign berhasil dibuat");
      return result;
    } catch (error) {
      console.log("Backend tidak tersedia, menggunakan data dummy");
      return { success: true, message: "Campaign berhasil dibuat (dummy)" };
    }
  },

  getAll: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}${CAMPAIGN_ENDPOINTS.BASE}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error("Gagal mengambil data campaign");
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Backend tidak tersedia, menggunakan data dummy");
      return dataCampaign;
    }
  },

  getMine: async () => {
    try {
      console.log("Mencoba mengambil data dari backend...");
      const res = await fetch(`${API_BASE_URL}${CAMPAIGN_ENDPOINTS.MY}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.ok) {
        throw new Error("Gagal mengambil data campaign");
      }

      const data = await res.json();
      console.log("Berhasil mengambil data dari backend");
      return data;
    } catch (error) {
      console.log("BACKEND BELUM CONNECT:", error.message);
      console.log("MENGAMBIL DATA DARI DUMMY DATA");

      try {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("User yang sedang login:", user);

        if (!user) {
          console.log("Tidak ada data user di localStorage");
          return [];
        }

        console.log("Mencari data campaign untuk user:", user.email);

        const userCampaign = dataCampaign.find(
          (campaign) => campaign && campaign.email === user.email
        );

        if (!userCampaign || !userCampaign.pengajuanDonasi) {
          console.log("Tidak ditemukan data campaign untuk user:", user.email);
          return [];
        }

        console.log("Data campaign ditemukan untuk user:", user.email);
        console.log("Jumlah campaign:", userCampaign.pengajuanDonasi.length);

        const transformedData = userCampaign.pengajuanDonasi.map((donasi) => {
          let totalDonations = 0;
          if (dataUsers && Array.isArray(dataUsers)) {
            dataUsers.forEach((user) => {
              if (user.donasi && Array.isArray(user.donasi)) {
                user.donasi.forEach((d) => {
                  if (d.id_donasi === donasi.id_donasi) {
                    totalDonations += d.total_donasi;
                  }
                });
              }
            });
          }

          const targetAmount = parseInt(
            donasi.targetDonasi.replace(/[^0-9]/g, "")
          );

          console.log(`Transformasi data campaign:`, {
            judul: donasi.judulCampaign,
            totalDonasi: totalDonations,
            targetDonasi: targetAmount,
            status: donasi.status,
          });

          return {
            id: donasi.id_donasi,
            title: donasi.judulCampaign,
            currentAmount: totalDonations,
            targetAmount: targetAmount,
            status: donasi.status || "aktif",
            createdAt: donasi.durasiAwal,
            endDate: donasi.durasiAkhir,
            description: donasi.deskripsi,
            category: donasi.kategori,
            location: donasi.lokasi,
            proposal: donasi.proposal,
            image: donasi.gambarBuktiCampaign,
          };
        });

        console.log(
          "Transformasi data selesai, total campaign:",
          transformedData.length
        );
        return transformedData;
      } catch (dummyError) {
        console.error("Error saat menggunakan data dummy:", dummyError);
        return [];
      }
    }
  },

  getById: async (id) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}${CAMPAIGN_ENDPOINTS.DETAIL(id)}`
      );
      if (!res.ok) throw new Error("Gagal mengambil detail campaign");

      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Backend tidak tersedia, menggunakan data dummy");

      for (const campaign of dataCampaign) {
        const found = campaign.pengajuanDonasi.find((d) => d.id_donasi === id);
        if (found) {
          let totalDonations = 0;
          if (dataUsers && Array.isArray(dataUsers)) {
            dataUsers.forEach((user) => {
              if (user.donasi && Array.isArray(user.donasi)) {
                user.donasi.forEach((d) => {
                  if (d.id_donasi === id) {
                    totalDonations += d.total_donasi;
                  }
                });
              }
            });
          }

          return {
            id: found.id_donasi,
            title: found.judulCampaign,
            currentAmount: totalDonations,
            targetAmount: parseInt(found.targetDonasi.replace(/[^0-9]/g, "")),
            status: found.status,
            createdAt: found.durasiAwal,
            endDate: found.durasiAkhir,
            description: found.deskripsi,
            category: found.kategori,
            location: found.lokasi,
            proposal: found.proposal,
            image: found.gambarBuktiCampaign,
          };
        }
      }
      return null;
    }
  },

  update: async (id, data) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}${CAMPAIGN_ENDPOINTS.DETAIL(id)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) throw new Error("Gagal mengupdate campaign");
      return await res.json();
    } catch (error) {
      console.log("Backend tidak tersedia, menggunakan data dummy");
      return { success: true, message: "Campaign berhasil diupdate (dummy)" };
    }
  },

  remove: async (id) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}${CAMPAIGN_ENDPOINTS.DETAIL(id)}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      if (!res.ok) throw new Error("Gagal menghapus campaign");
      return { success: true, message: "Campaign berhasil dihapus" };
    } catch (error) {
      console.log("Backend tidak tersedia, menggunakan data dummy");
      return { success: true, message: "Campaign berhasil dihapus (dummy)" };
    }
  },
};
