"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutGrid, Users, FileText, UserX } from "lucide-react";
import StatCard from "@/components/card/StatCard";
import { adminService } from "@/services/adminServices";
import { campaignService } from "@/services/campaignService";
import { dataCampaign as dummyData } from "@/data/campaign";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dataCampaign, setDataCampaign] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState({});
  const router = useRouter();

  const kolomTabel = ["No", "Nama Campaign", "Deskripsi", "Proposal", "Status"];

  const getNamaCampaign = (idDonasi) => {
    if (!idDonasi || !dataCampaign) return "Unknown Campaign";

    const campaign = dataCampaign.find((c) =>
      c.pengajuanDonasi?.some((d) => d.id_donasi === idDonasi)
    );
    if (!campaign) return "Unknown Campaign";

    const donasi = campaign.pengajuanDonasi?.find(
      (d) => d.id_donasi === idDonasi
    );
    return donasi ? donasi.judulCampaign : "Unknown Campaign";
  };

  const dataDonasiCampaign =
    dataCampaign?.flatMap((item) => item.pengajuanDonasi || []) || [];

  const filteredCampaigns = dataDonasiCampaign.filter((item) => {
    if (!item) return false;

    const campaignName = getNamaCampaign(item.id_donasi).toLowerCase();
    const description = (item.deskripsi || "").toLowerCase();
    const searchLower = searchQuery.toLowerCase();

    return (
      campaignName.includes(searchLower) || description.includes(searchLower)
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = authService.getUser();
        if (!userData) {
          toast.error("Silakan login terlebih dahulu");
          router.push("/login/admin");
          return;
        }

        setAdmin(userData);

        // be
        try {
          const campaignsData = await campaignService.getAll();
          setDataCampaign(campaignsData);
        } catch (apiErr) {
          console.warn("API fetch failed, using dummy data:", apiErr);
          toast.warn("Use Data");

          // Fallback to dummy data
          const storedData = localStorage.getItem("dataCampaign");
          const campaignData = storedData ? JSON.parse(storedData) : dummyData;

          const transformedCampaigns = campaignData.map((campaign, index) => ({
            no: index + 1,
            name: campaign.namaCampaign,
            amountRaised:
              campaign.pengajuanDonasi?.reduce(
                (total, donasi) => total + (donasi.jumlahDonasi || 0),
                0
              ) || 0,
            amountTarget: campaign.targetDonasi || 5000000,
            endDate: campaign.tanggalBerakhir || "08/12/2077",
            status: campaign.status || "On Going",
            pengajuanDonasi: campaign.pengajuanDonasi || [],
          }));

          setDataCampaign(transformedCampaigns);
        }
      } catch (err) {
        console.error("Error in fetchData:", err);
        toast.error("Terjadi kesalahan saat memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Complete":
      case "diterima":
        return "bg-green-100 text-green-700";
      case "On Going":
      case "eksekusi":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
      case "ditolak":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-32 px-4 text-center">
        Loading data...
      </div>
    );
  }

  if (!dataCampaign || dataCampaign.length === 0) {
    return (
      <main className="space-y-6 px-6 md:px-[110px] py-4 container mx-auto">
        <div>
          <p className="text-gray-600">Hai, Admin</p>
          <h1 className="text-xl font-bold">{admin.name || "Super Admin"}</h1>
        </div>
        <div className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold">Pengajuan Campaign</h2>
        </div>
        <div className="mt-8 space-y-3 text-center text-gray-300">
          <UserX className="mx-auto text-gray-300 w-40 h-40" />
          <p>No campaign data available</p>
        </div>
      </main>
    );
  }

  const donasiIds = new Set();
  dataUsers?.forEach((user) => {
    user.donasi?.forEach((donasi) => {
      if (donasi?.id_donasi) {
        donasiIds.add(donasi.id_donasi);
      }
    });
  });
  const totDonatur = donasiIds.size;

  let totPengajuan = 0;
  dataCampaign?.forEach((campaign) => {
    totPengajuan += (campaign.pengajuanDonasi || []).filter(
      (pengajuan) => pengajuan?.status === "eksekusi"
    ).length;
  });

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <main className="space-y-6 px-6 md:px-[110px] py-4 container mx-auto">
        <div>
          <p className="text-gray-600">Hai</p>
          <h1 className="text-xl font-bold">{admin.name || "Super Admin"}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Campaign"
            value={dataCampaign.length}
            Icon={LayoutGrid}
            color="blue"
          />
          <StatCard
            title="Total Donatur"
            value={totDonatur}
            Icon={Users}
            color="green"
          />
          <StatCard
            title="Total Pengajuan"
            value={totPengajuan}
            Icon={FileText}
            color="red"
          />
        </div>

        <div className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold">Pengajuan Campaign</h2>
          <div className="flex justify-end">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Cari campaign..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-md shadow-sm">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                  {kolomTabel.map((col, idx) => (
                    <th key={idx} className="px-6 py-4 whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      {getNamaCampaign(item.id_donasi)}
                    </td>
                    <td className="px-6 py-4">{item.deskripsi || "-"}</td>
                    <td className="px-6 py-4">{item.proposal || "-"}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {item.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
