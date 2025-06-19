"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { campaignService } from "@/services/campaignService";

const Submission = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formData, setFormData] = useState({
    namaOrganisasi: "",
    nomorTelepon: "",
    deskripsi: "",
    alamat: "",
    kategori: "",
    target: "",
    judul: "",
  });
  const router = useRouter();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      startDate,
      endDate,
    };

    try {
      await campaignService.create(payload);
      alert("Campaign berhasil dibuat!");
      router.push("/campaign/dashboard");
    } catch (error) {
      alert(error.message || "Gagal menyimpan campaign");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="pt-[75px] px-6 md:px-[110px] py-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-8 text-center">
          Formulir Campaign Donasi
        </h2>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Nama Organisasi
            </label>
            <input
              name="namaOrganisasi"
              value={formData.namaOrganisasi}
              onChange={onChange}
              type="text"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Gambar Campaign Donasi
            </label>
            <input
              type="file"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Nomor Telepon
            </label>
            <input
              name="nomorTelepon"
              value={formData.nomorTelepon}
              onChange={onChange}
              type="text"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Deskripsi Campaign Donasi
            </label>
            <input
              name="deskripsi"
              value={formData.deskripsi}
              onChange={onChange}
              type="text"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Alamat Lengkap
            </label>
            <input
              name="alamat"
              value={formData.alamat}
              onChange={onChange}
              type="text"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Kategori Campaign Donasi
            </label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={onChange}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option>-- Pilih Kategori --</option>
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

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Selfie dengan KTP
            </label>
            <input
              type="file"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Target Donasi
            </label>
            <input
              name="target"
              value={formData.target}
              onChange={onChange}
              type="number"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Judul Campaign Donasi
            </label>
            <input
              name="judul"
              value={formData.judul}
              onChange={onChange}
              type="text"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Tanggal Awal Campaign
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                if (endDate && e.target.value > endDate) setEndDate("");
              }}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Proposal Campaign Donasi
            </label>
            <input
              type="file"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Tanggal Akhir Campaign
            </label>
            <input
              type="date"
              min={startDate}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-center mt-4 gap-4">
          <button
            type="button"
            onClick={() => router.push("/campaign/dashboard")}
            className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition text-sm"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition text-sm"
          >
            Submit
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Submission;
