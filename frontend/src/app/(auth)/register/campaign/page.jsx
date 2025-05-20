"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/form-field/InputField";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "@/lib/utils/form-validator";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

const RegisterCampaign = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }
    if (!formData.organization) {
      newErrors.organization = "Nama organisasi harus diisi";
    }
    if (!formData.phone) {
      newErrors.phone = "Nomor telepon harus diisi";
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
      await authService.registerCampaign({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        organization: formData.organization,
        phone: formData.phone,
      });
      toast.success("Registrasi berhasil!");
      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Registrasi gagal. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="md:w-[48%] bg-blue-600 text-white flex flex-col items-center justify-center p-10 relative overflow-hidden">
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

      <div className="md:w-[52%] flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">LOGO</h1>

            <p className="text-gray-500 mt-2">
              Mari buat campaign donasi untuk membantu sesama
            </p>
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
              id="organization"
              name="organization"
              label="Nama Organisasi"
              type="text"
              placeholder="Masukkan nama organisasi"
              value={formData.organization}
              onChange={handleChange}
              required
              error={errors.organization}
            />

            <InputField
              id="phone"
              name="phone"
              label="Nomor Telepon"
              type="tel"
              placeholder="Masukkan nomor telepon"
              value={formData.phone}
              onChange={handleChange}
              required
              error={errors.phone}
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
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all
                ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                "Daftar"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{" "}
              <Link
                href="/login"
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

export default RegisterCampaign;
