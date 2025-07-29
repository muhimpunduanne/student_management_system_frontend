'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { UserIcon, SchoolIcon, UsersIcon, SettingsIcon, HeadsetIcon } from 'lucide-react'; // If you're using lucide icons

const roles = [
  {
    title: 'Teachers',
    description: 'Create and assign courses, track attendance, manage grades, and communicate with students and parents.',
    icon: <SchoolIcon className="h-8 w-8 text-blue-700" />,
  },
  {
    title: 'Students',
    description: 'Access learning materials, submit assignments, track progress, and receive feedback in real time.',
    icon: <UserIcon className="h-8 w-8 text-blue-700" />,
  },
  {
    title: 'Parents',
    description: 'Stay informed about student performance, receive updates, and communicate with teachers.',
    icon: <UsersIcon className="h-8 w-8 text-blue-700" />,
  },
  {
    title: 'Admins',
    description: 'Manage roles, permissions, system settings, and oversee the academic structure and workflows.',
    icon: <SettingsIcon className="h-8 w-8 text-blue-700" />,
  },
  {
    title: 'Support Staff',
    description: 'Handle logistics, scheduling, facility management, and student services to support the system.',
    icon: <HeadsetIcon className="h-8 w-8 text-blue-700" />,
  },
];

export function AboutTeam() {
  return (
    <section className="w-full py-20 px-6 md:px-16 bg-gradient-to-tr from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-blue-900 mb-6"
        >
          Create Teams That Power Your School
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-700 text-lg max-w-3xl mx-auto mb-14"
        >
          Our Student Management System lets you create role-based teams with the right tools to work together efficiently.
        </motion.p>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card className="group p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 bg-white hover:bg-blue-50 rounded-xl h-full">
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition">
                      {role.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-blue-800">{role.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {role.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
