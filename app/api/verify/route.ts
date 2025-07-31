// app/api/verify/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const response = await fetch(
      "http://localhost:5000/api/users/verifyOtp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body), // { email, otp }
      }
    )

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("API verify error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
