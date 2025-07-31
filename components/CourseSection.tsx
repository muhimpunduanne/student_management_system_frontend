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
  };
  courses: string[]; // array of course keys like ["web-dev", "ui-ux", ...]
}

export function CourseSection(porps: CourseSectionProps) {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  // Define course metadata here (could be fetched or imported)
  const courseDetails: Record<string, Omit<Course, "progress" | "id">> = {
    "web-dev": {
      title: "Web Development",
      description: "Learn HTML, CSS, and JavaScript to build websites.",
    },
    "ui-ux": {
      title: "UI/UX Design",
      description: "Design stunning user interfaces and user experiences.",
    },
    cloud: {
      title: "Cloud Computing",
      description: "Understand cloud infrastructure and services.",
    },
    data: {
      title: "Data Science",
      description: "Explore data analysis, visualization, and ML basics.",
    },
    ai: {
      title: "Artificial Intelligence",
      description: "Dive into AI concepts and applications.",
    },
    business: {
      title: "Business Fundamentals",
      description: "Learn business skills and management.",
    },
    marketing: {
      title: "Marketing",
      description: "Master digital marketing strategies.",
    },
    finance: {
      title: "Finance",
      description: "Get introduced to financial planning and management.",
    },
    cybersec: {
      title: "Cyber Security",
      description: "Protect systems and networks from cyber threats.",
    },
    iot: {
      title: "Internet of Things",
      description: "Connect and control devices over the internet.",
    },
    project: {
      title: "Project Management",
      description: "Plan, execute, and close projects effectively.",
    },
    graphic: {
      title: "Graphic Design",
      description: "Create visual content using design tools.",
    },
  };

useEffect(() => {
  const storedUserStr = localStorage.getItem("user");
  if (!storedUserStr) {
    console.warn("No user data found in localStorage under key 'user'");
    return;
  }

  try {
    const storedUser: User = JSON.parse(storedUserStr);
    console.log("Loaded user from localStorage:", storedUser);

    setUser(storedUser);

    // Fix: get courses from student_profile.course
    let userCourses: string[] = [];

    // Safely parse the course string (if available)
    const courseString = (storedUser as any)?.student_profile?.course;
    if (courseString) {
      try {
        userCourses = JSON.parse(courseString);
      } catch (err) {
        console.error("Failed to parse student_profile.course", err);
      }
    }

    if (userCourses.length === 0) {
      console.warn("User has no courses in the student_profile.course array");
    }

    const detailedCourses: Course[] = userCourses.map((courseKey) => ({
      id: courseKey,
      title: courseDetails[courseKey]?.title || courseKey,
      description:
        courseDetails[courseKey]?.description || "Course description not available",
      progress: Math.floor(Math.random() * 101),
    }));

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
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
            My Courses
          </h1>
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
              <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-semibold text-black">{`${user.firstName} ${user.lastName}`}</p>
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
