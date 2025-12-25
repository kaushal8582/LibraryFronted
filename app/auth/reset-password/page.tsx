import { Suspense } from "react";
import ForgetPwd from "./resetPassword";
import LogoLoader from "@/components/loaders/LogoLoader";


export default function Page() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><LogoLoader size={60} /></div>}>
      <ForgetPwd />
    </Suspense>
  );
}
