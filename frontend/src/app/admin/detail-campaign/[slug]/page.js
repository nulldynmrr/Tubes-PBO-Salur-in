"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { dataKampanye as dataCampaign } from "@/data/campaign";
import PrimaryButton from "@/components/ui/button/PrimaryButton";

const CampaignDetail = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  if (!slug) {
    return <div>Loading...</div>;
  }

  const parts = slug.split("-");
  const id = parts[parts.length - 1];
  const namaCampaignSlug = parts.slice(0, -1).join("-").toLowerCase();

  const campaign = dataCampaign.find(
    (campaign) =>
      String(campaign.id) === id &&
      campaign.namaCampaign.toLowerCase().replace(/\s+/g, "-") ===
        namaCampaignSlug
  );

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  const [activeTab, setActiveTab] = useState("proposal");

  return (
    <div className="px-6 md:px-[110px] py-6 container mx-auto space-y-4">
      <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
        {campaign.judulCampaign}
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed">
        {campaign.deskripsi}
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
            campaign.status === "diterima"
              ? "bg-green-100 text-green-600"
              : campaign.status === "ditolak"
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {campaign.status}
        </span>
      </div>

      <div className="space-y-4 ">
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
                src={campaign.proposal}
                width="100%"
                height="100%"
                title="Proposal PDF"
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        )}

        {activeTab === "dokumentasi" && (
          <div className="space-y-4">
            {campaign.gambarBuktiCampaign && (
              <div className="flex justify-center">
                <img
                  src={campaign.gambarBuktiCampaign}
                  alt="Bukti Campaign"
                  className="w-full w-xl rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full h-20 bg-white border-t shadow-xl z-50 flex items-center justify-center">
        <div className="flex gap-4">
          <PrimaryButton className="px-6 py-2 font-semibold text-white rounded-lg bg-green-600 hover:bg-green-700 transition-all duration-300">
            Campaign Diterima
          </PrimaryButton>
          <PrimaryButton className="px-6 py-2 font-semibold text-white rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-300">
            Campaign Ditolak
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
