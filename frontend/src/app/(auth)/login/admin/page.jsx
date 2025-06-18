"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/form-field/InputField";
import { validateEmail, validatePassword } from "@/lib/utils/form-validator";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authService } from "@/services/auth.service";
import Head from "next/head";

const LoginAdmin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const emailMessage = validateEmail(formData.email);
      const passwordMessage = validatePassword(formData.password);

      if (emailMessage) {
        toast.error(emailMessage, { toastId: "email-error" });
        setIsLoading(false);
        return;
      }
      if (passwordMessage) {
        toast.error(passwordMessage, { toastId: "password-error" });
        setIsLoading(false);
        return;
      }

      const response = await authService.login(
        formData.email,
        formData.password,
        "admin"
      );

      if (response.user) {
        toast.success("Login Admin berhasil!", { toastId: "login-success" });
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Email atau password salah", {
        toastId: "login-error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login Admin - Salurin</title>
        <meta
          name="description"
          content="Login Admin ke akun Salurin Anda untuk mengakses fitur donasi dan campaign."
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
                Login Admin untuk mengakses akun Anda
              </p>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
              <InputField
                id="email"
                name="email"
                label="Email"
                placeholder="Masukkan Email"
                value={formData.email}
                onChange={onChange}
                required
                validate={validateEmail}
                disabled={isLoading}
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
                disabled={isLoading}
              />

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
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
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default LoginAdmin;
