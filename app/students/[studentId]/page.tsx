"use client";

import StudentDetails from "@/components/pages/student-details";
import { Sidebar } from "@/components/sidebar";
import { useParams } from "next/navigation";

const StudentDetailsPage = () => {
  const params = useParams();
  const { studentId } = params;

  return (

    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
         <StudentDetails studentId={studentId as string} />
      </main>
    </div>
    
  );
};

export default StudentDetailsPage;