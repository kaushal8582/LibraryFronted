"use client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { fetchCurrentUser } from "@/lib/slices/authSlice";
import { AppDispatch, RootState } from "@/lib/store";

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const didFetchRef = useRef(false);

  const { userFullData } = useSelector(
    (state: RootState) => state.auth
  );
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;



      //  add here public paths
  const publicPath = ['/auth/login',"/auth/register","/auth/forget-pwd","/auth/reset-password","/"];


  useEffect(() => {
    if (!token) {


      if (!publicPath.includes(pathname)) {
        router.push("/auth/login");
      }
      return;
    }

    if (didFetchRef.current) return;
    if (userFullData && userFullData._id) {
      didFetchRef.current = true;
      return;
    }

    didFetchRef.current = true;

    dispatch(fetchCurrentUser())
      .unwrap()
      .catch(() => {
        localStorage.removeItem("accessToken");
        router.push("/auth/login");
      });
  }, [dispatch, pathname, router, userFullData]);

  return <>{children}</>;
}