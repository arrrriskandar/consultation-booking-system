import { useEffect, useState } from "react";
import { Card, Col, Layout, Row, Spin, Typography, message } from "antd";

import { getDoctors } from "../api/doctor.api";
import { getAvailableSlots } from "../api/slot.api";
import { bookAppointment } from "../api/booking.api";

import DoctorList from "../components/DoctorList";
import SlotList from "../components/SlotList";

import type { Doctor } from "../types/doctor";
import type { AppointmentSlot } from "../types/slot";
import axios from "axios";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const PATIENT_ID = 1;

const BookingPage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [slots, setSlots] = useState<AppointmentSlot[]>([]);

  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingSlotId, setBookingSlotId] = useState<number | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoadingDoctors(true);

        const doctors = await getDoctors();

        setDoctors(doctors);

        if (doctors.length === 0) {
          return;
        }

        const firstDoctor = doctors[0];

        setSelectedDoctor(firstDoctor);

        setLoadingSlots(true);

        const availableSlots = await getAvailableSlots(firstDoctor.id);

        setSlots(availableSlots);
      } catch {
        messageApi.error("Failed to load booking information.");
      } finally {
        setLoadingDoctors(false);
        setLoadingSlots(false);
      }
    };

    fetchInitialData();
  }, [messageApi]);

  const handleSelectDoctor = async (doctor: Doctor) => {
    try {
      setSelectedDoctor(doctor);
      setLoadingSlots(true);

      const availableSlots = await getAvailableSlots(doctor.id);

      setSlots(availableSlots);
    } catch {
      messageApi.error("Failed to load appointment slots.");
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleBookAppointment = async (slotId: number) => {
    try {
      setBookingSlotId(slotId);

      await bookAppointment({
        slotId,
        patientId: PATIENT_ID,
      });

      messageApi.success("Appointment booked successfully.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        messageApi.error(error.response?.data?.message ?? "Booking failed.");
      } else {
        messageApi.error("Booking failed.");
      }
    } finally {
      if (selectedDoctor) {
        const availableSlots = await getAvailableSlots(selectedDoctor.id);

        setSlots(availableSlots);
      }

      setBookingSlotId(null);
    }
  };

  return (
    <>
      {contextHolder}

      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Title
            level={3}
            style={{
              color: "#fff",
              margin: 0,
            }}
          >
            Consultation Booking System
          </Title>
        </Header>

        <Content
          style={{
            maxWidth: 1200,
            width: "100%",
            margin: "0 auto",
            padding: 32,
          }}
        >
          <Title level={2}>Book an Appointment</Title>

          <Paragraph>
            Select a doctor and reserve an available consultation slot.
          </Paragraph>

          <Row gutter={24}>
            <Col xs={24} lg={10}>
              <Card title="Doctors">
                {loadingDoctors ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "40px 0",
                    }}
                  >
                    <Spin />
                  </div>
                ) : (
                  <DoctorList
                    doctors={doctors}
                    selectedDoctor={selectedDoctor}
                    onSelectDoctor={handleSelectDoctor}
                  />
                )}
              </Card>
            </Col>

            <Col xs={24} lg={14}>
              <Card title="Available Appointment Slots">
                {loadingSlots ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "40px 0",
                    }}
                  >
                    <Spin />
                  </div>
                ) : (
                  <SlotList
                    slots={slots}
                    bookingSlotId={bookingSlotId}
                    onBookAppointment={handleBookAppointment}
                  />
                )}
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default BookingPage;
