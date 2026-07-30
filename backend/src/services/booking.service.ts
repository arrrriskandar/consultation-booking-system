import prisma from "../config/prisma.js";

import { AppointmentSlotStatus } from "@prisma/client";

import * as bookingRepository from "../repositories/booking.repository.js";
import * as appointmentSlotRepository from "../repositories/appointment-slot.repository.js";

export async function bookAppointment(slotId: number, patientId: number) {
  return prisma.$transaction(async (tx) => {
    const slot = await appointmentSlotRepository.findSlotById(tx, slotId);

    if (!slot) {
      throw new Error("Appointment slot not found.");
    }

    const result = await appointmentSlotRepository.updateAppointmentSlotStatus(
      tx,
      slotId,
      AppointmentSlotStatus.AVAILABLE,
      AppointmentSlotStatus.BOOKED,
    );

    if (result.count === 0) {
      throw new Error("Appointment slot is no longer available.");
    }

    return bookingRepository.createBooking(tx, slotId, patientId);
  });
}
