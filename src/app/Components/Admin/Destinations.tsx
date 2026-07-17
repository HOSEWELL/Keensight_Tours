"use client";

import { useMemo, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface Destination {
  id: number;
  name: string;
  county: string;
  category: string;
  status: "Open" | "Closed";
}

export default function Destinations() {
  const [search, setSearch] = useState("");

  const destinations: Destination[] = [
    {
      id: 1,
      name: "Maasai Mara National Reserve",
      county: "Narok",
      category: "Wildlife",
      status: "Open",
    },
    {
      id: 2,
      name: "Diani Beach",
      county: "Kwale",
      category: "Beach",
      status: "Open",
    },
    {
      id: 3,
      name: "Amboseli National Park",
      county: "Kajiado",
      category: "Wildlife",
      status: "Open",
    },
    {
      id: 4,
      name: "Lake Nakuru National Park",
      county: "Nakuru",
      category: "National Park",
      status: "Open",
    },
    {
      id: 5,
      name: "Nairobi Safari Walk",
      county: "Nairobi",
      category: "Nature",
      status: "Closed",
    },
  ];

  const filteredDestinations = useMemo(() => {
    return destinations.filter(
      (destination) =>
        destination.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        destination.county
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Destinations
          </h2>

          <p className="text-gray-500 mt-2">
            Manage destinations available for booking.
          </p>
        </div>

        <button className="flex items-center gap-3 bg-[#03624C] hover:bg-green-700 text-white px-6 py-3 rounded-lg transition">
          <FaPlus />
          Add Destination
        </button>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search destination..."
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

              <th className="text-left p-4">
                Destination
              </th>

              <th className="text-left">
                County
              </th>

              <th className="text-left">
                Category
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

            {filteredDestinations.map((destination) => (

              <tr
                key={destination.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4">

                  <div className="flex items-center gap-2">

                    <FaMapMarkerAlt className="text-red-500" />

                    <span className="font-semibold">
                      {destination.name}
                    </span>

                  </div>

                </td>

                <td>{destination.county}</td>

                <td>{destination.category}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      destination.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {destination.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-4">

                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>

                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-green-600 text-white rounded-xl p-6">

          <h3 className="text-lg font-semibold">
            Open Destinations
          </h3>

          <p className="text-4xl font-bold mt-4">
            4
          </p>

        </div>

        <div className="bg-red-600 text-white rounded-xl p-6">

          <h3 className="text-lg font-semibold">
            Closed
          </h3>

          <p className="text-4xl font-bold mt-4">
            1
          </p>

        </div>

        <div className="bg-blue-600 text-white rounded-xl p-6">

          <h3 className="text-lg font-semibold">
            Categories
          </h3>

          <p className="text-4xl font-bold mt-4">
            4
          </p>

        </div>

      </div>

    </div>
  );
}