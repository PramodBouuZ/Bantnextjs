
import React from 'react';
import { ShieldCheck, Zap, ReceiptText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-16 pb-24 overflow-hidden bg-gradient-to-b from-white to-blue-50/30">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-[100px] opacity-20 -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200 rounded-full blur-[100px] opacity-20 -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center space-x-2 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100 text-amber-700 font-medium text-sm mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
          <span>Empowering Indian Businesses</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
          The Premier IT Marketplace <br />
          <span className="text-blue-600">MSMEs & Enterprises</span>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-600 text-lg md:text-xl mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          Discover, Compare, and Buy Enterprise-grade IT, Software, and Telecom solutions. 
          We connect Indian MSMEs with verified top-tier vendors using AI-driven BANT matching.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <Link 
            to="/products" 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black px-12 py-5 rounded-2xl transition-all shadow-xl shadow-blue-200 text-center text-lg uppercase tracking-widest flex items-center justify-center group"
          >
            <span>Find IT Solutions</span>
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/post-requirement" 
            className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-blue-200 hover:text-blue-600 text-slate-800 font-black px-12 py-5 rounded-2xl transition-all text-center text-lg uppercase tracking-widest"
          >
            Post Business Requirement
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
          <div className="flex items-center space-x-2 hover:text-slate-600 transition-colors">
            <Zap size={18} className="text-blue-500" />
            <span>Optimized for MSMEs</span>
          </div>
          <div className="flex items-center space-x-2 hover:text-slate-600 transition-colors">
            <ShieldCheck size={18} className="text-purple-500" />
            <span>Enterprise-Grade Security</span>
          </div>
          <div className="flex items-center space-x-2 hover:text-slate-600 transition-colors">
            <ReceiptText size={18} className="text-green-500" />
            <span>GST Compliant Billing</span>
          </div>
        </div>
      </div>
    </section>
  );
};
