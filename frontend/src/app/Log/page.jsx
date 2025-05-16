"use client"
import React, { useState } from "react";
import InputField from "@/components/ui/form-field/InputField";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/lib/utils/form-validator";
import Image from "next/image";

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
      console.log("Form submitted:", formData);
    } else {
      console.log("Form has errors");
    }
  };
  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-blue-600 rounded-2xl p-12 w-[350px]  text-center text-white shadow-lg">
        <h1 className="text-2xl font-semibold mb-2">Mari Berbagi</h1>
        <p className="mb-6">Wujudkan Harapan Bersama</p>
        <div className="w-72 h-72 relative">
          <Image
            src="/img/ilustrasi 1.svg"
            alt="Ilustrasi Donasi"
            width={300}
            height={300}

            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Kanan - Form Login */}
      <div className="w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold mb-2">LOGO</h1>
          <h2 className="text-xl font-semibold">Hola, Selamat Datang!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Mari lanjutkan kebaikan. Dunia butuh lebih banyak orang baik seperti kamu.
          </p>

          <form className="space-y-4" onClick={handleSubmit}>
            <InputField
              id="email"
              name="email"
              label="Email"
              placeholder="Masukkan Email"
              value={formData.email}
              onChange={handleChange}
              required
              validate={validateEmail}
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
            Belum punya akun?{" "}

            <span className="text-blue-600 cursor-pointer hover:underline">Daftar</span>

          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
