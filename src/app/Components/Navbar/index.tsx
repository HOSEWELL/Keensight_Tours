"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        event.target !== document.getElementById("menu-icon")
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeClass = (path: string) =>
    pathname === path
      ? "text-[#03624C] border-b-2 border-[#03624C]"
      : "text-gray-700 hover:text-[#03624C] transition";

  return (
    <nav className="sticky top-0 z-50 bg-[#F0FDF4]/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-1 px-3">

        {/* Logo */}
        <Link href="/home">
          <Image
            src="/logo.png"
            width={120}
            height={40}
            alt="SafariDesk Logo"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/home" className={activeClass("/home")}>
            Home
          </Link>

          <Link href="/tours" className={activeClass("/tours")}>
            Tours
          </Link>

          <Link href="/destinations" className={activeClass("/destinations")}>
            Destinations
          </Link>

          <Link href="/about" className={activeClass("/about")}>
            About
          </Link>

          <Link href="/contact" className={activeClass("/contact")}>
            Contact
          </Link>
        </div>

        {/* Desktop Admin Button */}
        <div className="hidden md:block">
          <Link
            href="/admin/login"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#03624C] text-[#03624C] hover:bg-[#03624C] hover:text-white transition"
          >
            <FiUser size={18} />
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <HiOutlineMenuAlt3
            id="menu-icon"
            size={30}
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="absolute top-20 right-5 w-64 rounded-xl bg-white shadow-2xl p-5 flex flex-col space-y-4 md:hidden"
            >
              <Link
                href="/home"
                onClick={() => setIsMenuOpen(false)}
                className={activeClass("/home")}
              >
                Home
              </Link>

              <Link
                href="/tours"
                onClick={() => setIsMenuOpen(false)}
                className={activeClass("/tours")}
              >
                Tours
              </Link>

              <Link
                href="/destinations"
                onClick={() => setIsMenuOpen(false)}
                className={activeClass("/destinations")}
              >
                Destinations
              </Link>

              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className={activeClass("/about")}
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={activeClass("/contact")}
              >
                Contact
              </Link>

              <hr />

              <Link
                href="/admin/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg bg-[#03624C] text-white px-4 py-3 hover:bg-green-700 transition"
              >
                <FiUser />
                Admin Login
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
}