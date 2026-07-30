import dayjs from "dayjs";

import { Button, Card, Popconfirm, Space, Tag, Typography } from "antd";

import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";

import type { AppointmentSlot } from "../types/slot";

const { Text } = Typography;

interface SlotCardProps {
  slot: AppointmentSlot;
  bookingSlotId: number | null;
  onBookAppointment: (slotId: number) => void;
}

const SlotCard = ({
  slot,
  bookingSlotId,
  onBookAppointment,
}: SlotCardProps) => {
  const bookingInProgress = bookingSlotId !== null;

  return (
    <Card
      hoverable
      style={{
        marginBottom: 16,
      }}
    >
      <Space direction="vertical" size={8}>
        <Text strong>
          <CalendarOutlined /> {dayjs(slot.startTime).format("DD MMM YYYY")}
        </Text>

        <Text>
          <ClockCircleOutlined /> {dayjs(slot.startTime).format("hh:mm A")} -{" "}
          {dayjs(slot.endTime).format("hh:mm A")}
        </Text>

        <Tag color="green">Available</Tag>

        <Popconfirm
          title="Confirm Booking"
          description="Book this appointment slot?"
          okText="Book"
          cancelText="Cancel"
          onConfirm={() => onBookAppointment(slot.id)}
        >
          <Button
            type="primary"
            loading={bookingSlotId === slot.id}
            disabled={bookingInProgress && bookingSlotId !== slot.id}
          >
            Book Appointment
          </Button>
        </Popconfirm>
      </Space>
    </Card>
  );
};

export default SlotCard;
