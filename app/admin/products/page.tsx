
'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Plus, Edit, Trash2, Package, 
  Image as ImageIcon, Save, X, Loader2
} from 'lucide-react';

export default function ProductCatalog() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const [prodRes, catRes, venRes] = await Promise.all([
      supabase.from('products').select('*, categories(name), vendors(company_name)'),
      supabase.from('categories').select('*').eq('type', 'product'),
      supabase.from('vendors').select('*').eq('status', 'ACTIVE')
    ]);
    setProducts(prodRes.data || []);
    setCategories(catRes.data || []);
    setVendors(venRes.data || []);
    setLoading(false);
  }

  const handleOpenModal = (product = null) => {
    setEditingProduct(product || {
      name: '',
      slug: '', // Crucial for new routing
      category_id: '',
      vendor_id: '',
      price: 0,
      pricing_unit: 'mo',
      short_description: '',
      full_description: '',
      features: [],
      image_url: '',
      status: 'published'
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingProduct.id) {
        await supabase.from('products').update(editingProduct).eq('id', editingProduct.id);
      } else {
        await supabase.from('products').insert([editingProduct]);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Product Catalog</h1>
          <p className="text-slate-500 font-medium">Manage marketplace solutions and services.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b">
              <tr>
                <th className="px-8 py-5">Product</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Vendor</th>
                <th className="px-8 py-5">Price</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <img src={p.image_url || 'https://via.placeholder.com/40'} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                      <div>
                        <p className="font-bold text-slate-900">{p.name}</p>
                        <p className="text-xs text-slate-400">/{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium">{p.categories?.name}</td>
                  <td className="px-8 py-6 text-sm font-medium">{p.vendors?.company_name}</td>
                  <td className="px-8 py-6">
                    <p className="font-black text-slate-900">₹{p.price?.toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">/{p.pricing_unit}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => handleOpenModal(p)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit size={18}/></button>
                      <button className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={32} /></div>}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-900">{editingProduct.id ? 'Edit Product' : 'Add New Solution'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24}/></button>
              </div>
              
              <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Name</label>
                    <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none font-bold" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">URL Slug</label>
                    <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none font-mono text-sm" value={editingProduct.slug} onChange={e => setEditingProduct({...editingProduct, slug: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                      <select required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none font-bold" value={editingProduct.category_id} onChange={e => setEditingProduct({...editingProduct, category_id: e.target.value})}>
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vendor</label>
                      <select required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none font-bold" value={editingProduct.vendor_id} onChange={e => setEditingProduct({...editingProduct, vendor_id: e.target.value})}>
                        <option value="">Select Vendor</option>
                        {vendors.map(v => <option key={v.id} value={v.id}>{v.company_name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Image URL</label>
                    <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none text-xs" placeholder="Paste image link..." value={editingProduct.image_url} onChange={e => setEditingProduct({...editingProduct, image_url: e.target.value})} />
                  </div>
                  <div className="flex items-center justify-end space-x-4 pt-6">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 font-bold text-slate-500">Cancel</button>
                    <button type="submit" disabled={isSaving} className="bg-blue-600 text-white font-black px-12 py-4 rounded-[2rem] shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2">
                      {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                      <span>Save Product</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
