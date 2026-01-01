
import { Metadata } from 'next';
import { MOCK_PRODUCTS, MOCK_VENDORS } from "../../../lib/constants";
import { notFound } from 'next/navigation';
import { ProductCard } from "../../../components/ProductCard";
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Zap, Package, MapPin, Star } from 'lucide-react';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = MOCK_PRODUCTS.find(p => p.id === params.id);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} | BantConfirm B2B`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    }
  };
}

export default function ProductPage({ params }: Props) {
  const product = MOCK_PRODUCTS.find(p => p.id === params.id);
  const vendor = MOCK_VENDORS.find(v => v.id === product?.vendorId);

  if (!product) notFound();

  const recommendedProducts = MOCK_PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-3 text-sm text-slate-400 font-bold">
          <Link href="/products" className="hover:text-blue-600 transition-colors">Marketplace</Link>
          <ChevronRight size={14} />
          <span className="text-blue-600 uppercase tracking-widest text-[11px]">{product.category}</span>
          <ChevronRight size={14} />
          <span className="text-slate-900 truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[3rem] p-4 shadow-sm border border-slate-100">
              <div className="aspect-video rounded-[2.5rem] overflow-hidden bg-slate-100">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="bg-white rounded-[3rem] p-10 mt-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Product Overview</h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">
                {product.fullDescription || product.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100/50">
                  <h4 className="font-black text-slate-900 mb-4 flex items-center text-sm uppercase tracking-widest">
                    <Zap className="text-blue-600 mr-2" size={18} /> Features
                  </h4>
                  <ul className="space-y-3">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-700 font-medium">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 shrink-0 mt-1.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
                  <h4 className="font-black mb-4 flex items-center text-sm uppercase tracking-widest">
                    <ShieldCheck className="text-blue-400 mr-2" size={18} /> Compliance
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    GST-ready and ISO 27001 compliant. Implementation support included.
                  </p>
                </div>
              </div>
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

              <h1 className="text-4xl font-black text-slate-900 mb-2">{product.name}</h1>
              <div className="flex items-center text-slate-400 text-sm mb-8 font-bold">
                <Package size={18} className="mr-2" />
                <span>By {vendor?.name || 'Verified Vendor'}</span>
              </div>

              <div className="bg-slate-50 rounded-[2.5rem] p-8 mb-8 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Starting Price</p>
                <p className="text-4xl font-black text-slate-900">₹{product.price}</p>
              </div>

              <div className="space-y-4">
                 <button className="w-full bg-blue-600 text-white font-black py-6 rounded-[2.5rem] shadow-xl hover:bg-blue-700 transition-all uppercase tracking-widest">
                   Enquire Now
                 </button>
                 <button className="w-full bg-amber-400 text-slate-900 font-black py-6 rounded-[2.5rem] shadow-xl hover:bg-amber-500 transition-all uppercase tracking-widest">
                   Book Demo
                 </button>
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
}
