import type { Request, Response } from "express";

import * as bookingService from "../services/booking.service.js";

export async function bookAppointmentHandler(req: Request, res: Response) {
  try {
    const { slotId, patientId } = req.body;

    const booking = await bookingService.bookAppointment(
      Number(slotId),
      Number(patientId),
    );

    res.status(201).json(booking);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(409).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Internal server error.",
    });
  }
}
