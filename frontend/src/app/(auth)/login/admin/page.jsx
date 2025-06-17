"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/form-field/InputField";
<<<<<<< HEAD
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/lib/utils/form-validator";
import Link from "next/link";
import Image from "next/image";
import { dataCampaign } from "@/data/campaign";
=======
import { validateEmail, validatePassword } from "@/lib/utils/form-validator";
import Link from "next/link";
import Image from "next/image";
import { dataAdmin } from "@/data/admin";
>>>>>>> 44c46147c3a8b5b92e15f23789ee508033e2bbe2
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authService } from "@/services/auth.service";
import Head from "next/head";

<<<<<<< HEAD
const Login = () => {
=======
const LoginAdmin = () => {
>>>>>>> 44c46147c3a8b5b92e15f23789ee508033e2bbe2
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

<<<<<<< HEAD
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
      const data = await authService.loginAdmin(
        formData.email,
        formData.password
      );
      authService.setAuthToken(data.token);
      toast.success("Login berhasil!", { toastId: "login-success" });
      router.push("/admin/dashboard");
    } catch (error) {
      // Jika API gagal, coba login dengan data lokal
      const user = dataCampaign.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (user) {
        toast.success("Login berhasil!", { toastId: "login-success" });
        router.push("/donasi");
=======
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await authService.login(formData.email, formData.password, "admin");
      authService.setAuthToken(data.token);
      toast.success("Login Admin berhasil!", { toastId: "login-success" });
      router.push("/admin/dashboard");
    } catch (error) {
      if (
        formData.email === dataAdmin.email &&
        formData.password === dataAdmin.password
      ) {
        // Simulasi penyimpanan token lokal
        authService.setAuthToken("dummy-token-admin");
        toast.success("Login Admin berhasil!", {
          toastId: "login-success",
        });
        router.push("/admin/dashboard");
>>>>>>> 44c46147c3a8b5b92e15f23789ee508033e2bbe2
      } else {
        toast.error("Email atau password salah", { toastId: "login-error" });
      }
    }
  };

  return (
    <>
      <Head>
<<<<<<< HEAD
        <title>Login - Salurin</title>
        <meta
          name="description"
          content="Login ke akun Salurin Anda untuk mengakses fitur donasi dan campaign."
=======
        <title>Login Admin - Salurin</title>
        <meta
          name="description"
          content="Login Admin ke akun Salurin Anda untuk mengakses fitur donasi dan campaign."
>>>>>>> 44c46147c3a8b5b92e15f23789ee508033e2bbe2
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
<<<<<<< HEAD
              <p className="text-gray-500 mt-2">Login menggunakan akun admin</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
=======
              <p className="text-gray-500 mt-2">
                Login Admin untuk mengakses akun Anda
              </p>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
>>>>>>> 44c46147c3a8b5b92e15f23789ee508033e2bbe2
              <InputField
                id="email"
                name="email"
                label="Email"
                placeholder="Masukkan Email"
                value={formData.email}
<<<<<<< HEAD
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
              <p className="text-sm text-gray-600"></p>
=======
                onChange={onChange}
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
                onChange={onChange}
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
                  href="/register/admin"
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  Daftar
                </Link>
              </p>
>>>>>>> 44c46147c3a8b5b92e15f23789ee508033e2bbe2
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default LoginAdmin;
>>>>>>> 44c46147c3a8b5b92e15f23789ee508033e2bbe2
