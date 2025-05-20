"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/form-field/InputField";
import { validateEmail, validateName, validatePassword } from "@/lib/utils/form-validator";
import Image from "next/image";
import { dataCampaign } from "@/data/campaign";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    country: "",
    message: "",
  });

  const handleChange = (e) => {
    const { email, value } = e.target;
    setFormData((prev) => ({ ...prev, [email]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

<<<<<<< HEAD:frontend/src/app/auth/login/login/page.jsx
    if (!emailError && !passwordError) {
      const user = dataKampanye.find(
        (u) => u.email === formData.email && u.password === formData.password
=======
    //api
    if (!nameError && !passwordError) {
      try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            password: formData.password,
          }),
        });

        if (response.ok) {
          router.push("/donasi");
        } else {
          const errorText = await response.text();
          toast.error(errorText || "Login gagal", {
            toastId: "login-failed",
          });
        }
      } catch (error) {
        toast.error("Gagal menghubungi server", {
          toastId: "network-error",
        });
      }
    } else {
      if (nameError && !toast.isActive("name-error")) {
        toast.error(nameError, { toastId: "name-error" });
      }
      if (passwordError && !toast.isActive("password-error")) {
        toast.error(passwordError, { toastId: "password-error" });
      }
    }
    
    //pakai data js
    if (!nameError && !passwordError) {
      const user = dataCampaign.find(
        (u) => u.nama === formData.name && u.password === formData.password
>>>>>>> 6d841d0cf62e6c1d799e99c7c445de5f8cb97962:frontend/src/app/(auth)/login/page.jsx
      );

      if (user) {
        router.push("/donasi");
      } else {
        if (!toast.isActive("user-not-registered")) {
          toast.error("User belum terdaftar, silakan signup dulu.", {
            toastId: "user-not-registered",
            autoClose: 3000,
          });
        }
      }
    } else {
      if (nameError && !toast.isActive("name-error")) {
        toast.error(nameError, { toastId: "name-error", autoClose: 2000 });
      }
      if (passwordError && !toast.isActive("password-error")) {
        toast.error(passwordError, {
          toastId: "password-error",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="md:min-h-screen flex flex-col md:flex-row">
      <div className="md:w-[48%] bg-blue-600 text-white flex flex-col items-center justify-center p-10">
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

      <div className="md:w-[52%] my-12 md:mt-0 flex items-center justify-center px-4 md:px-[150px] ">
        <div className="w-full">
          <h1 className="text-4xl font-bold mb-2">LOGO</h1>
          <h2 className="text-xl font-semibold">Hola, Selamat Datang!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Mari lanjutkan kebaikan. Dunia butuh lebih banyak orang baik seperti
            kamu.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
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

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          <ToastContainer />
          <p className="mt-4 text-sm text-center">
            Belum punya akun?
            <a
              className="pl-1 text-blue-600 cursor-pointer hover:underline underline-none"
              href="/register/campaign"
            >
              Daftar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
