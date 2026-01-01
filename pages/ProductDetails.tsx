
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
  Sparkles,
  Loader2,
  Target,
  Clock,
  Wallet,
  Users,
  X,
  CalendarCheck,
  ArrowRight
} from 'lucide-react';
import { analyzeLeadWithAI, BANTAnalysis } from '../services/geminiService';

type TabType = 'Overview' | 'Specifications' | 'Vendor Details' | 'Reviews (12)';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams();
  // Lookup by slug as the primary key for routing
  const product = useMemo(() => MOCK_PRODUCTS.find(p => p.slug === slug || p.id === slug), [slug]);
  const vendor = useMemo(() => MOCK_VENDORS.find(v => v.id === product?.vendorId), [product]);
  
  const [activeImage, setActiveImage] = useState(product?.imageUrl || '');
  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  
  const bantSectionRef = useRef<HTMLDivElement>(null);

  const [description, setDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<BANTAnalysis | null>(null);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.imageUrl);
      window.scrollTo(0, 0);
    }
  }, [product]);

  const recommendedProducts = useMemo(() => {
    if (!product) return [];
    return MOCK_PRODUCTS
      .filter(p => p.category === product.category && p.slug !== slug)
      .slice(0, 4);
  }, [product, slug]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl font-black text-slate-900 mb-4">Solution Not Found</h2>
        <Link to="/products" className="bg-blue-600 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-blue-200">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const handleBantAnalysis = async () => {
    if (!description.trim()) return;
    setAnalyzing(true);
    const result = await analyzeLeadWithAI(description);
    setAnalysis(result);
    setAnalyzing(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
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
          <div className="lg:col-span-7 space-y-10">
            <div className="bg-white rounded-[3rem] p-4 shadow-sm border border-slate-100 overflow-hidden">
              <img src={activeImage} alt={product.name} className="w-full aspect-video object-cover rounded-[2.5rem]" />
            </div>

            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
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
              <p className="text-slate-600 leading-relaxed text-lg mb-8">{product.fullDescription || product.description}</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-blue-50 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center text-amber-500 space-x-1.5">
                  <Star size={20} fill="currentColor" />
                  <span className="font-black text-slate-900 text-lg">{product.rating}</span>
                </div>
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-2 leading-tight">{product.name}</h1>
              <div className="bg-slate-50 rounded-[2.5rem] p-8 mb-8 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Starting at</p>
                <p className="text-4xl font-black text-slate-900">₹{product.price}</p>
              </div>
              <div className="space-y-4">
                 <button className="w-full bg-blue-600 text-white font-black py-6 rounded-[2.5rem] shadow-xl hover:bg-blue-700 transition-all uppercase tracking-widest">Enquire Now</button>
                 <button className="w-full bg-amber-400 text-slate-900 font-black py-6 rounded-[2.5rem] shadow-xl hover:bg-amber-500 transition-all uppercase tracking-widest">Book Demo</button>
              </div>
            </div>
          </div>
        </div>

        {recommendedProducts.length > 0 && (
          <div className="mt-32">
            <h2 className="text-3xl font-black text-slate-900 mb-12">Recommended Solutions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {recommendedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
