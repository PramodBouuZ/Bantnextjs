
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, CheckCircle2 } from 'lucide-react';

const data = [
  { name: 'Mon', val: 4000 },
  { name: 'Tue', val: 3000 },
  { name: 'Wed', val: 5000 },
  { name: 'Thu', val: 4500 },
  { name: 'Fri', val: 7000 },
  { name: 'Sat', val: 8000 },
  { name: 'Sun', val: 9500 },
];

export const DashboardStats: React.FC = () => {
  return (
    <div className="container mx-auto px-4 -mt-12">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-blue-50">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Your Business Growth Dashboard</h2>
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full text-green-700 text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span>Live Market Data</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
            <p className="text-amber-800 font-bold uppercase text-xs tracking-widest mb-2 text-center">Verified Vendors</p>
            <h3 className="text-5xl font-extrabold text-slate-900 text-center">1,250+</h3>
            <p className="text-green-600 font-bold text-sm mt-3 text-center">PAN India Coverage</p>
          </div>
          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
            <p className="text-blue-800 font-bold uppercase text-xs tracking-widest mb-2 text-center">Deals Closed</p>
            <h3 className="text-5xl font-extrabold text-slate-900 text-center">₹86,193</h3>
            <div className="flex items-center justify-center space-x-1 text-green-600 font-bold text-sm mt-3">
              <TrendingUp size={16} />
              <span>23% this month</span>
            </div>
          </div>
        </div>

        <div className="h-[250px] w-full">
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-6">Software Procurement Trends</p>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="val" 
                stroke="#3b82f6" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorVal)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
