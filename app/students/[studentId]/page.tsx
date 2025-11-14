"use client";

import StudentDetails from "@/components/pages/student-details";
import { useParams } from "next/navigation";

const StudentDetailsPage = () => {
  const params = useParams();
  const { studentId } = params;

  return (
    <div>
      <StudentDetails studentId={studentId as string} />
    </div>
  );
};

export default StudentDetailsPage;