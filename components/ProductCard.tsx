
'use client';

import React from 'react';
import { Star, Globe, Zap, CheckCircle2, CalendarCheck } from 'lucide-react';
import Link from 'next/link';

export const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  // Use slug for routing if available, fallback to ID
  const productSlug = product.slug || product.id;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <Link href={`/products/${productSlug}`} className="relative h-48 overflow-hidden block">
        <img 
          src={product.image_url || product.imageUrl || 'https://via.placeholder.com/400x300'} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-2 rounded-xl border border-white/20">
          <Globe size={18} className="text-blue-600" />
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl flex items-center space-x-1 shadow-sm font-black text-xs">
          <Star size={12} className="text-amber-500 fill-amber-500" />
          <span>{product.rating || '4.8'}</span>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <Link href={`/products/${productSlug}`}>
          <h3 className="text-xl font-black text-slate-800 mb-2 hover:text-blue-600 transition-colors tracking-tight">{product.name}</h3>
        </Link>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 font-medium">{product.short_description || product.description}</p>
        
        <div className="bg-slate-50 rounded-xl p-3 mb-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center">
            <Zap size={10} className="mr-1 text-amber-500 fill-amber-500" /> TOP FEATURES
          </p>
          <div className="flex flex-col space-y-1.5">
            {product.features?.slice(0, 3).map((f: string, i: number) => (
              <span key={i} className="text-[11px] font-black text-slate-600 flex items-center">
                <CheckCircle2 size={12} className="mr-2 text-green-500" /> {f}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <div className="mb-6 flex items-baseline justify-between">
            <div>
               <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">STARTING AT</p>
               <p className="text-2xl font-black text-slate-900 leading-tight">₹{product.price}</p>
            </div>
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase tracking-widest">GST READY</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link 
              href={`/products/${productSlug}`} 
              className="bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-colors text-center shadow-lg shadow-blue-100 flex items-center justify-center space-x-2 text-sm uppercase tracking-widest"
            >
              <span>View</span>
            </Link>
            <Link 
              href="/post-requirement" 
              className="bg-amber-400 text-slate-900 font-black py-4 rounded-xl hover:bg-amber-500 transition-colors text-center shadow-lg shadow-amber-100 flex items-center justify-center space-x-2 text-sm uppercase tracking-widest"
            >
              <CalendarCheck size={16} />
              <span>Book</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
