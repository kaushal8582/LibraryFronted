"use client";

import { Dashboard } from "@/components/pages/dashboard";
import { Sidebar } from "@/components/sidebar";
import { fetchCurrentUser } from "@/lib/slices/authSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoLoader from "@/components/loaders/LogoLoader";

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

  useEffect(() => {
    console.log("usr full dat", userFullData);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <LogoLoader size={80} text="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {userFullData?.role === "librarian" ? (
          <Dashboard />
        ) : (
          <div className="flex h-full items-center justify-center">
            <LogoLoader size={60} text="Loading..." />
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
