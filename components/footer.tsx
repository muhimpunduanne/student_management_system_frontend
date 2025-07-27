import React from 'react'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-gray-300 border-t border-gray-700 py-12 px-6">
      {/* Remove bubble for cleaner modern look */}
      
      {/* Main content: use flex for horizontal alignment */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-wrap justify-between gap-8">
        {/* Logo & Description */}
        <div className="flex-1 min-w-[220px] max-w-[320px]">
          <div className="text-3xl font-bold mb-4 tracking-tight text-white">
            <span className="bg-indigo-500 text-transparent bg-clip-text">
              SMS
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white">
            At Student Management Systems (SMS), we specialize in building advanced, scalable <strong className='text-indigo-500'>Student Management Systems</strong> for educational institutions. From attendance tracking to results, scheduling, and parent-teacher communication, we help schools operate smarter and faster through technology.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex-1 min-w-[140px] max-w-[180px]">
          <h4 className="text-lg font-semibold mb-4 text-white">Navigation</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="#" className="hover:text-indigo-400 transition">Home</Link></li>
            <li><Link href="#" className="hover:text-indigo-400 transition">About Us</Link></li>
            <li><Link href="#" className="hover:text-indigo-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-[220px] max-w-[280px]">
          <h4 className="text-lg font-semibold mb-4 text-gray-200">Contact</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-2"><Phone size={18} /> +250 795 306 939</li>
            <li className="flex items-center gap-2"><Mail size={18} /> muhimpundan@gmail.com</li>
            <li className="flex items-center gap-2"><MapPin size={18} /> Kigali, Rwanda</li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="flex-1 min-w-[280px] max-w-[320px]">
          <h4 className="text-lg font-semibold mb-4 text-gray-200">Stay Updated</h4>
          <p className="text-sm text-gray-400 mb-4">
            Join our newsletter for product updates, feature launches, and education tech tips.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <Label htmlFor="email" className="sr-only">Your Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@school.edu"
              className="flex-grow bg-gray-800 border border-gray-600 text-gray-200 placeholder-gray-500 px-3 py-2 rounded"
            />
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto text-sm text-white">
        <p>&copy; {new Date().getFullYear()} EduCore Systems. All rights reserved.</p>
        <div className="flex gap-6 mt-4 sm:mt-0">
          <Link href="#" className="hover:text-indigo-400 transition"><Facebook size={20} /></Link>
          <Link href="#" className="hover:text-indigo-400 transition"><Twitter size={20} /></Link>
          <Link href="#" className="hover:text-indigo-400 transition"><Instagram size={20} /></Link>
          <Link href="#" className="hover:text-indigo-400 transition"><Linkedin size={20} /></Link>
        </div>
      </div>
    </footer>
  )
}
