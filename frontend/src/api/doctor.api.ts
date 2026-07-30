import api from "./api";

import type { Doctor } from "../types/doctor";

export const getDoctors = async (): Promise<Doctor[]> => {
  const response = await api.get<Doctor[]>("/doctors");

  return response.data;
};
