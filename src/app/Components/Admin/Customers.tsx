"use client";

import { useMemo, useState } from "react";
import {
  FaSearch,
  FaEye,
  FaEnvelope,
  FaPhone,
  FaUserPlus,
} from "react-icons/fa";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  bookings: number;
  spent: string;
  status: "Active" | "Inactive";
}

export default function Customers() {
  const [search, setSearch] = useState("");

  const customers: Customer[] = [
    {
      id: 1,
      name: "John Kamau",
      email: "john@gmail.com",
      phone: "+254712345678",
      bookings: 5,
      spent: "KSh 220,000",
      status: "Active",
    },
    {
      id: 2,
      name: "Mary Wanjiru",
      email: "mary@gmail.com",
      phone: "+254798765432",
      bookings: 2,
      spent: "KSh 84,000",
      status: "Active",
    },
    {
      id: 3,
      name: "Brian Otieno",
      email: "brian@gmail.com",
      phone: "+254701234567",
      bookings: 1,
      spent: "KSh 48,000",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Susan Achieng",
      email: "susan@gmail.com",
      phone: "+254722222222",
      bookings: 4,
      spent: "KSh 163,000",
      status: "Active",
    },
  ];

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.includes(search)
    );
  }, [search]);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Customers
          </h2>

          <p className="text-gray-500 mt-2">
            View and manage your customers.
          </p>
        </div>

        <button className="flex items-center gap-3 bg-[#03624C] text-white px-5 py-3 rounded-lg hover:bg-green-700 transition">

          <FaUserPlus />

          Add Customer

        </button>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search customer..."
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

              <th className="text-left p-4">
                Customer
              </th>

              <th className="text-left">
                Contact
              </th>

              <th className="text-left">
                Bookings
              </th>

              <th className="text-left">
                Total Spent
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredCustomers.map((customer) => (

              <tr
                key={customer.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">

                  <div>

                    <p className="font-semibold">
                      {customer.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Customer #{customer.id}
                    </p>

                  </div>

                </td>

                <td>

                  <div className="space-y-1">

                    <div className="flex items-center gap-2">

                      <FaEnvelope className="text-gray-500" />

                      {customer.email}

                    </div>

                    <div className="flex items-center gap-2">

                      <FaPhone className="text-gray-500" />

                      {customer.phone}

                    </div>

                  </div>

                </td>

                <td>

                  {customer.bookings}

                </td>

                <td className="font-semibold text-green-700">

                  {customer.spent}

                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center">

                    <button className="text-blue-600 hover:text-blue-800">

                      <FaEye size={18} />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-blue-600 text-white rounded-xl p-6">

          <h3>Total Customers</h3>

          <p className="text-4xl font-bold mt-4">
            4
          </p>

        </div>

        <div className="bg-green-600 text-white rounded-xl p-6">

          <h3>Active</h3>

          <p className="text-4xl font-bold mt-4">
            3
          </p>

        </div>

        <div className="bg-red-600 text-white rounded-xl p-6">

          <h3>Inactive</h3>

          <p className="text-4xl font-bold mt-4">
            1
          </p>

        </div>

        <div className="bg-purple-600 text-white rounded-xl p-6">

          <h3>Total Revenue</h3>

          <p className="text-2xl font-bold mt-4">
            KSh 515,000
          </p>

        </div>

      </div>

    </div>
  );
}