"use client";

import { dataCampaign } from "@/data/campaign";
import { dataUsers } from "@/data/users";
import { useState } from "react";
import { hitungPersentaseDonasi } from "@/lib/utils/campaign-helpers";
import ProgressBar from "@/components/card/Progressbar";
import Link from "next/link";

export default function DetailDonasi({ params }) {
  const [namaCampaign, judulDonasi] = params.slug;

  // Normalisasi fungsi slug (mengganti strip jadi spasi dan huruf kapitalisasi kecil)
  const formatAddress = (text) => text.toLowerCase().replace(/-/g, " ");

  const campaign = dataCampaign.find(
    (item) => formatAddress(item.namaCampaign) === formatAddress(namaCampaign)
  );

  const donasi = campaign.pengajuanDonasi.find(
    (item) => formatAddress(item.judulCampaign) === formatAddress(judulDonasi)
  );

  if (!campaign) {
    return <div>Campaign tidak ditemukan</div>;
  }

  if (!donasi) {
    return <div>Donasi tidak ditemukan</div>;
  }

  const [activeTab, setActiveTab] = useState("tentang");

  const persentase = hitungPersentaseDonasi(
    donasi.id_donasi,
    dataCampaign,
    dataUsers
  );
  return (
    <>
      <section className="px-6 md:px-[110px] py-4 container mx-auto">
        <h3 className="text-2xl">
          <strong>Donasi/</strong>Informasi Donasi
        </h3>
      </section>
      <section className="px-6 md:px-[110px] py-4 container mx-auto flex flex-col md:flex-row md:space-x-6">
        <div className="w-full md:w-2/3 md:h-[100px]">
          <img src={donasi.gambarBuktiCampaign} className="w-full rounded-md" />
          <div className="mt-6 flex space-x-2 divide-y divide-gray-200">
            <button
              onClick={() => setActiveTab("dokumentasi")}
              className={`py-2 px-4 rounded-t-md focus:outline-none ${
                activeTab === "dokumentasi"
                  ? "bg-blue-400 text-white"
                  : "text-gray-400"
              }`}
            >
              Tentang
            </button>
            <button
              onClick={() => setActiveTab("tentang")}
              className={`py-2 px-4 rounded-t-md focus:outline-none ${
                activeTab === "tentang"
                  ? "bg-blue-400 text-white"
                  : "text-gray-400"
              }`}
            >
              Dokumentasi
            </button>
          </div>
          {activeTab === "dokumentasi" && (
            <div className="my-6">
              <p>{donasi.deskripsi}</p>
            </div>
          )}
          {activeTab === "tentang" && (
            <div className="my-6">
              <img
                src={donasi.gambarBuktiCampaign}
                alt={donasi.namaCampaign}
                className="w-32 h-32 object-contain"
              />
            </div>
          )}
        </div>
        <div className="w-full md:w-1/3">
          <div className="p-4  rounded-lg shadow-sm overflow-hidden border border-gray-200 bg-white">
            <h2 className="text-2xl mb-2 font-semibold">
              {donasi.judulCampaign}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {donasi.deskripsi || "Deskripsi tidak tersedia"}
            </p>
            <p>{params.slug}</p>
            <ProgressBar percentage={persentase} />
            <Link href={`/transaksi/${params.slug}`}>
              <div className="mt-4 block w-full bg-blue-600 text-white py-2 rounded-md text-center hover:bg-blue-700 transition duration-200">
                Donasi Sekarang
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
