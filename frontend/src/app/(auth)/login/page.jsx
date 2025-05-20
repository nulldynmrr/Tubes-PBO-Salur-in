"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/form-field/InputField";
import { validateName, validatePassword } from "@/lib/utils/form-validator";
import Image from "next/image";
import { dataCampaign } from "@/data/campaign";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authService } from "@/services/auth.service";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const passwordError = validatePassword(formData.password);

    if (nameError || passwordError) {
      if (nameError) {
        toast.error(nameError, { toastId: "name-error" });
      }
      if (passwordError) {
        toast.error(passwordError, { toastId: "password-error" });
      }
      return;
    }

    try {
      // Coba login dengan API menggunakan auth service
      const data = await authService.login(formData.name, formData.password);
      authService.setAuthToken(data.token);
      toast.success("Login berhasil!", { toastId: "login-success" });
      router.push("/donasi");
    } catch (error) {
      // Jika API gagal, coba login dengan data lokal
      const user = dataCampaign.find(
        (u) => u.nama === formData.name && u.password === formData.password
      );

      if (user) {
        authService.setAuthToken("demo_token");
        toast.success("Login berhasil!", { toastId: "login-success" });
        router.push("/donasi");
      } else {
        toast.error("Username atau password salah", {
          toastId: "login-failed",
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

      <div className="md:w-[52%] my-12 md:mt-0 flex items-center justify-center px-4 md:px-[150px]">
        <div className="w-full">
          <h1 className="text-4xl font-bold mb-2">LOGO</h1>
          <h2 className="text-xl font-semibold">Hola, Selamat Datang!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Mari lanjutkan kebaikan. Dunia butuh lebih banyak orang baik seperti
            kamu.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
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
              placeholder="Masukkan Password"
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
            Belum punya akun?{" "}
            <a
              href="/register/campaign"
              className="text-blue-600 hover:underline"
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
