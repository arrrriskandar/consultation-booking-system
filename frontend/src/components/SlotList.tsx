import { Empty } from "antd";

import SlotCard from "./SlotCard";

import type { AppointmentSlot } from "../types/slot";

interface SlotListProps {
  slots: AppointmentSlot[];
  bookingSlotId: number | null;
  onBookAppointment: (slotId: number) => void;
}

const SlotList = ({
  slots,
  bookingSlotId,
  onBookAppointment,
}: SlotListProps) => {
  if (slots.length === 0) {
    return <Empty description="No appointment slots available." />;
  }

  return (
    <>
      {slots.map((slot) => (
        <SlotCard
          key={slot.id}
          slot={slot}
          bookingSlotId={bookingSlotId}
          onBookAppointment={onBookAppointment}
        />
      ))}
    </>
  );
};

export default SlotList;
