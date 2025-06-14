"use client";

import { dataCampaign } from "@/data/campaign";
import { dataUsers } from "@/data/users";
import { useState } from "react";
import { hitungPersentaseDonasi } from "@/lib/utils/campaign-helpers";
import ProgressBar from "@/components/card/Progressbar";
import Link from "next/link";

export default function DetailDonasi({ params }) {
  const judulDonasi = params.slug[0];

  const formatAddress = (text) => text.toLowerCase().replace(/-/g, " ");

  let donasi = null;
  let campaign = null;

  for (const camp of dataCampaign) {
    const foundDonasi = camp.pengajuanDonasi.find(
      (item) => formatAddress(item.judulCampaign) === formatAddress(judulDonasi)
    );
    if (foundDonasi) {
      donasi = foundDonasi;
      campaign = camp;
      break;
    }
  }

  if (!donasi || !campaign) {
    return (
      <div className="text-center py-20 text-gray-500">
        Donasi tidak ditemukan
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState("tentang");

  const persentase = hitungPersentaseDonasi(
    donasi.id_donasi,
    dataCampaign,
    dataUsers
  );

  const targetDonasi = parseInt(donasi.targetDonasi.replace(/[^0-9]/g, ""));

  return (
    <>
      <section className="px-6 md:px-[110px] py-6 container mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Informasi Donasi
        </h3>
      </section>

      <section className="px-6 md:px-[110px] pb-16 container mx-auto flex flex-col md:flex-row md:gap-8">
        {/* Left Content */}
        <div className="w-full md:w-2/3">
          <img
            src={donasi.gambarBuktiCampaign}
            className="w-full rounded-lg shadow-md"
          />

          <div className="flex mt-6 space-x-4 border-b border-gray-200">
            {["tentang", "proposal"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
            {activeTab === "tentang" && (
              <>
                <p>{donasi.deskripsi}</p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h4 className="font-semibold mb-2 text-gray-800">
                    Informasi Campaign
                  </h4>
                  <p>
                    <strong>Organisasi:</strong> {campaign.namaCampaign}
                  </p>
                  <p>
                    <strong>Kategori:</strong> {donasi.kategori}
                  </p>
                  <p>
                    <strong>Target Donasi:</strong> {donasi.targetDonasi}
                  </p>
                  <p>
                    <strong>Durasi:</strong> {donasi.durasiAwal} -{" "}
                    {donasi.durasiAkhir}
                  </p>
                </div>
              </>
            )}
            {activeTab === "proposal" && (
              <>
                <div className="flex items-center gap-x-2 mt-4">
                  <h4 className="font-semibold text-gray-800 text-sm">
                    Proposal:
                  </h4>
                  <a
                    href={donasi.proposal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-semibold text-lg"
                  >
                    Lihat Proposal
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/3 space-y-6 mt-8 md:mt-0">
          <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {donasi.judulCampaign}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {donasi.deskripsi || "Deskripsi tidak tersedia"}
            </p>
            <ProgressBar
              percentage={persentase}
              targetDonasi={donasi.targetDonasi}
            />
            <Link href={`/transaksi/${judulDonasi}`}>
              <div className="mt-4 w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition">
                Donasi Sekarang
              </div>
            </Link>
          </div>

          <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-800">Informasi Detail</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <div>
                <strong>📍 Lokasi:</strong> {donasi.lokasi || "Tidak tersedia"}
              </div>
              <div>
                <strong>📅 Batas Akhir:</strong>{" "}
                {donasi.durasiAkhir || "Tidak tersedia"}
              </div>
              <div>
                <strong>🏢 Campaign:</strong>{" "}
                {campaign.namaCampaign || "Tidak tersedia"}
              </div>
            </div>
          </div>

          {/* Card Share */}
          <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">
              Bagi Donasi Ini
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={`https://donasi-program/${donasi.judulCampaign.replace(
                  /\s+/g,
                  ""
                )}`}
                className="bg-gray-100 px-3 py-2 rounded w-full text-sm"
              />
              <button
                className="text-blue-600 font-medium text-sm px-3 py-1 rounded hover:bg-blue-100 transition"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `https://donasi-program/${donasi.judulCampaign.replace(
                      /\s+/g,
                      ""
                    )}`
                  )
                }
              >
                Salin
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
