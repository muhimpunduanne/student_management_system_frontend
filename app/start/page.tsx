'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import ProgressLoader from '@/components/ProgressLoader'; // adjust the path

export default function Start() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasVisited = Cookies.get('visited');
    const token = Cookies.get('token');

    if (!hasVisited) {
      Cookies.set('visited', 'true', { expires: 365 });
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 10, 100);
        if (next >= 100) {
          clearInterval(interval);

          // After loading, check token and redirect
          if (!token) {
            Cookies.set('redirectTo', '/start');
            router.replace('/login');
          } else {
            router.replace('/dashboard');
          }
        }
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return <ProgressLoader progress={progress} />;
}
