
import { Hero } from "../components/Hero";
import { DashboardStats } from "../components/DashboardStats";
import { Marquee } from "../components/Marquee";
import { ProductCard } from "../components/ProductCard";
import { MOCK_PRODUCTS, VENDOR_LOGOS } from "../lib/constants";
import { ArrowRight, Zap, Coins, ShieldAlert, Headphones } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Promo Strip */}
      <div className="bg-[#0f172a] py-3 text-white">
        <Marquee 
          speed={30}
          items={[
            <div key="p1" className="flex items-center space-x-2 font-bold text-sm">
              <span className="text-amber-400">📢</span>
              <span>Post your Unused Leads and get up to 10% commission on your deals!</span>
            </div>,
            <div key="p2" className="flex items-center space-x-2 font-bold text-sm">
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

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Top Rated Solutions</h2>
            <Link href="/products" className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs hover:underline flex items-center">
                View All <ArrowRight size={16} className="ml-2" />
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_PRODUCTS.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>

      {/* Why Section */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4 text-center">
          <span className="bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-16">Built for Indian Business Needs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {[
              { icon: <Zap className="text-blue-600" />, title: 'Fast-Track Procurement', desc: 'Reduce your IT procurement cycle from months to days.' },
              { icon: <Coins className="text-amber-600" />, title: 'Transparent Pricing', desc: 'Compare quotes transparently. No hidden fees.' },
              { icon: <ShieldAlert className="text-blue-500" />, title: 'Verified Sellers Only', desc: 'All vendors subjected to rigorous BANT and KYC verification.' },
              { icon: <Headphones className="text-amber-800" />, title: 'Dedicated Support', desc: 'Local support team based in Bangalore to assist you.' }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-4 text-slate-900">{feature.title}</h4>
                <p className="text-slate-500 leading-relaxed mb-6 text-sm">{feature.desc}</p>
                <Link href="/about" className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline">Learn more →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
