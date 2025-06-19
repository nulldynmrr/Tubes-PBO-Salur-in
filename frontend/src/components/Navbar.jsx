"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SecondaryButton from "./ui/button/SecondaryButton";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const Navbar = ({ hideLogout = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  const isAdmin =
    pathname.startsWith("/admin") || pathname.startsWith("/dashboard/admin");
  const isLoggedIn =
    isAdmin ||
    pathname.startsWith("/owner") ||
    pathname.startsWith("/campaign");

  const handleLogout = () => {
    localStorage.clear();
    if (isAdmin) {
      window.location.href = "/login/admin";
    } else {
      window.location.href = "/home";
    }
  };

  const renderNavLinks = () => {
    if (hideLogout) return null;

    if (isLoggedIn) {
      return (
        <>
          {!isDashboard &&
            !pathname.startsWith("/admin/dashboard") &&
            !pathname.startsWith("/admin/detail-campaign") && (
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

    return (
      <div className="flex gap-4">
        <SecondaryButton nextRoute="/login/owner">Login</SecondaryButton>
        <SecondaryButton nextRoute="/register/owner">
          Daftar Campaign
        </SecondaryButton>
      </div>
    );
  };

  if (isLoading) {
    return null;
  }

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
