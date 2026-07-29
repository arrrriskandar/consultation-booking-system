import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.booking.deleteMany();
  await prisma.appointmentSlot.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();

  const doctors = await prisma.doctor.createManyAndReturn({
    data: [
      {
        name: "Dr John Tan",
        specialty: "General Practice",
      },
      {
        name: "Dr Sarah Lim",
        specialty: "Dermatology",
      },
      {
        name: "Dr Michael Lee",
        specialty: "Orthopaedics",
      },
    ],
  });

  await prisma.patient.createMany({
    data: [
      {
        name: "Alice Tan",
        email: "alice@example.com",
      },
      {
        name: "Bob Lim",
        email: "bob@example.com",
      },
      {
        name: "Charlie Ong",
        email: "charlie@example.com",
      },
    ],
  });

  const slots = [];

  const baseDate = new Date("2026-08-01T09:00:00+08:00");

  for (const doctor of doctors) {
    const slotTimes = [
      [9, 0],
      [9, 30],
      [10, 0],
      [14, 0],
      [14, 30],
      [15, 0],
    ];

    for (const [hour, minute] of slotTimes) {
      const start = new Date(baseDate);

      start.setHours(hour);
      start.setMinutes(minute);

      const end = new Date(start);

      end.setMinutes(end.getMinutes() + 30);

      slots.push({
        doctorId: doctor.id,
        startTime: start,
        endTime: end,
      });
    }
  }

  await prisma.appointmentSlot.createMany({
    data: slots,
  });

  console.log("✅ Database seeded successfully");
}

seed()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
