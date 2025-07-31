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
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarHeaderFetchUser } from "./SidebarHeaderFetchUser";

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
       <SidebarHeaderFetchUser />

      <SidebarContent>
        <NavMain
          items={role === "admin" ? AdminNavigation : StudentNavigation}
          onNavigate={onNavigate}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
