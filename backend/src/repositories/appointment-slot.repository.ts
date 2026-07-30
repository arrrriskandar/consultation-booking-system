import prisma from "../config/prisma.js";
import { AppointmentSlotStatus, Prisma } from "@prisma/client";

export async function findAvailableSlotsByDoctorId(doctorId: number) {
  return prisma.appointmentSlot.findMany({
    where: {
      doctorId,
      status: AppointmentSlotStatus.AVAILABLE,
    },
    select: {
      id: true,
      doctorId: true,
      startTime: true,
      endTime: true,
      status: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });
}

export async function updateAppointmentSlotStatus(
  tx: Prisma.TransactionClient,
  slotId: number,
  currentStatus: AppointmentSlotStatus,
  newStatus: AppointmentSlotStatus,
) {
  return tx.appointmentSlot.updateMany({
    where: {
      id: slotId,
      status: currentStatus,
    },
    data: {
      status: newStatus,
    },
  });
}
