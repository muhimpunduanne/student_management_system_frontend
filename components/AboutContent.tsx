import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function AboutContent() {
  const blocks = [
    {
      title: 'Admin Panel',
      desc: 'Central place to configure your institution, roles, permissions, and settings.'
    },
    {
      title: 'Course Management',
      desc: 'Create, update, and organize courses with schedules, instructors, and materials.'
    },
    {
      title: 'Student Assignments',
      desc: 'Assign students to courses and manage progress, attendance, and grades.'
    },
    {
      title: 'Tracking & Reports',
      desc: 'Visualize data like attendance trends, performance, and engagement analytics.'
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12">
        How the System Manages Courses & Users
      </h2>

      {/* Flow Diagram Layout */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
        {blocks.map((block, index) => (
          <div key={index} className="flex flex-col items-center text-center relative">
            <Card className="w-64 shadow-md border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{block.title}</h3>
                <p className="text-gray-600 text-sm">{block.desc}</p>
              </CardContent>
            </Card>

            {/* Arrow: only between cards */}
            {index < blocks.length - 1 && (
              <div className="hidden md:block absolute right-[-2rem] top-1/2 transform -translate-y-1/2 text-blue-500 text-3xl">
                →
              </div>
            )}

            {index < blocks.length - 1 && (
              <div className="block md:hidden mt-2 text-blue-500 text-2xl">
                ↓
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
