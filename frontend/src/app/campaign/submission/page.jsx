"use client";
import React, { use, useState } from "react";
import { FaFileUpload, FaImage, FaCalendarAlt, FaAngleRight } from "react-icons/fa";
import Navbar from "@/components/Navbar";

const Submission = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto py-32 px-3">
        <h2 className="text-2xl font-semibold mb-8">Form Pengajuan Campaign Donasi</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nama Organisasi */}
          <div>
            <label className="block mb-1 text-sm font-medium">Nama Organisasi</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Gambar Campaign */}
          <div>
            <label className="block mb-1 text-sm font-medium">Gambar Campaign Donasi</label>
            <div className="relative">
              <input
                type="file"
                className="w-full border border-gray-300 px-4 py-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <FaImage className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Nomor Telepon */}
          <div>
            <label className="block mb-1 text-sm font-medium">Nomor Telepon</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block mb-1 text-sm font-medium">Deskripsi Campaign Donasi</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="block mb-1 text-sm font-medium">Alamat Lengkap</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

            {/* Kategori */}
          <div>
            <label className="block mb-1 text-sm font-medium">Kategori Campaign Donasi</label>
            <select className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">-- Pilih Kategori --</option>
              <option value="bencana-alam">Bencana Alam</option>
              <option value="kesehatan">Kesehatan</option>
              <option value="pendidikan">Pendidikan</option>
              <option value="kemanusiaan">Kemanusiaan</option>
              <option value="tempat-ibadah">Tempat Ibadah</option>
              <option value="panti-asuhan">Panti Asuhan & Lansia</option>
              <option value="lingkungan">Lingkungan</option>
              <option value="pembangunan-sosial">Pembangunan Sosial</option>
              <option value="kegiatan-keagamaan">Kegiatan Keagamaan</option>
            </select>
          </div>

          {/* Selfie */}
          <div>
            <label className="block mb-1 text-sm font-medium">Selfie dengan KTP</label>
            <input
              type="file"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Target Donasi */}
          <div>
            <label className="block mb-1 text-sm font-medium">Target Donasi</label>
            <input
              type="number"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Judul Campaign */}
          <div>
            <label className="block mb-1 text-sm font-medium">Judul Campaign Donasi</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

           {/* Durasi Awal Campaign */}
          <div>
            <label className="block mb-1 text-sm font-medium">Tanggal Awal Campaign</label>
            <input
              type="date"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                // Jika endDate sudah diisi dan menjadi tidak valid, reset
                if (endDate && e.target.value > endDate) {
                  setEndDate("");
                }
              }}
            />
          </div>

          {/* Proposal */}
          <div>
            <label className="block mb-1 text-sm font-medium">Proposal Campaign Donasi</label>
            <div className="relative">
              <input
                type="file"
                className="w-full border border-gray-300 px-4 py-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <FaFileUpload className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Durasi Akhir Campaign */}
          <div>
            <label className="block mb-1 text-sm font-medium">Tanggal Akhir Campaign</label>
            <input
              type="date"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={endDate}
              min={startDate} // ⬅️ ini mencegah tanggal sebelum durasi awal
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          
          
        </form>

        {/* Tombol */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            type="button"
            className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-500 transition"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Submission;
