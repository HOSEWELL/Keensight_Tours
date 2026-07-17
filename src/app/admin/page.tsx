"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../Components/Admin/Sidebar";
import Header from "../Components/Admin/Header";

import Dashboard from "../Components/Admin/Dashboard";
import Tours from "../Components/Admin/Tours";
import Destinations from "../Components/Admin/Destinations";
import Bookings from "../Components/Admin/Bookings";
import Customers from "../Components/Admin/Customers";
import Settings from "../Components/Admin/Settings";

export default function AdminPage() {
  const router = useRouter();

  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");

    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [router]);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;

      case "tours":
        return <Tours />;

      case "destinations":
        return <Destinations />;

      case "bookings":
        return <Bookings />;

      case "customers":
        return <Customers />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="flex-1 flex flex-col overflow-hidden">

        <Header />

        <main className="flex-1 overflow-y-auto p-8">
          {renderPage()}
        </main>

      </div>

    </div>
  );
}