"use client";

import { motion } from "framer-motion";
import { CiMail } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";

export default function ContactPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-14"
      >
        <h1 className="text-5xl font-bold">
          Contact Us
        </h1>

        <p className="text-gray-600 mt-4">
          We&apos;d love to hear from you.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >

          <div className="flex gap-5">
            <CiMail size={35} className="text-[#03624C]" />

            <div>
              <h2 className="font-semibold text-xl">
                Email
              </h2>

              <p className="text-gray-600">
                collinkiragu@gmail.com
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <LuPhone size={35} className="text-[#03624C]" />

            <div>
              <h2 className="font-semibold text-xl">
                Phone
              </h2>

              <p className="text-gray-600">
                +254 112667455
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <IoLocationOutline
              size={35}
              className="text-[#03624C]"
            />

            <div>
              <h2 className="font-semibold text-xl">
                Office
              </h2>

              <p className="text-gray-600">
                Nairobi, Kenya
              </p>
            </div>
          </div>

        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-5"
        >

          <input
            placeholder="Full Name"
            className="w-full border rounded-lg p-3 outline-none"
          />

          <input
            placeholder="Email Address"
            className="w-full border rounded-lg p-3 outline-none"
          />

          <input
            placeholder="Subject"
            className="w-full border rounded-lg p-3 outline-none"
          />

          <textarea
            rows={6}
            placeholder="Your Message"
            className="w-full border rounded-lg p-3 outline-none"
          />

          <button
            className="bg-[#03624C] text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Send Message
          </button>

        </motion.form>

      </div>

    </main>
  );
}