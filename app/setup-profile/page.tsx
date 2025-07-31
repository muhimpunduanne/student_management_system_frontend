"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  UploadCloud,
  Check,
  BookOpen,
  Code,
  Cloud,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";

const courseOptions = [
  { value: "web-dev", label: "Web Development", Icon: Code },
  { value: "ui-ux", label: "UI/UX Design", Icon: BookOpen },
  { value: "cloud", label: "Cloud Computing", Icon: Cloud },
  { value: "business", label: "Business Strategy", Icon: Briefcase },
  { value: "ai", label: "AI & ML", Icon: Check },
  { value: "data", label: "Data Science", Icon: Check },
  { value: "marketing", label: "Marketing", Icon: Check },
  { value: "finance", label: "Finance", Icon: Check },
  { value: "cybersec", label: "Cybersecurity", Icon: Check },
  { value: "graphic", label: "Graphic Design", Icon: Check },
  { value: "project", label: "Project Management", Icon: Check },
  { value: "iot", label: "IoT Engineering", Icon: Check },
];

export default function StudentProfilePage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [courses, setCourses] = useState<string[]>([]);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setName(`${user.firstName || ""} ${user.lastName || ""}`.trim());
      setEmail(user.email || "");
      setPhone(user?.student_profile?.phone || "");
      setCourses(user?.student_profile?.courses || []);
      if (user?.student_profile?.profilePicture) {
        setPreview(user.student_profile.profilePicture);
      }
    }
  }, []);

  useEffect(() => {
    if (!profilePicture) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(profilePicture);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [profilePicture]);

  const handleCourseToggle = (value: string) => {
    setCourses((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : prev.length < 12
        ? [...prev, value]
        : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (courses.length < 12) {
      toast.error("Please select at least 12 courses.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("course", JSON.stringify(courses));
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const res = await fetch("http://localhost:5000/api/students/student/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Profile updated successfully!");

        const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
        const updatedStudent = {
          ...data.student,
          courses: JSON.parse(data.student.course),
          profilePicture: `http://localhost:5000/${data.student.profilePicture.replace(/\\/g, "/")}`,
        };

        const updatedUser = {
          ...existingUser,
          student_profile: updatedStudent,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err: any) {
      toast.error("Error: " + err.message);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-6">
          <Avatar className="w-40 h-40 border-4 border-blue-500 ring-2 ring-blue-300 shadow-md">
            <AvatarImage src={preview || undefined} />
            <AvatarFallback className="text-5xl">
              {name?.[0]?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <label className="flex items-center gap-2 text-blue-700 font-medium cursor-pointer">
            <UploadCloud className="w-5 h-5" />
            Choose Profile Picture
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-sm text-gray-700">Name</Label>
            <div className="mt-1 font-semibold text-blue-900">{name}</div>
          </div>
          <div>
            <Label className="text-sm text-gray-700">Email</Label>
            <div className="mt-1 font-medium text-gray-600">{email}</div>
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-base font-medium">Select up to 12 Courses</Label>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {courseOptions.map(({ value, label, Icon }) => {
                const selected = courses.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleCourseToggle(value)}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border transition text-sm font-medium",
                      selected
                        ? "bg-blue-100 border-blue-500 ring-2 ring-blue-300"
                        : "bg-white hover:bg-blue-50 border-gray-200"
                    )}
                  >
                    <Icon className="w-5 h-5 text-blue-600" />
                    {label}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Selected: {courses.length} / 12
            </p>
          </div>

          <div className="text-center pt-4">
            <Button
              type="submit"
              className="px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-full"
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
