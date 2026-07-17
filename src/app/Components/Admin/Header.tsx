"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaBell,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";

export default function Header() {
  const [search, setSearch] = useState("");

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b shadow-sm px-8 py-5 flex items-center justify-between">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Keensight Tours Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          {today}
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Search */}

        <div className="relative hidden lg:block">

          <FaSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 pr-4 py-3 rounded-lg border bg-gray-50 w-72 focus:outline-none focus:ring-2 focus:ring-[#03624C]"
          />

        </div>

        {/* Notification */}

        <button className="relative">

          <FaBell
            size={20}
            className="text-gray-600 hover:text-[#03624C]"
          />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>

        </button>

        {/* Profile */}

        <button className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition">

          <Image
            src="/profile.png"
            alt="Admin"
            width={45}
            height={45}
            className="rounded-full"
          />

          <div className="hidden md:block text-left">

            <p className="font-semibold text-gray-800">
              Administrator
            </p>

            <p className="text-sm text-gray-500">
              Super Admin
            </p>

          </div>

          <FaChevronDown
            className="text-gray-500"
          />

        </button>

      </div>

    </header>
  );
}