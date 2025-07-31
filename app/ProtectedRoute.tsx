"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuth } from './context/AuthContext';

const publicRoutes = ['/', '/signup', '/about', '/contact', '/bout'];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const user = auth.user;
  const router = useRouter();
  const pathname = usePathname();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const isPublic = publicRoutes.includes(pathname);
    const token = Cookies.get('token');

    if (!isPublic) {
 
      if (!user || !token) {
        router.replace('/');
        return;
      }
    }

    setCheckedAuth(true); 
  }, [pathname, router]);

  if (!checkedAuth) return null;

  return <>{children}</>;
}
