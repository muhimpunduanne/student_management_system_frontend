"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CourseSectionProps } from "@/lib/types";
import { mockCourses } from "@/app/data/mock-users";

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  role: string;
  student_profile: {
    enrollmentYear: number;
    status: string;
    courses: string[]; // updated to reflect actual structure
  };
}

export function CourseSection(props: CourseSectionProps) {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
useEffect(() => {
  const stored = localStorage.getItem("user");
  if (!stored) return;

  try {
    const parsed: User = JSON.parse(stored);
    setUser(parsed);

    const userCourses = parsed?.student_profile?.courses || [];

    const detailedCourses: Course[] = userCourses.map((key) => {
      const courseInfo = mockCourses.find((course) => course.id === key);

      return {
        id: key,
        title: courseInfo?.title || key,
        description: courseInfo?.description || "Course description not available.",
        progress: courseInfo?.progress ?? Math.floor(Math.random() * 101),
      };
    });

    setCourses(detailedCourses);
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
  }
}, []);


  if (!user) {
    return <p className="p-6 text-center">Loading courses...</p>;
  }

  return (
    <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">My Courses</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enrolled: {user.student_profile.enrollmentYear} &middot; Status:{" "}
            <Badge
              variant="outline"
              className="ml-1 border border-blue-500 text-blue-700"
            >
              {user.student_profile.status}
            </Badge>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Total courses enrolled: {courses.length}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            {user.profilePicture ? (
              <AvatarImage
                src={user.profilePicture}
                alt={`${user.firstName} ${user.lastName}`}
              />
            ) : (
              <AvatarFallback>{user.firstName?.charAt(0) || "?"}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-semibold text-black">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="flex flex-col justify-between h-full rounded-xl shadow-sm hover:shadow-md transition-all border border-border bg-background"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-800">
                {course.title}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {course.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 mt-auto pb-4">
              <div className="space-y-2">
                <Progress value={course.progress} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">
                  {course.progress}% completed
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Continue Learning
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-600 text-blue-700 hover:bg-blue-50"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
