'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { FormEvent } from "react";


const ForgetPwd = () => {

    const searchParams = useSearchParams();

    const token = searchParams.get("token")

    const handleForm = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const data = Object.fromEntries(form.entries());
        console.log({...data,token})



    }
  return (


       <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-start">Forgot password</CardTitle>
          <CardDescription className="">
            Enter your registered email to reset password.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleForm}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
             <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="example@gmail.com"
              />
               <p className="text-sm text-red-500">hellow</p>
            </div>


          
            <Button className="w-full cursor-pointer">Send link</Button>
           
          </CardContent>


        
        
        </form>
      </Card>
    </div>
 
  )
}

export default ForgetPwd