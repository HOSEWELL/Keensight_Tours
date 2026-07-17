"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      <section className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold"
        >
          About Keensight Tours and Travel
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .2 }}
          className="text-gray-600 mt-5 max-w-3xl mx-auto"
        >
          Keensight Tours is a modern travel platform designed to help travelers
          discover Kenya&apos;s breathtaking destinations, compare tour packages,
          and book unforgettable adventures with ease.
        </motion.p>
      </section>

      <section className="grid md:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <Image
            src="/hero-bg.png"
            alt="About SafariDesk"
            width={600}
            height={450}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-3xl font-semibold">
              Our Mission
            </h2>

            <p className="text-gray-600 mt-3">
              To make discovering Kenya simple, enjoyable and accessible
              through an easy-to-use digital platform connecting travelers
              with trusted tour experiences.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">
              Our Vision
            </h2>

            <p className="text-gray-600 mt-3">
              To become Africa's leading online platform for wildlife,
              adventure and cultural tourism.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">
              Why Choose Keensight Tours?
            </h2>

            <ul className="mt-4 space-y-3 text-gray-700">
              <li>✅ Verified tour packages</li>
              <li>✅ Professional tour guides</li>
              <li>✅ Affordable pricing</li>
              <li>✅ Secure online booking</li>
              <li>✅ Amazing destinations across Kenya</li>
            </ul>
          </div>

        </motion.div>

      </section>

    </main>
  );
}