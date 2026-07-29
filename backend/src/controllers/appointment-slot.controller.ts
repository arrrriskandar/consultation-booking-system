import type { Request, Response } from "express";

import { getAvailableSlots } from "../services/appointment-slot.service.js";

export async function getAvailableSlotsHandler(req: Request, res: Response) {
  const doctorId = Number(req.params.doctorId);

  if (Number.isNaN(doctorId)) {
    return res.status(400).json({
      message: "Invalid doctor ID.",
    });
  }

  const slots = await getAvailableSlots(doctorId);

  res.status(200).json(slots);
}
