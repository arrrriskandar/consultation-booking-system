import prisma from "../config/prisma.js";

export async function findAllDoctors() {
  return prisma.doctor.findMany({
    select: {
      id: true,
      name: true,
      specialty: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}
