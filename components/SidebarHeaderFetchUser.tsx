'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const name = `${parsed.firstName || ''} ${parsed.lastName || ''}`.trim();
        const email = parsed.email || '';

        const rawPath = parsed.student_profile?.profilePicture || '';
        const avatar = rawPath
          ? `http://localhost:5000/${rawPath.replace(/\\/g, '/')}`
          : '/avatars/default.jpg';

        setUser({ name, email, avatar });
      } catch (e) {
        console.error('Invalid user data in localStorage');
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn('flex items-center gap-3 px-4 py-3 cursor-pointer', className)}
          {...props}
        >
          <img
            src={user?.avatar || 'https://res.cloudinary.com/dvl1iht4u/image/upload/v1753987101/ChatGPT_Image_Jul_27__2025__10_47_30_PM-removebg-preview_b3wtkj.png'}
            alt={user?.name || 'User'}
            className="h-10 w-10 rounded-full object-cover border border-gray-300"
          />
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {user?.name || 'Guest'}
            </span>
            <span className="truncate text-xs text-gray-500">
              {user?.email || ''}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 mt-2 mr-2">
        <DropdownMenuItem onClick={handleSignOut}>
          🚪 Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
