
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, User, Sparkles, Package, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_BLOGS } from '../constants';
import { Product, Blog } from '../types';
import { supabase } from '../lib/supabase';

export const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<{ products: Product[], blogs: Blog[] }>({ products: [], blogs: [] });
  const [settings, setSettings] = useState<any>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    supabase.from('site_settings').select('*').eq('id', 1).maybeSingle().then(({ data }) => {
      if (data) setSettings(data);
    });
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      const filteredProducts = MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults({ products: filteredProducts as any, blogs: [] });
      setIsOpen(true);
    } else {
      setResults({ products: [], blogs: [] });
      setIsOpen(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    setIsOpen(false);
    setSearchTerm('');
  }, [pathname]);

  const isActive = (path: string) => pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          {settings?.site_logo ? (
            <img src={settings.site_logo} alt="BantConfirm" className="h-10 w-auto object-contain" />
          ) : (
            <>
              <span className="text-2xl font-extrabold tracking-tighter text-blue-800">BANT</span>
              <span className="text-2xl font-bold tracking-tighter text-amber-500">Confirm</span>
            </>
          )}
        </Link>

        <div className="flex-1 max-w-xl relative mx-4 hidden md:block" ref={searchRef}>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-24 py-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="Search products, blogs or services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-2 flex items-center space-x-2">
              <button className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                <Sparkles size={12} />
                <span>AI SEARCH</span>
              </button>
            </div>
          </div>

          {isOpen && (results.products.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[70vh] overflow-y-auto z-[60]">
              <div className="p-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">Top Matches</div>
              {results.products.map(p => (
                <Link key={p.id} to={`/products/${p.id}`} className="flex items-center p-4 hover:bg-slate-50 border-b border-slate-50 transition-colors group">
                  <Package size={16} className="text-blue-600 mr-3" />
                  <span className="text-sm font-bold text-slate-700">{p.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <nav className="hidden lg:flex items-center space-x-8 text-slate-600 font-medium whitespace-nowrap">
          <Link to="/products" className={`hover:text-blue-600 transition-colors ${isActive('/products') ? 'text-blue-600' : ''}`}>Marketplace</Link>
          <Link to="/blog" className={`hover:text-blue-600 transition-colors ${isActive('/blog') ? 'text-blue-600' : ''}`}>Insights</Link>
          <Link to="/dashboard" className={`hover:text-blue-600 transition-colors ${isActive('/dashboard') ? 'text-blue-600' : ''}`}>Dashboard</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/login" className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 font-medium">
            <User size={20} />
            <span className="hidden sm:inline font-bold uppercase tracking-widest text-[10px]">Login</span>
          </Link>
          <Link to="/post-requirement" className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-black px-6 py-3 rounded-xl shadow-lg text-xs uppercase tracking-widest transition-all">
            Post Enquiry
          </Link>
        </div>
      </div>
    </header>
  );
};
