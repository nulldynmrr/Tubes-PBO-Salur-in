"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/form-field/InputField";
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> e5c05a497198f65b6603f4b6a5e5addf0400dedf
import {
  validateEmail,
  validatePassword,
  validateName,
} from "@/lib/utils/form-validator";
<<<<<<< HEAD
=======
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
>>>>>>> e5c05a497198f65b6603f4b6a5e5addf0400dedf
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

<<<<<<< HEAD
const RegisterAdmin = () => {
=======
<<<<<<< HEAD
const Login = () => {
=======
const LoginAdmin = () => {
>>>>>>> 44c46147c3a8b5b92e15f23789ee508033e2bbe2
>>>>>>> e5c05a497198f65b6603f4b6a5e5addf0400dedf
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

<<<<<<< HEAD
  const validateForm = () => {
    const newErrors = {};
    const nameError = validateName(formData.name);
=======
<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();

>>>>>>> e5c05a497198f65b6603f4b6a5e5addf0400dedf
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak sama";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await authService.registerAdmin({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast.success("Registrasi berhasil!");
      router.push("/login");
    } catch (error) {
<<<<<<< HEAD
      toast.error(error.message || "Registrasi gagal. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
=======
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
>>>>>>> e5c05a497198f65b6603f4b6a5e5addf0400dedf
    }
  };

  return (
<<<<<<< HEAD
    <div className="h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="md:w-[48%] bg-blue-600 text-white flex flex-col items-center justify-center p-10 relative overflow-hidden h-screen">
        <div className="absolute inset-0 bg-blue-700 opacity-10"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Mari Berbagi</h1>
          <p className="text-xl mb-8">Wujudkan Harapan Bersama</p>
          <div className="w-96 h-96 relative">
            <Image
              src="/img/ilustrasi 1.svg"
              alt="Ilustrasi Donasi"
              width={600}
              height={600}
              className="w-full h-full object-contain"
              priority
            />
=======
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
>>>>>>> e5c05a497198f65b6603f4b6a5e5addf0400dedf
          </div>
        </div>
      </div>

<<<<<<< HEAD
      
      <div className="md:w-[52%] flex items-center justify-center p-8 md:p-16 overflow-hidden">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="text-lg font-semibold">
              <Image
                src="/img/logo_salurin.svg"
                alt="Salurin Logo"
                width={160}
                height={80}
                priority
              />
            </Link>
            <p className="text-gray-500 mt-2">
              Mari bergabung untuk mengelola donasi dengan lebih baik
            </p>
=======
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
>>>>>>> e5c05a497198f65b6603f4b6a5e5addf0400dedf
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              id="name"
              name="name"
              label="Nama Lengkap"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={formData.name}
              onChange={handleChange}
              required
              error={errors.name}
            />

            <InputField
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="Masukkan email"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
            />

            <InputField
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={handleChange}
              required
              error={errors.password}
            />

            <InputField
              id="confirmPassword"
              name="confirmPassword"
              label="Konfirmasi Password"
              type="password"
              placeholder="Konfirmasi password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              error={errors.confirmPassword}
            />

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg text-white font-mediaum bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all"
              >
                Login
              </button>
            </form>

          
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

<<<<<<< HEAD
export default RegisterAdmin;
=======
<<<<<<< HEAD
export default Login;
=======
export default LoginAdmin;
>>>>>>> 44c46147c3a8b5b92e15f23789ee508033e2bbe2
>>>>>>> e5c05a497198f65b6603f4b6a5e5addf0400dedf
