'use client'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import Link from "next/link";


const ForgetPwd = () => {
   const [showPassword, setShowPassword] = useState(false);

    

    const handleForm = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const data = Object.fromEntries(form.entries());
        console.log(data)
    }
  return (


       <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-start">Reset password</CardTitle>
          <CardDescription className="">
            Enter your new password to change.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleForm}>
          <CardContent className="space-y-4">
            <div className="relative space-y-2">
      
              <Input
                id="password"
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
               <p className="text-sm text-red-500">errors message</p>
            </div>


          
            <Button className="w-full cursor-pointer">Reset Password</Button>
           
          </CardContent>


        
        
        </form>
      </Card>
    </div>
 
  )
}

export default ForgetPwd