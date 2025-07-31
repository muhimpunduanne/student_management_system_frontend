"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";

type NavItem = {
  title: string;
  section: string;
};

type NavGroup = {
  title: string;
  icon: LucideIcon;
  items: NavItem[];
};

export function NavMain({
  items,
  onNavigate,
}: {
  items: NavGroup[];
  onNavigate?: (section: string) => void;
}) {
  return (
    <nav className="space-y-6 px-4 py-2">
      {items.map((group) => (
        <div key={group.title} className="space-y-3">
          <div className="flex items-center text-sm font-semibold text-black uppercase tracking-wide">
            <group.icon className="mr-2 h-4 w-4 text-blue-500" />
            {group.title}
          </div>
          <div className="flex flex-col space-y-2">
            {group.items.map((item) => (
              <button
                key={item.title}
                onClick={() => onNavigate?.(item.section)}
                className="text-left px-3 py-2 rounded-md text-sm font-medium text-black bg-blue-50 hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
