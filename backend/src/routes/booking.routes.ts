import { Router } from "express";

import { bookAppointmentHandler } from "../controllers/booking.controller.js";

const router = Router();

router.post("/", bookAppointmentHandler);

export default router;
