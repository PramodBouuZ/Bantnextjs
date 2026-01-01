
'use client';

import React, { useState } from 'react';
import { Search, User, Sparkles, Package } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const pathname = usePathname();

  // Helper to determine active state safely
  const isActive = (path: string) => {
    // pathname can be null during initial hydration or if used outside a Next.js App Router context.
    if (typeof pathname !== 'string') return false;
    return pathname === path || (path !== '/' && pathname.startsWith(path));
  };

  // Don't show header in admin pages. 
  // We use typeof check to prevent "Cannot read properties of null (reading 'startsWith')"
  // and safely handle cases where usePathname() might return null.
  if (typeof pathname !== 'string' || pathname.startsWith('/admin')) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <span className="text-2xl font-extrabold tracking-tighter text-blue-800">BANT</span>
          <span className="text-2xl font-bold tracking-tighter text-amber-500">Confirm</span>
        </Link>

        <div className="flex-1 max-w-xl relative mx-4 hidden md:block">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-24 py-2.5 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
              placeholder="Search solutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <button className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                <Sparkles size={12} />
                <span>AI SEARCH</span>
              </button>
            </div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center space-x-8 text-slate-600 font-medium whitespace-nowrap">
          <Link href="/products" className={`hover:text-blue-600 transition-colors ${isActive('/products') ? 'text-blue-600' : ''}`}>Marketplace</Link>
          <Link href="/blog" className={`hover:text-blue-600 transition-colors ${isActive('/blog') ? 'text-blue-600' : ''}`}>Insights</Link>
          <Link href="/dashboard" className={`hover:text-blue-600 transition-colors ${isActive('/dashboard') ? 'text-blue-600' : ''}`}>Dashboard</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/login" className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 font-medium">
            <User size={20} />
            <span className="hidden sm:inline font-bold uppercase tracking-widest text-[10px]">Login</span>
          </Link>
          <Link href="/post-requirement" className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-black px-6 py-3 rounded-xl shadow-lg text-xs uppercase tracking-widest transition-all">
            Post Enquiry
          </Link>
        </div>
      </div>
    </header>
  );
};
