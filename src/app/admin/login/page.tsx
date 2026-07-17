"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa";

export default function AdminLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === "admin") {
      localStorage.setItem("admin", "true");
      router.push("/admin");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0FDF4]">

      <form
        onSubmit={handleLogin}
        className="bg-white w-[400px] rounded-2xl shadow-xl p-8"
      >

        <div className="flex justify-center mb-6">

          <div className="w-16 h-16 rounded-full bg-[#03624C] flex items-center justify-center text-white">

            <FaLock size={28} />

          </div>

        </div>

        <h1 className="text-3xl font-bold text-center mb-2">
          Admin Login
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter the administrator password.
        </p>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#03624C]"
        />

        <button
          type="submit"
          className="w-full bg-[#03624C] hover:bg-green-700 text-white py-3 rounded-lg transition"
        >
          Login
        </button>

      </form>

    </div>
  );
}