import express from "express";
import cors from "cors";

import doctorRoutes from "./routes/doctor.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Consultation Booking API is running",
  });
});

app.use("/api/doctors", doctorRoutes);

export default app;
