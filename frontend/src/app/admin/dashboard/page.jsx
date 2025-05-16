"use client";

import Link from "next/link";
import { LayoutGrid, Users, FileText, UserX } from "lucide-react";
import { dataKampanye } from "@/data/campaign";
import StatCard from "@/components/card/StatCard";

const kolomTabel = ["No", "Nama Campaign", "Deskripsi", "Proposal", "Status"];

const Dashboard = () => {
  const admin = "Dinar Muhammad Akbar";

  if (dataKampanye.length === 0) {
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

  return (
    <main className="space-y-6 px-6 md:px-[110px] py-4 container mx-auto">
      <div>
        <p className="text-gray-600">Hai, Admin</p>
        <h1 className="text-xl font-bold">{admin}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Campaign"
          value={120}
          Icon={LayoutGrid}
          color="blue"
        />
        <StatCard
          title="Total Donatur"
          value={1521}
          Icon={Users}
          color="green"
        />
        <StatCard
          title="Total Pengajuan"
          value={dataKampanye.length}
          Icon={FileText}
          color="red"
        />
      </div>

      <div className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold">Pengajuan Campaign</h2>

        <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
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
              {dataKampanye.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.namaCampaign}</td>
                  <td className="px-6 py-4">{item.deskripsi}</td>
                  <td className="px-6 py-4">{item.proposal}</td>
                  <td className="px-6 py-4">
                    {item.status === "eksekusi" ? (
                      <Link
                        href={`/admin/detail-campaign/${item.namaCampaign.replace(
                          /\s+/g,
                          "-"
                        )}-${item.id}`}
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
