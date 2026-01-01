
import React, { useState } from 'react';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, Search, X, PackageSearch } from 'lucide-react';

export const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryNames = ['All', ...CATEGORIES.map(c => c.name)];

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Marketplace</h1>
          <p className="text-slate-500">Verified IT & Software solutions for Indian MSMEs.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search catalog..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-10 py-3 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 bg-white border border-slate-200 p-1.5 rounded-2xl shrink-0">
            <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-500"><Filter size={20} /></button>
            <div className="w-px h-6 bg-slate-200"></div>
            <button className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 rounded-xl text-slate-700 font-bold text-sm uppercase tracking-widest">
              <SlidersHorizontal size={16} />
              <span>Sort: Trending</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Wise Search/Filter */}
      <div className="flex items-center space-x-4 overflow-x-auto pb-8 no-scrollbar">
        {categoryNames.map(catName => (
          <button 
            key={catName}
            onClick={() => setSelectedCategory(catName)}
            className={`px-8 py-3 rounded-2xl font-black transition-all border whitespace-nowrap shadow-sm ${
              selectedCategory === catName 
                ? 'bg-blue-600 text-white border-blue-600 shadow-blue-200' 
                : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300'
            }`}
          >
            {catName}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-32 text-center bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center">
            <PackageSearch size={64} className="text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-900">No matching solutions found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or category filters.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-6 text-blue-600 font-black uppercase tracking-widest text-sm hover:underline"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
