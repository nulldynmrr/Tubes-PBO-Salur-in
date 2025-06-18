"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button/PrimaryButton";
import { campaignService } from "@/services/campaignService";
import { dataCampaign } from "@/data/campaign";
import { dataUsers } from "@/data/users";
import { authService } from "@/services/auth.service";
import { Toaster, toast } from "react-hot-toast";

export default function Campaign() {
  const [activeTab, setActiveTab] = useState("campaign");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Starting to fetch data...");

        const userData = await authService.getCurrentUser();
        console.log("Current user data from auth:", userData);

        if (!userData) {
          console.log("No user data found, redirecting to login");
          toast.error("Silakan login terlebih dahulu");
          router.push("/login/campaign");
          return;
        }

        const userInfo = {
          name: userData.name,
          email: userData.email,
          organization: userData.organization,
          phone: userData.phone,
        };
        console.log("Setting user info:", userInfo);
        setUser(userInfo);

        try {
          console.log("Attempting to fetch from BE...");
          const response = await campaignService.getMine();
          console.log("BE response:", response);

          if (response && Array.isArray(response)) {
            const transformedCampaigns = response.map((campaign, index) => ({
              no: index + 1,
              id: campaign.id,
              id_donasi: campaign.id,
              title: campaign.title,
              amountRaised: campaign.currentAmount || 0,
              amountTarget: campaign.targetAmount || 0,
              status: campaign.status,
              endDate: campaign.endDate || campaign.createdAt,
              isTargetReached:
                (campaign.currentAmount || 0) >= (campaign.targetAmount || 0),
            }));
            console.log("Transformed BE campaigns:", transformedCampaigns);
            setCampaigns(transformedCampaigns);
            return;
          }
        } catch (error) {
          console.log("BE connection failed, using dummy data:", error);
        }

        // Fallback to dummy data
        console.log("Using dummy data for campaigns");
        const userCampaign = dataCampaign.find(
          (campaign) => campaign && campaign.email === userData.email
        );

        if (!userCampaign || !userCampaign.pengajuanDonasi) {
          console.log("No campaigns found in dummy data");
          setCampaigns([]);
          return;
        }

        const userCampaigns = userCampaign.pengajuanDonasi.map(
          (donasi, index) => {
            let totalDonations = 0;
            if (
              donasi.status === "diterima" &&
              dataUsers &&
              Array.isArray(dataUsers)
            ) {
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

            return {
              no: index + 1,
              id: donasi.id_donasi,
              id_donasi: donasi.id_donasi,
              title: donasi.judulCampaign,
              amountRaised: totalDonations,
              amountTarget: targetAmount,
              status: donasi.status,
              endDate: donasi.durasiAkhir,
              isTargetReached: totalDonations >= targetAmount,
            };
          }
        );

        setCampaigns(userCampaigns);
      } catch (error) {
        console.error("Error in fetchData:", error);
        toast.error("Terjadi kesalahan saat memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const onWithDraw = async (campaign) => {
    try {
      router.push(`/campaign/withDraw/${campaign.id_donasi}`);
    } catch (error) {
      console.error("Error in onWithDraw:", error);
      toast.error("Gagal memproses penarikan donasi");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "diterima":
      case "accepted":
        return "bg-green-100 text-green-700";
      case "eksekusi":
      case "executing":
        return "bg-yellow-100 text-yellow-700";
      case "ditolak":
      case "rejected":
        return "bg-red-100 text-red-700";
      case "ditarik":
      case "withdrawn":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "diterima":
      case "accepted":
        return "Diterima";
      case "eksekusi":
      case "executing":
        return "Tunggu Verifikasi";
      case "ditolak":
      case "rejected":
        return "Ditolak";
      case "ditarik":
      case "withdrawn":
        return "Dana Sudah Ditarik";
      default:
        return status;
    }
  };

  const renderAction = (campaign) => {
    if (campaign.status === "eksekusi" || campaign.status === "executing") {
      return (
        <span className="text-yellow-600 font-medium">Tunggu Verifikasi</span>
      );
    }

    if (campaign.status === "diterima" || campaign.status === "accepted") {
      if (campaign.isTargetReached) {
        return (
          <button
            onClick={() => onWithDraw(campaign)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
          >
            Tarik Donasi
          </button>
        );
      } else {
        return (
          <button
            disabled
            className="bg-gray-300 text-gray-600 px-3 py-1 rounded cursor-not-allowed text-sm"
          >
            Belum Capai Target
          </button>
        );
      }
    }

    if (campaign.status === "ditarik" || campaign.status === "withdrawn") {
      return (
        <span className="text-blue-600 font-medium">Dana Sudah Terkirim</span>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="px-6 md:px-[110px] py-4 pt-24 text-center">
          Loading data...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Toaster position="top-right" />

      <div className="px-6 md:px-[110px] py-4 pt-24">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <Image
              src="/img/profilepic.jpg"
              alt="Profile"
              width={96}
              height={96}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <Input value={user?.name} readOnly />
          <Input value={user?.email} readOnly />
        </div>

        <div className="mt-10">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 ml-4 ${
                activeTab === "campaign"
                  ? "border-b-2 border-blue-500 font-semibold"
                  : ""
              }`}
              onClick={() => setActiveTab("campaign")}
            >
              History Campaign
            </button>
          </div>

          {activeTab === "campaign" && (
            <div className="overflow-x-auto mt-4">
              {campaigns.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    Belum ada campaign yang diajukan
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button nextRoute="/campaign/submission" className="mr-4">
                      Ajukan Donasi
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <table className="min-w-full border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 border">No</th>
                        <th className="py-2 px-4 border">Judul Campaign</th>
                        <th className="py-2 px-4 border">Jumlah Donasi</th>
                        <th className="py-2 px-4 border">Tanggal Berakhir</th>
                        <th className="py-2 px-4 border">Status</th>
                        <th className="py-2 px-4 border">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((item) => (
                        <tr key={item.id_donasi} className="text-center">
                          <td className="py-2 px-4 border">{item.no}</td>
                          <td className="py-2 px-4 border">{item.title}</td>
                          <td className="py-2 px-4 border">
                            Rp. {item.amountRaised.toLocaleString()} / Rp.{" "}
                            {item.amountTarget.toLocaleString()}
                          </td>
                          <td className="py-2 px-4 border">{item.endDate}</td>
                          <td className="py-2 px-4 border">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                                item.status
                              )}`}
                            >
                              {getStatusText(item.status)}
                            </span>
                          </td>
                          <td className="py-2 px-4 border">
                            {renderAction(item)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center gap-4 mt-8">
                    <Button nextRoute="/campaign/submission" className="mr-4">
                      Ajukan Donasi Lagi
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
