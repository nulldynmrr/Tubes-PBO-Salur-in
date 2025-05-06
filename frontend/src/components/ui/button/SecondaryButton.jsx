"use client";
import React from "react";
import { useRouter } from "next/navigation";

const SecondaryButton = ({ nextRoute, children }) => {
  const router = useRouter();

  const handleNext = () => {
    router.push(nextRoute);
  };

  return (
    <button
      onClick={handleNext}
      className="inline-block min-w-[200px] px-6 py-2 rounded-3xl text-center text-white bg-[#090909]
                 hover:bg-[#1f1f1f] 
                 active:bg-[#333333] transition duration-200 "
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
