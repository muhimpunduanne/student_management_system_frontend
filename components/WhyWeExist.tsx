'use client';

import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  {
    image: 'https://res.cloudinary.com/dvl1iht4u/image/upload/v1753605245/54350588_1_r6ghln.jpg',
    heading: 'We Connect a Global World',
    subtext:
      'Our mission is to bridge cultures, industries, and ideas. By leveraging technology, we connect people across borders to spark innovation and inspire community. Every product we build is a step closer to a more unified world.',
  },
  {
    image: 'https://res.cloudinary.com/dvl1iht4u/image/upload/v1753605551/54720467_ke8u96.jpg',
    heading: 'Impacting the Future with Purpose',
    subtext:
      'We believe in progress that matters. Our vision is to empower people to shape a more equitable, sustainable, and meaningful future — through innovation, inclusion, and intentionality. This isn’t just business; it’s a movement.',
  },
  {
    image: 'https://res.cloudinary.com/dvl1iht4u/image/upload/c_crop,ar_16:9/v1753606174/3966070_hzav9b.jpg',
    heading: 'Empowering Student Management',
    subtext:
      'Our Student Management System streamlines administration, making it easier for educators and students to engage effectively. From attendance tracking to grade management, it’s designed with user-friendly tech and intuitive features for education excellence.',
  },
  // Add more reasons here as needed
];

const slideVariantsLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const slideVariantsRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

export function WhyWeExist() {
  return (
    <section className="bg-gradient-to-b from-[oklch(1_0_0)] to-[oklch(0.95_0.02_265)] py-20 space-y-32">
      {reasons.map((reason, i) => {
        const isEven = i % 2 === 0;

        return (
          <div
            key={reason.heading}
            className={`container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 ${
              isEven ? '' : 'md:flex-row-reverse'
            }`}
          >
            {/* Image */}
            <motion.div
              className="w-full md:w-1/2 overflow-hidden rounded-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={isEven ? slideVariantsLeft : slideVariantsRight}
            >
              <img
                src={reason.image}
                alt={reason.heading}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              className="w-full md:w-1/2 text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={isEven ? slideVariantsRight : slideVariantsLeft}
            >
              <h2 className="text-4xl font-bold text-primary mb-4">{reason.heading}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{reason.subtext}</p>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}
