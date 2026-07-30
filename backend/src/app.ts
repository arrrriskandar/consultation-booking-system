import express from "express";
import cors from "cors";

import doctorRoutes from "./routes/doctor.routes.js";
import appointmentSlotRoutes from "./routes/appointment-slot.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

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
app.use("/api/doctors", appointmentSlotRoutes);
app.use("/api/bookings", bookingRoutes);

export default app;
