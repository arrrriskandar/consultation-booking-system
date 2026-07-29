import prisma from "../config/prisma.js";
import { AppointmentSlotStatus } from "@prisma/client";

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
