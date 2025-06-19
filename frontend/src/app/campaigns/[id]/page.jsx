"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProgressBar from "@/components/card/Progressbar";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import axios from "axios";

export default function DetailCampaign() {
  const { id: campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/campaigns/${campaignId}`
        );
        setCampaign(res.data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) fetchCampaign();
  }, [campaignId]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!campaign)
    return (
      <div className="text-center py-20 text-gray-500">
        Campaign tidak ditemukan
      </div>
    );

  const persentase =
    campaign.targetAmount > 0
      ? parseFloat(((campaign.accumulated / campaign.targetAmount) * 100).toFixed(2))
      : 0;

  return (
    <>
      <Navbar hideLogout />

      <section className="px-6 md:px-[110px] py-6 container mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Detail Campaign
        </h3>
      </section>

      <section className="px-6 md:px-[110px] pb-16 container mx-auto flex flex-col md:flex-row md:gap-8">
        {/* Left */}
        <div className="w-full md:w-2/3">
          <div className="w-[80%] mx-auto overflow-hidden rounded-lg shadow-md">
            <img
              src={`http://localhost:8080/${campaign.imagePath}`}
              className="w-full h-auto object-contain rounded"
              alt="Campaign"
            />
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/3 space-y-6 mt-8 md:mt-0">
          <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {campaign.title}
            </h2>
            <ProgressBar
              percentage={persentase}
              targetDonasi={`Rp${parseInt(campaign.targetAmount).toLocaleString(
                "id-ID"
              )}`}
            />
            <p className="mt-2 text-sm text-gray-600">
              {`Terkumpul Rp${parseInt(campaign.accumulated).toLocaleString("id-ID")} dari Rp${parseInt(campaign.targetAmount).toLocaleString("id-ID")}`}
            </p>
            <Link href={`/campaigns/${campaignId}/donate`}>
              <div className="mt-4 w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition">
                Donasi Sekarang
              </div>
            </Link>
          </div>

          {/* Informasi Campaign */}
          <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h4 className="font-bold text-[20px] mb-2 text-gray-800">
              Informasi Campaign
            </h4>
            <p>
              <strong>Kategori:</strong>{" "}
              {campaign.kategori.charAt(0).toUpperCase() +
                campaign.kategori.slice(1).toLowerCase()}
            </p>
            <p>
              <strong>Target:</strong> Rp
              {parseInt(campaign.targetAmount).toLocaleString("id-ID")}
            </p>
            <p>
              <strong>Durasi:</strong> {campaign.startDate} - {campaign.endDate}
            </p>
            <p>
              <strong>Alamat:</strong> {campaign.alamat}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {campaign.description || "Deskripsi tidak tersedia"}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
