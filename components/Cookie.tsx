'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { CookieConsent } from './cookie-consent';

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
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <div className="w-full bg-blue-600 text-white flex flex-col md:flex-row items-center justify-between p-4 shadow-lg relative">
            <div className="max-w-4xl text-sm text-left">
              <p>
                We use cookies to improve your experience. By continuing to use this site,
                you agree to our use of cookies.{' '}
                <a href="/privacy" className="underline">
                  Learn more
                </a>
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex gap-2">
              <button
                onClick={handleAccept}
                className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100"
              >
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="bg-blue-500 border border-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
              >
                Decline
              </button>
            </div>

            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-white hover:text-gray-200 text-xl"
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
