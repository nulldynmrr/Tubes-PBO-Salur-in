"use client";
import React from "react";
import { useRouter } from "next/router";
import { donasiData } from "@/data/donasiData";

export default function DonasiDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const data = donasiData.find((item) => item.slug === slug);

  if (!data) {
    return <p className="p-10">Donasi tidak ditemukan.</p>;
  }

  return (
    <div className="px-6 md:px-[110px] py-8">
      <div className="mb-4">
        <p className="text-gray-500">
          <span className="font-semibold text-black">Donasi</span> / Informasi
          Donasi / <span className="text-blue-600">{slug}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <img
            src={data.gambar}
            alt={data.judul}
            className="w-full rounded-md"
          />

          <div className="flex gap-4 mt-6 border-b pb-2">
            <button className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded">
              Tentang
            </button>
            <button className="text-sm font-medium text-gray-500">
              Dokumentasi
            </button>
            <button className="text-sm font-medium text-gray-500">
              Deskripsi
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-700 space-y-4">
            {data.isiKonten.map((paragraf, index) => (
              <p key={index}>{paragraf}</p>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{data.judul}</h2>
            <p className="text-sm mt-1 text-gray-600">{data.deskripsiPendek}</p>

            <div className="mt-3 text-sm font-semibold">
              <span>Rp.{data.totalTerkumpul.toLocaleString("id-ID")},-</span>
              <span className="text-blue-600 float-right">
                {data.persentase}% Terpenuhi
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${data.persentase}%` }}
              ></div>
            </div>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
              Donasi Sekarang
            </button>
          </div>

          <div className="p-4 bg-white rounded shadow text-sm space-y-3">
            <div>
              <p className="font-semibold">📍 Lokasi</p>
              <p>{data.lokasi}</p>
            </div>
            <div>
              <p className="font-semibold">📅 Batas Akhir Donasi</p>
              <p>{data.batasAkhir}</p>
            </div>
            <div>
              <p className="font-semibold">🏢 Campaign/Organizer</p>
              <p>{data.organizer}</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded shadow text-sm">
            <p className="font-semibold mb-2">🔗 Bagi Donasi Ini</p>
            <a
              href={`https://donasi-program/${slug}`}
              className="text-blue-600 underline break-words"
            >
              https://donasi-program/{slug}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
