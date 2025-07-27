'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { Button } from './ui/button';

export function CookieModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = Cookies.get('cookiesAccepted');
    if (!accepted) setShow(true);
  }, []);

  const handleAccept = () => {
    Cookies.set('cookiesAccepted', 'true', { expires: 365 });
    setShow(false);
  };

  const handleDecline = () => {
    Cookies.set('cookiesAccepted', 'false', { expires: 365 });
    setShow(false);
  };

  const handleClose = () => setShow(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 left-4 right-4 z-50 px-4 sm:px-6 md:px-8"
        >
          <div className="w-full mx-auto bg-blue-600 text-white flex flex-col gap-4 md:flex-row items-start md:items-center justify-between p-4 sm:p-6 md:py-6 md:px-8 rounded-lg shadow-xl backdrop-blur-md relative">
            {/* Message */}
            <div className="text-sm sm:text-base leading-relaxed max-w-3xl">
              <p>
                We use cookies to improve your experience. By continuing to use this site, you agree to our use of cookies.{' '}
                <a
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-gray-200"
                >
                  Learn more
                </a>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 md:flex-nowrap md:ml-6">
              <Button
                onClick={handleAccept}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-4 py-2 rounded w-full sm:w-auto"
              >
                Accept
              </Button>
              <Button
                onClick={handleDecline}
                className="bg-blue-500 border border-white hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full sm:w-auto"
              >
                Decline
              </Button>
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-white hover:text-blue-700 text-xl leading-none cursor-pointer hover:bg-white rounded p-1 transition-colors duration-300"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
