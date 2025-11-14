"use client";

import { Dashboard } from "@/components/pages/dashboard";
import { Sidebar } from "@/components/sidebar";
import { fetchCurrentUser } from "@/lib/slices/authSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isAuthenticated, userFullData } = useSelector(
    (state: RootState) => state.auth
  );

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (!accessToken) {
  //     window.location.href = "/auth/login";
  //     return;
  //   }

  //   const fetchUser = async () => {
  //     await dispatch(fetchCurrentUser());
  //   };

    
  //   fetchUser();
  // }, [dispatch]);
  
  useEffect(()=>{
    
    console.log("usr full dat",userFullData);
  },[])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Dashboard />
      </main>
    </div>
  );
};

export default MainPage;
