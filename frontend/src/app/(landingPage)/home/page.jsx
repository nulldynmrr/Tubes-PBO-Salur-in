"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import FAQ from "@/data/FAQ";
import Image from "next/image";
import { motion } from 'framer-motion';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import PrimaryButton  from '@/components/ui/button/PrimaryButton';
import { HandCoins, Users2, Megaphone } from "lucide-react";
import DonationCard from "@/components/card/DonationCard";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";


const Home = () => {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className="bg-white py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
      {/* Text Area */}
      <div className="max-w-xl mb-10 md:mb-0">
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 leading-relaxed">
          <span className="text-blue-300 roboto">Sekecil apapun </span>
          <span className="text-blue-600 font-bold roboto">Besar Artinya </span>
          <span className="text-blue-300 roboto">Bagi Mereka</span>
        </h1>
        <h1 className="text-xl md:text-3xl font-semibold text-gray-800 leading-relaxed">
          <span className="text-black roboto">Satu Klikmu Bisa Selamatkan Hidup </span>
        </h1>
        <PrimaryButton className="mt-4">
          Donasi
        </PrimaryButton>
      </div>

      {/* Images */}
      <div className="mt-14 relative w-full md:w-1/2 flex justify-center items-center">
        {/* Background circle */}
        <div className="absolute w-[300px] h-[300px] rounded-full border border-blue-100 opacity-50 animate-pulse z-0"></div>

        {/* Images */}
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex gap-4">
            <Image
              src="/img/imgsec2.png" // Ganti dengan path yang sesuai
              alt="Children Happy"
              width={300}
            height={400}
              className="rounded-lg object-cover"
            />
            <Image
              src="/img/imgsec1.png" // Ganti dengan path yang sesuai
              alt="Children Craft"
              width={150}
              height={100}
              className="rounded-lg object-cover"
            />
          </div>
          <Image
            src="/img/imgsec3.png" // Ganti dengan path yang sesuai
            alt="Group of Kids"
            width={300}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </section>

    {/* icon Section */}
    <section className="bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center gap-10 text-[#1962F8]">
        {/* Terhimpun */}
        <div className="flex items-center gap-3">
          <HandCoins size={32} />
          <div>
            <div className="text-xl font-semibold">13M</div>
            <div className="text-sm text-[#9DBEF9]">Terkumpul</div>
          </div>
        </div>

        {/* Pendonasi */}
        <div className="flex items-center gap-3">
          <Users2 size={32} />
          <div>
            <div className="text-xl font-semibold">320k</div>
            <div className="text-sm text-[#9DBEF9]">Pendonasi</div>
          </div>
        </div>

        {/* Campaign */}
        <div className="flex items-center gap-3">
          <Megaphone size={32} />
          <div>
            <div className="text-xl font-semibold">108</div>
            <div className="text-sm text-[#9DBEF9]">Campaign</div>
          </div>
        </div>
      </div>
    </section>

    {/* Tentang Kami Section */}
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Gambar Placeholder */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-300 h-[300px] w-full rounded-lg"></div>
        </div>

        {/* Teks Tentang Kami */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Tentang Kami</h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
    </section>

    {/* kalimat ajakan Section */}
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Kiri: Langkah-langkah */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Mulai Kebaikanmu, Wujudkan Harapan Mereka
          </h2>

          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#1962F8] text-white flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold text-gray-800">
                Mulai Kebaikanmu, Wujudkan Harapan Mereka
              </h3>
              <p className="text-gray-600 text-sm">
                Kami bantu kamu menyusun kampanye donasi dengan panduan langkah demi langkah. Tentukan tujuan, ceritakan kebutuhanmu, dan perbarui info kapan saja.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#A7C4F8] text-white flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold text-gray-800">
                Sebarkan Ceritamu, Ajak Lebih Banyak Hati
              </h3>
              <p className="text-gray-600 text-sm">
                Bagikan tautan kampanye ke orang-orang terdekat dan media sosial. Manfaatkan fitur berbagi di dashboard untuk menjangkau lebih luas dan menyentuh lebih banyak jiwa.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 text-[#1962F8] font-bold flex items-center justify-center">3</div>
            <div>
              <h3 className="font-semibold text-gray-800">
                Terima Donasi Secara Aman & Cepat
              </h3>
              <p className="text-gray-600 text-sm">
                Masukkan informasi rekening atau ajak penerima manfaat mengisi datanya. Dana akan dikirim dengan sistem yang aman, cepat, dan transparan.
              </p>
            </div>
          </div>
        </div>

        {/* Kanan: Kotak Ajak Donasi */}
        <div className="flex-1 relative">
          <div className="absolute top-4 left-4 w-full h-full bg-[#A7C4F8] rounded-lg rotate-[2deg]"></div>
          <div className="absolute top-2 left-2 w-full h-full bg-[#739FF6] rounded-lg rotate-[-2deg]"></div>
          <div className="relative bg-[#4285F4] text-white rounded-lg p-6 text-center shadow-lg z-10">
            <h3 className="text-lg font-semibold">Wujudkan Harapan Mereka</h3>
            <p className="text-sm">Jadi orang yang mendorong kebaikan dengan membuat campaign</p>
          </div>
        </div>
      </div>
    </section>

    {/* kata kata Section */}
    <section className="bg-white px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Gambar anak */}
        <div className="flex-1">
          <Image
            src="/images/anak-palestina.jpg" // Ganti sesuai path gambar kamu
            alt="Anak Palestina"
            width={500}
            height={500}
            className="rounded-xl object-cover w-full h-auto"
          />
        </div>

        {/* Teks dan tombol */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h2 className="text-[#3793F9] text-xl font-bold">
            Di balik tangan yang terbuka,
          </h2>
          <h2 className="text-[#A7D0F9] text-xl font-semibold">
            Tersimpan kasih tanpa suara
          </h2>
          <h2 className="text-[#FDE6D3] text-xl font-semibold">
            Satu donasi, satu harapan,
          </h2>
          <h2 className="text-[#FB8C2B] text-xl font-bold">
            Untuk dunia yang lebih bermakna
          </h2>

          <button className="mt-4 px-6 py-2 bg-[#1962F8] text-white rounded-full text-sm font-medium">
            Gerak Donasi
          </button>
        </div>
      </div>
    </section>

    {/* Donation Card section */}
    <section className="px-6 py-12 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Program Donasi</h2>
          <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Lihat Semua</a>
        </div>

        {/* Grid Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DonationCard />
          <DonationCard />
          <DonationCard />
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section>
    <FAQ/>
    </section>

    <section
      className="relative bg-cover bg-center min-h-[250px] flex items-center text-white"
      style={{
        backgroundImage: "url('/img/pahlawan.png')",
      }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Konten */}
      <div className="relative z-10 container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between">
        <div className="text-left max-w-xl">
          <h1 className="text-2xl md:text-4xl font-bold italic">
            Ulurkan Tangan, Selamatkan Harapan
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-200">
            Ada banyak jenis badan amal, mulai dari organisasi lokal hingga organisasi internasional besar. Anda bisa berdonasi kepada badan amal yang fokus pada tujuan tertentu, seperti kesejahteraan hewan.
          </p>
        </div>

        <div className="mt-6 md:mt-0">
          <a
            href="#"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition"
          >
            Bantu Sekarang
          </a>
        </div>
      </div>
    </section>

    <footer className="bg-white pt-10">
      <div className="bg-blue-600 text-white rounded-md mx-4 md:mx-10 p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Deskripsi */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">Salur.in</h2>
            <p className="text-sm leading-relaxed">
              Salur.in adalah sebuah website penyalur donasi yang memudahkan individu maupun organisasi
              untuk memberikan dan menggalang bantuan secara online. Mirip seperti Kitabisa, Salur.in
              berperan sebagai platform penghubung antara para donatur dan penerima bantuan, sehingga
              proses donasi menjadi lebih transparan, cepat, dan dapat diakses oleh siapa saja.
            </p>
          </div>

          {/* Link Navigasi */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <ul>
              <li className="mb-2"><a href="#">Tentang kami</a></li>
              <li className="mb-2"><a href="#">Komunitas</a></li>
              <li className="mb-2"><a href="#">Program Donasi</a></li>
              <li className="mb-2"><a href="#">Daftar Campaign</a></li>
              <li className="mb-2"><a href="#">Cara Donasi</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
            <ul>
              <li className="mb-2"><a href="#">Kebijakan Privasi</a></li>
              <li className="mb-2"><a href="#">Syarat & Ketentuan Penggunaan</a></li>
              <li className="mb-2"><a href="#">Kebijakan Donasi</a></li>
              <li className="mb-2"><a href="#">Laporan Keuangan</a></li>
              <li><a href="#">Hak Cipta</a></li>
            </ul>
            <ul>
              <li><a href="#">Informasi Legal</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer bawah */}
      <div className="text-sm text-center text-gray-500 mt-6 border-t pt-4 mx-4 md:mx-10">
        <p>© 2025 <span className="italic">Salur.in</span> – All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2 text-gray-600">
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </div>
    </footer>

    </div>
  );
};

export default Home;
