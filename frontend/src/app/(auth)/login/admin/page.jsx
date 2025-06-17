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

const RegisterAdmin = () => {
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

  const validateForm = () => {
    const newErrors = {};
    const nameError = validateName(formData.name);
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
      toast.error(error.message || "Registrasi gagal. Silakan coba lagi.");
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

export default RegisterAdmin;
