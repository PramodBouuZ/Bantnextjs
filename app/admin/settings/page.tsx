
'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Save, Globe, Image as ImageIcon, Phone, 
  Linkedin, Facebook, Instagram, Twitter, 
  Bell, ShieldCheck, Mail, Loader2
} from 'lucide-react';

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>({
    site_logo: '',
    favicon: '',
    whatsapp_number: '',
    footer_text: '',
    social_links: {
      facebook: '',
      linkedin: '',
      instagram: '',
      twitter: ''
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const { data } = await supabase.from('site_settings').select('*').single();
    if (data) setSettings(data);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('site_settings').upsert({
      id: 1,
      ...settings,
      updated_at: new Date()
    });
    setLoading(false);
    if (!error) alert("System configuration updated successfully!");
  }

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Website Configuration</h1>
          <p className="text-slate-500 font-medium">Manage global branding, social connections, and system notifications.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 text-white font-black px-10 py-4 rounded-[2rem] shadow-xl shadow-blue-200 hover:bg-blue-700 flex items-center space-x-2 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8 pb-20">
        {/* Branding */}
        <div className="bg-white rounded-[3rem] p-12 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center">
            <ImageIcon className="text-blue-600 mr-4" size={24} /> 
            Global Branding & Identity
          </h3>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Website Logo (PNG)</label>
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                  {settings.site_logo ? <img src={settings.site_logo} className="w-full object-contain" /> : <ImageIcon size={24} className="text-slate-300" />}
                </div>
                <input 
                  type="text" 
                  placeholder="Paste URL..." 
                  className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none"
                  value={settings.site_logo}
                  onChange={e => setSettings({...settings, site_logo: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Favicon (PNG/ICO)</label>
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                  {settings.favicon ? <img src={settings.favicon} className="w-full object-contain p-4" /> : <Globe size={24} className="text-slate-300" />}
                </div>
                <input 
                  type="text" 
                  placeholder="Paste URL..." 
                  className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none"
                  value={settings.favicon}
                  onChange={e => setSettings({...settings, favicon: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Support & Footer */}
        <div className="bg-white rounded-[3rem] p-12 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center">
            <Phone className="text-green-600 mr-4" size={24} /> 
            Support & Footer Controls
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WhatsApp Support Number</label>
              <input 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold"
                value={settings.whatsapp_number}
                onChange={e => setSettings({...settings, whatsapp_number: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Footer Copyright Text</label>
              <textarea 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold h-24 resize-none"
                value={settings.footer_text}
                onChange={e => setSettings({...settings, footer_text: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-[3rem] p-12 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center">
            <Linkedin className="text-blue-600 mr-4" size={24} /> 
            Social Media Connectivity
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { id: 'linkedin', icon: Linkedin, color: 'text-blue-700' },
              { id: 'facebook', icon: Facebook, color: 'text-blue-600' },
              { id: 'instagram', icon: Instagram, color: 'text-pink-600' },
              { id: 'twitter', icon: Twitter, color: 'text-slate-900' }
            ].map(social => (
              <div key={social.id} className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <social.icon size={14} className={`mr-2 ${social.color}`} /> {social.id} URL
                </label>
                <input 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm"
                  value={settings.social_links?.[social.id] || ''}
                  onChange={e => setSettings({
                    ...settings, 
                    social_links: { ...settings.social_links, [social.id]: e.target.value }
                  })}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
