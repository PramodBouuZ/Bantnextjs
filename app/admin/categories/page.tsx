
'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Plus, Layers, Edit, Trash2, 
  CheckCircle2, XCircle, Save, X, Loader2 
} from 'lucide-react';

export default function CategoryManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const { data } = await supabase.from('categories').select('*').order('type', { ascending: true });
    setCategories(data || []);
    setLoading(false);
  }

  const handleOpenModal = (cat = null) => {
    setEditingCategory(cat || {
      name: '',
      slug: '',
      type: 'product',
      is_active: true
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingCategory.id) {
        await supabase.from('categories').update(editingCategory).eq('id', editingCategory.id);
      } else {
        await supabase.from('categories').insert([editingCategory]);
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Category Management</h1>
          <p className="text-slate-500 font-medium">Define unified taxonomy for products, leads and insights.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {['product', 'blog', 'lead'].map(type => (
          <div key={type} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center">
                <Layers size={18} className="mr-2 text-blue-600" /> {type}s
              </h3>
              <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-100">
                {categories.filter(c => c.type === type).length} Active
              </span>
            </div>
            <div className="p-4 space-y-2">
              {categories.filter(c => c.type === type).map(cat => (
                <div key={cat.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                  <div>
                    <p className="font-bold text-slate-800">{cat.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">/{cat.slug}</p>
                  </div>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(cat)} className="p-2 text-slate-400 hover:text-blue-600"><Edit size={16}/></button>
                    <button className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg p-10 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-slate-900">{editingCategory.id ? 'Edit Category' : 'New Category'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24}/></button>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Display Name</label>
                <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none font-bold" value={editingCategory.name} onChange={e => setEditingCategory({...editingCategory, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">URL Slug</label>
                <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none font-mono text-sm" value={editingCategory.slug} onChange={e => setEditingCategory({...editingCategory, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Taxonomy Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {['product', 'blog', 'lead'].map(t => (
                    <button 
                      key={t}
                      type="button"
                      onClick={() => setEditingCategory({...editingCategory, type: t})}
                      className={`py-3 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${editingCategory.type === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-500 border-slate-100'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-6 flex items-center justify-end space-x-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 font-bold text-slate-500">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-blue-600 text-white font-black px-12 py-4 rounded-[2rem] shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2">
                  {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  <span>{editingCategory.id ? 'Update' : 'Create'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
