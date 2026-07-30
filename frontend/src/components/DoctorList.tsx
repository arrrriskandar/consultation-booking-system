import { Empty } from "antd";

import DoctorCard from "./DoctorCard";

import type { Doctor } from "../types/doctor";

interface DoctorListProps {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctor: Doctor) => void;
}

const DoctorList = ({
  doctors,
  selectedDoctor,
  onSelectDoctor,
}: DoctorListProps) => {
  if (doctors.length === 0) {
    return <Empty description="No doctors available." />;
  }

  return (
    <>
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          selected={selectedDoctor?.id === doctor.id}
          onSelect={onSelectDoctor}
        />
      ))}
    </>
  );
};

export default DoctorList;
