"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from "react-hot-toast";

const courseOptions = [
  "Web Development",
  "UI/UX Design",
  "Cloud Computing",
  "Business Strategy",
  "AI & ML",
  "Data Science",
  "Marketing",
  "Finance",
  "Cybersecurity",
  "Graphic Design",
  "Project Management",
  "IoT Engineering",
];

export default function StudentProfile() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [courses, setCourses] = useState<string[]>([]);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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

  const toggleCourse = (course: string) => {
    setCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : prev.length < 12
        ? [...prev, course]
        : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (courses.length < 1) {
      toast.error("Please select at least one course.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("courses", JSON.stringify(courses));
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.API_BASE_URL}/api/students/student/profile`,
        {
          method: "PUT",
          body: formData,
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }

      toast.success("Profile updated successfully!");

      // Update localStorage user data
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        user.student_profile = {
          ...user.student_profile,
          phone,
          courses,
          // Update the profilePicture preview URL (if a new pic uploaded)
          profilePicture: preview || user.student_profile?.profilePicture,
        };
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Redirect to dashboard after success
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-6">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full p-10 flex flex-col md:flex-row gap-10">
          {/* Left: Avatar and upload */}
          <div className="flex flex-col items-center space-y-6 md:w-1/3">
            <Avatar
              className="w-40 h-40 ring-4 ring-blue-400 shadow-lg rounded-full overflow-hidden transition-transform duration-300 hover:scale-105"
              aria-label="Profile Picture"
            >
              {preview ? (
                <AvatarImage
                  src={preview}
                  alt={name || "Profile"}
                  className="object-cover w-full h-full"
                />
              ) : (
                <AvatarFallback className="text-6xl font-extrabold text-blue-700 flex items-center justify-center h-full bg-blue-100">
                  {(name?.[0] || email?.[0] || "?").toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>

            <label className="cursor-pointer inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition select-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0-8a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
              {loading ? "Uploading..." : "Upload Profile Picture"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProfilePicture(e.target.files?.[0] ?? null)}
                disabled={loading}
              />
            </label>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="md:w-2/3 flex flex-col space-y-6">
            <div>
              <Label>Name</Label>
              <p className="mt-1 text-xl font-semibold text-blue-900">{name || "N/A"}</p>
            </div>

            <div>
              <Label>Email</Label>
              <p className="mt-1 text-lg text-gray-700">{email || "N/A"}</p>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
                className="mt-2"
                disabled={loading}
              />
            </div>

            <div>
              <Label>Courses (Select up to 12)</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 max-h-52 overflow-y-auto">
                {courseOptions.map((course) => {
                  const selected = courses.includes(course);
                  return (
                    <button
                      key={course}
                      type="button"
                      onClick={() => toggleCourse(course)}
                      className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border font-semibold text-sm transition ${
                        selected
                          ? "bg-blue-600 text-white border-blue-700 shadow-md"
                          : "bg-white text-blue-700 border-blue-300 hover:bg-blue-100"
                      }`}
                      disabled={loading}
                    >
                      {course}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="self-center mt-4 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg text-white font-extrabold px-10 py-3 rounded-full hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
