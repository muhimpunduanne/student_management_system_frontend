"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { CourseSection } from "@/components/CourseSection";
import { ProfileSection } from "@/components/profile";
import { StudentDashboard } from "@/components/StudentDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Interface } from "readline";
import AdminManagementPage from "@/components/AdminManagementPage";
import AdminCourseTable from "@/components/AdminCourseTable";
import ProgressLoader from "@/components/ProgressLoader";

interface StudentDashboardProps {
  user: any;
}
export default function Page() {
  const [activeSection, setActiveSection] = React.useState("dashboard");
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }
  }, []);

  if (!user) return <> <ProgressLoader progress={100} /></>;

  const role = user.role?.toLowerCase();

  const renderSection = () => {
    if (role === "admin") {
      switch (activeSection) {
        case "admin-dashboard":
          return <AdminDashboard />;
        case "admin-courses":
          return <div><AdminCourseTable /></div>;
        case "admin-add-admin":
          return <div><AdminManagementPage /></div>;
        default:
          return <div className="p-4">Admin section not found</div>;
      }
    }

    // Student role
    switch (activeSection) {
      case "dashboard":
        return <StudentDashboard user={user} />;
      case "profile":
        return <ProfileSection user={user} />;
      case "course":
        return <CourseSection user={user} />;
      default:
        return <div className="p-4">Student section not found</div>;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar onNavigate={setActiveSection} user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    {role === "admin"
                      ? "Admin Panel"
                      : "Student Management System"}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">
                    {activeSection.replaceAll("-", " ")}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {renderSection()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
