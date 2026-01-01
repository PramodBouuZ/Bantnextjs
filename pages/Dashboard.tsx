
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Briefcase, Settings as SettingsIcon, LogOut,
  Bell, CheckCircle2, Clock, ArrowUpRight, Plus, Edit, Trash2,
  Package, Save, X, FileText, Download, MapPin, Phone, Mail,
  ShieldCheck, Search, Target, Wallet, Building2, Calendar,
  Globe, Star, Eye, XCircle, MoreVertical, Linkedin, Facebook,
  Instagram, Twitter, Store, Layers, Image as ImageIcon,
  Loader2, Upload, AlertCircle, TrendingUp, MessageSquare,
  ChevronRight, Monitor
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import * as XLSX from 'xlsx';
import { supabase } from '../lib/supabase';

const CHART_DATA = [
  { name: 'Mon', leads: 40 },
  { name: 'Tue', leads: 30 },
  { name: 'Wed', leads: 50 },
  { name: 'Thu', leads: 45 },
  { name: 'Fri', leads: 70 },
  { name: 'Sat', leads: 80 },
  { name: 'Sun', leads: 95 },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stats' | 'leads' | 'products' | 'vendors' | 'blogs' | 'categories' | 'settings'>('stats');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Data State
  const [leads, setLeads] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({
    site_logo: '',
    favicon: '',
    whatsapp_number: '',
    footer_text: '',
    social_links: { facebook: '', linkedin: '', instagram: '', twitter: '' },
    notifications: { newLead: true, leadAssigned: true, statusUpdate: true }
  });

  // Modals & Selection
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        { data: leadsData },
        { data: productsData },
        { data: vendorsData },
        { data: categoriesData },
        { data: blogsData },
        { data: settingsData }
      ] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('vendors').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name'),
        supabase.from('blogs').select('*').order('published_at', { ascending: false }),
        supabase.from('site_settings').select('*').eq('id', 1).maybeSingle()
      ]);

      if (leadsData) setLeads(leadsData);
      if (productsData) setProducts(productsData);
      if (vendorsData) setVendors(vendorsData);
      if (categoriesData) setCategories(categoriesData);
      if (blogsData) setBlogs(blogsData);
      if (settingsData) setSettings(settingsData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    const { error } = await supabase.from('site_settings').upsert({ ...settings, id: 1 });
    if (!error) alert("Website settings updated successfully!");
    setSaving(false);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('products').upsert({
      ...currentProduct,
      image_url: currentProduct.images?.[0] || currentProduct.image_url
    });
    if (!error) {
      setIsEditingProduct(false);
      fetchAllData();
    }
    setSaving(false);
  };

  const renderProductModal = () => (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-5xl animate-in zoom-in-95 my-10 max-h-[90vh] overflow-y-auto">
        <div className="p-12">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-3xl font-black text-slate-900">{currentProduct?.id ? 'Edit Solution' : 'Publish New Solution'}</h3>
            <button onClick={() => setIsEditingProduct(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={28}/></button>
          </div>
          
          <form onSubmit={handleSaveProduct} className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Title</label>
                <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none font-bold" value={currentProduct?.name || ''} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing (INR)</label>
                  <input required type="number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none font-bold" value={currentProduct?.price || ''} onChange={e => setCurrentProduct({...currentProduct, price: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none font-bold" value={currentProduct?.pricing_unit || 'mo'} onChange={e => setCurrentProduct({...currentProduct, pricing_unit: e.target.value})}>
                    <option value="mo">Monthly</option>
                    <option value="yr">Yearly</option>
                    <option value="once">One-time</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Solution Description</label>
                <textarea required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none h-32 resize-none" value={currentProduct?.description || ''} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Features (One per line)</label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none h-32" value={currentProduct?.features?.join('\n') || ''} onChange={e => setCurrentProduct({...currentProduct, features: e.target.value.split('\n')})} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Image Gallery (CSV URLs)</label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none font-mono text-xs h-24" placeholder="https://image1.jpg, https://image2.png" value={currentProduct?.images?.join(', ') || ''} onChange={e => setCurrentProduct({...currentProduct, images: e.target.value.split(',').map(s => s.trim())})} />
                <div className="flex gap-2 overflow-x-auto mt-2">
                   {currentProduct?.images?.map((img: string, i: number) => (
                     <img key={i} src={img} className="w-12 h-12 rounded-lg object-cover border border-slate-200" alt="" />
                   ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Vendor</label>
                <select required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none font-bold" value={currentProduct?.vendor_id || ''} onChange={e => setCurrentProduct({...currentProduct, vendor_id: e.target.value})}>
                  <option value="">Select Vendor</option>
                  {vendors.map(v => <option key={v.id} value={v.id}>{v.company_name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Similar Product IDs (CSV)</label>
                <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none font-mono text-xs" value={currentProduct?.similar_products?.join(', ') || ''} onChange={e => setCurrentProduct({...currentProduct, similar_products: e.target.value.split(',').map(s => s.trim())})} />
              </div>

              <div className="flex items-center justify-end space-x-4 pt-10">
                <button type="button" onClick={() => setIsEditingProduct(false)} className="px-8 py-4 font-bold text-slate-500 hover:bg-slate-50 rounded-2xl">Cancel</button>
                <button type="submit" disabled={saving} className="bg-blue-600 text-white font-black px-12 py-4 rounded-[2rem] shadow-xl hover:bg-blue-700 transition-all flex items-center space-x-2">
                  {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  <span>Save Product</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen flex">
      {/* Consistent Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col fixed inset-y-0 z-50">
        <div className="p-8">
          <div className="flex items-center space-x-2 mb-10 border-b border-white/10 pb-8">
            <span className="text-2xl font-extrabold tracking-tighter text-blue-400">BANT</span>
            <span className="text-2xl font-bold tracking-tighter text-amber-400">Confirm</span>
          </div>
          <nav className="space-y-2">
            {[
              { id: 'stats', label: 'My Dashboard', icon: LayoutDashboard },
              { id: 'leads', label: 'Lead Tracker', icon: Users },
              { id: 'products', label: 'Product Catalog', icon: Package },
              { id: 'categories', label: 'Categories', icon: Layers },
              { id: 'blogs', label: 'Blog Manager', icon: FileText },
              { id: 'vendors', label: 'Vendors', icon: Store },
              { id: 'settings', label: 'Settings', icon: SettingsIcon },
            ].map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`w-full flex items-center space-x-4 px-8 py-5 rounded-[2rem] font-bold text-sm transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-2xl scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
            <button onClick={handleLogout} className="w-full flex items-center space-x-4 px-8 py-5 rounded-[2rem] font-bold text-sm text-red-400 hover:bg-red-400/10 transition-all mt-6">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      <main className="ml-72 flex-1 p-12">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 font-black">BC</div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight capitalize">{activeTab} Hub</h2>
          </div>
          <div className="flex items-center space-x-6">
             <div className="text-right">
                <p className="text-sm font-black text-slate-900">System Admin</p>
                <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest flex items-center justify-end"><span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>Active Session</p>
             </div>
             <div className="w-12 h-12 bg-slate-200 rounded-full border-4 border-white shadow-inner overflow-hidden">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" />
             </div>
          </div>
        </header>

        {loading && activeTab !== 'settings' ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-slate-300">
            <Loader2 className="animate-spin mb-4" size={48} />
            <p className="font-black uppercase tracking-[0.3em] text-xs">Syncing Production Data...</p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {activeTab === 'stats' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: 'Market Leads', val: leads.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Verified Partners', val: vendors.filter(v => v.status === 'ACTIVE').length, icon: Store, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Published Solutions', val: products.length, icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { label: 'Active Categories', val: categories.length, icon: Layers, color: 'text-green-600', bg: 'bg-green-50' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                    <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-8`}><stat.icon size={32} /></div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                    <h3 className="text-4xl font-black text-slate-900">{stat.val}</h3>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-8">
                 <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-slate-900">Marketplace Inventory</h3>
                    <button onClick={() => { setCurrentProduct({ status: 'published', is_active: true, features: [], images: [], pricing_unit: 'mo' }); setIsEditingProduct(true); }} className="bg-blue-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl flex items-center space-x-2">
                      <Plus size={20} /><span>New Solution Listing</span>
                    </button>
                 </div>
                 <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                       <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b">
                         <tr>
                           <th className="px-10 py-6">Solution</th>
                           <th className="px-10 py-6">Commercials</th>
                           <th className="px-10 py-6 text-right">Operations</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                         {products.map(p => (
                           <tr key={p.id} className="hover:bg-slate-50/50">
                             <td className="px-10 py-6">
                                <div className="flex items-center space-x-4">
                                   <div className="w-14 h-14 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shrink-0 shadow-sm">
                                      <img src={p.images?.[0] || p.image_url} className="w-full h-full object-cover" />
                                   </div>
                                   <div><p className="font-bold text-slate-900">{p.name}</p><p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">ID: {p.id.substring(0, 8)}</p></div>
                                </div>
                             </td>
                             <td className="px-10 py-6 font-black text-slate-900 text-lg">₹{parseFloat(p.price).toLocaleString('en-IN')} <span className="text-[10px] text-slate-400 font-bold lowercase">/{p.pricing_unit}</span></td>
                             <td className="px-10 py-6 text-right space-x-3">
                                <button onClick={() => { setCurrentProduct(p); setIsEditingProduct(true); }} className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm"><Edit size={20}/></button>
                                <button className="p-3 text-slate-400 hover:text-red-600 hover:bg-white rounded-xl transition-all shadow-sm"><Trash2 size={20}/></button>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                    </table>
                 </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-5xl space-y-12 pb-32">
                <div className="flex items-center justify-between">
                   <div>
                      <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Settings Hub</h1>
                      <h2 className="text-2xl font-black text-slate-400 uppercase tracking-widest mt-2">SYSTEM CONFIGURATION</h2>
                   </div>
                   <button onClick={handleSaveSettings} disabled={saving} className="bg-blue-600 text-white font-black px-12 py-5 rounded-[2.5rem] shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-3 scale-105 active:scale-95">
                      {saving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                      <span className="uppercase tracking-widest">Commit Changes</span>
                   </button>
                </div>

                <div className="bg-white rounded-[4rem] p-16 shadow-2xl border border-slate-50 space-y-20 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none"><SettingsIcon size={300}/></div>

                   <section className="relative z-10">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-12 flex items-center">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mr-4"><ImageIcon size={20} /></div>
                        PLATFORM VISUAL IDENTITY
                      </h4>
                      <div className="grid md:grid-cols-2 gap-16">
                         <div className="space-y-6">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">MASTER LOGO URL (PNG Preferred)</label>
                            <div className="flex items-center space-x-8">
                               <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-inner relative group">
                                  {settings.site_logo ? <img src={settings.site_logo} className="w-full h-full object-contain p-4" /> : <ImageIcon className="text-slate-300" size={32}/>}
                               </div>
                               <input className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl px-6 py-5 outline-none font-mono text-xs focus:bg-white focus:ring-8 ring-blue-500/5 transition-all" value={settings.site_logo || ''} onChange={e => setSettings({...settings, site_logo: e.target.value})} placeholder="https://..." />
                            </div>
                         </div>
                         <div className="space-y-6">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">SYSTEM FAVICON URL (ICO/PNG)</label>
                            <div className="flex items-center space-x-8">
                               <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                                  {settings.favicon ? <img src={settings.favicon} className="w-12 h-12 object-contain" /> : <Globe className="text-slate-300" size={32}/>}
                               </div>
                               <input className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl px-6 py-5 outline-none font-mono text-xs focus:bg-white transition-all" value={settings.favicon || ''} onChange={e => setSettings({...settings, favicon: e.target.value})} placeholder="https://..." />
                            </div>
                         </div>
                      </div>
                   </section>

                   <section className="pt-16 border-t border-slate-100 relative z-10">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-12 flex items-center">
                        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mr-4"><MessageSquare size={20} /></div>
                        SOCIAL MEDIA HUB & SUPPORT
                      </h4>
                      <div className="space-y-12">
                         <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">WhatsApp Business Connect</label>
                            <div className="relative">
                               <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                               <input className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] pl-16 pr-8 py-6 outline-none font-black text-xl focus:bg-white transition-all" value={settings.whatsapp_number || ''} onChange={e => setSettings({...settings, whatsapp_number: e.target.value})} placeholder="+91 00000 00000" />
                            </div>
                         </div>
                         <div className="grid md:grid-cols-2 gap-10">
                            {[
                               { id: 'linkedin', icon: Linkedin, label: 'LinkedIn Business Profile', color: 'text-blue-700' },
                               { id: 'twitter', icon: Twitter, label: 'Twitter X Handler', color: 'text-blue-400' },
                               { id: 'facebook', icon: Facebook, label: 'Facebook Page', color: 'text-blue-600' },
                               { id: 'instagram', icon: Instagram, label: 'Instagram Profile', color: 'text-pink-600' }
                            ].map(social => (
                               <div key={social.id} className="space-y-4">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center ml-1"><social.icon size={14} className={`mr-2 ${social.color}`}/> {social.label}</label>
                                  <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 outline-none font-bold text-sm focus:bg-white transition-all" value={settings.social_links?.[social.id] || ''} onChange={e => setSettings({...settings, social_links: {...settings.social_links, [social.id]: e.target.value}})} placeholder="https://..." />
                               </div>
                            ))}
                         </div>
                      </div>
                   </section>

                   <section className="pt-16 border-t border-slate-100 relative z-10">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-12 flex items-center">
                        <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mr-4"><Bell size={20} /></div>
                        NOTIFICATIONS CONTROL
                      </h4>
                      <div className="grid gap-6">
                         {[
                            { id: 'newLead', label: 'Push Alert for Master Admin (New Lead Discovery)', desc: 'Real-time dashboard alerts when BANT engine identifies a high-intent requirement.' },
                            { id: 'leadAssigned', label: 'Automated Dispatch to Verified Vendors', desc: 'Instant email and portal notification for matching technology partners.' },
                            { id: 'statusUpdate', label: 'User Tracking for Deployment Phases', desc: 'Automated updates to lead posters when status changes to Discussion or Closed.' }
                         ].map(n => (
                            <div key={n.id} className="flex items-center justify-between p-8 bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-slate-200 transition-all group">
                               <div className="max-w-xl">
                                  <span className="block text-lg font-black text-slate-700 leading-tight mb-2 group-hover:text-blue-600 transition-colors">{n.label}</span>
                                  <p className="text-sm text-slate-400 font-medium leading-relaxed">{n.desc}</p>
                               </div>
                               <button onClick={() => setSettings({...settings, notifications: {...settings.notifications, [n.id]: !settings.notifications?.[n.id]}})} className={`w-16 h-8 rounded-full transition-all relative ${settings.notifications?.[n.id] ? 'bg-blue-600 shadow-xl shadow-blue-500/30' : 'bg-slate-300'}`}>
                                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${settings.notifications?.[n.id] ? 'left-9' : 'left-1'}`}></div>
                               </button>
                            </div>
                         ))}
                      </div>
                   </section>

                   <section className="pt-16 border-t border-slate-100 relative z-10">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-12 flex items-center">
                        <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center mr-4"><Monitor size={20} /></div>
                        FOOTER CONTENT & SEO
                      </h4>
                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Universal Footer Disclaimer</label>
                         <textarea className="w-full bg-slate-50 border border-slate-200 rounded-[2.5rem] px-8 py-8 outline-none font-bold text-slate-700 h-32 resize-none focus:bg-white focus:ring-8 ring-blue-500/5 transition-all" value={settings.footer_text || ''} onChange={e => setSettings({...settings, footer_text: e.target.value})} placeholder="Copyright details..." />
                      </div>
                   </section>
                </div>
              </div>
            )}
          </div>
        )}

        {isEditingProduct && renderProductModal()}
      </main>
    </div>
  );
};
