"use client";

import DonationCard from "@/components/card/DonationCard";
import React, { useEffect, useState } from "react";
import { dataCampaign } from "@/data/campaign";
import { dataUsers } from "@/data/users";
import { hitungPersentaseDonasi } from "@/lib/utils/campaign-helpers";
import { campaignService } from "@/services/campaignService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Donasi = () => {
  const [allDonations, setAllDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const campaigns = await campaignService.getAll();

        if (campaigns && Array.isArray(campaigns)) {
          const transformedDonations = campaigns.map((campaign) => ({
            id_donasi: campaign.id,
            judulCampaign: campaign.title,
            gambarBuktiCampaign: campaign.image,
            deskripsi: campaign.description,
            campaign: {
              id: campaign.campaigner.id,
              nama: campaign.campaigner.name,
              email: campaign.campaigner.email,
              namaCampaign: campaign.campaigner.organization,
              nomorTelepon: campaign.campaigner.phone,
              alamat: campaign.campaigner.address,
              fotoKTP: campaign.campaigner.ktpImage,
              gambarBuktiCampaign: campaign.image,
              deskripsi: campaign.description,
              progress: (campaign.currentAmount / campaign.targetAmount) * 100,
            },
          }));

          setAllDonations(transformedDonations);
        }
      } catch (error) {
        console.log("Backend tidak tersedia, menggunakan data dummy");
        toast.warn("Menggunakan data dummy");

        const dummyDonations = dataCampaign.flatMap((campaign) =>
          campaign.pengajuanDonasi.map((donasi) => ({
            ...donasi,
            campaign: {
              ...campaign,
              namaCampaign: donasi.judulCampaign,
              gambarBuktiCampaign: donasi.gambarBuktiCampaign,
              deskripsi: donasi.deskripsi,
              progress: hitungPersentaseDonasi(
                donasi.id_donasi,
                dataCampaign,
                dataUsers
              ),
            },
          }))
        );

        setAllDonations(dummyDonations);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <section className="px-6 md:px-[110px] py-4 container mx-auto">
        <img
          src="/img/banner_donasi.svg"
          alt="banner donasi"
          className="w-full"
        />
        <h1 className="mt-6 text-3xl font-bold text-center">
          Mari Bantu Program Donasi Kami
        </h1>
      </section>

      <section className="mt-6 px-6 md:px-[110px] py-4 container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
        {allDonations.map((donasi) => (
          <DonationCard key={donasi.id_donasi} campaign={donasi.campaign} />
        ))}
      </section>
    </>
  );
};

export default Donasi;
