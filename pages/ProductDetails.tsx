
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_VENDORS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, 
  ShieldCheck, 
  Zap, 
  Package, 
  MapPin, 
  Share2, 
  Heart, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  Loader2,
  Target,
  Clock,
  Wallet,
  Users,
  X,
  Send,
  ArrowRight,
  CalendarCheck
} from 'lucide-react';
import { analyzeLeadWithAI, BANTAnalysis } from '../services/geminiService';

type TabType = 'Overview' | 'Specifications' | 'Vendor Details' | 'Reviews (12)';

export const ProductDetails: React.FC = () => {
  const { id } = useParams();
  // Using memo to handle potential dynamic updates from a global state in real app
  const product = useMemo(() => MOCK_PRODUCTS.find(p => p.id === id), [id]);
  const vendor = useMemo(() => MOCK_VENDORS.find(v => v.id === product?.vendorId), [product]);
  
  const [activeImage, setActiveImage] = useState(product?.imageUrl || '');
  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  
  const bantSectionRef = useRef<HTMLDivElement>(null);

  // Form State
  const [description, setDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<BANTAnalysis | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.imageUrl);
      window.scrollTo(0, 0);
    }
  }, [product]);

  // Handle similar products logic
  const recommendedProducts = useMemo(() => {
    if (!product) return [];
    
    // If the admin has set specific similar products, prioritize those
    if (product.similarProducts && product.similarProducts.length > 0) {
      return MOCK_PRODUCTS.filter(p => product.similarProducts?.includes(p.id));
    }
    
    // Otherwise, fallback to category matching
    return MOCK_PRODUCTS
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl font-black text-slate-900 mb-4">Solution Not Found</h2>
        <p className="text-slate-500 mb-8">The product you are looking for might have been moved or removed.</p>
        <Link to="/products" className="bg-blue-600 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-blue-200">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const handleBantAnalysis = async () => {
    if (!description.trim()) return;
    setAnalyzing(true);
    const fullPrompt = `Lead is interested in: ${product.name}. User Details: ${description}`;
    const result = await analyzeLeadWithAI(fullPrompt);
    setAnalysis(result);
    setAnalyzing(false);
  };

  const handleFinalSubmit = () => {
    setLeadSubmitted(true);
    setShowConfirmDialog(false);
  };

  const handleBookDeployment = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      alert("Enquiry sent! The vendor will contact you shortly.");
    }, 1500);
  };

  const handleConsultExpert = () => {
    bantSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    const textarea = bantSectionRef.current?.querySelector('textarea');
    if (textarea) textarea.focus();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="animate-in fade-in duration-500">
            <p className="text-slate-600 leading-relaxed text-lg mb-8">
              {product.fullDescription || product.description}
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-4">
              <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100/50">
                <h4 className="font-black text-slate-900 mb-4 flex items-center text-sm uppercase tracking-widest">
                  <Zap className="text-blue-600 mr-2" size={18} /> Value Propositions
                </h4>
                <ul className="space-y-3">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="text-blue-600 mr-2 shrink-0 mt-0.5" size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-900 p-8 rounded-[2rem] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
                <h4 className="font-black mb-4 flex items-center text-sm uppercase tracking-widest relative z-10">
                  <ShieldCheck className="text-blue-400 mr-2" size={18} /> Compliance
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed relative z-10">
                  This solution meets ISO 27001 standards and is GST-ready. Deployment includes full implementation support by certified Indian field engineers.
                </p>
              </div>
            </div>
          </div>
        );
      case 'Specifications':
        return (
          <div className="animate-in fade-in duration-500 space-y-6">
            <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Technical Parameters</h4>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 space-y-4">
              {[
                { label: 'Integration', val: 'Full REST API' },
                { label: 'Deployment', val: 'Hybrid Cloud' },
                { label: 'SLA', val: '99.99% Uptime' },
                { label: 'Support', val: '24/7 Managed' }
              ].map((spec, i) => (
                <div key={i} className="flex justify-between border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                  <span className="text-slate-500 text-sm font-bold uppercase tracking-tighter">{spec.label}</span>
                  <span className="text-slate-900 font-black text-sm">{spec.val}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Vendor Details':
        return (
          <div className="animate-in fade-in duration-500 flex items-center space-x-8 p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-100 overflow-hidden shrink-0 shadow-inner">
               <img src={vendor?.logo || 'https://via.placeholder.com/150'} className="w-full h-full object-contain p-4" alt="" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900">{vendor?.name || 'Verified Partner'}</h4>
              <p className="text-sm text-slate-500 font-bold flex items-center mt-1">
                <MapPin size={14} className="mr-1.5" /> {vendor?.location || 'Pan India'}
              </p>
              <div className="flex items-center mt-4 space-x-4">
                <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">Gold Verified</span>
                <span className="text-slate-400 text-xs font-bold">{vendor?.performanceScore}% Trust Score</span>
              </div>
            </div>
          </div>
        );
      case 'Reviews (12)':
        return (
          <div className="animate-in fade-in duration-500 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Verified User Feedback</h4>
              <div className="flex items-center text-amber-500 font-black">
                <Star size={16} className="mr-1.5" fill="currentColor" /> {product.rating}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map(r => (
                <div key={r} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-300 mr-3 flex items-center justify-center font-bold text-white">U</div>
                    <div>
                      <span className="font-black text-slate-900 text-sm">Enterprise Buyer</span>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Verified Transaction</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic">"The implementation was handled professionally. Highly impressed with the local support and technical depth."</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Dynamic Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-3 text-sm text-slate-400 font-bold">
          <Link to="/" className="hover:text-blue-600 transition-colors">Marketplace</Link>
          <span>/</span>
          <span className="text-blue-600 uppercase tracking-widest text-[11px]">{product.category}</span>
          <span>/</span>
          <span className="text-slate-900 truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-10">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Main Product Info */}
          <div className="lg:col-span-7 space-y-10">
            <div className="bg-white rounded-[3rem] p-4 shadow-sm border border-slate-100">
              <div className="aspect-video rounded-[2.5rem] overflow-hidden bg-slate-100 relative group">
                <img src={activeImage} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-8 right-8 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all"><Share2 size={20}/></button>
                  <button className="p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all text-red-500"><Heart size={20}/></button>
                </div>
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 p-4 overflow-x-auto no-scrollbar">
                  {product.images.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveImage(img)}
                      className={`w-24 h-24 rounded-2xl overflow-hidden border-4 shrink-0 transition-all ${activeImage === img ? 'border-blue-600 scale-95 shadow-lg' : 'border-white hover:border-slate-200'}`}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 min-h-[500px]">
              <div className="flex items-center space-x-10 border-b border-slate-100 mb-8 overflow-x-auto no-scrollbar">
                {(['Overview', 'Specifications', 'Vendor Details', 'Reviews (12)'] as TabType[]).map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-5 font-black text-sm uppercase tracking-widest transition-all border-b-4 ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {renderTabContent()}
            </div>

            {/* AI BANT Analysis Form */}
            <div ref={bantSectionRef} className="bg-white rounded-[3rem] p-12 shadow-2xl border border-blue-50 relative overflow-hidden scroll-mt-24">
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <Sparkles size={160} className="text-blue-600" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 rounded-[2rem] bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-200">
                    <Target size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 leading-tight">Post Your BANT Requirement</h3>
                    <p className="text-slate-500 font-bold text-sm">Our AI will match your needs with the perfect Indian vendor.</p>
                  </div>
                </div>

                {leadSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-[2.5rem] p-12 text-center animate-in zoom-in-95 duration-500">
                    <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
                    <h4 className="text-3xl font-black text-slate-900 mb-4">Lead Dispatched!</h4>
                    <p className="text-slate-600 font-medium mb-10 max-w-sm mx-auto">Verified vendors have been notified. You will receive quotes in your dashboard shortly.</p>
                    <button 
                      onClick={() => { setLeadSubmitted(false); setAnalysis(null); setDescription(''); }}
                      className="bg-slate-900 text-white font-bold px-12 py-5 rounded-[2rem] shadow-xl hover:bg-slate-800 transition-all"
                    >
                      New Inquiry
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100">
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Detailed Requirement Description</label>
                      <textarea 
                        className="w-full bg-white border border-slate-200 rounded-[2rem] px-8 py-6 focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 outline-none h-40 resize-none text-slate-700 font-medium transition-all" 
                        placeholder="Mention your estimated budget, who makes decisions, core problem to solve, and expected implementation timeline..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <button 
                        onClick={handleBantAnalysis}
                        disabled={analyzing || !description.trim()}
                        className="mt-6 bg-[#0f172a] hover:bg-slate-800 text-white font-bold px-10 py-5 rounded-[2rem] shadow-2xl shadow-slate-200 disabled:opacity-50 transition-all flex items-center space-x-3 text-lg"
                      >
                        {analyzing ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                        <span>{analyzing ? 'AI Analysis...' : 'Qualify Requirement'}</span>
                      </button>
                    </div>

                    {analysis && (
                      <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 animate-in slide-in-from-top-4 duration-500 relative overflow-hidden shadow-2xl">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                         <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10 relative z-10">
                            <div>
                              <h4 className="text-xl font-black flex items-center">
                                <ShieldCheck className="text-green-400 mr-2" size={24} />
                                BANT Intelligence Report
                              </h4>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Match Score</p>
                              <p className="text-4xl font-black text-blue-400">{analysis.score}%</p>
                            </div>
                         </div>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                            {[
                              { label: 'Budget', val: analysis.budget, icon: Wallet },
                              { label: 'Authority', val: analysis.authority, icon: Users },
                              { label: 'Need', val: analysis.need, icon: Target },
                              { label: 'Timeline', val: analysis.timing, icon: Clock }
                            ].map((item, i) => (
                              <div key={i} className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center">
                                  <item.icon size={10} className="mr-1.5" /> {item.label}
                                </span>
                                <p className="font-black text-blue-100 text-sm leading-tight">{item.val}</p>
                              </div>
                            ))}
                         </div>
                         <div className="mt-10 flex items-center justify-between relative z-10">
                            <p className="text-xs text-slate-400 font-medium italic">Gemini AI verified lead profile</p>
                            <button 
                              onClick={() => setShowConfirmDialog(true)}
                              className="bg-blue-600 text-white font-bold px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40"
                            >
                              Dispatch to Verified Vendors
                            </button>
                         </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-blue-50 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-blue-100">
                  {product.category}
                </span>
                <div className="flex items-center text-amber-500 space-x-1.5">
                  <Star size={20} fill="currentColor" />
                  <span className="font-black text-slate-900 text-lg">{product.rating}</span>
                </div>
              </div>

              <h1 className="text-4xl font-black text-slate-900 mb-2 leading-tight">{product.name}</h1>
              <div className="flex items-center text-slate-400 text-sm mb-8 font-bold">
                <Package size={18} className="mr-2" />
                <span>By <span className="text-blue-600 hover:underline cursor-pointer">{vendor?.name || 'Verified Vendor'}</span></span>
              </div>

              <div className="bg-slate-50 rounded-[2.5rem] p-8 mb-8 border border-slate-100 shadow-inner">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Investment Range</p>
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-black text-slate-900">₹{product.price}</span>
                  <span className="text-slate-400 line-through text-lg">₹{(parseInt(product.price.replace(/,/g, '')) * 1.2).toLocaleString()}</span>
                </div>
                <div className="flex items-center text-green-600 text-[11px] font-black uppercase tracking-widest mt-4">
                  <CheckCircle2 size={16} className="mr-2" />
                  <span>Availability: {product.stockStatus}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={handleBookDeployment}
                  disabled={isBooking}
                  className="w-full relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <div className="relative w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-black py-6 rounded-[2.5rem] shadow-2xl shadow-blue-200 transition-all flex items-center justify-center space-x-3 text-lg border border-blue-400">
                    {isBooking ? <Loader2 className="animate-spin" size={24} /> : <CheckCircle2 size={24} />}
                    <span className="uppercase tracking-widest">View Now</span>
                  </div>
                </button>

                <button 
                  onClick={handleConsultExpert}
                  className="w-full relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-300 rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <div className="relative w-full bg-amber-400 hover:bg-amber-500 active:scale-[0.98] text-slate-900 font-black py-6 rounded-[2.5rem] shadow-2xl shadow-amber-200 transition-all flex items-center justify-center space-x-3 text-lg border border-amber-300">
                    <CalendarCheck size={24} />
                    <span className="uppercase tracking-widest">Book Now</span>
                  </div>
                </button>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100 flex items-center space-x-6">
                <ShieldCheck size={40} className="text-blue-600 opacity-20" />
                <div>
                   <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-1">Guaranteed Service</p>
                   <p className="text-[10px] text-slate-400 font-bold leading-relaxed">Payments protected by BantConfirm Escrow until deployment sign-off.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Recommendations - Refined logic */}
        {recommendedProducts.length > 0 && (
          <div className="mt-32">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Similar Solutions You May Like</h2>
              <Link to="/products" className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs hover:underline flex items-center">
                Explore All <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {recommendedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmDialog && analysis && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-300">
            <div className="p-10 md:p-14">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-black text-slate-900">Final Confirmation</h3>
                <button onClick={() => setShowConfirmDialog(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed">Review your BANT profile. Dispatched leads cannot be revoked as they are immediately shared with the vendor network.</p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score Match</span>
                  <span className="text-2xl font-black text-blue-600">{analysis.score}%</span>
                </div>
                <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Timing</span>
                  <span className="font-black text-slate-900">{analysis.timing}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setShowConfirmDialog(false)} className="flex-1 px-8 py-5 rounded-3xl font-black text-slate-500 hover:bg-slate-50 transition-colors border border-slate-200">Wait, I'll Edit</button>
                <button onClick={handleFinalSubmit} className="flex-1 px-8 py-5 bg-blue-600 text-white font-black rounded-3xl shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all uppercase tracking-widest text-sm">Dispatch Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
