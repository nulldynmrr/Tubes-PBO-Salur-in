"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutGrid, Users, FileText, UserX } from "lucide-react";
import StatCard from "@/components/card/StatCard";
import { adminService } from "@/services/adminServices";
import { campaignService } from "@/services/campaignService";
import { dataCampaign as dummyData } from "@/data/campaign";
import { dataUsers } from "@/data/users";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { donationService } from "@/services/donationServices";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dataCampaign, setDataCampaign] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState({});
  const router = useRouter();
  const [stats, setStats] = useState({
    totalCampaign: 0,
    totalDonatur: 0,
    totalPengajuan: 0,
  });

  const kolomTabel = [
    "No",
    "Judul Campaign",
    "Deskripsi",
    "Proposal",
    "Status",
    "Aksi",
  ];

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

  const getStatusClass = (status) => {
    switch (status) {
      case "Complete":
      case "diterima":
        return "bg-green-50 text-green-700 border border-green-100";
      case "On Going":
      case "eksekusi":
        return "bg-yellow-50 text-yellow-700 border border-yellow-100";
      case "Rejected":
      case "ditolak":
        return "bg-red-50 text-red-700 border border-red-100";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-100";
    }
  };

  const getActionButton = (status, judulCampaign, idDonasi) => {
    if (status === "eksekusi") {
      const slug = `${judulCampaign
        .toLowerCase()
        .replace(/\s+/g, "-")}-${idDonasi}`;
      return (
        <Link
          href={`/admin/detail-campaign/${slug}`}
          className="inline-flex items-center justify-center min-w-[120px] px-4 py-2 text-amber-600 hover:text-amber-700 transition-colors text-sm font-medium"
        >
          Lihat Detail
        </Link>
      );
    } else if (status === "diterima") {
      const slug = judulCampaign.toLowerCase().replace(/\s+/g, "-");
      return (
        <Link
          href={`/detail-donasi/${slug}`}
          className="inline-flex items-center justify-center min-w-[120px] px-4 py-2 text-teal-600 hover:text-teal-700 transition-colors text-sm font-medium"
        >
          Lihat Donasi
        </Link>
      );
    }
    return null;
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

  const getProposalLink = (item) => {
    if (!item.proposal) return "-";

    const campaignName = getNamaCampaign(item.id_donasi);
    const slug = `${campaignName.toLowerCase().replace(/\s+/g, "-")}-${
      item.id_donasi
    }`;

    return (
      <Link
        href={`/admin/detail-campaign/${slug}`}
        className="text-blue-600 hover:text-blue-800 hover:underline"
      >
        Proposal {campaignName}
      </Link>
    );
  };

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

        try {
          console.log("Mencoba mengambil data dari backend...");
          const campaignsData = await campaignService.getAll();
          setDataCampaign(campaignsData);

          localStorage.setItem("dataCampaign", JSON.stringify(campaignsData));

          const totalCampaign = campaignsData.length;

          const totalPengajuan = campaignsData.reduce((total, campaign) => {
            const eksekusiCount =
              campaign.pengajuanDonasi?.filter(
                (pengajuan) => pengajuan.status === "eksekusi"
              ).length || 0;
            return total + eksekusiCount;
          }, 0);

          try {
            const donationsData = await donationService.getAll();
            const uniqueDonors = new Set(
              donationsData.map((donation) => donation.user_id)
            );
            console.log("Total donatur dari backend:", uniqueDonors.size);
            setStats({
              totalCampaign,
              totalDonatur: uniqueDonors.size,
              totalPengajuan,
            });
          } catch (donationErr) {
            console.warn(
              "Gagal mengambil data donatur dari backend, menggunakan data users:",
              donationErr
            );
            const uniqueDonors = new Set(dataUsers.map((user) => user.user_id));
            console.log("Total donatur dari data users:", uniqueDonors.size);
            setStats({
              totalCampaign,
              totalDonatur: uniqueDonors.size,
              totalPengajuan,
            });
          }
        } catch (apiErr) {
          console.warn("API fetch failed, using dummy data:", apiErr);
          toast.warn("Menggunakan data dummy");

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

          const totalCampaign = transformedCampaigns.length;

          const totalPengajuan = transformedCampaigns.reduce(
            (total, campaign) => {
              const eksekusiCount =
                campaign.pengajuanDonasi?.filter(
                  (pengajuan) => pengajuan.status === "eksekusi"
                ).length || 0;
              return total + eksekusiCount;
            },
            0
          );

          const uniqueDonors = new Set(dataUsers.map((user) => user.user_id));
          console.log(
            "Total donatur dari data users (dummy):",
            uniqueDonors.size
          );

          setStats({
            totalCampaign,
            totalDonatur: uniqueDonors.size,
            totalPengajuan,
          });
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
            value={stats.totalCampaign}
            Icon={LayoutGrid}
            color="blue"
          />
          <StatCard
            title="Total Donatur"
            value={stats.totalDonatur}
            Icon={Users}
            color="green"
          />
          <StatCard
            title="Total Pengajuan"
            value={stats.totalPengajuan}
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
                    <td className="px-6 py-4">{getProposalLink(item)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-medium ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {item.status || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getActionButton(
                        item.status,
                        getNamaCampaign(item.id_donasi),
                        item.id_donasi
                      )}
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
