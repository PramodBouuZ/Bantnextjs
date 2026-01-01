
'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Search, Filter, Download, Eye, 
  CheckCircle2, XCircle, Clock, Send,
  ChevronDown, MapPin, Phone, Mail, Building2
} from 'lucide-react';
import * as XLSX from 'xlsx';

export default function LeadsHub() {
  const [leads, setLeads] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const [leadsRes, vendorsRes] = await Promise.all([
      supabase.from('leads').select('*, categories(name)').order('created_at', { ascending: false }),
      supabase.from('vendors').select('*').eq('status', 'ACTIVE')
    ]);

    if (leadsRes.data) setLeads(leadsRes.data);
    if (vendorsRes.data) setVendors(vendorsRes.data);
    setLoading(false);
  }

  async function updateLeadStatus(id: string, status: string) {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (!error) fetchData();
  }

  async function assignVendor(leadId: string, vendorId: string) {
    const lead = leads.find(l => l.id === leadId);
    const newVendors = [...(lead.assigned_vendor_ids || []), vendorId];
    const { error } = await supabase
      .from('leads')
      .update({ assigned_vendor_ids: newVendors, status: 'ASSIGNED' })
      .eq('id', leadId);
    if (!error) fetchData();
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(leads);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, `BantConfirm_Leads_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const filteredLeads = leads.filter(l => {
    const matchesStatus = filterStatus === 'ALL' || l.status === filterStatus;
    const matchesSearch = l.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.requirement_text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Leads Control Center</h1>
          <p className="text-slate-500 font-medium">Manage and qualify enterprise requirements across India.</p>
        </div>
        <button 
          onClick={exportToExcel}
          className="bg-white border border-slate-200 text-slate-700 font-bold px-6 py-3 rounded-2xl shadow-sm hover:bg-slate-50 transition-all flex items-center space-x-2"
        >
          <Download size={18} />
          <span>Export to Excel</span>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, company or requirement..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 focus:ring-4 focus:ring-blue-500/5 outline-none font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">Filter:</span>
            {['ALL', 'NEW', 'ASSIGNED', 'IN_PROGRESS', 'CLOSED'].map(status => (
              <button 
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${filterStatus === status ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <tr className="border-b border-slate-100">
                <th className="px-8 py-5">Requester</th>
                <th className="px-8 py-5">Requirement Details</th>
                <th className="px-8 py-5">BANT Profile</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="font-black text-slate-900">{lead.full_name}</div>
                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">{lead.company_name || 'Individual'}</div>
                    <div className="flex flex-col space-y-1 text-xs text-slate-400 font-medium">
                      <span className="flex items-center"><Phone size={12} className="mr-2" /> {lead.mobile}</span>
                      <span className="flex items-center"><MapPin size={12} className="mr-2" /> {lead.location}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 max-w-xs">
                    <span className="bg-blue-50 text-blue-700 text-[9px] font-black px-2 py-0.5 rounded-lg uppercase mb-2 inline-block">
                      {lead.categories?.name}
                    </span>
                    <p className="text-sm font-bold text-slate-700 line-clamp-2 leading-relaxed">
                      {lead.requirement_text}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold">{new Date(lead.created_at).toLocaleDateString()}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg">
                        {lead.bant_score}
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead<br/>Score</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-[9px] font-black uppercase tracking-tighter text-slate-400">Budget: <span className="text-slate-900">{lead.budget}</span></div>
                      <div className="text-[9px] font-black uppercase tracking-tighter text-slate-400">Timing: <span className="text-slate-900">{lead.timing}</span></div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${
                      lead.status === 'NEW' ? 'bg-blue-100 text-blue-600' : 
                      lead.status === 'ASSIGNED' ? 'bg-amber-100 text-amber-600' : 
                      'bg-green-100 text-green-600'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right space-x-2">
                    <div className="flex flex-col items-end space-y-2">
                      <select 
                        onChange={(e) => assignVendor(lead.id, e.target.value)}
                        className="text-[10px] font-black border border-slate-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 ring-blue-500/20"
                      >
                        <option>Assign Vendor</option>
                        {vendors.map(v => (
                          <option key={v.id} value={v.id}>{v.company_name}</option>
                        ))}
                      </select>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 shadow-sm"><Eye size={16} /></button>
                        <button onClick={() => updateLeadStatus(lead.id, 'CLOSED')} className="p-2 bg-green-50 rounded-xl text-green-600 hover:bg-green-600 hover:text-white transition-all"><CheckCircle2 size={16} /></button>
                        <button onClick={() => updateLeadStatus(lead.id, 'REJECTED')} className="p-2 bg-red-50 rounded-xl text-red-600 hover:bg-red-600 hover:text-white transition-all"><XCircle size={16} /></button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && (
            <div className="py-20 text-center text-slate-400 font-bold flex flex-col items-center">
              <Clock className="animate-spin mb-4" size={32} />
              Loading real-time marketplace data...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
