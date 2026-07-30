import api from "./api";

import type { AppointmentSlot } from "../types/slot";

export const getAvailableSlots = async (
  doctorId: number,
): Promise<AppointmentSlot[]> => {
  const response = await api.get<AppointmentSlot[]>(
    `/doctors/${doctorId}/slots`,
  );

  return response.data;
};
