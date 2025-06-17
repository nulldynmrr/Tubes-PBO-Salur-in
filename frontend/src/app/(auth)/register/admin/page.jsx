"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/form-field/InputField";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "@/lib/utils/form-validator";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

const RegisterAdmin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const confirmPasswordMessage =
      formData.password !== formData.confirmPassword
        ? "Password tidak sama"
        : "";

    if (confirmPasswordMessage) {
      if (confirmPasswordMessage) {
        toast.error(confirmPasswordMessage, {
          toastId: "confirm-password-error",
        });
      }
      return;
    }

    // Jika validasi lolos
    setIsLoading(true);
    try {
      await authService.register(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        "admin"
      );
      toast.success("Registrasi berhasil!", { toastId: "register-success" });
      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Registrasi gagal. Silakan coba lagi.", {
        toastId: "register-failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          </div>
        </div>
      </div>

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
          </div>

          <form className="space-y-6" onSubmit={onSubmit}>
            <InputField
              id="name"
              name="name"
              label="Nama Lengkap"
              placeholder="Masukkan Nama Lengkap"
              value={formData.name}
              onChange={onChange}
              required
              validate={validateName}
            />

            <InputField
              id="email"
              name="email"
              label="Email"
              placeholder="Masukkan Email"
              value={formData.email}
              onChange={onChange}
              required
              validate={validateEmail}
            />

            <InputField
              id="password"
              name="password"
              label="Password"
              placeholder="Masukkan Password"
              value={formData.password}
              onChange={onChange}
              required
              validate={validatePassword}
            />

            <InputField
              id="confirmPassword"
              name="confirmPassword"
              label="Konfirmasi Password"
              placeholder="Konfirmasi Password"
              value={formData.confirmPassword}
              onChange={onChange}
              required
              validate={validatePassword}
            />

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg text-white font-mediaum bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all"
            >
              Register
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{" "}
              <Link
                href="/login/admin"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;
