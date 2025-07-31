"use client";

import { useEffect, useState, ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ProfileSectionProps } from "@/lib/types";

interface StudentProfile {
  enrollmentYear: number;
  status: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  role: string;
  student_profile: StudentProfile;
}

export function ProfileSection(props: ProfileSectionProps) {
  const [user, setUser] = useState<User | null>(null);
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [enrollmentYear, setEnrollmentYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);

      setPhone(parsedUser.phoneNumber || "");
      setProfilePicture(parsedUser.profilePicture || null);
      setStatus(parsedUser.student_profile.status);
      setEnrollmentYear(parsedUser.student_profile.enrollmentYear);
    }
  }, []);

  // Handle image file input change and preview
  function onImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSave() {
    if (!user) return;

    setLoading(true);

    try {
      // Prepare payload: only editable fields + image if changed
      // If previewImage is set, we need to send it as base64 or upload file properly
      // For simplicity, assume backend accepts base64 image string under profilePicture
      const payload = {
        phoneNumber: phone,
        profilePicture: previewImage || profilePicture,
        student_profile: {
          status,
          enrollmentYear,
        },
      };

      // Replace with your real backend URL
      const response = await fetch(`/api/user/${user.email}`, {
        method: "PUT", // or POST depending on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUserFromServer = await response.json();

      // Update localStorage with server response (should include all user info)
      localStorage.setItem("user", JSON.stringify(updatedUserFromServer));
      setUser(updatedUserFromServer);

      // Update local states from updated user
      setPhone(updatedUserFromServer.phoneNumber || "");
      setProfilePicture(updatedUserFromServer.profilePicture || null);
      setPreviewImage(null);
      setStatus(updatedUserFromServer.student_profile.status);
      setEnrollmentYear(updatedUserFromServer.student_profile.enrollmentYear);

      alert("Profile updated successfully!");
    } catch (error: any) {
      alert(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return <p className="p-6 text-center">Loading profile...</p>;
  }

  return (
    <div className="w-full p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Display Profile */}
        <Card className="border border-muted">
          <CardHeader className="items-center text-center flex flex-col space-y-4">
            <Avatar className="h-20 w-20">
              {previewImage ? (
                <AvatarImage
                  src={previewImage}
                  alt={`${user.firstName} ${user.lastName}`}
                />
              ) : profilePicture ? (
                <AvatarImage
                  src={profilePicture}
                  alt={`${user.firstName} ${user.lastName}`}
                />
              ) : (
                <AvatarFallback>
                  {user.firstName.charAt(0) || "U"}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle>{`${user.firstName} ${user.lastName}`}</CardTitle>
              <CardDescription>
                Role: {user.role} ·{" "}
                <Badge
                  variant="outline"
                  className="border-blue-500 text-blue-700"
                >
                  {status}
                </Badge>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground text-center">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {phone && (
              <p>
                <strong>Phone:</strong> {phone}
              </p>
            )}
            <p>
              <strong>Enrolled:</strong> {enrollmentYear}
            </p>
          </CardContent>
        </Card>

        {/* Editable Form */}
        <Card className="border border-muted">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
              Update your information below (email, first & last names are
              read-only).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={user.firstName} disabled />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={user.lastName} disabled />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} disabled />
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Enter status"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="enrollmentYear">Enrollment Year</Label>
              <Input
                id="enrollmentYear"
                type="number"
                value={enrollmentYear || ""}
                onChange={(e) => setEnrollmentYear(Number(e.target.value))}
                placeholder="Enter enrollment year"
                min={1900}
                max={2100}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="profilePicture">Profile Picture</Label>
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                title="Upload a profile picture"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-2 max-w-xs rounded-md"
                />
              )}
            </div>

            <div className="pt-2">
              <Button
                className="w-full md:w-auto"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
