"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import FAQ from "@/data/FAQ";
import Image from "next/image";
import PrimaryButton from "@/components/ui/button/PrimaryButton";
import { HandCoins, Users2, Megaphone } from "lucide-react";
import DonationCard from "@/components/card/DonationCard";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { dataCampaign } from "@/data/campaign";
import { dataUsers } from "@/data/users";
import { hitungPersentaseDonasi } from "@/lib/utils/campaign-helpers";
import { useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  //Connect BE
  const [dataCampaign, setDataCampaign] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/api/campaigns").then((res) => res.json()),
      fetch("http://localhost:8080/api/user-donasi").then((res) => res.json()),
    ])
      .then(([campaignData, userData]) => {
        setDataCampaign(campaignData);
        setDataUsers(userData);
      })
      .catch((err) => console.error("Error fetch data:", err));
  }, []);

  const donasiIds = new Set();
  dataUsers.forEach((user) => {
    user.donasi.forEach((donasi) => {
      donasiIds.add(donasi.id_donasi);
    });
  });
  const totDonatur = donasiIds.size;

  const [hoveredIndex, setHoveredIndex] = useState(0);

  const steps = [
    {
      title: "Mulai Kebaikanmu, Wujudkan Harapan Mereka",
      description:
        "Kami bantu kamu menyusun kampanye donasi dengan panduan langkah demi langkah. Tentukan tujuan, ceritakan kebutuhanmu, dan perbarui info kapan saja.",
      badgeColor: "#1962F8",
      cardTitle: "Wujudkan Harapan Mereka",
      cardDesc: "Jadi orang yang mendorong kebaikan dengan membuat campaign",
      cardImg: "/img/mulaicard1.jpeg", // ganti sesuai lokasi gambarmu
    },
    {
      title: "Sebarkan Ceritamu, Ajak Lebih Banyak Hati",
      description:
        "Bagikan tautan kampanye ke orang-orang terdekat dan media sosial. Manfaatkan fitur berbagi di dashboard untuk menjangkau lebih luas dan menyentuh lebih banyak jiwa.",
      badgeColor: "#A7C4F8",
      cardTitle: "Sebarkan Ceritamu",
      cardDesc: "Bagikan kampanye agar lebih banyak orang ikut membantu.",
      cardImg: "/img/mulaicard2.jpeg",
    },
    {
      title: "Terima Donasi Secara Aman & Cepat",
      description:
        "Masukkan informasi rekening atau ajak penerima manfaat mengisi datanya. Dana akan dikirim dengan sistem yang aman, cepat, dan transparan.",
      badgeColor: "transparent",
      textColor: "#1962F8",
      cardTitle: "Terima Donasi",
      cardDesc: "Pastikan data lengkap agar bantuan cepat tersalurkan.",
      cardImg: "/img/mulaicard3.jpg",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: (delay = 0) => ({
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut", delay },
    }),
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const zoomIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <>
      <Navbar />

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.4 }}
        variants={fadeInUp}
        className="relative pt-[64px] bg-[radial-gradient(ellipse_at_center,_#FCFCFF_0%,_#EFF2FF_45%,_#FCFDFF_100%)] px-6 md:px-[110px] py-16 container mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-0"
      >
        <motion.div
          variants={slideInLeft}
          className="mt-[100px] flex-1 flex flex-col justify-center md:justify-start md:items-start items-center text-center md:text-left"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-2xl md:text-4xl font-semibold leading-relaxed"
          >
            <span className="text-blue-300 roboto">Sekecil apapun </span>
            <span className="text-blue-600 font-bold roboto">
              Besar Artinya{" "}
            </span>
            <span className="text-blue-300 roboto">Bagi Mereka</span>
          </motion.h1>

          <motion.h2
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="mb-8 mt-2 text-lg md:text-2xl font-semibold text-black leading-relaxed"
          >
            Satu Klikmu Bisa Selamatkan Hidup
          </motion.h2>

          <motion.div variants={zoomIn} transition={{ delay: 0.4 }}>
            <PrimaryButton className="mt-2 w-[120px]" nextRoute="/donasi">
              Donasi
            </PrimaryButton>
          </motion.div>
        </motion.div>

        <motion.div
          variants={zoomIn}
          className="mt-[30px] flex-1 flex justify-center items-center relative min-h-[400px]"
        >
          {/* Lingkaran */}
          <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border-2 border-blue-100 rounded-full opacity-40 z-0" />
          <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] border border-blue-100 rounded-full opacity-30 z-0" />

          <motion.div
            className="relative z-10 flex flex-row gap-8 items-center"
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
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
              className="rounded-xl object-cover shadow-lg w-[400px] h-[190px]"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="bg-sky-50 py-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: (
                <HandCoins size={36} className="mx-auto text-blue-500 mb-2" />
              ),
              value: "13M",
              label: "Terkumpul",
            },
            {
              icon: <Users2 size={36} className="mx-auto text-blue-500 mb-2" />,
              value: totDonatur,
              label: "Pendonasi",
            },
            {
              icon: (
                <Megaphone size={36} className="mx-auto text-blue-500 mb-2" />
              ),
              value: "108",
              label: "Campaign",
            },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp}>
              {item.icon}
              <div className="text-3xl font-bold text-gray-800">
                {item.value}
              </div>
              <div className="text-base text-gray-500 mt-1">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="px-6 md:px-[110px] py-16 container mx-auto flex bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Gambar */}
          <motion.div className="w-full md:w-1/2" variants={fadeInRight}>
            <Image
              src="/img/tentangkami.jpg"
              alt="Tentang Kami"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg object-cover"
            />
          </motion.div>

          {/* Teks */}
          <motion.div className="w-full md:w-1/2" variants={fadeInLeft}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Tentang Kami
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Salur.in adalah platform donasi digital yang memudahkan siapa saja
              untuk menyalurkan bantuan secara aman, transparan, dan berdampak.
              Kami hadir sebagai jembatan antara mereka yang ingin membantu dan
              mereka yang membutuhkan, dengan menyediakan sistem penggalangan
              dana yang terpercaya untuk berbagai keperluan sosial, pendidikan,
              kesehatan, dan kemanusiaan. Melalui salur.in, kami mengajak
              masyarakat untuk menjadi bagian dari perubahan positif dengan
              semangat kolaborasi dan kepedulian.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <section className="bg-sky-50 py-16 md:px-[110px]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Mulai Kebaikanmu, Wujudkan Harapan Mereka
            </h2>

            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(index)}
              >
                <div
                  className="w-16 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{
                    backgroundColor: step.badgeColor,
                    color: step.textColor || "#fff",
                  }}
                >
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 relative">
            <div className="absolute top-4 left-4 w-full h-full bg-[#A7C4F8] rounded-lg rotate-[2deg]"></div>
            <div className="absolute top-2 left-2 w-full h-full bg-[#739FF6] rounded-lg rotate-[-2deg]"></div>
            <motion.div
              key={hoveredIndex} // agar animasi terjadi setiap index berubah
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              transition={{ duration: 0.5 }}
              className="relative bg-[#4285F4] text-white rounded-lg p-6 text-center shadow-lg z-10 space-y-4"
            >
              <div className="w-full h-96 relative rounded overflow-hidden">
                <Image
                  src={steps[hoveredIndex].cardImg}
                  alt={steps[hoveredIndex].cardTitle}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">
                {steps[hoveredIndex].cardTitle}
              </h3>
              <p className="text-sm">{steps[hoveredIndex].cardDesc}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        className="bg-white py-16 md:px-[110px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div className="flex-1" variants={fadeInUp}>
            <Image
              src="/img/anakpalestineflag.png"
              alt="Anak Palestina"
              width={500}
              height={500}
              className="rounded-xl object-cover w-full h-auto"
            />
          </motion.div>

          <motion.div
            className="flex-1 space-y-4 text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.h2
              className="text-[#3793F9] text-[20px] md:text-[35px] font-semibold"
              variants={fadeIn}
              custom={0}
            >
              Di balik tangan yang terbuka,
            </motion.h2>
            <motion.h2
              className="text-[#A7D0F9] text-[20px] md:text-[35px] font-semibold"
              variants={fadeIn}
              custom={0.2}
            >
              Tersimpan kasih tanpa suara
            </motion.h2>
            <motion.h2
              className="text-[#FDE6D3] text-[20px] md:text-[35px] font-semibold"
              variants={fadeIn}
              custom={0.4}
            >
              Satu donasi, satu harapan,
            </motion.h2>
            <motion.h2
              className="text-[#FB8C2B] text-[20px] md:text-[32px] font-bold"
              variants={fadeIn}
              custom={0.6}
            >
              Untuk dunia yang lebih bermakna
            </motion.h2>

            <motion.div variants={fadeIn} custom={0.8}>
              <PrimaryButton className="mt-4" nextRoute="/donasi">
                Gerak Donasi
              </PrimaryButton>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

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
