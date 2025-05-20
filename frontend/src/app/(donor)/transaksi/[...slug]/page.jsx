"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/form-field/InputField";
import {
  validateName,
  validateEmail,
  validatePhone,
} from "@/lib/utils/form-validator";

export default function Transaksi({ params }) {
  const { slug } = params;

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    isAnonim: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "radio" ? value === "true" : value;

    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi manual jika tidak anonim
    if (!formData.isAnonim) {
      if (
        !validateName(formData.nama) ||
        !validateEmail(formData.email) ||
        !validatePhone(formData.telepon)
      ) {
        alert("Harap isi data dengan benar.");
        return;
      }
    }

    console.log("Slug Campaign:", slug);
    console.log("Data Donasi:", formData);
  };

  return (
    <section className="mt-10 px-10 md:px-[210px] py-4 container mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-10">
        Transaksi Donasi untuk: <span className="text-blue-500">{slug}</span>
      </h1>

      {/* STEP INDICATOR */}
      <div className="relative flex justify-around items-center mb-11 px-4">
        <div className="absolute top-4 left-0 w-full border-t-2 border-dashed border-gray-200 z-0" />
        {["data pribadi", "donasi", "bukti"].map((label, index) => (
          <div key={index} className="relative z-10 flex-1 text-center">
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white font-semibold ${
                index === 0 ? "bg-blue-400" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </div>
            <p className="mt-4 text-sm text-gray-600">{label}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Radio Anonim */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Idebtitas Anonim?
          </label>
          <div className="flex gap-6 mt-2">
            {[
              { label: "Ya", value: true },
              { label: "Tidak", value: false },
            ].map((option, idx) => (
              <label
                key={idx}
                className={`flex items-center cursor-pointer px-4 py-2 rounded-lg border transition 
          ${
            formData.isAnonim === option.value
              ? "bg-blue-100 border-blue-500 text-blue-700"
              : "bg-white border-gray-300 text-gray-700 hover:border-gray-500"
          }`}
              >
                <input
                  type="radio"
                  name="isAnonim"
                  value={option.value}
                  checked={formData.isAnonim === option.value}
                  onChange={handleChange}
                  className="hidden"
                />
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Hanya tampilkan field jika tidak anonim */}
        {!formData.isAnonim && (
          <>
            <InputField
              id="nama"
              name="nama"
              label="Nama Lengkap"
              placeholder="Masukkan Nama Lengkap"
              value={formData.nama}
              onChange={handleChange}
              required
              validate={validateName}
            />
            <InputField
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="Masukkan Email"
              value={formData.email}
              onChange={handleChange}
              required
              validate={validateEmail}
            />
            <InputField
              id="telepon"
              name="telepon"
              label="Telepon"
              type="tel"
              placeholder="Masukkan Nomor Telepon (+62)"
              value={formData.telepon}
              onChange={handleChange}
              required
              validate={validatePhone}
            />
          </>
        )}

        <button
          type="submit"
          className="mt-10 w-full py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition"
        >
          Selanjutnya
        </button>
      </form>
    </section>
  );
}
