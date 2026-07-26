"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaChartPie,
  FaMapMarkedAlt,
  FaClipboardList,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  activePage,
  setActivePage,
  isOpen,
  onClose,
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

  function selectPage(id: string) {
    setActivePage(id);
    onClose();
  }

  return (
    <>

      {/* Mobile overlay */}

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#0F172A] text-white flex flex-col shadow-xl transform transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* Logo */}

        <div className="border-b border-slate-700 p-6 flex items-start justify-between">

          <div>
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

          <button
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <FaTimes size={20} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 mt-6">

          {menuItems.map((item) => (

            <button
              key={item.id}
              onClick={() => selectPage(item.id)}
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

    </>
  );
}
