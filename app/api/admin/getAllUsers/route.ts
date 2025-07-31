import { NextResponse } from "next/server";

// Types for clarity (optional)
type RawUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  [key: string]: any; // allow extra props
};

export async function GET() {
  try {
    const res = await fetch("http://localhost:5000/api/users/getAllUsers");

    if (!res.ok) {
      throw new Error("Failed to fetch from external API");
    }

    const rawUsers: RawUser[] = await res.json();

    // Filter fields
    const filteredUsers = rawUsers.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    }));

    return NextResponse.json(filteredUsers);
  } catch (error) {
    console.error("Error fetching users from external API:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
