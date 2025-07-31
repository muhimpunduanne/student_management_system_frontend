'use client';

import React, { useEffect, useState } from 'react';
import {
  UserGroupIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ProgressLoader from './ProgressLoader';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
};

type Course = {
  id: string;
  title: string;
  code: string;
  description: string;
};

export function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found.');

      // Fetch users
      const usersRes = await fetch('http://localhost:5000/api/users/getAllUsers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!usersRes.ok) throw new Error('Failed to fetch users');
      const usersData = await usersRes.json();
      const normalizedUsers: User[] = Array.isArray(usersData)
        ? usersData
        : usersData.users || [];

      // Fetch courses
      const coursesRes = await fetch('http://localhost:5000/api/courses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!coursesRes.ok) throw new Error('Failed to fetch courses');
      const coursesData = await coursesRes.json();
      const normalizedCourses: Course[] = Array.isArray(coursesData)
        ? coursesData
        : coursesData.courses || [];

      setUsers(normalizedUsers);
      setCourses(normalizedCourses);
    } catch (err: any) {
      setError(err.message || 'Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalUsers = users.length;
  const totalStudents = users.filter((u) => u.role.toLowerCase() === 'student').length;
  const totalAdmins = users.filter((u) => u.role.toLowerCase() === 'admin').length;
  const totalCourses = courses.length;

  const chartData = {
    labels: ['Admins', 'Students', 'Users', 'Courses'],
    datasets: [
      {
        label: 'Counts',
        data: [totalAdmins, totalStudents, totalUsers, totalCourses],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Admin Dashboard Overview',
        font: { size: 18, weight: 'bold' as const },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, precision: 0 },
      },
    },
  };

  if (loading) {
    return <><ProgressLoader progress={100} /></>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 space-y-4">
        <p>🚫 {error}</p>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">📊 Admin Overview</h1>

      {/* Summary Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-4 mb-12">
        <SummaryCard
          title="Total Users"
          value={totalUsers}
          icon={<UserGroupIcon className="h-8 w-8 text-blue-500" />}
        />
        <SummaryCard
          title="Students"
          value={totalStudents}
          icon={<AcademicCapIcon className="h-8 w-8 text-green-500" />}
        />
        <SummaryCard
          title="Admins"
          value={totalAdmins}
          icon={<ShieldCheckIcon className="h-8 w-8 text-yellow-500" />}
        />
        <SummaryCard
          title="Courses"
          value={totalCourses}
          icon={<BookOpenIcon className="h-8 w-8 text-purple-600" />}
        />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-12">
        <Bar options={chartOptions} data={chartData} />
      </div>

      {/* User Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">User List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Verified</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 even:bg-gray-100"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2 capitalize">
                    {user.role.toLowerCase()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.isVerified ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

type SummaryCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

function SummaryCard({ title, value, icon }: SummaryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex items-center gap-4">
      <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
      <div>
        <p className="text-gray-500 font-semibold">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
