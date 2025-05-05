"use client";

import React, { useState } from "react";
import Link from "next/link";
import SecondaryButton from "./ui/button/SecondaryButton";
import { FaBars } from "react-icons/fa";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-gray-50 border-b-2 shadow-sm z-50">
      <div className="px-6 md:px-[110px] py-4 container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          Salur.in
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-gray-800 focus:outline-none"
          >
            <FaBars />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-black">
            Tentang Kami
          </Link>
          <Link href="/" className="text-gray-700 hover:text-black">
            Komunitas
          </Link>
          <SecondaryButton nextRoute="/">Daftar Campaign</SecondaryButton>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-50 py-4 px-6 border-t flex flex-col gap-4 z-40">
          <Link href="/" className="text-gray-700 hover:text-black">
            Tentang Kami
          </Link>
          <Link href="/" className="text-gray-700 hover:text-black">
            Komunitas
          </Link>
          <SecondaryButton nextRoute="/">Daftar Campaign</SecondaryButton>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
