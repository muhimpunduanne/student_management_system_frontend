'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import clsx from 'clsx'

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-primary/20 shadow-md backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight flex items-center space-x-1">
          <span>🌿</span>
          <span className="text-foreground">SMS</span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex gap-8 text-lg font-medium">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'transition-colors hover:text-primary hover:underline underline-offset-4',
                pathname === href ? 'text-primary font-semibold' : 'text-muted-foreground'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop call-to-action */}
        <div className="hidden md:block">
          <Button asChild size="lg" className="rounded-full px-6 shadow-sm text-base">
            <Link href="/start">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pt-16 w-[250px]">
              <div className="flex flex-col gap-6 text-lg">
                {navItems.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      'transition-colors',
                      pathname === href
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground hover:text-primary'
                    )}
                  >
                    {label}
                  </Link>
                ))}
                <Button asChild size="lg" className="mt-4 w-full rounded-full">
                  <Link href="/start">Get Started</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
