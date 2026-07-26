"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  FaBell,
  FaSearch,
  FaChevronDown,
  FaBars,
} from "react-icons/fa";
import { Booking, getBookings } from "@/lib/bookings";

const POLL_INTERVAL_MS = 30000;

interface Props {
  onViewBookings: () => void;
  onToggleSidebar: () => void;
}

export default function Header({ onViewBookings, onToggleSidebar }: Props) {
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadBookings();
    const interval = setInterval(loadBookings, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pendingBookings = bookings.filter((b) => b.status === "Pending");

  function goToBookings() {
    setShowNotifications(false);
    onViewBookings();
  }

  return (
    <header className="bg-white border-b shadow-sm px-4 md:px-8 py-4 md:py-5 flex items-center justify-between gap-3">

      {/* Left */}

      <div className="flex items-center gap-3 min-w-0">

        <button
          onClick={onToggleSidebar}
          className="md:hidden text-gray-600 hover:text-[#03624C] shrink-0"
        >
          <FaBars size={20} />
        </button>

        <div className="min-w-0">

          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 truncate">
            Keensight Tours Dashboard
          </h1>

          <p className="text-gray-500 mt-1 text-sm md:text-base hidden sm:block">
            {today}
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3 md:gap-6 shrink-0">

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

        <div className="relative" ref={menuRef}>

          <button
            className="relative"
            onClick={() => setShowNotifications((prev) => !prev)}
          >

            <FaBell
              size={20}
              className="text-gray-600 hover:text-[#03624C]"
            />

            {pendingBookings.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                {pendingBookings.length}
              </span>
            )}

          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-[90vw] max-w-80 bg-white rounded-xl shadow-2xl border z-50">

              <div className="p-4 border-b font-semibold text-gray-800">
                New Bookings
              </div>

              <div className="max-h-80 overflow-y-auto">

                {pendingBookings.length === 0 ? (
                  <p className="p-4 text-sm text-gray-500">
                    No new bookings.
                  </p>
                ) : (
                  pendingBookings.slice(0, 5).map((booking) => (
                    <button
                      key={booking.id}
                      onClick={goToBookings}
                      className="w-full text-left p-4 border-b hover:bg-gray-50 transition"
                    >
                      <p className="font-medium text-gray-800">
                        {booking.first_name} {booking.last_name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {booking.tour} &middot; {booking.travel_date}
                      </p>
                    </button>
                  ))
                )}

              </div>

              <button
                onClick={goToBookings}
                className="w-full p-3 text-center text-sm font-medium text-[#03624C] hover:bg-gray-50 transition"
              >
                View all bookings
              </button>

            </div>
          )}

        </div>

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
