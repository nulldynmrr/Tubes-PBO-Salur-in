"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/campaign/dashboard");
    }, 4000);

    localStorage.setItem("withdrawalStatus", "completed");

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-sm text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 animate-bounce" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Penarikan Berhasil!
        </h1>
        <p className="text-gray-600 mb-8">
          Dana donasi telah berhasil ditarik dan akan segera ditransfer ke
          rekening Anda. Status penarikan telah disimpan.
        </p>
        <button
          onClick={() => router.push("/campaign/dashboard")}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
