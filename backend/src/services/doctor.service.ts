import { findAllDoctors } from "../repositories/doctor.repository.js";

export async function getDoctors() {
  return findAllDoctors();
}
