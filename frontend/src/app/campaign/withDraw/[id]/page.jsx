"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateCreditCard } from "@/lib/utils/form-validator";

export default function WithdrawPage({ params }) {
  const [nomorRekening, setNomorRekening] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateCreditCard(nomorRekening);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/campaign/success");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4 text-center">Tarik Donasi</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nomorRekening"
              className="block text-sm font-medium mb-1"
            >
              Nomor Rekening
            </label>
            <input
              type="text"
              id="nomorRekening"
              value={nomorRekening}
              onChange={(e) => setNomorRekening(e.target.value)}
              required
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                error
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Masukkan nomor rekening"
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Cairkan Dana"}
          </button>
        </form>
      </div>
    </div>
  );
}
