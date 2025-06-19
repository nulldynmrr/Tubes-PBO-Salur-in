"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Input from "@/components/ui/input";
import axios from "axios";
import { getToken, getEmail, clearAuth } from "@/lib/utils/auth";

export default function DashboardProfilePage() {
  const [owner, setOwner] = useState({ id: null, name: "", email: "" });
  const [campaigns, setCampaigns] = useState([]);
  const [activeTab, setActiveTab] = useState("campaign");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      const email = getEmail();

      if (!token || !email) {
        router.push("/home");
        return;
      }

      try {
        const ownerRes = await axios.get(
          "http://localhost:8080/api/owner/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { email },
          }
        );

        setOwner(ownerRes.data);

        const campaignRes = await axios.get(
          "http://localhost:8080/api/owner/campaigns",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { email },
          }
        );

        setCampaigns(campaignRes.data);
      } catch (err) {
        clearAuth();
        router.push("/login/owner");
      }
    };

    fetchData();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "ONGOING":
        return "bg-yellow-100 text-yellow-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      case "PENDING":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto py-32 px-4">
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
          <Input value={owner.name || "Tidak ada data"} readOnly />
          <Input value={owner.email || "-"} readOnly />
        </div>

        <div className="mt-10">
          <div className="flex justify-between items-center border-b">
            <button
              className={`px-4 py-2 ml-4 ${
                activeTab === "campaign"
                  ? "border-b-2 border-blue-500 font-semibold"
                  : ""
              }`}
              onClick={() => setActiveTab("campaign")}
            >
              Campaign History
            </button>
            <button
              onClick={() => router.push("/owner/proposal")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-4"
            >
              Buat Campaign
            </button>
          </div>

          {activeTab === "campaign" && (
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border">No</th>
                    <th className="py-2 px-4 border">Title</th>
                    <th className="py-2 px-4 border">Donations</th>
                    <th className="py-2 px-4 border">Ending In</th>
                    <th className="py-2 px-4 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((item, index) => (
                    <tr key={item.id} className="text-center">
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">{item.title}</td>
                      <td className="py-2 px-4 border">
                        Rp{(item.accumulated ?? 0).toLocaleString("id-ID")} / Rp
                        {(item.targetAmount ?? 0).toLocaleString("id-ID")}
                      </td>
                      <td className="py-2 px-4 border">
                        {new Date(item.endDate).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-2 px-4 border">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {campaigns.length === 0 && (
                    <tr>
                      <td className="py-4 px-4 border text-center" colSpan={5}>
                        Belum ada campaign
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
