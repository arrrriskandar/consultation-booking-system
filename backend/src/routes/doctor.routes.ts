import { Router } from "express";

import { getDoctorsHandler } from "../controllers/doctor.controller.js";

const router = Router();

router.get("/", getDoctorsHandler);

export default router;
