'use client';

import Link from 'next/link';
import Image from 'next/image';
import { vw } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-8 bg-gray-100">
      <div className="max-w-md w-full">
        <Image
          src="https://i.postimg.cc/BbMhF9vm/21144856-removebg-preview.png"
          alt="404 Illustration"
          width={600}
          height={500}
          className="mx-auto"
        />
        {/* <h1 className="text-3xl font-bold mt-6 mb-2 text-gray-800">404 - Page Not Found</h1> */}
        <p className="text-gray-600 mb-6">Sorry, the page you're looking for doesn't exist.</p>
        <Link href="/" passHref>
          <button className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition">
            Go Back Home
          </button>
        </Link>
      </div>
    </main>
  );
}
