'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const [form, setForm] = useState({ email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔧 Send data to your backend API
    console.log('Form Submitted:', form);

    // Reset form (optional)
    setForm({ email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-6">
        {/* Introduction */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-blue-700">Get in Touch</h2>
          <p className="mt-2 text-lg text-gray-700">
            Have questions or feedback? We'd love to hear from you. Fill out the form below and our team will get back to you shortly.
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit}>
          <Card className="shadow-xl border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-blue-600 text-center">
                Contact Us
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5 p-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-800 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-800 font-medium">
                  Subject
                </Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Subject of your message"
                  value={form.subject}
                  onChange={handleChange}
                  className="focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-800 font-medium">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200"
                >
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
