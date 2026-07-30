import { Layout, Typography } from "antd";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

export default function BookingPage() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Title
          level={3}
          style={{
            color: "white",
            margin: 0,
            lineHeight: "64px",
          }}
        >
          Consultation Booking System
        </Title>
      </Header>

      <Content
        style={{
          padding: "32px",
        }}
      >
        <Title level={2}>Book an Appointment</Title>

        <Paragraph>
          Select a doctor to view available appointment slots.
        </Paragraph>
      </Content>
    </Layout>
  );
}
