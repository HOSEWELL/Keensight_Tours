"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../Components/Admin/Sidebar";
import Header from "../Components/Admin/Header";

import Dashboard from "../Components/Admin/Dashboard";
import Tours from "../Components/Admin/Tours";
import Bookings from "../Components/Admin/Bookings";
import Customers from "../Components/Admin/Customers";
import Settings from "../Components/Admin/Settings";

export default function AdminPage() {
  const router = useRouter();

  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");

    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [router]);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard onNavigate={setActivePage} />;

      case "tours":
        return <Tours />;

      case "bookings":
        return <Bookings />;

      case "customers":
        return <Customers />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">

        <Header
          onViewBookings={() => setActivePage("bookings")}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderPage()}
        </main>

      </div>

    </div>
  );
}