"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/campaigns`
        );
        const allCampaigns = response.data;
        const ongoing = allCampaigns.filter((c) => c.status === "ONGOING");
        setCampaigns(ongoing);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const allCards = campaigns.map((c) => {
    const progress =
      c.targetAmount > 0 ? (c.accumulated / c.targetAmount) * 100 : 0;

    return {
      id: c.id,
      title: c.title,
      deskripsi: c.description,
      imageUrl: `http://localhost:8080/${c.imagePath}`,
      kategori: c.kategori,
      targetAmount: c.targetAmount,
      progress,
    };
  });

  return (
    <>
      <Navbar hideLogout />

      <section className="pt-[75px] px-6 md:px-[110px] py-4 container mx-auto">
        <img
          src="/img/banner_donasi.svg"
          alt="banner donasi"
          className="w-full mt-4"
        />
        <h1 className="mt-6 text-3xl font-bold text-center">
          Mari Bantu Program Donasi Kami
        </h1>
      </section>

      <section className="mt-6 px-6 md:px-[110px] py-4 container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
        {loading ? (
          <p className="text-center col-span-full text-gray-500">Loading...</p>
        ) : allCards.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            Belum ada campaign donasi yang tersedia.
          </p>
        ) : (
          allCards.map((item) => (
            <div
              key={item.id}
              className="max-w-sm rounded-lg shadow-md overflow-hidden border border-gray-200 bg-white"
            >
              <div className="h-48 w-full relative">
                <img
                  src={item.imageUrl || "/images/default-campaign.jpg"}
                  alt={item.title || "Campaign"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <div className="text-sm text-gray-500 mt-1 mb-2 space-y-1">
                  <p>Kategori: {item.kategori || "-"}</p>
                  <p>
                    Target: Rp{" "}
                    {item.targetAmount
                      ? parseInt(item.targetAmount).toLocaleString("id-ID")
                      : "0"}
                  </p>
                  <p>{item.deskripsi || "Deskripsi tidak tersedia"}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <a
                  href={`/campaigns/${item.id}`}
                  className="mt-4 block w-full bg-blue-600 text-white py-2 rounded-md text-center hover:bg-blue-700 transition duration-200"
                >
                  Donasi Sekarang
                </a>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default CampaignList;
