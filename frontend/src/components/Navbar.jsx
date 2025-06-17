"use client";

import React, { useState } from "react";
import Link from "next/link";
import SecondaryButton from "./ui/button/SecondaryButton";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { authService } from "@/services/auth.service";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isCampaign = pathname.startsWith("/campaign");
  const isDonor = pathname.startsWith("/donor");
  const isDashboard = pathname === "/campaign/dashboard";
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
  };

  const renderNavLinks = () => {
    if (isAdmin || isCampaign) {
      return (
        <>
          {!isDashboard && (
            <Link
              href="/campaign/dashboard"
              className="text-gray-700 hover:text-black"
            >
              Dashboard
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-black"
          >
            Logout
          </button>
        </>
      );
    }

    if (isDonor) {
      return (
        <>
          <Link
            href="/donor/donations"
            className="text-gray-700 hover:text-black"
          >
            Donasi
          </Link>
          <Link
            href="/donor/history"
            className="text-gray-700 hover:text-black"
          >
            Riwayat Donasi
          </Link>
          <Link
            href="/donor/profile"
            className="text-gray-700 hover:text-black"
          >
            Profil
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-black"
          >
            Logout
          </button>
        </>
      );
    }

    return (
      <>
        <Link href="/" className="text-gray-700 hover:text-black">
          Tentang Kami
        </Link>
        <Link href="/" className="text-gray-700 hover:text-black">
          Komunitas
        </Link>
        {!user && (
          <SecondaryButton nextRoute="/register/campaign">
            Daftar Campaign
          </SecondaryButton>
        )}
        {user && !isDashboard && (
          <Link
            href="/campaign/dashboard"
            className="text-gray-700 hover:text-black"
          >
            Dashboard
          </Link>
        )}
      </>
    );
  };

  return (
    <nav className="fixed w-full bg-gray-50 border-b-2 shadow-sm z-50">
      <div className="px-6 md:px-[110px] py-4 container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          <Image
            src="/img/logo_salurin.svg"
            alt="Salurin Logo"
            width={120}
            height={40}
            priority
          />
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
          {renderNavLinks()}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-50 py-4 px-6 border-t flex flex-col gap-4 z-40">
          {renderNavLinks()}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
