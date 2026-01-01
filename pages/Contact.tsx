
import React from 'react';
import { Mail, MapPin, Phone, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 inline-block">Support Hub</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">How Can We Help <br /><span className="text-blue-600">Your Business?</span></h1>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl leading-relaxed">
            Whether you're a buyer seeking solutions or a vendor looking to scale, our team is here to assist you.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Email Us</h4>
                  <p className="text-slate-500 text-sm mb-2">Our support team usually responds within 2 hours.</p>
                  <a href="mailto:support@bantconfirm.com" className="text-blue-600 font-bold hover:underline">support@bantconfirm.com</a>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-amber-500 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Visit Office</h4>
                  <p className="text-slate-500 text-sm mb-2">BantConfirm India Pvt Ltd.</p>
                  <p className="text-slate-700 font-bold">Sector 62, Noida, <br />Uttar Pradesh, 201301</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-green-500 shrink-0">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">WhatsApp Support</h4>
                  <p className="text-slate-500 text-sm mb-2">Quick queries via messaging.</p>
                  <p className="text-slate-700 font-bold">+91 98XXX XXXXX</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck size={80} />
              </div>
              <h4 className="text-xl font-bold mb-4">Priority Vendor Support</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Are you an existing verified vendor? Log in to your dashboard for 24/7 dedicated account manager support.
              </p>
              <button className="bg-white text-slate-900 font-bold px-6 py-3 rounded-xl text-sm">Open Support Ticket</button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 mb-8">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                    <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" placeholder="john@company.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none">
                    <option>Requirement Posting Help</option>
                    <option>Vendor Verification Status</option>
                    <option>Billing & Commission Query</option>
                    <option>Technical Issue</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                  <textarea className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none h-40 resize-none transition-all" placeholder="How can we help you today?" />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-[2rem] shadow-xl shadow-blue-200 transition-all text-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
