"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, Users, FileText } from "lucide-react";
import StatCard from "@/components/card/StatCard";
import axios from "axios";
import { getToken, getRole, clearAuth } from "@/lib/utils/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const router = useRouter();
  const [dataCampaign, setDataCampaign] = useState([]);
  const [dataOwners, setDataOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

  const fetchData = async () => {
    const token = getToken();
    try {
      const [campaignRes, ownersRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/owners`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setDataCampaign(campaignRes.data);
      setDataOwners(ownersRes.data);
    } catch (err) {
      clearAuth();
      router.push("/login/admin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    const role = getRole();
    if (!token || role !== "ADMIN") {
      clearAuth();
      router.push("/login/admin");
      return;
    }
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

  const confirmAndProceed = (callback) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p className="mb-2 font-medium">Confirm Action?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                callback();
                closeToast();
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const handleApprove = (id) => {
    confirmAndProceed(() => {
      toast.promise(
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/approve/${id}`,
            {},
            {
              headers: { Authorization: `Bearer ${getToken()}` },
            }
          )
          .then(() => fetchData()),
        {
          pending: "Menyetujui campaign...",
          success: "Campaign disetujui",
          error: "Gagal menyetujui campaign",
        }
      );
    });
  };

  const handleReject = (id) => {
    confirmAndProceed(() => {
      toast.promise(
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/reject/${id}`,
            {},
            {
              headers: { Authorization: `Bearer ${getToken()}` },
            }
          )
          .then(() => fetchData()),
        {
          pending: "Menolak campaign...",
          success: "Campaign ditolak",
          error: "Gagal menolak campaign",
        }
      );
    });
  };

  const handleDeleteOwner = (id) => {
    confirmAndProceed(() => {
      toast.promise(
        axios
          .delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/owners/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` },
          })
          .then(() => fetchData()),
        {
          pending: "Menghapus owner...",
          success: "Owner dihapus",
          error: "Gagal menghapus owner",
        }
      );
    });
  };

  const handleRemoveCampaign = (id) => {
    confirmAndProceed(() => {
      toast.promise(
        axios
          .delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/campaigns/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` },
          })
          .then(() => fetchData()),
        {
          pending: "Menghapus campaign...",
          success: "Campaign dihapus",
          error: "Gagal menghapus campaign",
        }
      );
    });
  };

  const renderTable = (items, type) => {
    if (items.length === 0) {
      return (
        <p className="text-gray-500 text-center">
          {type === "pending"
            ? "Tidak ada pengajuan campaign"
            : type === "ongoing"
            ? "Tidak ada campaign yang aktif"
            : "Tidak ada organisasi campaign"}
        </p>
      );
    }

    return (
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">No</th>
              {type === "owners" ? (
                <>
                  <th className="py-2 px-4 border">Owner</th>
                  <th className="py-2 px-4 border">Organization</th>
                  <th className="py-2 px-4 border">Phone Number</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Action</th>
                </>
              ) : type === "pending" ? (
                <>
                  <th className="py-2 px-4 border">Title</th>
                  <th className="py-2 px-4 border">Category</th>
                  <th className="py-2 px-4 border">Target</th>
                  <th className="py-2 px-4 border">Proposal</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Action</th>
                </>
              ) : (
                <>
                  <th className="py-2 px-4 border">Title</th>
                  <th className="py-2 px-4 border">Donations</th>
                  <th className="py-2 px-4 border">Ending In</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Action</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="text-center">
                <td className="py-2 px-4 border">{index + 1}</td>
                {type === "owners" ? (
                  <>
                    <td className="py-2 px-4 border">{item.name}</td>
                    <td className="py-2 px-4 border">{item.organization}</td>
                    <td className="py-2 px-4 border">{item.phone}</td>
                    <td className="py-2 px-4 border">{item.email}</td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleDeleteOwner(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </>
                ) : type === "pending" ? (
                  <>
                    <td className="py-2 px-4 border">{item.title}</td>
                    <td className="py-2 px-4 border">{item.category}</td>
                    <td className="py-2 px-4 border">
                      Rp{(item.targetAmount ?? 0).toLocaleString("id-ID")}
                    </td>
                    <td className="py-2 px-4 border">
                      <a
                        href={`http://localhost:8080/${item.proposalPdfPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Proposal
                      </a>
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
                    <td className="py-2 px-4 border space-x-2">
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </>
                ) : (
                  <>
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
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleRemoveCampaign(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const totalCampaigns = dataCampaign.filter(
    (c) => c.status === "ONGOING"
  ).length;
  const totalPending = dataCampaign.filter(
    (c) => c.status === "PENDING"
  ).length;
  const totalDonors = new Set(
    dataCampaign.flatMap((c) => c.donations || []).map((d) => d.id)
  ).size;

  return (
    <main className="space-y-6 px-6 md:px-[110px] py-4 container mx-auto">
      <div>
        <p className="text-gray-600">Hai, Admin</p>
        <h1 className="text-xl font-bold">Dashboard Admin</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Campaign Aktif"
          value={totalCampaigns}
          Icon={LayoutGrid}
          color="blue"
        />
        <StatCard
          title="Total Donatur"
          value={totalDonors}
          Icon={Users}
          color="green"
        />
        <StatCard
          title="Total Pengajuan"
          value={totalPending}
          Icon={FileText}
          color="red"
        />
      </div>

      <div className="flex gap-4 mt-8">
        {["pending", "ongoing", "owners"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded font-medium ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "pending"
              ? "Pending Campaigns"
              : tab === "ongoing"
              ? "Ongoing Campaigns"
              : "Campaign Owners"}
          </button>
        ))}
      </div>

      {activeTab === "pending" &&
        renderTable(
          dataCampaign.filter((c) => c.status === "PENDING"),
          "pending"
        )}
      {activeTab === "ongoing" &&
        renderTable(
          dataCampaign.filter((c) => c.status === "ONGOING"),
          "ongoing"
        )}
      {activeTab === "owners" && renderTable(dataOwners, "owners")}
    </main>
  );
};

export default Dashboard;
