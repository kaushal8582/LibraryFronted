"use client";

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
import { forgotPassword } from "@/lib/slices/authSlice";
import { AppDispatch } from "@/lib/store";
import Link from "next/link";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const ForgetPwd = () => {
  // const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

 

  const handelSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoader(true);

    const res =  await dispatch(forgotPassword(email));
    if(res.meta.requestStatus=="fulfilled"){
      toast.success("Reset Password Send on email.")
      setEmail("")
    }
    } catch (error) {
      toast.error("Failed to send reset link");
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-start">
            Forgot password
          </CardTitle>
          <CardDescription className="">
            Enter your registered email to reset password.
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="example@gmail.com"
              />
             
            </div>

            <Button
              type="button"
              isLoading={loader}
              onClick={handelSubmit}
              className="w-full cursor-pointer"
            >
              Send link
            </Button>
            <div className="text-center text-sm">
              Allready have an account?{" "}
              <Link href="/auth/login" className="text-blue-500 font-bold hover:underline">
                Login
              </Link>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default ForgetPwd;
