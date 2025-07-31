"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ProgressLoader from "./ProgressLoader";
import { StudentDashboardProps } from "@/lib/types";

// Course metadata
const courseDetails: Record<string, Omit<Course, "id" | "progress">> = {
  "web-dev": {
    title: "Web Development",
    description: "Learn HTML, CSS, and JavaScript to build websites.",
  },
  "ui-ux": {
    title: "UI/UX Design",
    description: "Design stunning user interfaces and experiences.",
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
    description: "Learn essential business and management skills.",
  },
  marketing: {
    title: "Marketing",
    description: "Master digital and traditional marketing strategies.",
  },
  finance: {
    title: "Finance",
    description: "Understand finance and investment basics.",
  },
  cybersec: {
    title: "Cyber Security",
    description: "Protect systems and networks from cyber threats.",
  },
  iot: {
    title: "Internet of Things",
    description: "Connect and control smart devices via the Internet.",
  },
  project: {
    title: "Project Management",
    description: "Plan and execute projects effectively.",
  },
  graphic: {
    title: "Graphic Design",
    description: "Create stunning visuals and graphics.",
  },
};

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
}

interface StudentProfile {
  enrollment_year: number;
  status: string;
  courses: Course[];
}

interface User {
  name: string;
  role: "student";
  student_profile?: StudentProfile;
}

function getPerformanceLabel(progress: number) {
  if (progress >= 85) return { label: "Excellent", color: "green" };
  if (progress >= 60) return { label: "Good", color: "blue" };
  if (progress >= 30) return { label: "Average", color: "yellow" };
  return { label: "Needs Improvement", color: "red" };
}

export function StudentDashboard(props: StudentDashboardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      const name = `${parsed.firstName || ""} ${parsed.lastName || ""}`.trim();

      const student = parsed.student_profile || {};
      let parsedCourseKeys: string[] = [];

      try {
        parsedCourseKeys = JSON.parse(student.course || "[]");
      } catch (e) {
        console.error("Failed to parse student_profile.course", e);
      }

      const detailedCourses: Course[] = parsedCourseKeys.map((key) => ({
        id: key,
        title: courseDetails[key]?.title || key,
        description:
          courseDetails[key]?.description || "No description available.",
        progress: Math.floor(Math.random() * 101), // Replace with real progress if available
      }));

      const fullUser: User = {
        name,
        role: "student",
        student_profile: {
          enrollment_year: student.enrollmentYear || 0,
          status: student.status || "PENDING",
          courses: detailedCourses,
        },
      };

      setUser(fullUser);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <ProgressLoader progress={50} />;
  }

  if (!user || !user.student_profile) {
    return (
      <div className="p-6 text-center text-gray-600">
        No profile found. Please update your student profile first.
      </div>
    );
  }

  const { courses, enrollment_year, status } = user.student_profile;
  const totalCourses = courses.length;
  const avgProgress = Math.round(
    courses.reduce((acc, c) => acc + c.progress, 0) / (courses.length || 1)
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
          Welcome back, {user.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here’s your academic performance overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Courses</CardTitle>
            <CardDescription>All active enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-800">{totalCourses}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Progress</CardTitle>
            <CardDescription>Across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={avgProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {avgProgress}% completed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Enrollment status</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge
              variant="outline"
              className="text-sm border-blue-500 text-blue-700"
            >
              {status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enrolled Year</CardTitle>
            <CardDescription>Program start</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{enrollment_year}</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-700">
          Performance Overview
        </h2>

        {/* Mobile View */}
        <div className="block lg:hidden space-y-4">
          {courses.map((course) => {
            const { label, color } = getPerformanceLabel(course.progress);
            return (
              <Card key={course.id} className="border border-blue-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span>{course.progress}%</span>
                    <Badge
                      variant="outline"
                      className={`text-xs text-${color}-700 border-${color}-500`}
                    >
                      {label}
                    </Badge>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => setSelectedCourse(course)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{selectedCourse?.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3 text-sm">
                        <p className="text-muted-foreground">
                          {selectedCourse?.description}
                        </p>
                        <Progress value={selectedCourse?.progress ?? 0} />
                        <p>
                          Progress:{" "}
                          <span className="font-medium">
                            {selectedCourse?.progress}%
                          </span>
                        </p>
                        <p>
                          Performance:{" "}
                          <Badge variant="outline">
                            {
                              getPerformanceLabel(selectedCourse?.progress || 0)
                                .label
                            }
                          </Badge>
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto rounded-md border border-blue-100">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-50 text-blue-800">
              <tr>
                <th className="px-4 py-3 font-medium">Course</th>
                <th className="px-4 py-3 font-medium">Progress</th>
                <th className="px-4 py-3 font-medium">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {courses.map((course) => {
                const { label, color } = getPerformanceLabel(course.progress);
                return (
                  <tr key={course.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{course.title}</td>
                    <td className="px-4 py-3 w-1/2 min-w-[150px]">
                      <Progress value={course.progress} className="h-2 mb-1" />
                      <span className="text-xs text-muted-foreground">
                        {course.progress}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={`text-xs border-${color}-500 text-${color}-700`}
                      >
                        {label}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
