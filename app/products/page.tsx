
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/constants';
import { ProductCard } from '@/components/ProductCard';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';
import Link from 'next/link';

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; query?: string };
}) {
  const selectedCat = searchParams.category || 'All';
  const query = searchParams.query || '';

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = selectedCat === 'All' || p.category === selectedCat;
    const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase()) || 
                          p.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Marketplace</h1>
          <p className="text-slate-500">Verified IT & Software solutions for Indian MSMEs.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search catalog..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="flex items-center space-x-2 bg-white border border-slate-200 p-1.5 rounded-2xl">
            <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-500"><Filter size={20} /></button>
            <div className="w-px h-6 bg-slate-200"></div>
            <button className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 rounded-xl text-slate-700 font-bold text-sm uppercase tracking-widest">
              <SlidersHorizontal size={16} />
              <span>Trending</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 overflow-x-auto pb-8 no-scrollbar">
        <Link 
          href="/products"
          className={`px-8 py-3 rounded-2xl font-black transition-all border whitespace-nowrap shadow-sm ${
            selectedCat === 'All' 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-white text-slate-600 border-slate-100'
          }`}
        >
          All Solutions
        </Link>
        {CATEGORIES.map(cat => (
          <Link 
            key={cat.id}
            href={`/products?category=${cat.name}`}
            className={`px-8 py-3 rounded-2xl font-black transition-all border whitespace-nowrap shadow-sm ${
              selectedCat === cat.name 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-slate-600 border-slate-100'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
