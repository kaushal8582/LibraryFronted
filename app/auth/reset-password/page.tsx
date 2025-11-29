import { Suspense } from "react";
import ForgetPwd from "./resetPassword";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgetPwd />
    </Suspense>
  );
}
