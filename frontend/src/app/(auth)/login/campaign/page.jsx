"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/form-field/InputField";
import { validateEmail, validatePassword } from "@/lib/utils/form-validator";
import Link from "next/link";
import Image from "next/image";
import { dataCampaign as dummyData } from "@/data/campaign";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authService } from "@/services/auth.service";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

const LoginCampaign = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Try to login with backend first
      try {
        const response = await authService.login(email, password, "campaign");
        if (response) {
          // Store user data from BE
          localStorage.setItem("user", JSON.stringify(response));
          toast.success("Login berhasil!");
          setTimeout(() => {
            router.push("/campaign/dashboard");
          }, 1000);
        }
      } catch (apiErr) {
        console.warn("API login failed, using dummy data:", apiErr);
        toast.success("Login berhasil!");

        // Fallback to dummy data login
        const campaignUser = dummyData.find(
          (item) => item.email === email && item.password === password
        );

        if (campaignUser) {
          // Store dummy user data
          const userData = {
            name: campaignUser.namaCampaign,
            email: campaignUser.email,
            role: "campaign",
            id: campaignUser.id_donasi,
          };
          localStorage.setItem("user", JSON.stringify(userData));

          // Store dummy campaign data if not exists
          if (!localStorage.getItem("dataCampaign")) {
            localStorage.setItem("dataCampaign", JSON.stringify(dummyData));
          }

          setTimeout(() => {
            router.push("/campaign/dashboard");
          }, 1000);
        } else {
          toast.error("Email atau password salah");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login Campaign - Salurin</title>
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
                Login Campaign untuk mengakses akun Anda
              </p>
            </div>

            <Toaster position="top-right" />

            <form className="space-y-6" onSubmit={onSubmit}>
              <InputField
                id="email"
                name="email"
                label="Email"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                validate={validateEmail}
              />
              <InputField
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                validate={validatePassword}
              />

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg text-white font-mediaum bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </div>
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

export default LoginCampaign;
