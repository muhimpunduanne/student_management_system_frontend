

import ForgotPassword from "@/components/ForgotPassword";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function Forgot() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-2 p-2 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-2">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 overflow-hidden">
              <Image
                src="https://i.postimg.cc/KvVNz9Kb/Chat-GPT-Image-Jul-27-2025-10-47-30-PM-removebg-preview.png"
                alt="SMS Logo"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              Student Management System
            </h1>
          </div>
        </a>
        <ForgotPassword />
      </div>
    </div>
  );
}
