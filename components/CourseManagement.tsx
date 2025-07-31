"use client";
import React, { useState } from "react";
// import { courses as mockCourses } from "@/data/admin-data";

export function CourseManagement() {
  const [courses, setCourses] = useState(mockCourses);

  const deleteCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl font-semibold">Manage Courses</h1>
      {courses.map((course) => (
        <div key={course.id} className="flex justify-between border p-2 rounded">
          <div>
            <h2 className="font-medium">{course.title}</h2>
            <p>{course.description}</p>
          </div>
          <button
            className="text-red-500"
            onClick={() => deleteCourse(course.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
