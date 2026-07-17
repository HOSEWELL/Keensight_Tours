"use client";

import Image from "next/image";

const destinations = [
  {
    id: 1,
    name: "Maasai Mara",
    county: "Narok",
    image: "/explore.jpeg"
  },
  {
    id: 2,
    name: "Diani Beach",
    county: "Kwale",
    image: "/explore.jpeg"
  },
  {
    id: 3,
    name: "Amboseli National Park",
    county: "Kajiado",
    image: "/explore.jpeg"
  },
  {
    id: 4,
    name: "Lake Nakuru",
    county: "Nakuru",
    image: "/explore.jpeg"
  },
  {
    id: 5,
    name: "Mount Kenya",
    county: "Nyeri",
    image: "/explore.jpeg"
  },
  {
    id: 6,
    name: "Hell&apos;s Gate",
    county: "Naivasha",
    image: "/explore.jpeg"
  }
];

export default function DestinationsPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      <div className="text-center mb-14">

        <h1 className="text-5xl font-bold">
          Popular Destinations
        </h1>

        <p className="mt-4 text-gray-600">
          Explore Kenya&apos;s most beautiful places.
        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {destinations.map((destination) => (

          <div
            key={destination.id}
            className="group rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition"
          >

            <Image
              src={destination.image}
              alt={destination.name}
              width={500}
              height={350}
              className="h-[350px] w-[1/3] object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="p-5">

              <h2 className="text-2xl font-semibold">
                {destination.name}
              </h2>

              <p className="text-gray-500 mt-2">
                📍 {destination.county}, Kenya
              </p>

              <button className="mt-5 w-full border border-[#03624C] text-[#03624C] py-3 rounded-xl hover:bg-[#03624C] hover:text-white transition">
                View Destination
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}