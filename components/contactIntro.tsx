'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function ContactIntro() {
  return (
    <section className="relative h-auto md:h-[90vh] flex flex-col md:flex-row overflow-hidden">
      {/* Background image for mobile with blue overlay */}
      <div
        className="md:hidden absolute inset-0 bg-primary bg-opacity-80 bg-blend-multiply bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/X79d1QJN/side-view-teenage-male-student-carrying-bag-his-shoulder-leaning-against-wall-reading-book.jpg')",
        }}
        aria-hidden="true"
      ></div>

      {/* Content for both mobile and desktop */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full md:w-1/2 mt-12flex flex-col justify-center z-10 text-white p-8 md:p-16 bg-primary md:text-white"
      >
        <h2 className="text-4xl font-bold  mt-12 mb-6">Contact Us</h2>
        <p className="mb-8 max-w-md leading-relaxed text-lg">
          Have questions or want to collaborate? Reach out to us! We're here to
          assist you with deploying your projects smoothly and efficiently.
        </p>

        <div className="space-y-8 max-w-md">
          <div>
            <h3 className="font-semibold text-2xl mb-2">Provide Your Information</h3>
            <p className="leading-relaxed">
              Share your project details, requirements, and questions with us.
              Our team will guide you through the entire process and provide
              tailored solutions to fit your needs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-2xl mb-2">Contact Info</h3>
            <p>Email: contact@company.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
      </motion.div>

      {/* Right side image for desktop only */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/X79d1QJN/side-view-teenage-male-student-carrying-bag-his-shoulder-leaning-against-wall-reading-book.jpg')",
        }}
        aria-label="Office environment"
      ></motion.div>
    </section>
  );
}
