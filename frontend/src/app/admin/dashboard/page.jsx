"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutGrid, Users, FileText, UserX } from "lucide-react";
import StatCard from "@/components/card/StatCard";
import { dataCampaign as dummyCampaign } from "@/data/campaign";
import { dataUsers as dummyUsers } from "@/data/users";

const Dashboard = () => {
  const admin = "Alex Abraham";
  const [searchQuery, setSearchQuery] = useState("");
  const [dataCampaign, setDataCampaign] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campaignRes, usersRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/campaigns`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`),
        ]);

        const campaignData = await campaignRes.json();
        const userData = await usersRes.json();

        setDataCampaign(campaignData);
        setDataUsers(userData);
      } catch (err) {
        console.error("Gagal fetch data dari backend:", err);
        setDataCampaign(dummyCampaign);
        setDataUsers(dummyUsers);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const kolomTabel = ["No", "Nama Campaign", "Deskripsi", "Proposal", "Status"];

  const dataDonasiCampaign = dataCampaign.flatMap(
    (item) => item.pengajuanDonasi
  );

  const getNamaCampaign = (idDonasi) => {
    const campaign = dataCampaign.find((c) =>
      c.pengajuanDonasi.some((d) => d.id_donasi === idDonasi)
    );
    if (!campaign) return "Unknown Campaign";

    const donasi = campaign.pengajuanDonasi.find(
      (d) => d.id_donasi === idDonasi
    );
    return donasi ? donasi.judulCampaign : "Unknown Campaign";
  };

  const filteredCampaigns = dataDonasiCampaign.filter((item) => {
    const campaignName = getNamaCampaign(item.id_donasi).toLowerCase();
    const description = item.deskripsi.toLowerCase();
    const searchLower = searchQuery.toLowerCase();

    return (
      campaignName.includes(searchLower) || description.includes(searchLower)
    );
  });

  if (loading) {
    return (
      <main className="px-6 py-10 text-center text-gray-500">
        Loading data...
      </main>
    );
  }

  if (!dataCampaign || dataCampaign.length === 0) {
    return (
      <main className="space-y-6 px-6 md:px-[110px] py-4 container mx-auto">
        <div>
          <p className="text-gray-600">Hai, Admin</p>
          <h1 className="text-xl font-bold">{admin}</h1>
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
  dataUsers.forEach((user) => {
    user.donasi.forEach((donasi) => {
      donasiIds.add(donasi.id_donasi);
    });
  });
  const totDonatur = donasiIds.size;

  let totPengajuan = 0;
  dataCampaign.forEach((campaign) => {
    totPengajuan += campaign.pengajuanDonasi.filter(
      (pengajuan) => pengajuan.status === "eksekusi"
    ).length;
  });

  return (
    <main className="space-y-6 px-6 md:px-[110px] py-4 container mx-auto">
      <div>
        <p className="text-gray-600">Hai, Admin</p>
        <h1 className="text-xl font-bold">{admin}</h1>
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
                  <td className="px-6 py-4">{item.deskripsi}</td>
                  <td className="px-6 py-4">{item.proposal}</td>
                  <td className="px-6 py-4">
                    {item.status === "eksekusi" ? (
                      <Link
                        href={`/admin/detail-campaign/${item.judulCampaign.replace(
                          /\s+/g,
                          "-"
                        )}-${item.id_donasi}`}
                        className="text-blue-500 underline"
                      >
                        Lihat Detail
                      </Link>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "diterima"
                            ? "bg-green-100 text-green-600"
                            : item.status === "ditolak"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
