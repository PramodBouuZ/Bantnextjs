
'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Store, Plus, Search, Edit, Trash2, 
  ShieldCheck, XCircle, Clock, MapPin, 
  Phone, Mail, Star, Loader2, Save, X, 
  Image as ImageIcon
} from 'lucide-react';

export default function VendorManager() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, []);

  async function fetchVendors() {
    setLoading(true);
    const { data } = await supabase.from('vendors').select('*').order('created_at', { ascending: false });
    setVendors(data || []);
    setLoading(false);
  }

  const handleOpenModal = (vendor = null) => {
    setEditingVendor(vendor || {
      company_name: '',
      email: '',
      mobile: '',
      location: '',
      logo_url: '',
      status: 'PENDING',
      rating: 4.5
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingVendor.id) {
        await supabase.from('vendors').update(editingVendor).eq('id', editingVendor.id);
      } else {
        await supabase.from('vendors').insert([editingVendor]);
      }
      setIsModalOpen(false);
      fetchVendors();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('vendors').update({ status }).eq('id', id);
    fetchVendors();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Vendor Management</h1>
          <p className="text-slate-500 font-medium">Approve and manage verified technology partners.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add New Vendor</span>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b">
              <tr>
                <th className="px-8 py-5">Company</th>
                <th className="px-8 py-5">Contact Details</th>
                <th className="px-8 py-5">Location</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vendors.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                        {v.logo_url ? <img src={v.logo_url} className="w-full h-full object-contain p-2" /> : <Store className="text-slate-300" size={20}/>}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{v.company_name}</p>
                        <div className="flex items-center text-amber-500 space-x-1 mt-1">
                          <Star size={12} fill="currentColor" />
                          <span className="text-[10px] font-black">{v.rating}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col space-y-1">
                      <span className="flex items-center text-xs text-slate-700 font-bold"><Mail size={12} className="mr-2 text-slate-400" /> {v.email}</span>
                      <span className="flex items-center text-xs text-slate-700 font-bold"><Phone size={12} className="mr-2 text-slate-400" /> {v.mobile}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="flex items-center text-xs text-slate-500 font-medium uppercase tracking-tighter">
                      <MapPin size={12} className="mr-2" /> {v.location}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${
                      v.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 
                      v.status === 'PENDING' ? 'bg-amber-100 text-amber-600' : 
                      'bg-red-100 text-red-600'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => updateStatus(v.id, 'ACTIVE')} className="p-2 text-slate-400 hover:text-green-600 transition-colors" title="Approve"><ShieldCheck size={18}/></button>
                      <button onClick={() => updateStatus(v.id, 'REJECTED')} className="p-2 text-slate-400 hover:text-red-600 transition-colors" title="Reject"><XCircle size={18}/></button>
                      <button onClick={() => handleOpenModal(v)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={32} /></div>}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl p-10 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-slate-900">{editingVendor.id ? 'Edit Vendor' : 'Register New Partner'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Company Name</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none font-bold" value={editingVendor.company_name} onChange={e => setEditingVendor({...editingVendor, company_name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Email</label>
                  <input required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none font-bold" value={editingVendor.email} onChange={e => setEditingVendor({...editingVendor, email: e.target.value})} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none font-bold" value={editingVendor.mobile} onChange={e => setEditingVendor({...editingVendor, mobile: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none font-bold" value={editingVendor.location} onChange={e => setEditingVendor({...editingVendor, location: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logo URL</label>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                    {editingVendor.logo_url ? <img src={editingVendor.logo_url} className="w-full h-full object-contain p-2" /> : <ImageIcon size={20} className="text-slate-300"/>}
                  </div>
                  <input className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none text-xs" value={editingVendor.logo_url} onChange={e => setEditingVendor({...editingVendor, logo_url: e.target.value})} placeholder="Paste logo image link..." />
                </div>
              </div>

              <div className="pt-6 flex items-center justify-end space-x-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 font-bold text-slate-500">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-blue-600 text-white font-black px-12 py-4 rounded-[2rem] shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2">
                  {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  <span>{editingVendor.id ? 'Update Vendor' : 'Register Vendor'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
