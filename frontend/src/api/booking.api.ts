import api from "./api";

import type { BookAppointmentRequest } from "../types/booking";

export const bookAppointment = async (request: BookAppointmentRequest) => {
  const response = await api.post("/bookings", request);

  return response.data;
};
