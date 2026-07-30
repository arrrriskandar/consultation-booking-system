import { API_URL } from "./api";
import type { Doctor } from "../types/doctor";

export async function getDoctors(): Promise<Doctor[]> {
  const response = await fetch(`${API_URL}/doctors`);

  if (!response.ok) {
    throw new Error("Failed to fetch doctors.");
  }

  return response.json();
}
