import { API_URL } from "./api";
import type { AppointmentSlot } from "../types/slot";

export async function getAvailableSlots(
  doctorId: number,
): Promise<AppointmentSlot[]> {
  const response = await fetch(`${API_URL}/doctors/${doctorId}/slots`);

  if (!response.ok) {
    throw new Error("Failed to fetch appointment slots.");
  }

  return response.json();
}
