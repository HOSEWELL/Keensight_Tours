import { api } from "./api";

export interface Tour {
  id: number;
  title: string;
  slug: string;
  destination: string;
  category: string | null;
  category_id: number | null;
  short_description: string;
  duration: string;
  price: number;
  discount_price: number | null;
  featured: boolean;
  available: boolean;
  rating: number;
  cover_image: string | null;
}

export interface TourDetail extends Tour {
  description: string;
  max_people: number;
  transport: string;
  accommodation: string;
  meals: string;
}

export interface TourPayload {
  destination: string;
  category?: number | null;
  title: string;
  short_description: string;
  description: string;
  duration: string;
  price: number;
  discount_price?: number | null;
  max_people: number;
  transport: string;
  accommodation: string;
  meals: string;
  featured: boolean;
  available: boolean;
}

function toFormData(data: TourPayload, coverImage?: File | null) {
  const formData = new FormData();

  formData.append("destination", data.destination);

  if (data.category) {
    formData.append("category", String(data.category));
  }

  formData.append("title", data.title);
  formData.append("short_description", data.short_description);
  formData.append("description", data.description);
  formData.append("duration", data.duration);
  formData.append("price", String(data.price));

  if (data.discount_price) {
    formData.append("discount_price", String(data.discount_price));
  }

  formData.append("max_people", String(data.max_people));
  formData.append("transport", data.transport);
  formData.append("accommodation", data.accommodation);
  formData.append("meals", data.meals);
  formData.append("featured", String(data.featured));
  formData.append("available", String(data.available));

  if (coverImage) {
    formData.append("cover_image", coverImage);
  }

  return formData;
}

export function getTours() {
  return api<Tour[]>("/api/tours/");
}

export function getFeaturedTours() {
  return api<Tour[]>("/api/tours/featured/");
}

export function getTour(slug: string) {
  return api<TourDetail>(`/api/tours/${slug}`);
}

export function createTour(data: TourPayload, coverImage?: File | null) {
  return api<Tour>("/api/tours/", {
    method: "POST",
    body: toFormData(data, coverImage),
  });
}

export function updateTour(
  id: number,
  data: TourPayload,
  coverImage?: File | null
) {
  return api<Tour>(`/api/tours/id/${id}`, {
    method: "PUT",
    body: toFormData(data, coverImage),
  });
}

export function deleteTour(id: number) {
  return api(`/api/tours/id/${id}`, {
    method: "DELETE",
  });
}
