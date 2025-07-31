"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

export default function VerifyOtp() {
  const [otp, setOtp] = React.useState(Array(6).fill(""))
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const inputRefs = React.useRef<HTMLInputElement[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      if (value && index < 5) inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async () => {
    const code = otp.join("")

    if (!email) {
      setError("Email is missing from URL.")
      toast.error("Email is missing from URL.")
      return
    }

    if (code.length !== 6) {
      setError("Please enter a 6-digit code.")
      toast.error("Please enter a 6-digit code.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Invalid OTP")
        toast.error(data.message || "Invalid OTP")
      } else {
        toast.success("OTP verified! You can now log in.")
        router.push("/login")
      }
    } catch (err) {
      console.error("Verification error:", err)
      setError("Something went wrong. Please try again.")
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center text-blue-400">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold text-blue-500">Verify OTP</h1>

        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => { inputRefs.current[index] = el!; }}
              className="w-12 h-12 text-center text-xl text-black bg-blue-100 border border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full"
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </div>
  )
}
