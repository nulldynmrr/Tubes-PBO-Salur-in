"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import FAQ from "@/data/FAQ";
import Image from "next/image";
<<<<<<< HEAD
import PrimaryButton from "@/components/ui/button/PrimaryButton";
=======
// import { motion } from "framer-motion";
// import { Accordion, AccordionItem } from "@/components/ui/accordion";
>>>>>>> 6f61a22c9ae1cb4057706476acf8cc500337d7b8
import { HandCoins, Users2, Megaphone } from "lucide-react";
import DonationCard from "@/components/card/DonationCard";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { dataCampaign } from "@/data/campaign";
import { dataUsers } from "@/data/users";
<<<<<<< HEAD
import { hitungPersentaseDonasi } from "@/lib/utils/campaign-helpers";
=======
import Button from "@/components/ui/button/PrimaryButton";
import Link from 'next/link';

>>>>>>> 6f61a22c9ae1cb4057706476acf8cc500337d7b8

const Home = () => {
  const donasiIds = new Set();
  dataUsers.forEach((user) => {
    user.donasi.forEach((donasi) => {
      donasiIds.add(donasi.id_donasi);
    });
  });
  const totDonatur = donasiIds.size;

  return (
    <>
      <Navbar />
<<<<<<< HEAD

      <section className="relative pt-[64px] bg-[radial-gradient(ellipse_at_center,_#FCFCFF_0%,_#EFF2FF_45%,_#FCFDFF_100%)] px-6 md:px-[110px] py-16 container mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-0">
        <div className="mt-[100px]  flex-1 flex flex-col justify-center md:justify-start md:items-start items-center text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-semibold leading-relaxed">
            <span className="text-blue-300 roboto">Sekecil apapun </span>
            <span className="text-blue-600 font-bold roboto">
              Besar Artinya{" "}
            </span>
            <span className="text-blue-300 roboto">Bagi Mereka</span>
          </h1>
          <h2 className="mb-8 mt-2 text-lg md:text-2xl font-semibold text-black leading-relaxed">
            Satu Klikmu Bisa Selamatkan Hidup
          </h2>
          <PrimaryButton className="mt-2 w-[120px]" nextRoute="/donasi">
            Donasi
          </PrimaryButton>
        </div>
        <div className="mt-[30px]  flex-1 flex justify-center items-center relative min-h-[400px]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border-2 border-blue-100 rounded-full opacity-40 z-0"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] border border-blue-100 rounded-full opacity-30 z-0"></div>
          <div className="relative z-10 flex flex-row gap-8 items-center">
            <div className="flex flex-col gap-6 items-end">
              <Image
                src="/img/imgsec1.png"
                alt="Children Craft"
                width={170}
                height={120}
                className="rounded-lg object-cover shadow-md w-[270px] h-[140px]"
              />
              <Image
                src="/img/imgsec3.png"
                alt="Group of Kids"
                width={170}
                height={120}
                className="rounded-lg object-cover shadow-md w-[190px] h-[120px]"
              />
            </div>
            <Image
              src="/img/imgsec2.png"
              alt="Children Happy"
              width={260}
              height={340}
              className="rounded-xl object-cover shadow-lg w-[280px] h-[340px]"
=======
      {/* Hero Section */}

      <section className="bg-[#F7F9FD] px-6 md:px-[110px] py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Area */}
        <div className="max-w-xl text-left">
          <h1 className="text-[40px] md:text-[36px] leading-tight font-semibold">
            <span className="text-[#93B4FB]">Sekecil apapun </span>
            <span className="text-[#2E68FF]">Besar Artinya </span>
            <span className="text-[#93B4FB]">Bagi Mereka</span>
          </h1>
          <p className="mt-2 text-[32px] md:text-xl text-[#1C1C1C] font-semibold">
            Satu Klikmu Bisa Selamatkan Hidup
          </p>
          <div className="mt-4 px-6 py-2 text-base">
            <Button nextRoute="/donasi" >
              Donasi
            </Button>
          </div>

        </div>

        {/* Images Area */}
        <div className="relative w-full md:w-auto flex justify-center items-center">
          {/* Background Ring */}
          <div className="absolute w-[350px] h-[350px] rounded-full border-2 border-blue-100 z-0 opacity-40 animate-pulse"></div>

          {/* Images Grid */}
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex gap-4">
              <Image
                src="/img/imgsec1.png"
                alt="Children Craft"
                width={160}
                height={100}
                className="rounded-lg object-cover"
              />
              <Image
                src="/img/imgsec2.png"
                alt="Children Happy"
                width={240}
                height={160}
                className="rounded-lg object-cover"
              />
            </div>
            <Image
              src="/img/imgsec3.png"
              alt="Group of Kids"
              width={300}
              height={300}
              className="rounded-xl object-cover"
>>>>>>> 6f61a22c9ae1cb4057706476acf8cc500337d7b8
            />
          </div>
        </div>
      </section>

      <section className="bg-sky-50 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <HandCoins size={36} className="mx-auto text-blue-500 mb-2" />
            <div className="text-3xl font-bold text-gray-800">13M</div>
            <div className="text-base text-gray-500 mt-1">Terkumpul</div>
          </div>
          <div>
            <Users2 size={36} className="mx-auto text-blue-500 mb-2" />
            <div className="text-3xl font-bold text-gray-800">{totDonatur}</div>
            <div className="text-base text-gray-500 mt-1">Pendonasi</div>
          </div>
          <div>
            <Megaphone size={36} className="mx-auto text-blue-500 mb-2" />
            <div className="text-3xl font-bold text-gray-800">108</div>
            <div className="text-base text-gray-500 mt-1">Campaign</div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
=======
      {/* Tentang Kami Section */}

>>>>>>> 6f61a22c9ae1cb4057706476acf8cc500337d7b8
      <section className="py-16 md:px-[110px] bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2">
            <div className="bg-gray-300 h-[300px] w-full rounded-lg"></div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Tentang Kami
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua." Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-sky-50 py-16 md:px-[110px]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Mulai Kebaikanmu, Wujudkan Harapan Mereka
            </h2>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#1962F8] text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  Mulai Kebaikanmu, Wujudkan Harapan Mereka
                </h3>
                <p className="text-gray-600 text-sm">
                  Kami bantu kamu menyusun kampanye donasi dengan panduan
                  langkah demi langkah. Tentukan tujuan, ceritakan kebutuhanmu,
                  dan perbarui info kapan saja.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#A7C4F8] text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  Sebarkan Ceritamu, Ajak Lebih Banyak Hati
                </h3>
                <p className="text-gray-600 text-sm">
                  Bagikan tautan kampanye ke orang-orang terdekat dan media
                  sosial. Manfaatkan fitur berbagi di dashboard untuk menjangkau
                  lebih luas dan menyentuh lebih banyak jiwa.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 text-[#1962F8] font-bold flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  Terima Donasi Secara Aman & Cepat
                </h3>
                <p className="text-gray-600 text-sm">
                  Masukkan informasi rekening atau ajak penerima manfaat mengisi
                  datanya. Dana akan dikirim dengan sistem yang aman, cepat, dan
                  transparan.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute top-4 left-4 w-full h-full bg-[#A7C4F8] rounded-lg rotate-[2deg]"></div>
            <div className="absolute top-2 left-2 w-full h-full bg-[#739FF6] rounded-lg rotate-[-2deg]"></div>
            <div className="relative bg-[#4285F4] text-white rounded-lg p-6 text-center shadow-lg z-10">
              <h3 className="text-lg font-semibold">Wujudkan Harapan Mereka</h3>
              <p className="text-sm">
                Jadi orang yang mendorong kebaikan dengan membuat campaign
              </p>
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <section className="bg-white py-16 md:px-[110px]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <Image
              src="/images/anak-palestina.jpg"
=======
      {/* kata kata Section */}
      <section className="bg-white py-20 px-6 md:px-[110px]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

          {/* Gambar anak Palestina */}
          <div className="flex-1 w-full">
            <Image
              src="/img/palestinekidflag.png"
>>>>>>> 6f61a22c9ae1cb4057706476acf8cc500337d7b8
              alt="Anak Palestina"
              width={500}
              height={500}
              className="rounded-xl object-cover w-full h-auto"
            />
          </div>

<<<<<<< HEAD
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-[#3793F9] text-xl font-bold">
=======
          {/* Teks dan tombol */}
          <div className="flex-1 w-full space-y-2 text-center md:text-left">
            <h2 className="text-[#3793F9] text-[20px] md:text-[35px] font-bold">
>>>>>>> 6f61a22c9ae1cb4057706476acf8cc500337d7b8
              Di balik tangan yang terbuka,
            </h2>
            <h2 className="text-[#A7D0F9] text-[20px] md:text-[35px] font-semibold">
              Tersimpan kasih tanpa suara
            </h2>
            <h2 className="text-[#FDE6D3] text-[20px] md:text-[35px] font-semibold">
              Satu donasi, satu harapan,
            </h2>
            <h2 className="text-[#FB8C2B] text-[20px] md:text-[32px] font-bold">
              Untuk dunia yang lebih bermakna
            </h2>

<<<<<<< HEAD
            <PrimaryButton className="mt-4" nextRoute="/donasi">
=======
            <button>
>>>>>>> 6f61a22c9ae1cb4057706476acf8cc500337d7b8
              Gerak Donasi
            </PrimaryButton>
          </div>
        </div>
      </section>

<<<<<<< HEAD
=======

      {/* Donation Card section */}
>>>>>>> 6f61a22c9ae1cb4057706476acf8cc500337d7b8
      <section className="py-16 md:px-[110px] bg-sky-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Program Donasi</h2>
            <a
              href="/donasi"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Lihat Semua
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataCampaign
              .flatMap((campaign) => campaign.pengajuanDonasi)
              .slice(0, 3)
              .map((donasi) => (
                <DonationCard
<<<<<<< HEAD
                  key={donasi.id_donasi}
                  campaign={{
                    namaCampaign: donasi.judulCampaign,
                    gambarBuktiCampaign: donasi.gambarBuktiCampaign,
                    deskripsi: donasi.deskripsi,
                    progress: hitungPersentaseDonasi(
                      donasi.id_donasi,
                      dataCampaign,
                      dataUsers
                    ),
                  }}
=======

>>>>>>> 6f61a22c9ae1cb4057706476acf8cc500337d7b8
                />
              ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <FAQ />
      </section>



      <footer className="bg-white pt-10">
        <div className="bg-blue-600 text-white rounded-md mx-4 md:mx-10 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:justify-between gap-8">
            {/* Deskripsi */}
            <div className="flex-1 ">
              <h2 className="text-2xl font-semibold mb-2">Salur.in</h2>
              <p className="text-sm leading-relaxed">
                Salur.in adalah sebuah website penyalur donasi yang memudahkan
                individu maupun organisasi untuk memberikan dan menggalang
                bantuan secara online. Mirip seperti Kitabisa, Salur.in berperan
                sebagai platform penghubung antara para donatur dan penerima
                bantuan, sehingga proses donasi menjadi lebih transparan, cepat,
                dan dapat diakses oleh siapa saja.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <ul>
                <li className="mb-2">
                  <a href="#">Tentang kami</a>
                </li>
                <li className="mb-2">
                  <a href="#">Komunitas</a>
                </li>
                <li className="mb-2">
                  <a href="#">Program Donasi</a>
                </li>
                <li className="mb-2">
                  <a href="/form/page.jsx">Daftar Campaign</a>
                </li>

                <li className="mb-2">
                  <a href="#">Cara Donasi</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
              <ul>
                <li className="mb-2">
                  <a href="#">Kebijakan Privasi</a>
                </li>
                <li className="mb-2">
                  <a href="#">Syarat & Ketentuan Penggunaan</a>
                </li>
                <li className="mb-2">
                  <a href="#">Kebijakan Donasi</a>
                </li>
                <li className="mb-2">
                  <a href="#">Laporan Keuangan</a>
                </li>
                <li>
                  <a href="#">Hak Cipta</a>
                </li>
              </ul>
<<<<<<< HEAD
=======

>>>>>>> 6f61a22c9ae1cb4057706476acf8cc500337d7b8
            </div>
          </div>
        </div>

        {/* Footer bawah */}
        <div className="text-sm text-center text-gray-500 mt-6 border-t pt-4 mx-4 md:mx-10">
          <p>
            © 2025 <span className="italic">Salur.in</span> – All rights
            reserved.
          </p>
          <div className="flex justify-center gap-4 mt-2 text-gray-600">
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
