"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { resetPassword } from "@/lib/slices/authSlice";
import { Suspense } from "react";

const ForgetPwd = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch<AppDispatch>();

  const handelResetPassword = async () => {
    if (!password || password.trim() == "") {
      toast.error("Password is required");
      return;
    }
    try {
      setLoader(true);
      const res = await dispatch(resetPassword({ token, password }));
      if (res.meta.requestStatus === "fulfilled") {
        setLoader(false);
        setPassword("");
        toast.success("Password Update Successfully.");
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.log("Password Update Error ", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-start">
              Reset password
            </CardTitle>
            <CardDescription className="">
              Enter your new password to change.
            </CardDescription>
          </CardHeader>
          <form>
            <CardContent className="space-y-4">
              <div className="relative space-y-2">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  minLength={6}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 -top-5 cursor-pointer flex items-center px-3 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <Button
                type="button"
                isLoading={loader}
                onClick={handelResetPassword}
                className="w-full cursor-pointer"
              >
                Reset Password
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </Suspense>
  );
};

export default ForgetPwd;
