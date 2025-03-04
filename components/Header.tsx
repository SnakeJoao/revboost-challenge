'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <header className="flex items-center p-4 bg-gray-800 text-white">
      <button
        onClick={handleGoHome}
        className="flex items-center focus:outline-none hover:text-gray-300 hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 9.75l9-6 9 6v10.5a1.5 1.5 0 01-1.5 1.5h-3.75a1.5 1.5 0 01-1.5-1.5v-3.75a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v3.75a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V9.75z"
          />
        </svg>
        <span>Home</span>
      </button>
    </header>
  );
}
