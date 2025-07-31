"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const StudentNavigation = [
  {
    title: "Student Dashboard",
    icon: SquareTerminal,
    items: [{ title: "Dashboard", section: "dashboard" }],
  },
  {
    title: "Courses & Learning",
    icon: Bot,
    items: [{ title: "Courses", section: "course" }],
  },
  {
    title: "Profile & Settings",
    icon: BookOpen,
    items: [{ title: "Profile", section: "profile" }],
  },
];

const AdminNavigation = [
  {
    title: "Admin Dashboard",
    icon: SquareTerminal,
    items: [{ title: "Overview", section: "admin-dashboard" }],
  },
  {
    title: "Courses",
    icon: BookOpen,
    items: [{ title: "Manage Courses", section: "admin-courses" }],
  },
  {
    title: "Admins",
    icon: Bot,
    items: [{ title: "Add Admin", section: "admin-add-admin" },
      { title: "Manage Admins", section: "admin-users" },

    ],
  },
];

// Default user data (can also be dynamic or fetched)
const defaultUser = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar({
  onNavigate,
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  onNavigate?: (section: string) => void;
  user: any;
}) {
  const role = user?.role?.toLowerCase();

  const StudentNavigation = [
    {
      title: "Student Dashboard",
      icon: SquareTerminal,
      items: [{ title: "Dashboard", section: "dashboard" }],
    },
    {
      title: "Courses & Learning",
      icon: Bot,
      items: [{ title: "Courses", section: "course" }],
    },
    {
      title: "Profile & Settings",
      icon: BookOpen,
      items: [{ title: "Profile", section: "profile" }],
    },
  ];

  const AdminNavigation = [
    {
      title: "Admin Dashboard",
      icon: SquareTerminal,
      items: [{ title: "Overview", section: "admin-dashboard" }],
    },
    {
      title: "Courses",
      icon: BookOpen,
      items: [{ title: "Manage Courses", section: "admin-courses" }],
    },
    {
      title: "Admins",
      icon: Bot,
      items: [{ title: "Admin management", section: "admin-add-admin" }],
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={[
            {
              name: "Acme Inc",
              logo: GalleryVerticalEnd,
              plan: "Enterprise",
            },
          ]}
        />
      </SidebarHeader>

      <SidebarContent>
        <NavMain
          items={role === "admin" ? AdminNavigation : StudentNavigation}
          onNavigate={onNavigate}
        />
      </SidebarContent>

      {/* <SidebarFooter>
        <NavUser
          user={
            {
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              avatar: "/avatars/default.jpg",
              role: user.role,
            } as { name: string; email: string; avatar: string; role: string }
          }
        />
      </SidebarFooter> */}

      <SidebarRail />
    </Sidebar>
  );
}
