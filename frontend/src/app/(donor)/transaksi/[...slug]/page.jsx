"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import InputField from "@/components/ui/form-field/InputField";
import SelectField from "@/components/ui/form-field/SelectField";
import {
  validateName,
  validateEmail,
  validateJumlahDonasi,
} from "@/lib/utils/form-validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { donationService } from "@/services/donationServices";

export default function Transaksi({ params }) {
  const { slug } = params;
  const router = useRouter();

  const formatSlug = (slug) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formattedTitle = formatSlug(Array.isArray(slug) ? slug[0] : slug);

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    isAnonim: false,
    total_donasi: "",
    pembayaran_via: "",
    bank_tujuan: "",
    bukti_pembayaran: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);

  const onChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val =
      type === "radio" ? value === "true" : type === "file" ? files[0] : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    if (type === "file" && files.length > 0) {
      setPreviewImage(URL.createObjectURL(files[0]));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (step === 0) {
      setStep(1);
      return;
    }

    if (step === 1) {
      if (
        !formData.total_donasi ||
        !formData.pembayaran_via ||
        !formData.bank_tujuan
      ) {
        toast.error("Mohon lengkapi data donasi.");
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      let isFormValid =
        formData.total_donasi &&
        formData.bank_tujuan &&
        formData.bukti_pembayaran;

      if (!formData.isAnonim) {
        isFormValid =
          isFormValid && formData.nama && formData.email && formData.telepon;
      }

      if (!isFormValid) {
        toast.error("Harap lengkapi semua data dengan benar.");
        return;
      }

      try {
        const donationData = {
          campaignId: parseInt(slug[0]),
          amount: parseInt(formData.total_donasi.replace(/[^0-9]/g, "")),
          paymentMethod: formData.pembayaran_via,
          bankAccount: formData.bank_tujuan,
          isAnonymous: formData.isAnonim,
          ...(formData.isAnonim
            ? {}
            : {
                name: formData.nama,
                email: formData.email,
                phone: formData.telepon,
              }),
        };

        await donationService.donate(donationData);
        router.push("/transaksi/berhasil");
      } catch (error) {
        console.error("Error saving donation:", error);
        toast.error("Terjadi kesalahan saat menyimpan data.");
      }
    }
  };

  return (
    <section className="h-screen flex flex-col px-6 md:px-[210px] py-4 ">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Transaksi Donasi untuk{" "}
        <span className="text-blue-500">{formattedTitle}</span>
      </h1>

      <div className="mt-10 relative flex justify-around items-center mb-4">
        <div className="absolute top-4 left-0 w-full border-t-2 border-dashed border-gray-200 z-0  px-[200px] overflow-hidden" />
        {["data pribadi", "donasi", "bukti"].map((label, index) => (
          <div key={index} className="relative z-10 flex-1 text-center">
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white font-semibold ${
                index <= step ? "bg-blue-400" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </div>
            <p className="mt-4 text-sm text-gray-600">{label}</p>
          </div>
        ))}
      </div>

      {step === 0 && (
        <form
          onSubmit={onSubmit}
          className="flex flex-col flex-grow justify-between px-[180px] mt-8"
        >
          <div className="space-y-4 overflow-y-auto">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Identitas Anonim?
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
                      onChange={onChange}
                      className="hidden"
                    />
                    <span className="text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {!formData.isAnonim && (
              <>
                <InputField
                  id="nama"
                  name="nama"
                  label="Nama Lengkap"
                  placeholder="Masukkan Nama Lengkap"
                  value={formData.nama}
                  onChange={onChange}
                  required
                  validate={validateName}
                  disabled={isLoading}
                />
                <InputField
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="Masukkan Email"
                  value={formData.email}
                  onChange={onChange}
                  required
                  validate={validateEmail}
                  disabled={isLoading}
                />
                <InputField
                  id="telepon"
                  name="telepon"
                  label="Telepon"
                  type="tel"
                  placeholder="Masukkan Nomor Telepon (+62)"
                  value={formData.telepon}
                  onChange={onChange}
                  required
                  disabled={isLoading}
                />
              </>
            )}
          </div>

          <div className="pb-[120px] flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition"
            >
              Selanjutnya
            </button>
          </div>
        </form>
      )}

      {step === 1 && (
        <form
          onSubmit={onSubmit}
          className="flex flex-col flex-grow justify-between px-[180px] mt-8"
        >
          <div className="space-y-4 overflow-y-auto">
            <InputField
              id="total_donasi"
              name="total_donasi"
              label="Jumlah Donasi"
              placeholder="Masukkan Total Donasi (Rp)"
              value={formData.total_donasi}
              onChange={onChange}
              validate={validateJumlahDonasi}
              required
            />
            <SelectField
              id="pembayaran_via"
              name="pembayaran_via"
              label="Metode Pembayaran"
              value={formData.pembayaran_via}
              onChange={onChange}
              options={[
                { value: "BCA", label: "BCA" },
                { value: "BNI", label: "BNI" },
                { value: "Mandiri", label: "Mandiri" },
              ]}
              placeholder="Pilih Pembayaran"
              required
              validate={(value) => (value ? "" : "Mohon isi pembayaran")}
            />
            <SelectField
              id="bank_tujuan"
              name="bank_tujuan"
              label="Bank Tujuan"
              value={formData.bank_tujuan}
              onChange={onChange}
              options={[
                { value: "BCA", label: "BCA - 75412541xx" },
                { value: "BNI", label: "BNI - 123455xxx" },
                { value: "Mandiri", label: "Mandiri - 5432231" },
              ]}
              placeholder="Pilih Bank Tujuan"
              required
              validate={(value) => (value ? "" : "Mohon isi pembayaran")}
            />
          </div>

          <div className="pb-[120px] flex justify-between">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 bg-gray-300 text-black rounded-md font-semibold hover:bg-gray-400 transition"
            >
              Sebelumnya
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition"
            >
              Selanjutnya
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={onSubmit}
          className="flex flex-col flex-grow justify-between px-[180px] mt-8"
        >
          <div className="space-y-4 overflow-y-auto mt-4">
            <label className="flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-lg cursor-pointer text-center hover:bg-gray-50 transition relative">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview Bukti Pembayaran"
                  className="max-h-48 object-contain rounded"
                />
              ) : (
                <>
                  <Upload className="w-10 h-10 text-blue-500 mb-2" />
                  <span className="text-gray-700 font-medium">
                    Unggah Bukti Pembayaran
                  </span>
                </>
              )}

              <input
                type="file"
                name="bukti_pembayaran"
                accept="image/*"
                onChange={onChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="pb-[120px] flex justify-between">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 bg-gray-300 text-black rounded-md font-semibold hover:bg-gray-400 transition"
            >
              Sebelumnya
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition"
            >
              Selesai
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
