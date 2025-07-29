"use client";

import React, { useState } from "react";
import { motion, easeInOut } from "framer-motion";
import Image from "next/image";

const connectorData = [
  {
    name: "Igire Rwanda, ShecanCode",
    logoUrl: "https://i.postimg.cc/y6QqCVrW/Igire-Rwanda-Logo.png",
    description: "Sync your repositories and automate workflows with GitHub.",
  },
  {
    name: "The Gym",
    logoUrl: "https://i.postimg.cc/y6QqCVrW/Igire-Rwanda-Logo.png",
    description:
      "Collaborate with your team using Slack channels and messages.",
  },
  {
    name: "Auca (ADVENTIST UNIVERSITY OF CENTRAL AFRICA)",
    logoUrl:
      "https://i.postimg.cc/JzcVgbwC/cropped-AUCA-logo-wide-webblue-2-1-1.png",
    description: "Organize your documents and notes with Notion integration.",
  },
  {
    name: "Figma",
    logoUrl: "https://i.postimg.cc/JzcVgbwC/cropped-AUCA-logo-wide-webblue-2-1-1.png",
    description: "Design collaboration made easy through Figma plugin.",
  },
  {
    name: "Zapier",
    logoUrl: "https://i.postimg.cc/y6QqCVrW/Igire-Rwanda-Logo.png",
    description: "Automate workflows by connecting apps via Zapier.",
  },
];

const floatVariants = {
  float: {
    y: [0, -20, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
};

export function Connectors() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleDescription = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex h-screen w-full font-sans flex-col sm:flex-row">
      {/* Left side - 4 logos in a 2x2 grid */}
      <div className="w-full sm:w-1/2 bg-blue-50 p-6 grid grid-cols-2 grid-rows-2 gap-6 place-items-center">
        {connectorData.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-2"
          >
            <Image
              src={item.logoUrl}
              alt={item.name}
              className="object-contain"
              loading="lazy"
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>

      {/* Right side - connectors */}
      <div className="w-full sm:w-1/2 p-4 sm:p-10 bg-white overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-8 text-blue-700">
          Connectors
        </h2>
        <ul className="space-y-18">
          {connectorData.map((item, index) => (
            <li
              key={index}
              className="border-b border-gray-200 pb-4 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.logoUrl} alt={item.name} className="w-8 h-8" />
                  <span className="text-lg text-blue-800 font-medium">
                    {item.name}
                  </span>
                </div>
                <button
                  onClick={() => toggleDescription(index)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {expandedIndex === index ? "Hide info" : "View more ▾"}
                </button>
              </div>
              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-11 mt-2 text-sm text-gray-700"
                >
                  {item.description}
                </motion.div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
