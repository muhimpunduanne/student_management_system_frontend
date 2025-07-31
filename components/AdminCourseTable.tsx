'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { DialogHeader, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

type Course = {
  id: string;
  title: string;
  code: string;
  description: string;
};

export default function AdminCourseTable() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    description: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(res.data.courses || res.data);
      } catch {
        toast.error('Failed to load courses');
      }
    };

    fetchCourses();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/create`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCourses((prev) => [...prev, res.data.course]);
      toast.success('Course created successfully');
      setIsCreating(false);
      setFormData({ title: '', code: '', description: '' });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create course');
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !window.confirm('Delete this course?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses((prev) => prev.filter((c) => c.id !== id));
      toast.success('Course deleted');
    } catch {
      toast.error('Failed to delete course');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Course Management</h1>

      <Button className="mb-4" onClick={() => setIsCreating(true)}>
        + Create Course
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.code}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell className="text-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isCreating} onOpenChange={(open) => !open && setIsCreating(false)}>
        <DialogContent className="max-w-lg p-6 rounded-xl border shadow-xl">
          <DialogHeader>
            <DialogTitle>Create Course</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="code">Code</Label>
              <Input id="code" name="code" value={formData.code} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <DialogFooter className="mt-6 flex justify-end gap-3">
              <Button type="submit">Create</Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
