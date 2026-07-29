import type { Request, Response } from "express";

import { getDoctors } from "../services/doctor.service.js";

export async function getDoctorsHandler(_req: Request, res: Response) {
  const doctors = await getDoctors();

  res.status(200).json(doctors);
}
