"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import InputField from "@/components/ui/form-field/InputField";
import SelectField from "@/components/ui/form-field/SelectField";
import Navbar from "@/components/Navbar";
import { validateJumlahDonasi } from "@/lib/utils/form-validator";
import { toast } from "react-toastify";

export default function DonatePage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "",
    paymentProvider: "",
  });

  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/campaigns/${id}`
        );
        setCampaign(res.data);
      } catch (error) {
        toast.error("Tidak dapat memuat data campaign");
      }
    };

    if (id) fetchCampaign();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getProviderOptions = () => {
    if (formData.paymentMethod === "Bank") {
      return [
        { value: "BCA", label: "BCA" },
        { value: "BNI", label: "BNI" },
        { value: "BRI", label: "BRI" },
        { value: "Mandiri", label: "Mandiri" },
      ];
    } else if (formData.paymentMethod === "E-Wallet") {
      return [
        { value: "GoPay", label: "GoPay" },
        { value: "OVO", label: "OVO" },
        { value: "DANA", label: "DANA" },
        { value: "QRIS", label: "QRIS" },
      ];
    }
    return [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const amount = parseFloat(formData.amount);

      if (!campaign) {
        toast.error("Data campaign tidak tersedia");
        return;
      }

      // Step 1: Submit donation
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/campaigns/${id}/donate`,
        {
          campaignId: id,
          amount,
          paymentMethod: formData.paymentMethod,
          paymentProvider: formData.paymentProvider,
        }
      );

      toast.success("Donasi berhasil terkirim!");

      // Step 2: Check if campaign has reached or exceeded target
      const percentage =
        ((campaign.accumulated + amount) / campaign.targetAmount) * 100;

      if (percentage >= 100) {
        toast.info("Campaign sudah mencapai 100%. Donasi ditutup.");
        return router.push(`/campaigns`);
      }

      // Step 3: Otherwise, go back to campaign detail
      router.push(`/campaigns/${id}`);
    } catch (err) {
      toast.error("Gagal mengirim donasi.");
    }
  };

  return (
    <>
      <Navbar hideLogout />
      <section className="min-h-screen px-6 md:px-[210px] py-10">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Form Donasi
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-6 bg-white p-8 shadow-md rounded-lg"
        >
          <InputField
            id="amount"
            name="amount"
            label="Jumlah Donasi"
            placeholder="Masukkan jumlah (Rp)"
            value={formData.amount}
            onChange={handleChange}
            validate={validateJumlahDonasi}
            required
          />
          <SelectField
            id="paymentMethod"
            name="paymentMethod"
            label="Metode Pembayaran"
            value={formData.paymentMethod}
            onChange={handleChange}
            options={[
              { value: "Bank", label: "Bank" },
              { value: "E-Wallet", label: "E-Wallet" },
            ]}
            placeholder="Pilih metode pembayaran"
            required
          />
          <SelectField
            id="paymentProvider"
            name="paymentProvider"
            label="Penyedia Pembayaran"
            value={formData.paymentProvider}
            onChange={handleChange}
            options={getProviderOptions()}
            placeholder="Pilih penyedia"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Kirim Donasi
          </button>
        </form>
      </section>
    </>
  );
}
