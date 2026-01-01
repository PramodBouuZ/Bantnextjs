
import React from 'react';
import { 
  Users, Store, Package, TrendingUp, Clock, ArrowUpRight 
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Leads', val: '452', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'New leads', val: '28', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Vendors', val: '15', icon: Store, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Active listings', val: '124', icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
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
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm min-h-[400px]">
           <h3 className="text-xl font-black text-slate-900 mb-8">Market Intelligence</h3>
           <div className="h-48 bg-slate-50 rounded-3xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">
             AI Revenue Forecast Visualization
           </div>
        </div>
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp size={120} />
          </div>
          <h3 className="text-xl font-black mb-6">Real-time Insights</h3>
          <div className="space-y-8 relative z-10">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Lead Conversion</p>
              <div className="flex items-end space-x-3">
                <h4 className="text-4xl font-black">28.4%</h4>
                <span className="text-green-400 text-xs font-bold mb-1 flex items-center">
                  <ArrowUpRight size={14} className="mr-1" /> +2.1%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
