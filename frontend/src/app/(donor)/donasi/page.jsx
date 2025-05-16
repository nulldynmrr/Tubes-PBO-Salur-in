import DonationCard from "@/components/card/DonationCard";
import React from "react";

const Donasi = () => {
  return (
    <>
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
        <DonationCard />
        <DonationCard />
        <DonationCard />
        <DonationCard />
        <DonationCard />
      </section>
    </>
  );
};

export default Donasi;
