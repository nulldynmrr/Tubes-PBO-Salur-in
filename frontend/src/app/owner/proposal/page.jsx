"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken, getEmail, clearAuth } from "@/lib/utils/auth";

function Proposal() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [proposalFile, setProposalFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    category: "",
    targetAmount: "",
  });

  useEffect(() => {
    const token = getToken();
    const email = getEmail();
    if (!token || !email) {
      toast.error("Harap login terlebih dahulu.");
      clearAuth();
      window.location.href = "/login/owner";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ownerEmail = getEmail();
    const token = getToken();

    if (!ownerEmail || !token) {
      toast.error("Token atau email tidak ditemukan. Harap login ulang.");
      clearAuth();
      window.location.href = "/login/owner";
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("address", formData.address);
    data.append("category", formData.category);
    data.append("targetAmount", formData.targetAmount);
    data.append("dateStart", startDate);
    data.append("dateEnd", endDate);
    data.append("imageFile", imageFile);
    data.append("proposalFile", proposalFile);
    data.append("ownerEmail", ownerEmail);

    try {
      await axios.post("http://localhost:8080/api/owner/proposal", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Campaign berhasil dikirim!");
      setTimeout(() => (window.location.href = "/owner/dashboard"), 1500);
    } catch (err) {
      toast.error("Terjadi kesalahan saat submit.");
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <InputField
            label="Judul Campaign"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <SelectField
            label="Kategori Campaign"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          <InputField
            label="Alamat Lengkap"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <InputField
            label="Target Donasi"
            name="targetAmount"
            type="number"
            value={formData.targetAmount}
            onChange={handleChange}
          />
          <InputField
            label="Deskripsi"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <FileField
            label="Gambar Campaign"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <FileField
            label="Proposal Campaign (PDF)"
            accept="application/pdf"
            onChange={(e) => setProposalFile(e.target.files[0])}
          />
          <DateField
            label="Tanggal Awal"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <DateField
            label="Tanggal Akhir"
            min={startDate}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <div className="col-span-2 flex justify-center gap-4 mt-10">
            <button
              type="button"
              className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 text-sm"
              onClick={() => window.history.back()}
            >
              Kembali
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="w-full px-4 py-2 text-sm border rounded-lg"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 text-sm border rounded-lg"
      >
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
  );
}

function FileField({ label, accept, onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        className="w-full px-4 py-2 text-sm border rounded-lg bg-white"
      />
    </div>
  );
}

function DateField({ label, value, onChange, min }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <input
        type="date"
        value={value}
        min={min}
        onChange={onChange}
        className="w-full px-4 py-2 text-sm border rounded-lg"
      />
    </div>
  );
}

export default Proposal;
