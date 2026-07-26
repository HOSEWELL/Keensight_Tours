"use client";

import { useState } from "react";
import { Tour } from "@/lib/tours";
import { BookingPayload, createBooking } from "@/lib/bookings";

interface Props {
  tour: Tour;
  onClose: () => void;
}

const emptyForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  travel_date: "",
  adults: 1,
  children: 0,
  special_requests: "",
};

export default function BookingModal({ tour, onClose }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateField(field: keyof typeof form, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function submit() {
    try {
      setSubmitting(true);
      setError(null);

      const payload: BookingPayload = {
        tour: tour.id,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        travel_date: form.travel_date,
        adults: form.adults,
        children: form.children,
        special_requests: form.special_requests || null,
      };

      const booking = await createBooking(payload);
      setSuccess(booking.booking_number);
    } catch (err) {
      console.error(err);
      setError("Failed to submit booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl w-full max-w-xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto">

        {success ? (
          <div className="text-center py-6">

            <h2 className="text-2xl font-bold mb-3">
              Booking Received!
            </h2>

            <p className="text-gray-600">
              Your booking reference is{" "}
              <span className="font-semibold">{success}</span>. We&apos;ll be
              in touch shortly to confirm the details.
            </p>

            <button
              onClick={onClose}
              className="mt-8 bg-[#03624C] text-white px-6 py-2 rounded-lg"
            >
              Close
            </button>

          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">
              Book &quot;{tour.title}&quot;
            </h2>

            <div className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <input
                  placeholder="First Name"
                  value={form.first_name}
                  onChange={(e) => updateField("first_name", e.target.value)}
                  className="w-full border rounded-lg p-3"
                />

                <input
                  placeholder="Last Name"
                  value={form.last_name}
                  onChange={(e) => updateField("last_name", e.target.value)}
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full border rounded-lg p-3"
              />

              <input
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full border rounded-lg p-3"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={form.travel_date}
                    onChange={(e) =>
                      updateField("travel_date", e.target.value)
                    }
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Adults
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.adults}
                    onChange={(e) =>
                      updateField("adults", Number(e.target.value))
                    }
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Children
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.children}
                    onChange={(e) =>
                      updateField("children", Number(e.target.value))
                    }
                    className="w-full border rounded-lg p-3"
                  />
                </div>

              </div>

              <textarea
                placeholder="Special Requests (optional)"
                rows={3}
                value={form.special_requests}
                onChange={(e) =>
                  updateField("special_requests", e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div className="flex justify-end gap-4 mt-4">

                <button
                  onClick={onClose}
                  className="px-5 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={submit}
                  disabled={
                    submitting ||
                    !form.first_name ||
                    !form.last_name ||
                    !form.email ||
                    !form.phone ||
                    !form.travel_date
                  }
                  className="bg-[#03624C] text-white px-6 py-2 rounded-lg disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Confirm Booking"}
                </button>

              </div>

            </div>
          </>
        )}

      </div>

    </div>
  );
}
