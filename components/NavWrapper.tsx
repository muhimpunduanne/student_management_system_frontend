// components/NavWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';

export function NavWrapper() {
  const pathname = usePathname();
  const hideNavOn404 = pathname === '/404' || pathname === '/not-found';

  if (hideNavOn404) {
    return null;
  }

  return <Navigation />;
}
