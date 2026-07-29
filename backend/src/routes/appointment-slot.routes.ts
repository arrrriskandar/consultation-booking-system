import { Router } from "express";

import { getAvailableSlotsHandler } from "../controllers/appointment-slot.controller.js";

const router = Router();

router.get("/:doctorId/slots", getAvailableSlotsHandler);

export default router;
