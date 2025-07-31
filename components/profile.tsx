"use client";

import { useEffect, useState, ChangeEvent, useRef } from "react";
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
import { cn } from "@/lib/utils";

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

const STATUS_OPTIONS = [
  { label: "Active", value: "active", color: "green" },
  { label: "Pending", value: "pending", color: "yellow" },
  { label: "Inactive", value: "inactive", color: "red" },
  { label: "Alumni", value: "alumni", color: "purple" },
];

export function ProfileSection(props: ProfileSectionProps) {
  const [user, setUser] = useState<User | null>(null);
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [enrollmentYear, setEnrollmentYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  function onImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorMsg("Please upload a valid image file.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setErrorMsg(null);
      };
      reader.readAsDataURL(file);
    }
  }

  function removePreviewImage() {
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function validateInputs() {
    if (phone && !/^\+?[0-9\s\-()]{7,15}$/.test(phone)) {
      setErrorMsg("Please enter a valid phone number.");
      return false;
    }
    if (!status) {
      setErrorMsg("Please select a status.");
      return false;
    }
    if (!enrollmentYear || enrollmentYear < 1900 || enrollmentYear > 2100) {
      setErrorMsg("Please enter a valid enrollment year.");
      return false;
    }
    setErrorMsg(null);
    return true;
  }

  async function handleSave() {
    if (!user) return;
    if (!validateInputs()) return;

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const payload = {
        phoneNumber: phone,
        profilePicture: previewImage || profilePicture,
        student_profile: {
          status,
          enrollmentYear,
        },
      };

      const response = await fetch(`/api/user/${user.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setPhone(updatedUser.phoneNumber || "");
      setProfilePicture(updatedUser.profilePicture || null);
      setPreviewImage(null);
      setStatus(updatedUser.student_profile.status);
      setEnrollmentYear(updatedUser.student_profile.enrollmentYear);

      setSuccessMsg("Profile updated successfully!");
    } catch (error: any) {
      setErrorMsg(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

const selectedStatusOption =
  STATUS_OPTIONS.find((opt) => opt.value === (status ?? "").toLowerCase()) ||
  STATUS_OPTIONS[0];


  if (!user)
    return (
      <p className="p-6 text-center text-lg text-gray-600 animate-pulse">
        Loading profile...
      </p>
    );

  return (
    <div className="w-full mx-auto p-6 sm:p-10 space-y-10 font-sans">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Profile Card */}
        <Card className="border border-muted-foreground/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-col items-center space-y-4 text-center p-8">
            <Avatar className="w-28 h-28 border-4 border-blue-200 shadow-md">
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
                <AvatarFallback className="text-5xl font-bold text-blue-400">
                  {user.firstName?.[0] || "U"}
                </AvatarFallback>
              )}
            </Avatar>

            <div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 flex items-center justify-center space-x-2">
                <span className="italic capitalize">{user.role}</span>
                <span>·</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "capitalize",
                    selectedStatusOption.color === "green" &&
                      "border-green-600 text-green-700",
                    selectedStatusOption.color === "yellow" &&
                      "border-yellow-500 text-yellow-600",
                    selectedStatusOption.color === "red" &&
                      "border-red-600 text-red-700",
                    selectedStatusOption.color === "purple" &&
                      "border-purple-600 text-purple-700"
                  )}
                  aria-label={`Status: ${selectedStatusOption.label}`}
                >
                  {selectedStatusOption.label}
                </Badge>
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="text-sm text-gray-700 space-y-3 px-10 pb-10">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {phone && (
              <p>
                <strong>Phone:</strong> {phone}
              </p>
            )}
            <p>
              <strong>Enrollment Year:</strong> {enrollmentYear}
            </p>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="border border-muted-foreground/20 shadow-lg">
          <CardHeader className="px-8 pt-8 pb-4">
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
              Edit Profile
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              Update your contact info, status, or profile picture below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8 pb-10">
            {errorMsg && (
              <p
                role="alert"
                className="text-red-600 font-semibold bg-red-50 rounded-md p-3"
              >
                ⚠️ {errorMsg}
              </p>
            )}
            {successMsg && (
              <p
                role="alert"
                className="text-green-700 font-semibold bg-green-50 rounded-md p-3"
              >
                ✅ {successMsg}
              </p>
            )}

            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={user.firstName} disabled />
            </div>

            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={user.lastName} disabled />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} disabled />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 890"
                disabled={loading}
                aria-invalid={!!errorMsg}
                aria-describedby="phone-error"
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={loading}
                aria-label="Select your status"
                aria-required="true"
                aria-describedby="status-help"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p id="status-help" className="text-xs text-gray-500 mt-1">
                Select your current status
              </p>
            </div>

            <div>
              <Label htmlFor="enrollmentYear">Enrollment Year</Label>
              <Input
                id="enrollmentYear"
                type="number"
                value={enrollmentYear || ""}
                onChange={(e) => setEnrollmentYear(Number(e.target.value))}
                placeholder="e.g., 2023"
                min={1900}
                max={2100}
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="profilePicture">Profile Picture</Label>
              <div
                className={cn(
                  "border-dashed border-2 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors",
                  loading && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !loading && fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && !loading)
                    fileInputRef.current?.click();
                }}
                role="button"
                tabIndex={0}
                aria-label="Upload profile picture"
              >
                {previewImage ? (
                  <>
                    <img
                      src={previewImage}
                      alt="Profile preview"
                      className="max-w-[150px] rounded-md mb-2 shadow"
                    />
                    <Button
                      variant="destructive"
                      onClick={removePreviewImage}
                      disabled={loading}
                    >
                      Remove Image
                    </Button>
                  </>
                ) : (
                  <p className="text-gray-500 select-none">
                    Click or press Enter to upload a new picture
                  </p>
                )}
              </div>
              <input
                ref={fileInputRef}
                id="profilePicture"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                disabled={loading}
                className="hidden"
                aria-label="Upload Profile Picture"
              />
            </div>

            <div>
              <Button
                onClick={handleSave}
                disabled={loading}
                className="w-full sm:w-auto"
                aria-busy={loading}
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
