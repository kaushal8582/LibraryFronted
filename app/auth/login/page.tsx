"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchAllLibrary, fetchCurrentUser, loginUser } from "@/lib/slices/authSlice";
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

type LoginFormInputs = {
  email: string;
  password: string;
  role: "student" | "librarian";
  libraryId?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  
  const [selectedRole, setSelectedRole] = useState<"student" | "librarian">("librarian");
  
  const dispatch = useDispatch<AppDispatch>();

  const { libraries } = useSelector(
    (state: RootState) => state.auth
  );

  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue,
    watch 
  } = useForm<LoginFormInputs>({
    defaultValues: {
      role: "librarian"
    }
  });

  // Fetch libraries when student role is selected
  useEffect(() => {
    if (selectedRole === "student") {
      const fetchLibraries = async () => {
        try {
          const res = await dispatch(fetchAllLibrary());
          if(res.meta.requestStatus === "fulfilled"){
            // setLibraries(res.payload);
          }
        } catch (error) {
          console.error("Failed to fetch libraries:", error);
        }
      };
      fetchLibraries();
    }
  }, [selectedRole]);
  
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormInputs) => {
      // This would be replaced with your actual API endpoint
      // For demo purposes, we're simulating a successful login
      console.log("Login credentials:", credentials);
      return { success: true };
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    }
  });

  // Watch role changes
  const watchedRole = watch("role");

  // Update selected role when form role changes
  useEffect(() => {
    if (watchedRole) {
      setSelectedRole(watchedRole);
    }
  }, [watchedRole]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async(data) => {
  
    if(data.role === "student" && !data.libraryId){
      toast.error("Please Select Your Library");
      return;
    }

    // Prepare login data based on role
   try {
     setIsLoading(true);
     const loginData = {
       email: data.email,
       password: data.password,
       role: data.role,
       ...(data.role === "student" && data.libraryId && { libraryId: data.libraryId })
     };
 
     const res:any = await dispatch(loginUser(loginData as any));
 
    
     if(res.meta.requestStatus === "fulfilled"){
 
      await dispatch(fetchCurrentUser())
 
       console.log("res.payload?.user?.role",res.payload?.user?.role);
      
       if (res.payload?.user?.role === "student") {
         router.push("/student/dashboard");
       } else {
         router.push("/");
       }
     }
   } catch (error) {
     setIsLoading(false);
     console.log("Error in Login :",error);
   }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="relative space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 top-5 cursor-pointer flex items-center px-3 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
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
              {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
            </div>

            {/* Library Selection for Students */}
            {selectedRole === "student" && (
              <div className="space-y-2">
                <Label htmlFor="libraryId">Library</Label>
                <Select
                  onValueChange={(value) => setValue("libraryId", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select library" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Libraries</SelectLabel>
                      {libraries.map((library) => (
                        <SelectItem key={library._id} value={library._id}>
                          {library.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.libraryId && <p className="text-sm text-red-500">{errors.libraryId.message}</p>}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full"
              isLoading={isLoading}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="text-blue-500 font-bold hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}