import { Avatar, Card, Space, Tag, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

import type { Doctor } from "../types/doctor";

const { Title } = Typography;

interface DoctorCardProps {
  doctor: Doctor;
  selected: boolean;
  onSelect: (doctor: Doctor) => void;
}

const DoctorCard = ({ doctor, selected, onSelect }: DoctorCardProps) => {
  return (
    <Card
      hoverable
      onClick={() => onSelect(doctor)}
      style={{
        marginBottom: 16,
        cursor: "pointer",
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? "#1677ff" : undefined,
        transition: "all 0.2s ease",
      }}
    >
      <Space align="start">
        <Avatar size={48} icon={<UserOutlined />} />

        <div>
          <Title level={5} style={{ margin: 0 }}>
            {doctor.name}
          </Title>

          <Tag color="blue" style={{ marginTop: 8 }}>
            {doctor.specialty}
          </Tag>
        </div>
      </Space>
    </Card>
  );
};

export default DoctorCard;
