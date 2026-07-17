"use client";

import { useMemo, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface Tour {
  id: number;
  name: string;
  destination: string;
  duration: string;
  price: string;
  status: "Active" | "Inactive";
}

export default function Tours() {
  const [search, setSearch] = useState("");

  const tours: Tour[] = [
    {
      id: 1,
      name: "Maasai Mara Safari",
      destination: "Narok",
      duration: "3 Days",
      price: "KSh 35,000",
      status: "Active",
    },
    {
      id: 2,
      name: "Amboseli Adventure",
      destination: "Kajiado",
      duration: "2 Days",
      price: "KSh 28,000",
      status: "Active",
    },
    {
      id: 3,
      name: "Diani Beach Holiday",
      destination: "Kwale",
      duration: "5 Days",
      price: "KSh 48,000",
      status: "Active",
    },
    {
      id: 4,
      name: "Nairobi Safari Walk",
      destination: "Nairobi",
      duration: "Half Day",
      price: "KSh 2,500",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Lake Nakuru Tour",
      destination: "Nakuru",
      duration: "2 Days",
      price: "KSh 18,500",
      status: "Active",
    },
  ];

  const filteredTours = useMemo(() => {
    return tours.filter(
      (tour) =>
        tour.name.toLowerCase().includes(search.toLowerCase()) ||
        tour.destination.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Tours
          </h2>

          <p className="text-gray-500 mt-2">
            Manage all available tour packages.
          </p>
        </div>

        <button className="flex items-center gap-3 bg-[#03624C] hover:bg-green-700 text-white px-6 py-3 rounded-lg transition">

          <FaPlus />

          Add Tour

        </button>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search tour..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#03624C]"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Tour</th>

              <th className="text-left">Destination</th>

              <th className="text-left">Duration</th>

              <th className="text-left">Price</th>

              <th className="text-left">Status</th>

              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredTours.map((tour) => (

              <tr
                key={tour.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">

                  <div className="font-semibold">
                    {tour.name}
                  </div>

                </td>

                <td>

                  <div className="flex items-center gap-2">

                    <FaMapMarkerAlt className="text-red-500" />

                    {tour.destination}

                  </div>

                </td>

                <td>{tour.duration}</td>

                <td>{tour.price}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tour.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tour.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-4">

                    <button className="text-blue-600 hover:text-blue-800">

                      <FaEdit size={18} />

                    </button>

                    <button className="text-red-600 hover:text-red-800">

                      <FaTrash size={18} />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-green-600 rounded-xl text-white p-6">

          <h3 className="text-lg font-semibold">
            Active Tours
          </h3>

          <p className="text-4xl font-bold mt-4">
            4
          </p>

        </div>

        <div className="bg-orange-500 rounded-xl text-white p-6">

          <h3 className="text-lg font-semibold">
            Inactive Tours
          </h3>

          <p className="text-4xl font-bold mt-4">
            1
          </p>

        </div>

        <div className="bg-blue-600 rounded-xl text-white p-6">

          <h3 className="text-lg font-semibold">
            Destinations
          </h3>

          <p className="text-4xl font-bold mt-4">
            5
          </p>

        </div>

      </div>

    </div>
  );
}