import { findAvailableSlotsByDoctorId } from "../repositories/appointment-slot.repository.js";

export async function getAvailableSlots(doctorId: number) {
  return findAvailableSlotsByDoctorId(doctorId);
}
