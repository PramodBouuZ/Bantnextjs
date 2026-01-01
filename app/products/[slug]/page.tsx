
import { getProductBySlug } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ShieldCheck, Zap, Package, Star, CalendarCheck, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} | BantConfirm`,
    description: product.short_description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const vendor = product.vendors?.[0]?.vendors;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-3 text-xs font-black uppercase tracking-widest text-slate-400">
          <Link href="/products" className="hover:text-blue-600">Marketplace</Link>
          <span>/</span>
          <span className="text-blue-600">{product.categories?.name}</span>
          <span>/</span>
          <span className="text-slate-900 truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-10">
            <div className="bg-white rounded-[3rem] p-4 shadow-sm border border-slate-100 overflow-hidden">
               <img src={product.image_url} alt={product.name} className="w-full aspect-video object-cover rounded-[2.5rem]" />
            </div>

            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Product Overview</h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">
                {product.full_description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100">
                  <h4 className="font-black text-slate-900 mb-4 flex items-center text-xs uppercase tracking-[0.2em]">
                    <Zap className="text-blue-600 mr-2" size={18} /> Key Features
                  </h4>
                  <ul className="space-y-3">
                    {product.features?.map((feat: string, i: number) => (
                      <li key={i} className="flex items-start text-sm text-slate-700 font-bold">
                        <CheckCircle2 className="text-blue-600 mr-2 shrink-0" size={16} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
                  <h4 className="font-black mb-4 flex items-center text-xs uppercase tracking-[0.2em]">
                    <ShieldCheck className="text-blue-400 mr-2" size={18} /> Compliance
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    GST-ready. ISO 27001 compliant infrastructure. Local deployment support included.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-blue-50 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-blue-100">
                  {product.categories?.name}
                </span>
                <div className="flex items-center text-amber-500 space-x-1.5 font-black text-lg">
                  <Star size={20} fill="currentColor" />
                  <span>4.8</span>
                </div>
              </div>

              <h1 className="text-4xl font-black text-slate-900 mb-2 leading-tight">{product.name}</h1>
              <p className="text-slate-400 text-sm mb-8 font-black flex items-center">
                <Package size={18} className="mr-2" />
                BY {vendor?.company_name || 'VERIFIED VENDOR'}
              </p>

              <div className="bg-slate-50 rounded-[2.5rem] p-8 mb-8 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting Price</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-black text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="text-slate-400 text-sm font-bold lowercase">/{product.pricing_unit}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white font-black py-6 rounded-[2.5rem] shadow-xl hover:bg-blue-700 transition-all uppercase tracking-widest text-sm">
                  Instant Inquiry
                </button>
                <button className="w-full bg-amber-400 text-slate-900 font-black py-6 rounded-[2.5rem] shadow-xl hover:bg-amber-500 transition-all uppercase tracking-widest text-sm flex items-center justify-center space-x-2">
                  <CalendarCheck size={20} />
                  <span>Book Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
