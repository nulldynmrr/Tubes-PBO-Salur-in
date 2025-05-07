"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import InputField from "@/components/ui/form-field/InputField";
import TextAreaField from "@/components/ui/form-field/TextAreaField";
import SelectField from "@/components/ui/form-field/SelectField";
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
} from "@/lib/utils/form-validator";
import PrimaryButton from "@/components/ui/button/PrimaryButton";

import Table from "@/components/ui/table";
import CardAccordion from "@/components/card/CardAccordion";

const data = [
  { id: 1, nama: "Ayu", status: "Accepted" },
  { id: 2, nama: "Budi", status: "Rejected" },
  { id: 3, nama: "Citra", status: "Pending" },
  { id: 4, nama: "Dedi", status: "Accepted" },
];

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    country: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const passwordError = validatePassword(formData.password);

    if (!nameError && !emailError && !phoneError && !passwordError) {
      console.log("Form submitted:", formData);
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div>
      <Navbar />

      <h1 className="text-2xl font-bold mb-6">Form</h1>

      <form
        className="space-y-6 px-6 md:px-[110px] my-[100px]"
        onSubmit={handleSubmit}
      >
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
          id="email"
          name="email"
          label="Alamat Email"
          type="email"
          placeholder="Masukkan Email Anda"
          value={formData.email}
          onChange={handleChange}
          required
          validate={validateEmail}
        />

        <InputField
          id="phone"
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="Masukkan Nomor Telepon Anda"
          value={formData.phone}
          onChange={handleChange}
          validate={validatePhone}
        />

        <InputField
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Buat Password"
          value={formData.password}
          onChange={handleChange}
          required
          validate={validatePassword}
        />

        <SelectField
          id="country"
          name="country"
          label="Negara"
          value={formData.country}
          onChange={handleChange}
          options={[
            { value: "usa", label: "United States" },
            { value: "canada", label: "Canada" },
            { value: "uk", label: "United Kingdom" },
            { value: "australia", label: "Australia" },
            { value: "germany", label: "Germany" },
          ]}
          placeholder="Pilih Negara"
          required
          validate={(value) => (value ? "" : "Mohon isi negara")}
        />

        <TextAreaField
          id="message"
          name="message"
          label="Pesan"
          placeholder="Masukkan Pesan"
          value={formData.message}
          onChange={handleChange}
          rows={4}
        />

        <PrimaryButton
          type="submit"
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
        >
          Submit
        </PrimaryButton>
      </form>
      <Table data={data} />
      <CardAccordion className="mt-8" />
    </div>
  );
};

export default Form;
