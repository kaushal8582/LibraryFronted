'use client'

import { Sidebar } from "@/components/sidebar"
import { Students } from "@/components/pages/students"
import { fetchCurrentUser } from "@/lib/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";

export default function StudentsPage() {

  const dispatch = useDispatch<AppDispatch>();
 

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      window.location.href = "/auth/login";
      return;
    }

    const fetchUser = async () => {
      await dispatch(fetchCurrentUser());
    };

    fetchUser();
  }, [dispatch]);




  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Students />
      </main>
    </div>
  );
};
