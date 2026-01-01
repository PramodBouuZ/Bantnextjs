
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, Package, FileText, 
  Layers, Store, Settings, LogOut, Bell 
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { id: 'leads', label: 'Leads Hub', icon: Users, href: '/admin/leads' },
  { id: 'products', label: 'Product Catalog', icon: Package, href: '/admin/products' },
  { id: 'blogs', label: 'Blog Manager', icon: FileText, href: '/admin/blogs' },
  { id: 'categories', label: 'Categories', icon: Layers, href: '/admin/categories' },
  { id: 'vendors', label: 'Vendors', icon: Store, href: '/admin/vendors' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white fixed h-full z-50">
        <div className="p-8 border-b border-white/10 flex items-center space-x-2">
          <span className="text-2xl font-black tracking-tighter text-blue-400">BANT</span>
          <span className="text-2xl font-bold tracking-tighter text-amber-400">Admin</span>
        </div>
        <nav className="p-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.id} 
                href={item.href}
                className={`flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <Link 
            href="/login"
            className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm mt-10"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-72">
        <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-40 px-12 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black">BC</div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">System Control Center</h2>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-slate-200 pl-6">
              <div className="text-right">
                <p className="text-sm font-black text-slate-900">System Admin</p>
                <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Online</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-full shadow-inner"></div>
            </div>
          </div>
        </header>
        <main className="p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
