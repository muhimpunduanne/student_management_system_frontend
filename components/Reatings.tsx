"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Amina Yusuf",
    role: "Student",
    school: "Harvard University",
    rating: 5,
    profileImage:
      "https://res.cloudinary.com/dvl1iht4u/image/upload/v1751402101/IMG_2194.JPEG_fouw7g.jpg",
    text: "This platform transformed the way I learn. It’s interactive, engaging, and effective.",
  },
  {
    name: "Carlos Jiménez",
    role: "Teacher",
    school: "Madrid International School",
    rating: 4,
    profileImage: "https://res.cloudinary.com/dvl1iht4u/image/upload/v1751402101/IMG_2194.JPEG_fouw7g.jpg",
    text: "As an educator, I can truly say this system makes a difference in classrooms.",
  },
  {
    name: "Fatima Zahra",
    role: "Student",
    school: "University of Toronto",
    rating: 5,
    profileImage:
      "https://res.cloudinary.com/dvl1iht4u/image/upload/v1751402101/IMG_2194.JPEG_fouw7g.jpg",
    text: "This platform has changed the way I approach my studies. Highly recommend!",
  }
  // other testimonials...
];

export function RatingsWithImage() {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[startIndex];

  return (
    <div className="flex flex-col sm:flex-row h-full w-full">
      {/* Image side */}
      <div className="relative w-full sm:w-1/2 h-[64vh] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={testimonial.name + "-image"}
            src={testimonial.profileImage}
            alt={testimonial.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Info side */}
      <div className="w-full sm:w-1/2 bg-primary flex flex-col sm:justify-center sm:items-center px-6 sm:px-24 py-6 text-white">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={testimonial.name + "-text"}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="max-w-lg bg-opacity-10 backdrop-blur-md p-6 sm:p-12 text-center sm:text-center"
            style={{ textShadow: "0 0 6px rgba(0,0,0,0.6)" }}
          >
            {/* Name and role only on desktop */}
            <div className="hidden sm:block">
              <h3 className="text-4xl font-bold mb-6">{testimonial.name}</h3>
              <p className="text-xl italic mb-8">
                {testimonial.role} at {testimonial.school}
              </p>
            </div>

            {/* On mobile: horizontal layout for rating + description */}
            <div className="flex flex-col sm:flex-col items-center gap-4 sm:gap-10">
              {/* Rating stars */}
              <div className="flex text-yellow-400 text-2xl">
                {"★".repeat(testimonial.rating)}
                {"☆".repeat(5 - testimonial.rating)}
              </div>

              {/* Description text */}
              <p className="text-2xl leading-relaxed max-w-md">{testimonial.text}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
