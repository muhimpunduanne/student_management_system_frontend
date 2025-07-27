"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    image:
      "https://res.cloudinary.com/dvl1iht4u/image/upload/v1753560810/friends-consulting-map-together_qjn9aj.jpg",
    title: "Welcome to SMS",
    subtitle: "Manage your academic progress with ease.",
  },
  {
    image:
      "https://i.postimg.cc/X79d1QJN/side-view-teenage-male-student-carrying-bag-his-shoulder-leaning-against-wall-reading-book.jpg",
    title: "Track Your Progress",
    subtitle: "Stay informed on grades and performance.",
  },
  {
    image:
      "https://i.postimg.cc/Y2Gs0KXX/college-students-different-ethnicities-cramming.jpg",
    title: "Achieve Academic Success",
    subtitle: "Connect with teachers and peers efficiently.",
  },
];

export function Herobackground() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col md:flex-row">
      {/* Left Side (Image with animation) */}
      <div className="relative w-full md:w-[60%] h-full overflow-visible">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 bottom-0 left-0 right-[-45%]"
          >
            {/* Image */}
            <Image
              src={slides[current].image}
              alt="Hero slide"
              fill
              className="object-cover w-full h-full"
              priority
            />

            {/* Dark overlay */}
            <div className="absolute top-0 left-0 w-full h-full" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Diagonal Divider */}
      <div className="hidden md:block w-0 md:w-[20vw] h-full relative">
        <div className="absolute inset-0 bg-primary clip-diagonal" />
      </div>

      {/* Right Side (Text with animation) */}
      <div className="relative w-full sm:w-[90vw] md:w-[60vw] h-full bg-primary flex items-center justify-center p-4 sm:p-6 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].title}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-full sm:max-w-xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-background mb-4">
              {slides[current].title}
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground">
              {slides[current].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
