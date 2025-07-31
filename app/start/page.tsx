'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import ProgressLoader from '@/components/ProgressLoader'; // adjust path if needed

export default function Start() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
  
    const visitedLocal = localStorage.getItem('visited');
    const visitedCookie = Cookies.get('visited');

    if (!visitedLocal) {
      localStorage.setItem('visited', 'true');
    }
    if (!visitedCookie) {
      Cookies.set('visited', 'true', { expires: 365 });
    }


    const tokenLocal = localStorage.getItem('token');
    const tokenCookie = Cookies.get('token');
    const token = tokenLocal || tokenCookie;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 10, 100);
        if (next >= 100) {
          clearInterval(interval);

 
          if (!token) {
            localStorage.setItem('redirectTo', '/start');
            Cookies.set('redirectTo', '/start', { expires: 1 });
            router.replace('/login');
          } else {
            router.replace('/dashboard');
          }
        }
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [router]);

  return <ProgressLoader progress={progress} />;
}
