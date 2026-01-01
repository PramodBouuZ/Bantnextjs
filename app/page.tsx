
import { Hero } from "@/components/Hero";
import { DashboardStats } from "@/components/DashboardStats";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { MOCK_PRODUCTS, VENDOR_LOGOS } from "@/lib/constants";
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

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-[#0f172a] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3 transition-all duration-700"></div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 inline-block">Partner With Us</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Scale Your Business as a Verified Vendor</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Reach thousands of BANT-qualified enterprise buyers across India. Gain access to a high-intent audience and close deals faster.
              </p>
              <Link href="/become-vendor" className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-5 rounded-2xl shadow-xl transition-all">
                <span>Become a Vendor</span>
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="relative bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-10">
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/5 p-6 rounded-3xl text-center border border-white/5">
                        <Zap size={32} className="mx-auto mb-4 text-amber-400" />
                        <p className="text-2xl font-black">1.2K+</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Vendors</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-3xl text-center border border-white/5">
                        <Coins size={32} className="mx-auto mb-4 text-green-400" />
                        <p className="text-2xl font-black">50K+</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Leads/Mo</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
