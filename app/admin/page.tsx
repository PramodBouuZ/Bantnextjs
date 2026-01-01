
'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Users, 
  Store, 
  Package, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  Loader2
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    assignedLeads: 0,
    vendorsCount: 0,
    productsCount: 0
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [leads, vendors, products] = await Promise.all([
          supabase.from('leads').select('status, created_at'),
          supabase.from('vendors').select('id'),
          supabase.from('products').select('id')
        ]);

        const leadData = leads.data || [];
        setStats({
          totalLeads: leadData.length,
          newLeads: leadData.filter(l => l.status === 'NEW').length,
          assignedLeads: leadData.filter(l => l.status === 'ASSIGNED').length,
          vendorsCount: vendors.data?.length || 0,
          productsCount: products.data?.length || 0
        });

        const { data: recent } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
        
        setRecentLeads(recent || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Leads', val: stats.totalLeads, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'New Leads', val: stats.newLeads, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Total Vendors', val: stats.vendorsCount, icon: Store, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Products', val: stats.productsCount, icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6`}>
              <stat.icon size={28} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-900">{stat.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900">Recent Lead Activity</h3>
            <button className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-blue-600 shadow-sm">
                    {lead.full_name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{lead.full_name}</p>
                    <p className="text-xs text-slate-500 font-medium">{lead.requirement_text?.substring(0, 50)}...</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${lead.status === 'NEW' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                    {lead.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-2 font-bold">{new Date(lead.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp size={120} />
          </div>
          <h3 className="text-xl font-black mb-6">Market Insights</h3>
          <div className="space-y-8 relative z-10">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Conversion Rate</p>
              <div className="flex items-end space-x-3">
                <h4 className="text-4xl font-black">24.8%</h4>
                <span className="text-green-400 text-xs font-bold mb-1 flex items-center">
                  <ArrowUpRight size={14} className="mr-1" /> +2.1%
                </span>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Top Category</p>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                <span className="font-bold">Enterprise Software</span>
                <span className="text-blue-400 font-black">42%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
