
import React from 'react';
import { Target, Eye, ShieldCheck, Zap, Users, Trophy } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="container mx-auto px-4 text-center">
          <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 inline-block">The Story of BantConfirm</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">Empowering B2B Growth <br /><span className="text-blue-600">Through AI Intelligence</span></h1>
          <p className="max-w-3xl mx-auto text-slate-500 text-lg md:text-xl leading-relaxed">
            Founded in Noida, BantConfirm is India's leading B2B AI marketplace, dedicated to bridging the gap between high-intent business requirements and verified technology vendors.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1522071823992-740e1e6166e0?auto=format&fit=crop&q=80&w=1200" 
              alt="Team collaboration" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900 leading-tight">Why We Started BantConfirm</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              We realized that most B2B leads in India were "junk"—unqualified, budget-less, or simply not ready to buy. Vendors were wasting 80% of their sales efforts on dead ends. 
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              By applying the <b>BANT (Budget, Authority, Need, Timing)</b> framework via advanced Gemini AI, we ensure that every requirement posted is a real opportunity. We turn unused leads into revenue and verified service providers into business partners.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-3xl font-black text-blue-600">10K+</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Verified Leads</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-3xl font-black text-amber-500">1.2K+</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">SME Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Target size={120} />
              </div>
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-black mb-6">Our Mission</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                To revolutionize B2B procurement in India through AI-driven BANT qualification, ensuring trust, efficiency, and growth for MSMEs and enterprise technology providers.
              </p>
            </div>
            <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Eye size={120} />
              </div>
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-8">
                <Eye size={32} />
              </div>
              <h3 className="text-3xl font-black mb-6">Our Vision</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                To become India's largest and most trusted AI-powered ecosystem where every business requirement finds its perfect technology match instantly and transparently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-24 text-center">
        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 inline-block">Core Values</span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-16">The BantConfirm Way</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: <ShieldCheck className="text-green-500" />, title: 'Absolute Trust', desc: 'Every vendor and lead goes through a multi-step verification process.' },
            { icon: <Zap className="text-blue-500" />, title: 'AI-First Speed', desc: 'We leverage cutting-edge AI to automate qualification in seconds.' },
            { icon: <Users className="text-purple-500" />, title: 'MSME Success', desc: 'Our platform is built to solve the specific procurement pains of Indian small businesses.' }
          ].map((val, i) => (
            <div key={i} className="space-y-4">
              <div className="w-20 h-20 bg-white rounded-3xl border border-slate-100 shadow-sm mx-auto flex items-center justify-center">
                {React.cloneElement(val.icon as React.ReactElement, { size: 32 })}
              </div>
              <h4 className="text-xl font-bold text-slate-900">{val.title}</h4>
              <p className="text-slate-500 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
