import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

export function AboutIntro() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-100 text-black px-6 md:px-16 py-16 md:py-32">
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 max-w-7xl mx-auto">

        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            src="https://i.postimg.cc/KvVNz9Kb/Chat-GPT-Image-Jul-27-2025-10-47-30-PM-removebg-preview.png"
            alt="Student Management System Illustration"
            className="max-w-full h-auto object-contain"
          />
        </div>

        {/* Right Side - Text & Accordion */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            What is Our Student Management System?
          </h2>
          <p className="mb-6 text-md md:text-lg text-gray-700">
            Dive into the many powerful features of our Student Management System and understand how it transforms academic administration.
          </p>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="overview">
              <AccordionTrigger className="text-blue-800">Overview</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                A centralized platform to manage everything from admissions and academics to performance tracking and communication.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="features">
              <AccordionTrigger className="text-blue-800">Core Features</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                <ul className="list-disc pl-4 space-y-1">
                  <li>Student registration & profile management</li>
                  <li>Attendance tracking and reports</li>
                  <li>Class schedules and calendar</li>
                  <li>Grade and assessment tracking</li>
                  <li>Role-based user access (admins, teachers, students)</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="integrations">
              <AccordionTrigger className="text-blue-800">Integrations</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Easily integrates with third-party tools like Google Classroom, Zoom, and payment gateways for fees.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="analytics">
              <AccordionTrigger className="text-blue-800">Data & Analytics</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Dashboards provide insights into student performance, attendance trends, and institution-wide metrics.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security">
              <AccordionTrigger className="text-blue-800">Security & Privacy</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Built with role-based access, encrypted data storage, and compliance with education privacy laws (FERPA, GDPR).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="customization">
              <AccordionTrigger className="text-blue-800">Customization Options</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Institutions can tailor the system with their branding, workflows, grading formats, and custom modules.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support">
              <AccordionTrigger className="text-blue-800">Support & Maintenance</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                24/7 technical support, training resources, and regular system updates to ensure stability and scalability.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
