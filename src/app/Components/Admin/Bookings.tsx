"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
} from "react-icons/fa";
import {
  Booking,
  deleteBooking,
  getBookings,
  updateBookingStatus,
} from "@/lib/bookings";

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  async function loadBookings() {
    try {
      setLoading(true);
      setError(false);

      const data = await getBookings();
      setBookings(data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter(
      (booking) =>
        booking.first_name.toLowerCase().includes(search.toLowerCase()) ||
        booking.last_name.toLowerCase().includes(search.toLowerCase()) ||
        booking.tour.toLowerCase().includes(search.toLowerCase()) ||
        booking.booking_number.toLowerCase().includes(search.toLowerCase())
    );
  }, [bookings, search]);

  async function confirmBooking(booking: Booking) {
    try {
      await updateBookingStatus(booking.id, { status: "Confirmed" });
      loadBookings();
    } catch (error) {
      console.error(error);
      alert("Failed to update booking.");
    }
  }

  async function cancelBooking(booking: Booking) {
    try {
      await updateBookingStatus(booking.id, { status: "Cancelled" });
      loadBookings();
    } catch (error) {
      console.error(error);
      alert("Failed to update booking.");
    }
  }

  async function handleDelete(booking: Booking) {
    if (!confirm(`Delete booking ${booking.booking_number}?`)) return;

    try {
      await deleteBooking(booking.id);
      loadBookings();
    } catch (error) {
      console.error(error);
      alert("Failed to delete booking.");
    }
  }

  const counts = useMemo(
    () => ({
      confirmed: bookings.filter((b) => b.status === "Confirmed").length,
      pending: bookings.filter((b) => b.status === "Pending").length,
      cancelled: bookings.filter((b) => b.status === "Cancelled").length,
    }),
    [bookings]
  );

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

        {loading ? (
          <p className="p-8 text-center text-gray-500">
            Loading bookings...
          </p>
        ) : error ? (
          <p className="p-8 text-center text-red-600">
            Failed to load bookings.
          </p>
        ) : filteredBookings.length === 0 ? (
          <p className="p-8 text-center text-gray-500">
            No bookings found.
          </p>
        ) : (
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
                    {booking.booking_number}
                  </td>

                  <td>

                    <div>
                      <p className="font-medium">
                        {booking.first_name} {booking.last_name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {booking.email}
                      </p>

                    </div>

                  </td>

                  <td>{booking.tour}</td>

                  <td>{booking.travel_date}</td>

                  <td>{booking.adults + booking.children}</td>

                  <td>KSh {booking.total_price.toLocaleString()}</td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.payment_status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : booking.payment_status === "Refunded"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.payment_status}
                    </span>

                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : booking.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => confirmBooking(booking)}
                        title="Confirm"
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaCheckCircle size={18} />
                      </button>

                      <button
                        onClick={() => cancelBooking(booking)}
                        title="Cancel"
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <FaTimesCircle size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(booking)}
                        title="Delete"
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-green-600 text-white rounded-xl p-6">
          <h3 className="text-lg font-semibold">
            Confirmed
          </h3>

          <p className="text-4xl font-bold mt-4">
            {counts.confirmed}
          </p>
        </div>

        <div className="bg-yellow-500 text-white rounded-xl p-6">
          <h3 className="text-lg font-semibold">
            Pending
          </h3>

          <p className="text-4xl font-bold mt-4">
            {counts.pending}
          </p>
        </div>

        <div className="bg-red-600 text-white rounded-xl p-6">
          <h3 className="text-lg font-semibold">
            Cancelled
          </h3>

          <p className="text-4xl font-bold mt-4">
            {counts.cancelled}
          </p>
        </div>

      </div>

    </div>
  );
}
