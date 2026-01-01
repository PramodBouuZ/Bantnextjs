
import React, { useState } from 'react';
import { Store, ShieldCheck, Zap, ArrowRight, Loader2, CheckCircle, Globe, Building2, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BecomeVendor: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(true);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-2xl">
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Application Received!</h2>
        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
          Our vendor onboarding team will review your business credentials and contact you within 2-3 business days for KYC verification.
        </p>
        <Link to="/" className="inline-block bg-slate-900 text-white font-bold px-10 py-4 rounded-2xl shadow-xl hover:bg-blue-600 transition-all">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <span className="bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 inline-block">Vendor Onboarding</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">Partner with India's <br /> <span className="text-blue-600">Smartest Marketplace</span></h1>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl leading-relaxed">
            Reach verified B2B buyers who are ready to buy. No more junk leads—just high-intent qualified requirements.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm border border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 mb-8">Business Registration Form</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Company Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                        <Building2 size={18} />
                      </div>
                      <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" placeholder="Acme Technologies" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Company GSTIN</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                        <ShieldCheck size={18} />
                      </div>
                      <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" placeholder="29XXXXX0000X1Z5" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Business Website</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                        <Globe size={18} />
                      </div>
                      <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" placeholder="www.example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Business Phone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                        <Phone size={18} />
                      </div>
                      <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" placeholder="+91 98XXX XXXXX" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Core Service Category</label>
                  <select required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none">
                    <option value="">Select your specialty...</option>
                    <option value="software">Enterprise Software (ERP/CRM)</option>
                    <option value="telecom">Telecom & Connectivity</option>
                    <option value="hardware">IT Hardware & Infrastructure</option>
                    <option value="cloud">Cloud & Hosting Services</option>
                    <option value="security">Cybersecurity Solutions</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Business Brief</label>
                  <textarea required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none h-32 resize-none transition-all" placeholder="Tell us about your service offerings and target market..." />
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-[2rem] shadow-xl shadow-blue-200 transition-all flex items-center justify-center space-x-2 text-lg"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : <Store size={24} />}
                  <span>{loading ? 'Processing Application...' : 'Apply for Vendor Status'}</span>
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-10">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white">
              <h4 className="text-2xl font-black mb-8">Why Partner With Us?</h4>
              <div className="space-y-10">
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Zap size={28} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xl mb-2">Instant Scale</h5>
                    <p className="text-slate-400 leading-relaxed text-sm">Gain exposure to 50,000+ monthly business requirements across all major Indian cities.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center shrink-0">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xl mb-2">BANT Qualified</h5>
                    <p className="text-slate-400 leading-relaxed text-sm">Our AI pre-verifies Budget, Authority, Need, and Timing for every single lead.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shrink-0">
                    <ArrowRight size={28} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xl mb-2">Faster Closures</h5>
                    <p className="text-slate-400 leading-relaxed text-sm">Connect with decision-makers directly and reduce your average sales cycle by 40%.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-[3rem] p-10 border border-blue-100">
              <h4 className="text-xl font-black text-slate-900 mb-4">Onboarding Process</h4>
              <div className="space-y-6">
                {[
                  'Apply with business credentials',
                  'KYC and GSTIN Verification',
                  'Inventory & Portfolio Mapping',
                  'Start receiving verified leads'
                ].map((step, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-black text-blue-600 shadow-sm">
                      {i + 1}
                    </div>
                    <span className="text-slate-700 font-bold">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
