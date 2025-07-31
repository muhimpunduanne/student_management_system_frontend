'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface User {
  name: string;
  email: string;
  avatar: string;
}

export function SidebarHeaderFetchUser({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch (e) {
        console.error('Invalid user data in localStorage');
      }
    }
  }, []);

  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn('flex items-center gap-3 px-4 py-3', className)}
      {...props}
    >
      <img
        src={user?.avatar || '/avatars/default.jpg'}
        alt={user?.name || 'User'}
        className="h-10 w-10 rounded-full object-cover"
      />
      <div className="flex flex-col overflow-hidden">
        <span className="truncate text-sm font-medium text-gray-900 dark:text-white">
          {user?.name || 'Guest'}
        </span>
        <span className="truncate text-xs text-gray-500">{user?.email}</span>
      </div>
    </div>
  );
}
