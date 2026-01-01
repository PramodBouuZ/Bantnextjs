
import React, { useState, useEffect } from 'react';
import { Linkedin, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    supabase.from('site_settings').select('*').eq('id', 1).maybeSingle().then(({ data }) => {
      if (data) setSettings(data);
    });
  }, []);

  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-8">
              {settings?.site_logo ? (
                <img src={settings.site_logo} alt="BantConfirm" className="h-10 w-auto object-contain brightness-0 invert" />
              ) : (
                <>
                  <span className="text-2xl font-extrabold tracking-tighter text-white">BANT</span>
                  <span className="text-2xl font-bold tracking-tighter text-amber-400">Confirm</span>
                </>
              )}
            </div>
            <p className="mb-10 text-slate-400 leading-relaxed font-medium">
              India's premier B2B AI Marketplace for MSMEs. Bridging the gap between high-intent leads and verified tech providers.
            </p>
            <div className="flex space-x-4">
              {settings?.social_links?.linkedin && (
                <a href={settings.social_links.linkedin} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all group">
                  <Linkedin size={20} className="group-hover:text-white" />
                </a>
              )}
              {settings?.social_links?.twitter && (
                <a href={settings.social_links.twitter} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-400 transition-all group">
                  <Twitter size={20} className="group-hover:text-white" />
                </a>
              )}
              {settings?.social_links?.facebook && (
                <a href={settings.social_links.facebook} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-700 transition-all group">
                  <Facebook size={20} className="group-hover:text-white" />
                </a>
              )}
              {settings?.social_links?.instagram && (
                <a href={settings.social_links.instagram} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-all group">
                  <Instagram size={20} className="group-hover:text-white" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Ecosystem</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/products" className="hover:text-amber-400 transition-colors">Marketplace</Link></li>
              <li><Link to="/become-vendor" className="hover:text-amber-400 transition-colors">Vendor Registration</Link></li>
              <li><Link to="/post-requirement" className="hover:text-amber-400 transition-colors">Post Enquiry</Link></li>
              <li><Link to="/dashboard" className="hover:text-amber-400 transition-colors">Control Panel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Intelligence</h4>
            <ul className="space-y-4 text-sm font-bold">
               <li><Link to="/blog" className="hover:text-amber-400 transition-colors">Industry Insights</Link></li>
               <li><Link to="/faq" className="hover:text-amber-400 transition-colors">Qualification Help</Link></li>
               <li><Link to="/about" className="hover:text-amber-400 transition-colors">BANT Framework</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Contact Base</h4>
            <ul className="space-y-6 text-sm font-medium">
               <li className="flex items-center"><Mail className="text-blue-500 mr-3" size={18}/> support@bantconfirm.com</li>
               <li className="flex items-start"><MapPin className="text-amber-500 mr-3 mt-1" size={18}/> Sector 62, Noida,<br/>Uttar Pradesh, 201301</li>
               {/* Fixed: Imported Phone icon from lucide-react */}
               <li className="flex items-center font-black text-green-400"><Phone className="mr-3" size={18}/> {settings?.whatsapp_number || '+91 99000 88000'}</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500 gap-6">
          <p>{settings?.footer_text || '© 2025 BantConfirm India Pvt Ltd. All rights reserved.'}</p>
          <div className="flex space-x-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms Base</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
