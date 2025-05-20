import React from "react";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar className="fixed" />
      <div className="pt-[80px]">{children}</div>
    </>
  );
}
