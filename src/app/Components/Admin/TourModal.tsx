"use client";

import { useEffect, useState } from "react";
import {
  Tour,
  TourPayload,
  createTour,
  updateTour,
  getTour,
} from "@/lib/tours";
import { mediaUrl } from "@/lib/api";

interface Props {
  tour?: Tour | null;
  onClose: () => void;
  onSuccess: () => void;
}

const emptyForm: TourPayload = {
  destination: "",
  title: "",
  short_description: "",
  description: "",
  duration: "",
  price: 0,
  discount_price: null,
  max_people: 1,
  transport: "Road",
  accommodation: "",
  meals: "",
  featured: false,
  available: true,
};

export default function TourModal({ tour, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    mediaUrl(tour?.cover_image)
  );

  const [form, setForm] = useState<TourPayload>(
    tour
      ? {
          destination: tour.destination,
          title: tour.title,
          short_description: tour.short_description,
          description: "",
          duration: tour.duration,
          price: tour.price,
          discount_price: tour.discount_price,
          max_people: 1,
          transport: "Road",
          accommodation: "",
          meals: "",
          featured: tour.featured,
          available: tour.available,
        }
      : emptyForm
  );

  useEffect(() => {
    if (!tour) return;

    getTour(tour.slug)
      .then((detail) => {
        setForm((prev) => ({
          ...prev,
          description: detail.description,
          max_people: detail.max_people,
          transport: detail.transport,
          accommodation: detail.accommodation,
          meals: detail.meals,
        }));
      })
      .catch((err) => console.error(err));
  }, [tour]);

  function updateField<K extends keyof TourPayload>(
    field: K,
    value: TourPayload[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setCoverImage(file);
    setPreview(file ? URL.createObjectURL(file) : mediaUrl(tour?.cover_image));
  }

  async function save() {
    try {
      setLoading(true);

      if (tour) {
        await updateTour(tour.id, form, coverImage);
      } else {
        await createTour(form, coverImage);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to save tour.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl w-full max-w-2xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold mb-6">
          {tour ? "Edit Tour" : "Add Tour"}
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Destination (e.g. Diani Beach)"
            value={form.destination}
            onChange={(e) => updateField("destination", e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            placeholder="Short Description"
            value={form.short_description}
            onChange={(e) => updateField("short_description", e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            placeholder="Description"
            rows={4}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <input
              placeholder="Duration (e.g. 3 Days)"
              value={form.duration}
              onChange={(e) => updateField("duration", e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <select
              value={form.transport}
              onChange={(e) => updateField("transport", e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="Road">Road</option>
              <option value="Air">Air</option>
              <option value="Rail">Rail</option>
              <option value="Boat">Boat</option>
            </select>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <input
              placeholder="Price (KSh)"
              type="number"
              value={form.price || ""}
              onChange={(e) => updateField("price", Number(e.target.value))}
              className="w-full border rounded-lg p-3"
            />

            <input
              placeholder="Discount Price"
              type="number"
              value={form.discount_price ?? ""}
              onChange={(e) =>
                updateField(
                  "discount_price",
                  e.target.value ? Number(e.target.value) : null
                )
              }
              className="w-full border rounded-lg p-3"
            />

            <input
              placeholder="Max People"
              type="number"
              min={1}
              value={form.max_people}
              onChange={(e) =>
                updateField("max_people", Number(e.target.value))
              }
              className="w-full border rounded-lg p-3"
            />

          </div>

          <input
            placeholder="Accommodation"
            value={form.accommodation}
            onChange={(e) => updateField("accommodation", e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            placeholder="Meals"
            value={form.meals}
            onChange={(e) => updateField("meals", e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <div className="space-y-2">

            <label className="block text-sm font-medium text-gray-600">
              Cover Image
            </label>

            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Cover preview"
                className="h-40 w-full object-cover rounded-lg border"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div className="flex gap-8">

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField("featured", e.target.checked)}
              />
              Featured
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) => updateField("available", e.target.checked)}
              />
              Available
            </label>

          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button onClick={onClose} className="px-5 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={save}
            disabled={loading || !form.destination || !form.price}
            className="bg-[#03624C] text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
}
