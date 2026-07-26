import { api } from "./api";

export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Cancelled"
  | "Completed";

export type PaymentStatus = "Pending" | "Paid" | "Refunded";

export interface Booking {
  id: number;
  booking_number: string;
  tour: string;
  tour_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  travel_date: string;
  adults: number;
  children: number;
  total_price: number;
  payment_status: PaymentStatus;
  status: BookingStatus;
}

export interface BookingDetail extends Booking {
  special_requests: string | null;
}

export interface BookingPayload {
  tour: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  travel_date: string;
  adults: number;
  children: number;
  special_requests?: string | null;
}

export function getBookings() {
  return api<Booking[]>("/api/bookings/");
}

export function getBooking(id: number) {
  return api<BookingDetail>(`/api/bookings/${id}`);
}

export function createBooking(data: BookingPayload) {
  return api<Booking>("/api/bookings/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateBooking(id: number, data: BookingPayload) {
  return api<Booking>(`/api/bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function updateBookingStatus(
  id: number,
  data: { status?: BookingStatus; payment_status?: PaymentStatus }
) {
  return api<Booking>(`/api/bookings/${id}/status`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteBooking(id: number) {
  return api(`/api/bookings/${id}`, {
    method: "DELETE",
  });
}
