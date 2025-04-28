"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home"); // Bisa pakai replace supaya history browser lebih bersih
  }, [router]);

  return null;
}
