"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaChartPie,
  FaMapMarkedAlt,
  FaGlobeAfrica,
  FaClipboardList,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Sidebar({
  activePage,
  setActivePage,
}: SidebarProps) {
  const router = useRouter();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FaChartPie />,
    },
    {
      id: "tours",
      label: "Tours",
      icon: <FaMapMarkedAlt />,
    },
    {
      id: "destinations",
      label: "Destinations",
      icon: <FaGlobeAfrica />,
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: <FaClipboardList />,
    },
    {
      id: "customers",
      label: "Customers",
      icon: <FaUsers />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <FaCog />,
    },
  ];

  const logout = () => {
    localStorage.removeItem("admin");
    router.push("/home");
  };

  return (
    <aside className="w-72 bg-[#0F172A] text-white flex flex-col shadow-xl">

      {/* Logo */}

      <div className="border-b border-slate-700 p-6">

        <Link
          href="/home"
          className="text-3xl font-bold text-green-400"
        >
          Keensight Tours
        </Link>

        <p className="text-sm text-slate-400 mt-2">
          Admin Panel
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 mt-6">

        {menuItems.map((item) => (

          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-200

            ${
              activePage === item.id
                ? "bg-[#03624C] text-white border-r-4 border-green-400"
                : "hover:bg-slate-800 text-slate-300"
            }
            `}
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.label}
            </span>

          </button>

        ))}

      </nav>

      {/* Bottom */}

      <div className="border-t border-slate-700 p-5">

        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-400 hover:text-red-300 transition"
        >
          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}