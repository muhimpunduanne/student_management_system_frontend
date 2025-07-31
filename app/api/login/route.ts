import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Add default role if not present in the response
    if (!data.role) {
      data.role = "student"; 
    }

    // Make sure all fields are present, add defaults if needed
    data.firstName = data.firstName || "";
    data.lastName = data.lastName || "";
    data.phoneNumber = data.phoneNumber || "";
    data.courses = data.courses || [];
    data.profile = data.profile || {};

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
