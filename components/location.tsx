'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';

const GoogleMapComponent = dynamic(() => import('@/components/GoogleMapComponent'), {
  ssr: false,
});

export function Location() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 md:px-8 py-12 text-center bg-slate-50">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Our Location</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          We're located in the heart of the city come visit our modern facility today.
        </p>
      </header>

      {/* Content: Map + Card */}
      <main className="flex flex-col md:flex-row flex-1">
        {/* Map (left) */}
        <div className="w-full md:w-1/2 h-72 md:h-auto">
          <GoogleMapComponent />
        </div>

        {/* Info Card (right, full height and centered) */}
        <div className="w-full md:w-1/2 bg-slate-50 flex items-center justify-center h-full">
          <Card className="w-full max-w-lg bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 active:scale-[0.98]">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-blue-700 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-blue-600" />
                Visit Us
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8 text-base text-gray-700 p-8">
              {/* Address */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-1">Address</h4>
                <p className="leading-relaxed text-gray-600">
                  123 Business Ave, Suite 456<br />
                  New York, NY 10001
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">info@company.com</span>
                </div>
              </div>

              {/* Business Hours */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Hours
                </h4>
                <div className="space-y-1 text-gray-600">
                  <div>Mon – Fri: 9:00 AM – 6:00 PM</div>
                  <div>Sat: 10:00 AM – 4:00 PM</div>
                  <div>Sun: Closed</div>
                </div>
              </div>

              {/* Button */}
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200"
                aria-label="Get directions to our location"
              >
                Get Directions
              </button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
