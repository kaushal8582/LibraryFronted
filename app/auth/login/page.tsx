"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import {
  fetchCurrentUser,
  loginUser,
} from "@/lib/slices/authSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import Nav from "@/components/hero/Nav";
import Footer from "@/components/hero/Footer";

type LoginFormInputs = {
  email?: string;
  username?: string;
  password: string;
  role: "student" | "librarian";
  libraryId?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const params = useSearchParams();
  //   const callbackUrl = params.get("callback");

   

  const [selectedRole, setSelectedRole] = useState<"student" | "librarian">(
    "librarian"
  );

  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      role: "librarian",
    },
  });

  // Reset form when role changes
  useEffect(() => {
    reset({
      role: selectedRole,
      email: "",
      username: "",
      password: "",
      libraryId: "",
    });
  }, [selectedRole, reset]);

  // Watch role changes
  const watchedRole = watch("role");

  
  useEffect(() => {
    if (watchedRole) {
      setSelectedRole(watchedRole);
    }
  }, [watchedRole]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setIsLoading(true);
      const loginData: any = {
        password: data.password,
        role: data.role,
      };

      // For students, use username; for librarians, use email
      if (data.role === "student") {
        if (!data.username) {
          toast.error("Username is required");
          setIsLoading(false);
          return;
        }
        loginData.username = data.username;
      } else {
        if (!data.email) {
          toast.error("Email is required");
          setIsLoading(false);
          return;
        }
        loginData.email = data.email;
      }

      const res: any = await dispatch(loginUser(loginData));

      if (res.meta.requestStatus === "fulfilled") {
        await dispatch(fetchCurrentUser());
        if (res.payload?.user?.role === "student") {
          router.push("/student/dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error in Login :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Email field for librarians */}
              {selectedRole === "librarian" && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...register("email", {
                      required: selectedRole === "librarian" ? "Email is required" : false,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              )}

              {/* Username field for students */}
              {selectedRole === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    {...register("username", {
                      required: selectedRole === "student" ? "Username is required" : false,
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                      },
                      pattern: {
                        value: /^[a-z0-9_]+$/,
                        message: "Username can only contain lowercase letters, numbers, and underscores",
                      },
                    })}
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500">{errors.username.message}</p>
                  )}
                </div>
              )}
              <div className="relative space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forget-pwd"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 top-5 cursor-pointer flex items-center px-3 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Login as</Label>
                <Select
                  onValueChange={(value) => {
                    setSelectedRole(value as "student" | "librarian");
                    setValue("role", value as "student" | "librarian");
                  }}
                  defaultValue="librarian"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Role</SelectLabel>
                      <SelectItem value="librarian">Librarian</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm text-red-500">{errors.role.message}</p>
                )}
              </div>

            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" isLoading={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-blue-500 font-bold hover:underline"
                >
                  Register
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
      <Footer/>
    </div>
  );
}
