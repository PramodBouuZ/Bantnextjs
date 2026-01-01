
import React, { useState } from 'react';
import { Plus, Minus, Search, HelpCircle } from 'lucide-react';
// Import Link from react-router-dom to fix navigation errors
import { Link } from 'react-router-dom';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What does BANT mean?",
      a: "BANT stands for Budget, Authority, Need, and Timing. It is a sales qualification framework used to identify leads that are likely to convert. At BantConfirm, our AI automates this process to ensure only high-intent leads are matched with vendors."
    },
    {
      q: "How do I post a business requirement?",
      a: "Simply click on the 'Post Enquiry' button in the header. Describe your requirement, and our AI will guide you through the BANT qualification process. Once verified, your lead is matched with verified vendors."
    },
    {
      q: "Is it free to use BantConfirm for buyers?",
      a: "Yes! Buyers can post requirements and receive quotes from verified vendors for free. We earn a small commission from vendors on successfully closed deals."
    },
    {
      q: "How are vendors verified?",
      a: "Our onboarding team performs a multi-step check including KYC, GSTIN verification, and past client references. Only top-tier, reliable technology providers are allowed in the marketplace."
    },
    {
      q: "Can I earn commission by referring leads?",
      a: "Absolutely. If you have unused or excess business leads, you can post them on BantConfirm. When a lead results in a closed deal, you can earn up to 10% commission."
    },
    {
      q: "Is my business data secure?",
      a: "We are ISO 27001 compliant. Your business requirements are only shared with the specific verified vendors who match your criteria, and all data is encrypted end-to-end."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <span className="bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 inline-block">Support Center</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">Frequently Asked <br /><span className="text-blue-600">Questions</span></h1>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg">Everything you need to know about BANT qualification, lead posting, and our marketplace.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`bg-white rounded-[2rem] border transition-all duration-300 ${openIndex === i ? 'border-blue-500 shadow-xl shadow-blue-500/5 ring-4 ring-blue-500/5' : 'border-slate-100 shadow-sm'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-8 flex items-center justify-between text-left group"
              >
                <span className={`text-xl font-bold transition-colors ${openIndex === i ? 'text-blue-600' : 'text-slate-800'}`}>
                  {faq.q}
                </span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${openIndex === i ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
                  {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              {openIndex === i && (
                <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-slate-500 text-lg leading-relaxed border-t border-slate-50 pt-6">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 bg-blue-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <HelpCircle size={100} />
          </div>
          <h3 className="text-3xl font-black mb-4">Still have questions?</h3>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">Our support team is online and ready to help you with any specific queries you may have.</p>
          <Link to="/contact" className="inline-block bg-white text-blue-600 font-bold px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};
