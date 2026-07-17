"use client";

import { useMemo, useState } from "react";
import {
  FaSearch,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

interface Booking {
  id: string;
  customer: string;
  email: string;
  tour: string;
  travelDate: string;
  people: number;
  amount: string;
  payment: "Paid" | "Pending";
  status: "Confirmed" | "Pending" | "Cancelled";
}

export default function Bookings() {
  const [search, setSearch] = useState("");

  const bookings: Booking[] = [
    {
      id: "BK001",
      customer: "John Kamau",
      email: "john@gmail.com",
      tour: "Maasai Mara Safari",
      travelDate: "10 Jul 2026",
      people: 2,
      amount: "KSh 70,000",
      payment: "Paid",
      status: "Confirmed",
    },
    {
      id: "BK002",
      customer: "Mary Wanjiru",
      email: "mary@gmail.com",
      tour: "Amboseli Adventure",
      travelDate: "18 Jul 2026",
      people: 4,
      amount: "KSh 112,000",
      payment: "Pending",
      status: "Pending",
    },
    {
      id: "BK003",
      customer: "Brian Otieno",
      email: "brian@gmail.com",
      tour: "Diani Beach Holiday",
      travelDate: "01 Aug 2026",
      people: 3,
      amount: "KSh 144,000",
      payment: "Paid",
      status: "Confirmed",
    },
    {
      id: "BK004",
      customer: "Susan Achieng",
      email: "susan@gmail.com",
      tour: "Lake Nakuru Tour",
      travelDate: "12 Aug 2026",
      people: 2,
      amount: "KSh 37,000",
      payment: "Pending",
      status: "Cancelled",
    },
  ];

  const filteredBookings = useMemo(() => {
    return bookings.filter(
      (booking) =>
        booking.customer.toLowerCase().includes(search.toLowerCase()) ||
        booking.tour.toLowerCase().includes(search.toLowerCase()) ||
        booking.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Bookings
        </h2>

        <p className="text-gray-500 mt-2">
          View and manage all customer bookings.
        </p>
      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search booking..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#03624C]"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Booking ID</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Tour</th>
              <th className="text-left">Travel Date</th>
              <th className="text-left">People</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Payment</th>
              <th className="text-left">Status</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredBookings.map((booking) => (

              <tr
                key={booking.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 font-semibold">
                  {booking.id}
                </td>

                <td>

                  <div>
                    <p className="font-medium">
                      {booking.customer}
                    </p>

                    <p className="text-sm text-gray-500">
                      {booking.email}
                    </p>

                  </div>

                </td>

                <td>{booking.tour}</td>

                <td>{booking.travelDate}</td>

                <td>{booking.people}</td>

                <td>{booking.amount}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.payment === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.payment}
                  </span>

                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-3">

                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEye size={18} />
                    </button>

                    <button className="text-green-600 hover:text-green-800">
                      <FaCheckCircle size={18} />
                    </button>

                    <button className="text-red-600 hover:text-red-800">
                      <FaTimesCircle size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-green-600 text-white rounded-xl p-6">
          <h3 className="text-lg font-semibold">
            Confirmed
          </h3>

          <p className="text-4xl font-bold mt-4">
            2
          </p>
        </div>

        <div className="bg-yellow-500 text-white rounded-xl p-6">
          <h3 className="text-lg font-semibold">
            Pending
          </h3>

          <p className="text-4xl font-bold mt-4">
            1
          </p>
        </div>

        <div className="bg-red-600 text-white rounded-xl p-6">
          <h3 className="text-lg font-semibold">
            Cancelled
          </h3>

          <p className="text-4xl font-bold mt-4">
            1
          </p>
        </div>

      </div>

    </div>
  );
}