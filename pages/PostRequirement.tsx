
import React, { useState, useEffect } from 'react';
import { analyzeLeadWithAI, BANTAnalysis } from '../services/geminiService';
import { Sparkles, Loader2, CheckCircle, ShieldCheck, Coins, Phone, MapPin, User, Save, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PostRequirement: React.FC = () => {
  const [description, setDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<BANTAnalysis | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  // User context check
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    mobile: localStorage.getItem('userMobile') || '',
    location: localStorage.getItem('userLocation') || '',
    company: localStorage.getItem('userCompany') || ''
  });

  useEffect(() => {
    // If mobile or location is missing, we need to collect it
    if (!localStorage.getItem('userMobile') || !localStorage.getItem('userLocation')) {
      setShowContactForm(true);
    }
  }, []);

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userMobile', contactData.mobile);
    localStorage.setItem('userLocation', contactData.location);
    localStorage.setItem('userCompany', contactData.company);
    setShowContactForm(false);
  };

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    setAnalyzing(true);
    const result = await analyzeLeadWithAI(description);
    setAnalysis(result);
    setAnalyzing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-2xl">
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        <h2 className="text-4xl font-extrabold mb-4">Requirement Posted Successfully!</h2>
        <p className="text-slate-600 text-lg mb-8">
          Our AI has verified your BANT details. Verified vendors matching your needs will contact you shortly.
        </p>
        <Link 
          to="/"
          className="bg-slate-900 text-white font-bold px-10 py-4 rounded-2xl hover:bg-blue-600 transition-colors inline-block"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Post Your Business Requirement</h1>
          <p className="text-slate-600">Our AI will qualify your lead to ensure matching with the best verified vendors.</p>
        </div>

        {showContactForm ? (
          <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-blue-50 max-w-2xl mx-auto text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
              <Phone size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Just one last thing...</h2>
            <p className="text-slate-500 mb-10">We need your contact information so verified vendors can reach out to you with quotes.</p>
            
            <form onSubmit={handleSaveContact} className="space-y-5 text-left">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <Phone size={18} />
                  </div>
                  <input 
                    required 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-4 focus:ring-4 focus:ring-blue-500/10 outline-none" 
                    placeholder="+91 99000 88000"
                    value={contactData.mobile}
                    onChange={e => setContactData({...contactData, mobile: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Office Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <MapPin size={18} />
                  </div>
                  <input 
                    required 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-4 focus:ring-4 focus:ring-blue-500/10 outline-none" 
                    placeholder="City, State"
                    value={contactData.location}
                    onChange={e => setContactData({...contactData, location: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <Building2 size={18} />
                  </div>
                  <input 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-4 focus:ring-4 focus:ring-blue-500/10 outline-none" 
                    placeholder="Optional"
                    value={contactData.company}
                    onChange={e => setContactData({...contactData, company: e.target.value})}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-blue-100 flex items-center justify-center space-x-2 transition-all mt-4"
              >
                <Save size={20} />
                <span>Continue to Post Requirement</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" 
                    placeholder="e.g. Acme Corp" 
                    defaultValue={localStorage.getItem('userCompany') || ''}
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">What are you looking for?</label>
                  <textarea 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none h-40 resize-none transition-all" 
                    placeholder="Describe your requirement in detail. Include budget, who makes decisions, what problem you're solving, and your timeline."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center space-x-4 pt-2">
                  <button 
                    type="button"
                    onClick={handleAnalyze}
                    disabled={analyzing || !description}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 disabled:opacity-50 transition-all"
                  >
                    {analyzing ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                    <span>{analyzing ? 'AI Analyzing...' : 'Run BANT Qualification'}</span>
                  </button>
                  <p className="text-xs text-slate-400 max-w-[200px] uppercase font-bold tracking-widest">
                    Match score improves vendor response rate
                  </p>
                </div>

                {analysis && (
                  <div className="bg-[#0f172a] text-white rounded-[2rem] p-8 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center justify-between border-b border-white/10 pb-6">
                      <h3 className="font-bold flex items-center text-lg">
                        <ShieldCheck className="text-blue-400 mr-2" size={24} />
                        AI BANT Report
                      </h3>
                      <div className="bg-blue-600 px-4 py-1.5 rounded-full text-xs font-black">
                        Match Score: {analysis.score}%
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 pt-4">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1">Budget</p>
                        <p className="font-bold text-slate-200">{analysis.budget}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1">Authority</p>
                        <p className="font-bold text-slate-200">{analysis.authority}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1">Timeline</p>
                        <p className="font-bold text-slate-200">{analysis.timing}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1">Core Need</p>
                        <p className="font-bold text-slate-200 line-clamp-1">{analysis.need}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full bg-amber-400 text-slate-900 font-black py-5 rounded-[2rem] shadow-xl shadow-amber-200 hover:bg-amber-500 transition-all text-lg"
                >
                  Submit Requirement
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Coins size={80} />
                </div>
                <h4 className="text-2xl font-black mb-4">Post & Earn</h4>
                <p className="text-sm font-medium opacity-80 mb-8 leading-relaxed">
                  Refer valid business leads to us and earn up to 10% commission on closed deals.
                </p>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-blue-200">Potential Earnings</p>
                  <p className="text-3xl font-black">₹5,000 - 50k+</p>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-6 text-xl">How it works</h4>
                <div className="space-y-6">
                  {[
                    'Describe your exact IT need',
                    'AI extracts BANT qualifiers',
                    'Matched with top-tier vendors',
                    'Receive quotes within 24-48h'
                  ].map((step, i) => (
                    <div key={i} className="flex items-start space-x-4 text-sm">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black flex-shrink-0 shadow-sm border border-blue-100">
                        {i + 1}
                      </div>
                      <span className="text-slate-600 font-medium leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
