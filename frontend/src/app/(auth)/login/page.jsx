"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/form-field/InputField";
import { validateName, validatePassword } from "@/lib/utils/form-validator";
import Image from "next/image";
import { dataKampanye } from "@/data/campaign";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    country: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const passwordError = validatePassword(formData.password);

    if (!nameError && !passwordError) {
      const user = dataKampanye.find(
        (u) => u.nama === formData.name && u.password === formData.password
      );

      if (user) {
        console.log("Login berhasil: ", user);
      } else {
        console.log("Login gagal: nama atau password salah");
      }
    } else {
      console.log("Form has errors");
    }
  };
  return (
    <div className="min-h-screen flex">
      <div className="w-[48%] bg-blue-600 text-white flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-semibold mb-2">Mari Berbagi</h1>
        <p className="mb-12 text-xl">Wujudkan Harapan Bersama</p>
        <div className="w-96 h-96 relative">
          <Image
            src="/img/ilustrasi 1.svg"
            alt="Ilustrasi Donasi"
            width={600}
            height={600}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="w-[52%] flex items-center justify-center px-[150px] ">
        <div className="w-full">
          <h1 className="text-4xl font-bold mb-2">LOGO</h1>
          <h2 className="text-xl font-semibold">Hola, Selamat Datang!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Mari lanjutkan kebaikan. Dunia butuh lebih banyak orang baik seperti
            kamu.
          </p>

          <form className="space-y-4" onClick={handleSubmit}>
            <InputField
              id="name"
              name="name"
              label="Nama Lengkap"
              placeholder="Masukkan Nama Lengkap"
              value={formData.name}
              onChange={handleChange}
              required
              validate={validateName}
            />
            <InputField
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Buat Password"
              value={formData.password}
              onChange={handleChange}
              required
              validate={validatePassword}
            />

            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            Belum punya akun?
            <span className="pl-1 text-blue-600 cursor-pointer hover:underline">
              Daftar
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
