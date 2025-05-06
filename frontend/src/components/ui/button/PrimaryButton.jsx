"use client";
import React from "react";
import { useRouter } from "next/navigation";

const PrimaryButton = ({ nextRoute, children }) => {
  const router = useRouter();

  const handleNext = () => {
    router.push(nextRoute);
  };

  return (
    <button
      onClick={handleNext}
      className="inline-block min-w-[200px] px-6 py-2 rounded-3xl text-center text-white bg-[#1962F8] hover:bg-[#1554d6] active:bg-[#0e3ea6] transition duration-200"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
