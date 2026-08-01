"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Tour, deleteTour, getTours } from "@/lib/tours";
import { mediaUrl } from "@/lib/api";
import TourModal from "./TourModal";

export default function Tours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);

  async function loadTours() {
    try {
      setLoading(true);
      setError(false);

      const data = await getTours();
      setTours(data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTours();
  }, []);

  const filteredTours = useMemo(() => {
    return tours.filter(
      (tour) =>
        tour.title.toLowerCase().includes(search.toLowerCase()) ||
        tour.destination.toLowerCase().includes(search.toLowerCase())
    );
  }, [tours, search]);

  function openAddModal() {
    setEditingTour(null);
    setShowModal(true);
  }

  function openEditModal(tour: Tour) {
    setEditingTour(tour);
    setShowModal(true);
  }

  async function handleDelete(tour: Tour) {
    if (!confirm(`Delete "${tour.title}"?`)) return;

    try {
      await deleteTour(tour.id);
      loadTours();
    } catch (error) {
      console.error(error);
      alert("Failed to delete tour.");
    }
  }

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

        <button
          onClick={openAddModal}
          className="flex items-center gap-3 bg-[#03624C] hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
        >

          <FaPlus />

          Add Tour

        </button>

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-2 gap-5">

        <div className="bg-green-600 rounded-xl text-white p-6">

          <h3 className="text-lg font-semibold">
            Active Tours
          </h3>

          <p className="text-4xl font-bold mt-4">
            {tours.filter((t) => t.available).length}
          </p>

        </div>

        <div className="bg-orange-500 rounded-xl text-white p-6">

          <h3 className="text-lg font-semibold">
            Inactive Tours
          </h3>

          <p className="text-4xl font-bold mt-4">
            {tours.filter((t) => !t.available).length}
          </p>

        </div>

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

      <div className="bg-white rounded-xl shadow overflow-auto max-h-[65vh]">

        {loading ? (
          <p className="p-8 text-center text-gray-500">
            Loading tours...
          </p>
        ) : error ? (
          <p className="p-8 text-center text-red-600">
            Failed to load tours.
          </p>
        ) : filteredTours.length === 0 ? (
          <p className="p-8 text-center text-gray-500">
            No tours found.
          </p>
        ) : (
          <table className="w-full">

            <thead className="bg-gray-100 sticky top-0 z-10 [&_th]:bg-gray-100">

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

                    <div className="flex items-center gap-3">

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={mediaUrl(tour.cover_image) || "/explore.jpeg"}
                        alt={tour.title}
                        className="w-14 h-14 rounded-lg object-cover"
                      />

                      <div className="font-semibold">
                        {tour.title}
                      </div>

                    </div>

                  </td>

                  <td>

                    <div className="flex items-center gap-2">

                      <FaMapMarkerAlt className="text-red-500" />

                      {tour.destination}

                    </div>

                  </td>

                  <td>{tour.duration}</td>

                  <td>KSh {tour.price.toLocaleString()}</td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        tour.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {tour.available ? "Active" : "Inactive"}
                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-4">

                      <button
                        onClick={() => openEditModal(tour)}
                        className="text-blue-600 hover:text-blue-800"
                      >

                        <FaEdit size={18} />

                      </button>

                      <button
                        onClick={() => handleDelete(tour)}
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

      {showModal && (
        <TourModal
          tour={editingTour}
          onClose={() => setShowModal(false)}
          onSuccess={loadTours}
        />
      )}

    </div>
  );
}
