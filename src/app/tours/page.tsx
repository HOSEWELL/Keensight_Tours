"use client";

import Image from "next/image";

const tours = [
  {
    id: 1,
    name: "Nairobi Safari Walk",
    location: "Nairobi",
    duration: "Half Day",
    price: "KSh 2,500",
    image: "/explore.jpeg",
    includes: [
      "Professional Guide",
      "Park Entry",
      "Bottled Water",
      "Photography"
    ]
  },
  {
    id: 2,
    name: "Maasai Mara Safari",
    location: "Narok",
    duration: "3 Days",
    price: "KSh 35,000",
    image: "/explore.jpeg",
    includes: [
      "Accommodation",
      "Meals",
      "Game Drives",
      "Transport"
    ]
  },
  {
    id: 3,
    name: "Hell's Gate Adventure",
    location: "Naivasha",
    duration: "1 Day",
    price: "KSh 6,500",
    image: "/explore.jpeg",
    includes: [
      "Bike Rental",
      "Guide",
      "Lunch",
      "Park Entry"
    ]
  }
];

export default function ToursPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold">
          Tour Packages
        </h1>

        <p className="mt-4 text-gray-600">
          Discover unforgettable adventures across Kenya.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {tours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <Image
              src={tour.image}
              alt={tour.name}
              width={500}
              height={350}
              className="w-[1/3] h-75 object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-semibold">
                {tour.name}
              </h2>

              <p className="text-gray-500 mt-1">
                📍 {tour.location}
              </p>

              <p className="mt-2">
                ⏱ {tour.duration}
              </p>

              <p className="mt-4 text-2xl font-bold text-[#03624C]">
                {tour.price}
              </p>

              <div className="mt-5">

                <h3 className="font-semibold mb-2">
                  Package Includes
                </h3>

                <ul className="space-y-1 text-gray-600">
                  {tour.includes.map((item) => (
                    <li key={item}>
                      ✅ {item}
                    </li>
                  ))}
                </ul>

              </div>

              <button className="mt-6 w-full bg-[#03624C] text-white py-3 rounded-xl hover:bg-green-700 transition">
                Book Tour
              </button>

            </div>
          </div>
        ))}

      </div>

    </main>
  );
}