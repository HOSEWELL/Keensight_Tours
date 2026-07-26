"use client";

import { useEffect, useState } from "react";
import { Tour, getTours } from "@/lib/tours";
import { mediaUrl } from "@/lib/api";
import BookingModal from "../Components/BookingModal";

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bookingTour, setBookingTour] = useState<Tour | null>(null);

  useEffect(() => {
    async function loadTours() {
      try {
        const data = await getTours();
        setTours(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadTours();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Tour Packages
        </h1>

        <p className="mt-4 text-gray-600">
          Discover unforgettable adventures across Kenya.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">
          Loading tours...
        </p>
      ) : error ? (
        <p className="text-center text-red-600">
          Failed to load tours.
        </p>
      ) : tours.length === 0 ? (
        <p className="text-center text-gray-500">
          No tours available yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mediaUrl(tour.cover_image) || "/explore.jpeg"}
                alt={tour.title}
                className="w-full aspect-[4/3] object-cover"
              />

              <div className="p-6">

                <h2 className="text-2xl font-semibold">
                  {tour.title}
                </h2>

                <p className="text-gray-500 mt-1">
                  📍 {tour.destination}
                </p>

                <p className="mt-2">
                  ⏱ {tour.duration}
                </p>

                {tour.short_description && (
                  <p className="mt-3 text-gray-600 line-clamp-2">
                    {tour.short_description}
                  </p>
                )}

                <p className="mt-4 text-2xl font-bold text-[#03624C]">
                  KSh {tour.price.toLocaleString()}
                </p>

                <button
                  onClick={() => setBookingTour(tour)}
                  disabled={!tour.available}
                  className="mt-6 w-full bg-[#03624C] text-white py-3 rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {tour.available ? "Book Tour" : "Unavailable"}
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

      {bookingTour && (
        <BookingModal
          tour={bookingTour}
          onClose={() => setBookingTour(null)}
        />
      )}

    </main>
  );
}
