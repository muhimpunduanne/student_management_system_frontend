'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const missionLevels = [
  {
    title: 'Empower Innovation',
    subtexts: [
      'Creating opportunity',
      'Driving technology forward',
      'Empowering change',
    ],
    image:
      'https://res.cloudinary.com/dvl1iht4u/image/upload/v1753607938/5592274_g72apx.jpg',
    details: {
      summary:
        'We focus on empowering innovation through sustainable technology and inclusive opportunities for all.',
      extended: `
        Our mission to empower innovation is rooted in fostering creativity, supporting groundbreaking ideas,
        and providing equitable access to tools and education. We believe innovation should be a shared experience,
        and our initiatives help individuals and organizations unlock their full potential.
      `,
    },
  },
  {
    title: 'Inspire Growth',
    subtexts: ['Growing talent', 'Building the future', 'Developing leaders'],
    image:
      'https://res.cloudinary.com/dvl1iht4u/image/upload/v1753607938/5592274_g72apx.jpg',
    details: {
      summary:
        'We invest in talent and provide platforms that nurture personal and professional growth.',
      extended: `
        Growth is about transformation — we aim to help individuals thrive by giving them access to mentorship,
        leadership opportunities, and continuous learning environments. From startups to schools, we drive progress.
        Our core value is <span class="text-blue-600 font-semibold">inspiration</span> — we spark it in everyone we reach.
      `,
    },
  },
  {
    title: 'Achieve Impact',
    subtexts: ['Real-world change', 'Community focus', 'Measurable outcomes'],
    image:
      'https://res.cloudinary.com/dvl1iht4u/image/upload/v1753607938/5592274_g72apx.jpg',
    details: {
      summary:
        'We drive positive change through focused efforts, meaningful partnerships, and community engagement.',
      extended: `
        Impact matters. Our programs deliver measurable results, uplift underserved communities,
        and focus on long-term benefits for people and the planet. Whether it's education, health, or sustainability — we lead with purpose.
      `,
    },
  },
];

export function Ourmission() {
  const [level, setLevel] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const levelInterval = setInterval(() => {
      setLevel((prev) => (prev + 1) % missionLevels.length);
      setTextIndex(0);
    }, 10000);
    return () => clearInterval(levelInterval);
  }, []);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setTextIndex(
        (prev) => (prev + 1) % missionLevels[level].subtexts.length
      );
    }, 3000);
    return () => clearInterval(textTimer);
  }, [level]);

  const { title, subtexts, image, details } = missionLevels[level];

  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-24 bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Corner Bubbles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top Left */}
        <div className="bubble" style={{ width: 240, height: 240, top: 0, left: 0 }} />
        <div className="bubble" style={{ width: 180, height: 180, top: 60, left: 80 }} />
        {/* Top Right */}
        <div className="bubble" style={{ width: 250, height: 250, top: 0, right: 0 }} />
        <div className="bubble" style={{ width: 160, height: 160, top: 80, right: 60 }} />
        {/* Bottom Left */}
        <div className="bubble" style={{ width: 200, height: 200, bottom: 0, left: 0 }} />
        <div className="bubble" style={{ width: 150, height: 150, bottom: 100, left: 70 }} />
        {/* Bottom Right */}
        <div className="bubble" style={{ width: 220, height: 220, bottom: 0, right: 0 }} />
        <div className="bubble" style={{ width: 180, height: 180, bottom: 120, right: 40 }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Column */}
        <motion.div
          key={title}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 w-full"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 leading-tight">
            {title}
          </h1>

          <motion.p
            key={subtexts[textIndex]}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.5 }}
            className="text-xl text-blue-700 italic mb-6 min-h-[2rem]"
          >
            {subtexts[textIndex]}
          </motion.p>

          <p className="text-lg text-slate-700 mb-6">{details.summary}</p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="more">
              <AccordionTrigger className="text-blue-900 text-lg">
                Read the full mission
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-base mt-2 prose prose-blue">
                <div dangerouslySetInnerHTML={{ __html: details.extended }} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        {/* Center Divider */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 opacity-10 text-2xl font-semibold text-blue-300 z-0 pointer-events-none select-none whitespace-nowrap">
          / Worlds of Success /
        </div>

        {/* Right Image */}
        <motion.div
          key={image}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 w-full flex justify-center"
        >
          <img
            src={image}
            alt={title}
            className="rounded-xl shadow-2xl w-full max-w-lg object-cover transition duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
}
