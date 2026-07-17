"use client";

import {
  FaMapMarkedAlt,
  FaClipboardList,
  FaUsers,
  FaMoneyBillWave,
  FaArrowUp,
} from "react-icons/fa";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Tours",
      value: 18,
      change: "+4%",
      icon: <FaMapMarkedAlt size={26} />,
      color: "bg-green-600",
    },
    {
      title: "Bookings",
      value: 126,
      change: "+12%",
      icon: <FaClipboardList size={26} />,
      color: "bg-blue-600",
    },
    {
      title: "Customers",
      value: 82,
      change: "+8%",
      icon: <FaUsers size={26} />,
      color: "bg-purple-600",
    },
    {
      title: "Revenue",
      value: "KSh 840,000",
      change: "+16%",
      icon: <FaMoneyBillWave size={26} />,
      color: "bg-orange-600",
    },
  ];

  const bookings = [
    {
      customer: "John Kamau",
      tour: "Maasai Mara Safari",
      date: "10 Jul 2026",
      status: "Confirmed",
    },
    {
      customer: "Mary Wanjiru",
      tour: "Amboseli National Park",
      date: "15 Jul 2026",
      status: "Pending",
    },
    {
      customer: "Brian Otieno",
      tour: "Diani Beach",
      date: "22 Jul 2026",
      status: "Confirmed",
    },
    {
      customer: "Susan Achieng",
      tour: "Tsavo East",
      date: "01 Aug 2026",
      status: "Cancelled",
    },
  ];

  const activities = [
    "New booking received from John Kamau",
    "Tour package updated",
    "New customer registered",
    "Revenue report generated",
    "Booking approved",
  ];

  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h2>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's what's happening today.
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
                  {item.value}
                </h2>

                <div className="flex items-center gap-2 mt-4">

                  <FaArrowUp />

                  <span className="text-sm">
                    {item.change}
                  </span>

                </div>

              </div>

              <div className="bg-white/20 p-4 rounded-xl">
                {item.icon}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Lower Section */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Bookings */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">

          <div className="flex justify-between mb-6">

            <h3 className="text-xl font-bold">
              Recent Bookings
            </h3>

            <button className="text-[#03624C] font-medium">
              View All
            </button>

          </div>

          <table className="w-full">

            <thead>

              <tr className="text-left border-b">

                <th className="py-3">Customer</th>
                <th>Tour</th>
                <th>Date</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {bookings.map((booking) => (

                <tr
                  key={booking.customer}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-4">
                    {booking.customer}
                  </td>

                  <td>{booking.tour}</td>

                  <td>{booking.date}</td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm

                      ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"

                          : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"

                          : "bg-red-100 text-red-700"
                      }

                      `}
                    >
                      {booking.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Activity */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h3 className="text-xl font-bold mb-6">
            Latest Activity
          </h3>

          <div className="space-y-5">

            {activities.map((activity) => (

              <div
                key={activity}
                className="flex gap-4 items-start"
              >

                <div className="w-3 h-3 rounded-full bg-[#03624C] mt-2"></div>

                <div>

                  <p className="font-medium">
                    {activity}
                  </p>

                  <span className="text-gray-500 text-sm">
                    Just now
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="bg-white rounded-2xl shadow p-6">

        <h3 className="text-xl font-bold mb-5">
          Quick Actions
        </h3>

        <div className="flex flex-wrap gap-4">

          <button className="bg-[#03624C] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Add Tour
          </button>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Add Destination
          </button>

          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
            View Bookings
          </button>

          <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition">
            Generate Report
          </button>

        </div>

      </div>

    </div>
  );
}