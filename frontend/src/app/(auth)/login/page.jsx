"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/form-field/InputField";
import { validateEmail, validateName, validatePassword } from "@/lib/utils/form-validator";
import Link from "next/link";
import Image from "next/image";
import { dataCampaign } from "@/data/campaign";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authService } from "@/services/auth.service";
import Head from "next/head";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      if (emailError) {
        toast.error(emailError, { toastId: "email-error" });
      }
      if (passwordError) {
        toast.error(passwordError, { toastId: "password-error" });
      }
      return;
    }

    try {
      // Coba login dengan API menggunakan auth service
      const data = await authService.login(formData.email, formData.password);
      authService.setAuthToken(data.token);
      toast.success("Login berhasil!", { toastId: "login-success" });
      router.push("/donasi");
    } catch (error) {
      // Jika API gagal, coba login dengan data lokal
      const user = dataCampaign.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (user) {
        toast.success("Login berhasil!", { toastId: "login-success" });
        router.push("/donasi");
      } else {
        toast.error("Email atau password salah", { toastId: "login-error" });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Login - Salurin</title>
        <meta
          name="description"
          content="Login ke akun Salurin Anda untuk mengakses fitur donasi dan campaign."
        />
      </Head>

      <div className="flex">
        <div className="hidden md:flex fixed h-screen w-[48%] bg-blue-600 text-white items-center justify-center p-10 overflow-hidden">
          <div className="absolute inset-0 bg-blue-700 opacity-10"></div>
          <div className="relative z-10 text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Mari Berbagi
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              Wujudkan Harapan Bersama
            </p>
            <div className="w-96 h-96 relative mx-auto">
              <Image
                src="/img/ilustrasi 1.svg"
                alt="Ilustrasi donasi bersama Salurin"
                width={600}
                height={600}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="w-full md:ml-[48%] min-h-screen overflow-y-auto flex items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <Image
                  src="/img/logo_salurin.svg"
                  alt="Logo Salurin"
                  width={160}
                  height={80}
                  priority
                />
              </Link>
              <p className="text-gray-500 mt-2">
                Login untuk mengakses akun Anda
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
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
                placeholder="Masukkan Password"
                value={formData.password}
                onChange={handleChange}
                required
                validate={validatePassword}
              />

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg text-white font-mediaum bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Belum punya akun?{" "}
                <Link
                  href="/register/campaign"
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  Daftar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
