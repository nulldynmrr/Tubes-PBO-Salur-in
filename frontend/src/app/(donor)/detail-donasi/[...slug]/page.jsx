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
    return <div>Donasi tidak ditemukan</div>;
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
              onClick={() => setActiveTab("tentang")}
              className={`py-2 px-4 rounded-t-md focus:outline-none ${
                activeTab === "tentang"
                  ? "bg-blue-400 text-white"
                  : "text-gray-400"
              }`}
            >
              Tentang
            </button>
            <button
              onClick={() => setActiveTab("dokumentasi")}
              className={`py-2 px-4 rounded-t-md focus:outline-none ${
                activeTab === "dokumentasi"
                  ? "bg-blue-400 text-white"
                  : "text-gray-400"
              }`}
            >
              Dokumentasi
            </button>
          </div>
          {activeTab === "tentang" && (
            <div className="my-6">
              <p>{donasi.deskripsi}</p>
              <div className="mt-4">
                <h4 className="font-semibold">Informasi Campaign:</h4>
                <p>Organisasi: {campaign.namaCampaign}</p>
                <p>Kategori: {donasi.kategori}</p>
                <p>Target Donasi: {donasi.targetDonasi}</p>
                <p>
                  Durasi: {donasi.durasiAwal} - {donasi.durasiAkhir}
                </p>
              </div>
            </div>
          )}
          {activeTab === "dokumentasi" && (
            <div className="my-6">
              <img
                src={donasi.gambarBuktiCampaign}
                alt={donasi.judulCampaign}
                className="w-32 h-32 object-contain"
              />
              <div className="mt-4">
                <h4 className="font-semibold">Proposal:</h4>
                <a
                  href={donasi.proposal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Lihat Proposal
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="p-4 rounded-lg shadow-sm overflow-hidden border border-gray-200 bg-white">
            <h2 className="text-2xl mb-2 font-semibold">
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
              <div className="mt-4 block w-full bg-blue-600 text-white py-2 rounded-md text-center hover:bg-blue-700 transition duration-200">
                Donasi Sekarang
              </div>
            </Link>
          </div>

          <div className="p-4 rounded-lg shadow-sm border border-gray-200 bg-white">
            <h3 className="font-semibold mb-3">Informasi Detail</h3>
            <div className="flex items-start gap-2 mb-2">
              <span className="text-lg">📍</span>
              <div>
                <div className="font-semibold">Lokasi</div>
                <div className="text-sm text-gray-600">
                  {donasi.lokasi || "Tidak tersedia"}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 mb-2">
              <span className="text-lg">📅</span>
              <div>
                <div className="font-semibold">Batas Akhir Donasi</div>
                <div className="text-sm text-gray-600">
                  {donasi.durasiAkhir || "Tidak tersedia"}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg">🏢</span>
              <div>
                <div className="font-semibold">Campaign/Organizer</div>
                <div className="text-sm text-gray-600">
                  {campaign.namaCampaign || "Tidak tersedia"}
                </div>
              </div>
            </div>
          </div>

          {/* Card Bagi Donasi Ini */}
          <div className="p-4 rounded-lg shadow-sm border border-gray-200 bg-white">
            <h3 className="font-semibold mb-3">Bagi Donasi Ini</h3>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔗</span>
              <input
                type="text"
                readOnly
                value={`https://donasi-program${donasi.judulCampaign.replace(
                  /\s+/g,
                  ""
                )}`}
                className="bg-gray-100 px-2 py-1 rounded w-full text-sm"
              />
              <button
                className="text-blue-600 font-semibold text-xs px-2 py-1 rounded hover:bg-blue-50"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://donasi-program${donasi.judulCampaign.replace(
                      /\s+/g,
                      ""
                    )}`
                  );
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
