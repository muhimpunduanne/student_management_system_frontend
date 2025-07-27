"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import clsx from "clsx";

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-primary/20 shadow-md backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:py-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight flex items-center space-x-1"
        >
          <span>🌿</span>
          <span className="text-foreground">SMS</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-12 text-lg font-medium">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "transition-colors hover:text-white hover:underline underline-offset-4",
                pathname === href ? "text-oklch font-semibold" : "text-oklch"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button
            asChild
            size="lg"
            className="rounded-full px-6 shadow-sm text-base bg-white text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            <Link href="/start">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden px-0">
          <Sheet>
            <SheetTrigger className="w-12 h-12 flex items-center justify-center rounded-md hover:bg-gray-100">
              <Menu className={`w-8 h-8 transition-colors ${isScrolled ? "text-black" : "text-white"}`} />
            </SheetTrigger>

            <SheetContent
              side="bottom"
              className="pt-4 pb-10 px-6 rounded-t-2xl bg-white max-w-full w-full left-0 right-0"
            >
              <div className="flex flex-col space-y-6 text-lg">
                {navItems.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      "transition-colors text-center py-2 rounded-md hover:bg-gray-100",
                      pathname === href
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700"
                    )}
                  >
                    {label}
                  </Link>
                ))}

                <Button
                  asChild
                  size="lg"
                  className="mt-4 w-full rounded-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Link href="/start">Get Started</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
