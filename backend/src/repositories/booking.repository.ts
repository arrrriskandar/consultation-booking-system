import { BookingStatus, Prisma } from "@prisma/client";

export async function createBooking(
  tx: Prisma.TransactionClient,
  slotId: number,
  patientId: number,
) {
  return tx.booking.create({
    data: {
      slotId,
      patientId,
      status: BookingStatus.CONFIRMED,
    },
  });
}
