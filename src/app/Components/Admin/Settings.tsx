"use client";

import { useState } from "react";
import {
  FaSave,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaImage,
} from "react-icons/fa";

export default function Settings() {
  const [company, setCompany] = useState("KeenSight Tours");
  const [email, setEmail] = useState("collinkiragu@gmail.com");
  const [phone, setPhone] = useState("+254 112 667 455");
  const [location, setLocation] = useState("Nairobi, Kenya");
  const [website, setWebsite] = useState("www.keensight-tours.com");

  const handleSave = () => {
    alert("Settings saved successfully! (Dummy)");
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Settings
        </h2>

        <p className="text-gray-500 mt-2">
          Manage your company information and system settings.
        </p>
      </div>

      {/* Company Information */}

      <div className="bg-white rounded-xl shadow p-8">

        <h3 className="text-xl font-semibold mb-6">
          Company Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-medium mb-2 flex items-center gap-2">
              <FaBuilding />
              Company Name
            </label>

            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium mb-2 flex items-center gap-2">
              <FaEnvelope />
              Email
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium mb-2 flex items-center gap-2">
              <FaPhone />
              Phone Number
            </label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium mb-2 flex items-center gap-2">
              <FaMapMarkerAlt />
              Office Location
            </label>

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-medium mb-2 flex items-center gap-2">
              <FaGlobe />
              Website
            </label>

            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

        </div>

      </div>

      {/* Logo */}

      <div className="bg-white rounded-xl shadow p-8">

        <h3 className="text-xl font-semibold mb-6">
          Company Logo
        </h3>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">

          <FaImage
            className="mx-auto text-gray-400"
            size={60}
          />

          <p className="mt-4 text-gray-500">
            Logo Upload Placeholder
          </p>

          <button className="mt-5 bg-gray-100 px-6 py-2 rounded-lg hover:bg-gray-200">
            Choose Logo
          </button>

        </div>

      </div>

      {/* Theme */}

      <div className="bg-white rounded-xl shadow p-8">

        <h3 className="text-xl font-semibold mb-6">
          Preferences
        </h3>

        <div className="space-y-4">

          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked />
            Enable Email Notifications
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked />
            Enable Booking Alerts
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" />
            Maintenance Mode
          </label>

        </div>

      </div>

      {/* Save */}

      <div className="flex justify-end">

        <button
          onClick={handleSave}
          className="flex items-center gap-3 bg-[#03624C] text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
        >
          <FaSave />

          Save Settings

        </button>

      </div>

    </div>
  );
}