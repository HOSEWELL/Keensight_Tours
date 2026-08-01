"use client";

import { useEffect, useState } from "react";
import {
  FaMapMarkedAlt,
  FaClipboardList,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Tour, getTours } from "@/lib/tours";
import { Booking, getBookings } from "@/lib/bookings";

interface Props {
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onNavigate }: Props) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [toursData, bookingsData] = await Promise.all([
          getTours(),
          getBookings(),
        ]);
        setTours(toursData);
        setBookings(bookingsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const uniqueCustomers = new Set(bookings.map((b) => b.email)).size;

  const revenue = bookings
    .filter((b) => b.payment_status === "Paid")
    .reduce((sum, b) => sum + b.total_price, 0);

  const stats = [
    {
      title: "Total Tours",
      value: tours.length,
      icon: <FaMapMarkedAlt size={26} />,
      color: "bg-green-600",
    },
    {
      title: "Bookings",
      value: bookings.length,
      icon: <FaClipboardList size={26} />,
      color: "bg-blue-600",
    },
    {
      title: "Customers",
      value: uniqueCustomers,
      icon: <FaUsers size={26} />,
      color: "bg-purple-600",
    },
    {
      title: "Revenue Collected",
      value: `KSh ${revenue.toLocaleString()}`,
      icon: <FaMoneyBillWave size={26} />,
      color: "bg-orange-600",
    },
  ];

  // Booking.Meta.ordering is "-created_at" on the backend, so this is
  // already newest-first.
  const recentBookings = bookings.slice(0, 5);

  function statusColor(status: Booking["status"]) {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-red-100 text-red-700";
    }
  }

  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h2>

        <p className="text-gray-500 mt-2">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => (
          <div
            key={item.title}
            className={`${item.color} rounded-2xl text-white p-6 shadow-lg`}
          >
            <div className="flex justify-between items-start">

              <div>

                <p className="text-sm opacity-80">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-3">
                  {loading ? "..." : item.value}
                </h2>

              </div>

              <div className="bg-white/20 p-4 rounded-xl">
                {item.icon}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Quick Actions */}

      <div className="bg-white rounded-2xl shadow p-6">

        <h3 className="text-xl font-bold mb-5">
          Quick Actions
        </h3>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => onNavigate("tours")}
            className="bg-[#03624C] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Add Tour
          </button>

          <button
            onClick={() => onNavigate("bookings")}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            View Bookings
          </button>

          <button
            onClick={() => onNavigate("customers")}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
          >
            Manage Customers
          </button>

        </div>

      </div>

      {/* Lower Section */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Bookings */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">

          <div className="flex justify-between mb-6">

            <h3 className="text-xl font-bold">
              Recent Bookings
            </h3>

            <button
              onClick={() => onNavigate("bookings")}
              className="text-[#03624C] font-medium"
            >
              View All
            </button>

          </div>

          {loading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : recentBookings.length === 0 ? (
            <p className="text-gray-500 text-sm">No bookings yet.</p>
          ) : (
            <div className="overflow-auto max-h-[50vh]">
            <table className="w-full">

              <thead className="bg-white sticky top-0 z-10 [&_th]:bg-white">

                <tr className="text-left border-b">

                  <th className="py-3">Customer</th>
                  <th>Tour</th>
                  <th>Travel Date</th>
                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {recentBookings.map((booking) => (

                  <tr
                    key={booking.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="py-4">
                      {booking.first_name} {booking.last_name}
                    </td>

                    <td>{booking.tour}</td>

                    <td>{booking.travel_date}</td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${statusColor(booking.status)}`}
                      >
                        {booking.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
            </div>
          )}

        </div>

        {/* Activity */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h3 className="text-xl font-bold mb-6">
            Latest Activity
          </h3>

          {loading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : recentBookings.length === 0 ? (
            <p className="text-gray-500 text-sm">Nothing to show yet.</p>
          ) : (
            <div className="space-y-5">

              {recentBookings.map((booking) => (

                <div
                  key={booking.id}
                  className="flex gap-4 items-start"
                >

                  <div className="w-3 h-3 rounded-full bg-[#03624C] mt-2"></div>

                  <div>

                    <p className="font-medium">
                      {booking.first_name} {booking.last_name} booked{" "}
                      {booking.tour}
                    </p>

                    <span className="text-gray-500 text-sm">
                      {booking.booking_number} &middot; {booking.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
