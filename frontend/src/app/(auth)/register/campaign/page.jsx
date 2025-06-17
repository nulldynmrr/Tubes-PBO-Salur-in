"use client";
import React, { useState } from "react";
import InputField from "@/components/ui/form-field/InputField";
import {
  validateForm as runFormValidation,
  validateName,
  validateEmail,
  validatePassword,
<<<<<<< HEAD
=======
  validateName,
>>>>>>> 44c46147c3a8b5b92e15f23789ee508033e2bbe2
  validatePhone,
} from "@/lib/utils/form-validator";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const RegisterCampaign = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    phone: "",
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

<<<<<<< HEAD
  const validateForm = () => {
    const schema = {
      name: "name",
      email: "email",
      password: "password",
      confirmPassword: {
        type: "match",
        options: { fieldToMatch: formData.password },
      },
      organization: "required",
      phone: "phone",
    };

    const validationErrors = runFormValidation(formData, schema);
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
=======
  const onSubmit = async (e) => {
>>>>>>> 44c46147c3a8b5b92e15f23789ee508033e2bbe2
    e.preventDefault();

    const nameMessage = validateName(formData.name);
    const emailMessage = validateEmail(formData.email);
    const passwordMessage = validatePassword(formData.password);
    const confirmPasswordMessage =
      formData.password !== formData.confirmPassword
        ? "Password tidak sama"
        : "";
    const organizationMessage = !formData.organization
      ? "Nama organisasi harus diisi"
      : "";
    const phoneMessage = !formData.phone ? "Nomor telepon harus diisi" : "";

    if (
      nameMessage ||
      emailMessage ||
      passwordMessage ||
      confirmPasswordMessage ||
      organizationMessage ||
      phoneMessage
    ) {
      if (nameMessage) {
        toast.error(nameMessage, { toastId: "name-error" });
      }
      if (emailMessage) {
        toast.error(emailMessage, { toastId: "email-error" });
      }
      if (passwordMessage) {
        toast.error(passwordMessage, { toastId: "password-error" });
      }
      if (confirmPasswordMessage) {
        toast.error(confirmPasswordMessage, {
          toastId: "confirm-password-error",
        });
      }
      if (organizationMessage) {
        toast.error(organizationMessage, { toastId: "organization-error" });
      }
      if (phoneMessage) {
        toast.error(phoneMessage, { toastId: "phone-error" });
      }
      return;
    }

    setIsLoading(true);
    try {
<<<<<<< HEAD
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        organization: formData.organization,
        phone: formData.phone,
        role: "OWNER",
      });
      toast.success("Registrasi berhasil!");
=======
      await authService.register(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          organization: formData.organization,
          phone: formData.phone,
        },
        "admin"
      );
      toast.success("Registrasi berhasil!", { toastId: "register-success" });
>>>>>>> 44c46147c3a8b5b92e15f23789ee508033e2bbe2
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
    <>
      <Head>
        <title>Daftar Campaign Donasi - Salurin</title>
        <meta
          name="description"
          content="Daftarkan diri Anda untuk membuat campaign donasi dan bantu sesama dengan Salurin."
        />
      </Head>

      <div className="flex">
        {/* Left Side - Fixed */}
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

        {/* Right Side - Scrollable */}
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
                Mari buat campaign donasi untuk membantu sesama
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
                id="organization"
                name="organization"
                label="Nama Organisasi"
                placeholder="Masukkan Nama Organisasi"
                value={formData.organization}
                onChange={onChange}
                required
                validate={validateName}
              />

              <InputField
                id="phone"
                name="phone"
                label="Nomor Telepon"
                placeholder="Masukkan Nomor Telepon"
                value={formData.phone}
                onChange={onChange}
                required
                validate={validatePhone}
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

              <InputField
                id="confirmPassword"
                name="confirmPassword"
                label="Konfirmasi Password"
                type="password"
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
                  href="/login/campaign"
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  Login
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

export default RegisterCampaign;
