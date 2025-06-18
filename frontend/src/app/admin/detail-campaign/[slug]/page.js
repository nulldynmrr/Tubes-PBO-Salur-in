"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/toast.css";
import Loading from "@/components/loading/Loading";
import { campaignService } from "@/services/campaignService";
import { dataCampaign } from "@/data/campaign";

const CampaignDetail = () => {
  const [activeTab, setActiveTab] = useState("proposal");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [campaign, setCampaign] = useState(null);
  const [donasi, setDonasi] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      if (!slug) return;

      setIsLoading(true);
      const parts = slug.split("-");
      const id = parts[parts.length - 1];
      const slugNamaCampaign = parts.slice(0, -1).join("-").toLowerCase();

      try {
        const data = await campaignService.getById(id);
        const validSlug = data.judulCampaign.toLowerCase().replace(/\s+/g, "-");

        if (validSlug !== slugNamaCampaign) throw new Error("Slug tidak cocok");

        setDonasi(data);
        setCampaign({ namaCampaign: data.campaignOwner.namaCampaign });
        setStatus(data.status);
      } catch (err) {
        console.warn("Fetch API gagal, gunakan data dummy", err);

        const foundCampaign = dataCampaign.find((c) =>
          c.pengajuanDonasi.some((d) => String(d.id_donasi) === id)
        );

        if (foundCampaign) {
          const foundDonasi = foundCampaign.pengajuanDonasi.find(
            (d) => String(d.id_donasi) === id
          );
          const validSlug = foundDonasi.judulCampaign
            .toLowerCase()
            .replace(/\s+/g, "-");

          if (validSlug === slugNamaCampaign) {
            setDonasi(foundDonasi);
            setCampaign(foundCampaign);
            setStatus(foundDonasi.status);
          } else {
            toast.error("Slug tidak valid di dummy");
          }
        } else {
          toast.error("Campaign tidak ditemukan di dummy");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaignDetail();
  }, [slug]);

  const updateStatus = async (newStatus) => {
    if (!donasi?.id_donasi) return;

    try {
      setIsLoading(true);
      let updateSuccess = false;

      try {
        console.log("Mencoba update status ke backend...", {
          id: donasi.id_donasi,
          newStatus: newStatus,
        });

        const response = await campaignService.update(donasi.id_donasi, {
          status: newStatus,
          id_donasi: donasi.id_donasi,
          judulCampaign: donasi.judulCampaign,
        });

        console.log("Response dari backend:", response);
        updateSuccess = true;
      } catch (apiErr) {
        console.warn("Update API gagal:", apiErr);
        updateSuccess = false;
      }

      try {
        const storedData = localStorage.getItem("dataCampaign");
        let currentData = storedData ? JSON.parse(storedData) : dataCampaign;

        const updatedCampaigns = currentData.map((c) => {
          const updatedPengajuan = c.pengajuanDonasi.map((d) => {
            if (d.id_donasi === donasi.id_donasi) {
              console.log(
                "Updating donation:",
                d.id_donasi,
                "to status:",
                newStatus
              );
              return { ...d, status: newStatus };
            }
            return d;
          });

          return {
            ...c,
            pengajuanDonasi: updatedPengajuan,
          };
        });

        localStorage.setItem("dataCampaign", JSON.stringify(updatedCampaigns));
        console.log(
          "Data berhasil diupdate di localStorage:",
          updatedCampaigns
        );
      } catch (storageErr) {
        console.error("Error updating localStorage:", storageErr);
      }

      setStatus(newStatus);
      setDonasi((prev) => ({ ...prev, status: newStatus }));

      if (updateSuccess) {
        toast.success(`Status campaign berhasil diubah menjadi ${newStatus}`, {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.warning(`Status diubah menjadi ${newStatus} (offline mode)`, {
          position: "top-right",
          autoClose: 2000,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push("/admin/dashboard");
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Gagal memperbarui status campaign");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  if (!campaign || !donasi) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Campaign tidak ditemukan
          </h2>
          <p className="text-gray-600 mt-2">
            Silakan kembali ke halaman dashboard
          </p>
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-[110px] py-6 container mx-auto space-y-4">
      <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
        {donasi.judulCampaign}
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed">
        {donasi.deskripsi}
      </p>

      <div className="flex items-center gap-4 text-lg text-gray-700 pb-12">
        <span>
          Campaign dari
          <span className="font-medium text-bold">
            {" "}
            {campaign.namaCampaign}{" "}
          </span>
          dalam status
        </span>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
            status === "diterima"
              ? "bg-green-100 text-green-600"
              : status === "ditolak"
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-8 border-b pb-4">
          <button
            className={`text-xl font-semibold pb-2 px-4 ${
              activeTab === "proposal"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("proposal")}
          >
            Proposal
          </button>
          <button
            className={`text-xl font-semibold pb-2 px-4 ${
              activeTab === "dokumentasi"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("dokumentasi")}
          >
            Dokumentasi
          </button>
        </div>

        {activeTab === "proposal" && (
          <div className="space-y-4">
            <div className="w-full h-[600px] overflow-hidden">
              <iframe
                src={donasi.proposal}
                width="100%"
                height="100%"
                title="Proposal PDF"
                frameBorder="0"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        )}

        {activeTab === "dokumentasi" && (
          <div className="space-y-4">
            {donasi.gambarBuktiCampaign && (
              <div className="flex justify-center">
                <img
                  src={donasi.gambarBuktiCampaign}
                  alt="Bukti Campaign"
                  className="w-full w-xl rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full h-20 bg-white border-t shadow-xl z-50 flex items-center justify-center">
        <div className="flex gap-4">
          {status === "eksekusi" ? (
            <>
              <button
                onClick={() => updateStatus("ditolak")}
                disabled={isLoading}
                className="inline-block min-w-[200px] px-6 py-2 rounded-3xl text-center text-white bg-red-600 hover:bg-red-700 active:bg-red-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Memproses..." : "Campaign Ditolak"}
              </button>
              <button
                onClick={() => updateStatus("diterima")}
                disabled={isLoading}
                className="inline-block min-w-[200px] px-6 py-2 rounded-3xl text-center text-white bg-[#1962F8] hover:bg-[#1554d6] active:bg-[#0e3ea6] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Memproses..." : "Campaign Diterima"}
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="inline-block min-w-[200px] px-6 py-2 rounded-3xl text-center text-white bg-[#1962F8] hover:bg-[#1554d6] active:bg-[#0e3ea6] transition duration-200"
            >
              Kembali ke Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
