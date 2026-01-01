
import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { DashboardStats } from '../components/DashboardStats';
import { Marquee } from '../components/Marquee';
import { ProductCard } from '../components/ProductCard';
import { MOCK_PRODUCTS, VENDOR_LOGOS } from '../constants';
import { 
  ArrowRight, 
  Star, 
  Search, 
  X, 
  CheckCircle2, 
  Briefcase, 
  Store, 
  ShieldCheck, 
  Zap, 
  ShieldAlert, 
  Headphones,
  Coins
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HOME_CATEGORIES = ['All', 'Software', 'Telecom', 'Security', 'Infrastructure'];

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [productSearch, setProductSearch] = useState('');

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.description.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-24 pb-20">
      {/* Promo Strip */}
      <div className="bg-[#0f172a] py-3 text-white">
        <Marquee 
          speed={30}
          items={[
            <div className="flex items-center space-x-2 font-bold text-sm">
              <span className="text-amber-400">📢</span>
              <span>Post your Unused Leads and get up to 10% commission on your deals!</span>
            </div>,
            <div className="flex items-center space-x-2 font-bold text-sm">
              <span className="text-blue-400">✨</span>
              <span>Trusted by 10,000+ Enterprises Pan-India</span>
            </div>
          ]}
        />
      </div>

      <Hero />
      <DashboardStats />

      {/* Vendor Logo Section */}
      <section className="container mx-auto px-4">
        <p className="text-center text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mb-10">Our Trusted Marketplace Partners</p>
        <div className="py-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          <Marquee 
            items={VENDOR_LOGOS.map((url, i) => (
              <img key={i} src={url} alt="Vendor" className="h-10 w-auto object-contain" />
            ))}
          />
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="container mx-auto px-4 scroll-mt-24" id="explore-solutions">
        <div className="flex flex-col mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Explore IT & Telecom Solutions</h2>
          <p className="text-slate-500 mb-8">Curated services for the Indian business ecosystem</p>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center space-x-3 overflow-x-auto pb-2 no-scrollbar">
              {HOME_CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-2.5 rounded-full font-bold transition-all border whitespace-nowrap shadow-sm ${
                    cat === selectedCategory 
                      ? 'bg-[#1e293b] text-white border-[#1e293b] shadow-slate-200' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search products in marketplace..."
                className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-10 py-3 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
              />
              {productSearch && (
                <button 
                  onClick={() => setProductSearch('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-16">
          {selectedCategory === 'All' ? (
            <>
              {/* Software Section */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold flex items-center">
                    <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3 shadow-sm text-xl">💻</span>
                    Enterprise Software
                  </h3>
                  <Link to="/products" className="text-blue-600 font-bold flex items-center text-sm group">
                    View All <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {MOCK_PRODUCTS.filter(p => p.category === 'Software').slice(0, 4).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
              {/* Telecom Section */}
              <div>
                <div className="flex items-center justify-between mb-8 mt-12">
                  <h3 className="text-2xl font-bold flex items-center">
                    <span className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3 shadow-sm text-xl">📞</span>
                    Telecom & Connectivity
                  </h3>
                  <Link to="/products" className="text-blue-600 font-bold flex items-center text-sm group">
                    View All <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {MOCK_PRODUCTS.filter(p => p.category === 'Telecom').slice(0, 4).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold flex items-center capitalize">
                  <span className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mr-3 shadow-sm text-xl">🏢</span>
                  {selectedCategory} Solutions
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Become a Vendor CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-[#0f172a] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3 group-hover:bg-blue-600/20 transition-all duration-700"></div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 inline-block">Partner With Us</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Scale Your Business as a Verified Vendor</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Reach thousands of BANT-qualified enterprise buyers across India. Gain access to a high-intent audience and close deals faster.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  'Verified BANT qualified leads',
                  'Dedicated account management',
                  'Enterprise-grade sales tools',
                  'Low commission, high conversion'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-slate-300">
                    <CheckCircle2 size={18} className="text-blue-500" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/become-vendor" className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-5 rounded-2xl shadow-xl shadow-blue-900/40 transition-all">
                <span>Become a Vendor</span>
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-3xl text-center border border-white/5">
                    <Store className="mx-auto mb-4 text-amber-400" size={32} />
                    <p className="text-2xl font-black">1.2K+</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Vendors</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl text-center border border-white/5">
                    <ShieldCheck className="mx-auto mb-4 text-green-400" size={32} />
                    <p className="text-2xl font-black">98%</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Trust Score</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl text-center border border-white/5">
                    <Briefcase className="mx-auto mb-4 text-blue-400" size={32} />
                    <p className="text-2xl font-black">50K+</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Leads/Mo</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl text-center border border-white/5">
                    <Star className="mx-auto mb-4 text-purple-400" size={32} />
                    <p className="text-2xl font-black">4.9/5</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Vendor Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why BantConfirm - High Fidelity Cards */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Built for Indian Business Needs</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Zap className="text-blue-600" />, title: 'Fast-Track Procurement', desc: 'Reduce your IT procurement cycle from months to days.' },
              { icon: <Coins className="text-amber-600" />, title: 'Transparent Pricing', desc: 'Compare quotes transparently. No hidden fees.' },
              { icon: <ShieldAlert className="text-blue-500" />, title: 'Verified Sellers Only', desc: 'All vendors subjected to rigorous BANT and KYC verification.' },
              { icon: <Briefcase className="text-amber-800" />, title: 'Dedicated Support', desc: 'Local support team based in Bangalore to assist you.' }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {React.cloneElement(feature.icon as React.ReactElement, { size: 32 })}
                </div>
                <h4 className="text-xl font-bold mb-4 text-slate-900">{feature.title}</h4>
                <p className="text-slate-500 leading-relaxed mb-6 text-sm">{feature.desc}</p>
                <Link to="/about" className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline">Learn more →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Production Ready Styling */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 text-9xl font-black text-white">+</div>
            <div className="absolute bottom-10 right-10 text-9xl font-black text-white">+</div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">Ready to Upgrade Your <br /> Business IT?</h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
              Join thousands of Indian businesses already saving time and money on IT procurement. Start today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                to="/products" 
                className="w-full sm:w-auto bg-white text-blue-600 font-bold px-12 py-5 rounded-[2rem] shadow-2xl shadow-blue-900/40 hover:scale-105 transition-transform flex items-center justify-center text-lg min-w-[240px]"
              >
                Browse Marketplace
              </Link>
              <Link 
                to="/contact" 
                className="w-full sm:w-auto border-2 border-white/50 text-white font-bold px-12 py-5 rounded-[2rem] hover:bg-white/10 transition-all flex items-center justify-center text-lg min-w-[240px]"
              >
                Talk to Sales
              </Link>
            </div>
            
            <div className="mt-16 flex flex-wrap justify-center gap-10 text-blue-200 text-[10px] font-bold uppercase tracking-[0.2em]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} />
                <span>Verified Vendors</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} />
                <span>BANT Qualified Leads</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} />
                <span>Instant Quotes</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
