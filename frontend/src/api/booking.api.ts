import { API_URL } from "./api";
import type { BookAppointmentRequest } from "../types/booking";

export async function bookAppointment(request: BookAppointmentRequest) {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}
