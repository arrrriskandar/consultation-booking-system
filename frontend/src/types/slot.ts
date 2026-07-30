export interface AppointmentSlot {
  id: number;
  doctorId: number;
  startTime: string;
  endTime: string;
  status: "AVAILABLE" | "BOOKED" | "UNAVAILABLE";
}
