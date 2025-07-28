'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProgressLoaderProps {
  progress: number; // 0 to 100
}

export default function ProgressLoader({ progress }: ProgressLoaderProps) {
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* Container for Image + Circle with pulsing */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Circular Progress Ring */}
        <svg
          height={radius * 2}
          width={radius * 2}
          className="absolute"
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            stroke="#e5e7eb" // gray-200
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#2563eb" // blue-600
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
          />
        </svg>

        {/* Image on top */}
        <Image
          src="https://i.postimg.cc/KvVNz9Kb/Chat-GPT-Image-Jul-27-2025-10-47-30-PM-removebg-preview.png"
          alt="SMS Logo"
          width={80}
          height={80}
          className="relative z-10"
        />
      </motion.div>

      {/* Percentage Text below */}
      <div className="mt-4 text-gray-500 text-sm font-medium p-8">{progress}%</div>
    </div>
  );
}
