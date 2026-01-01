
'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  FileText, Plus, Search, Edit, Trash2, 
  Eye, Save, X, Loader2, Calendar, 
  Sparkles, Globe
} from 'lucide-react';

export default function BlogManager() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const [blogRes, catRes] = await Promise.all([
      supabase.from('blogs').select('*, categories(name)').order('published_at', { ascending: false }),
      supabase.from('categories').select('*').eq('type', 'blog')
    ]);
    setBlogs(blogRes.data || []);
    setCategories(catRes.data || []);
    setLoading(false);
  }

  const handleOpenModal = (blog = null) => {
    setEditingBlog(blog || {
      title: '',
      slug: '',
      category_id: '',
      content: '',
      meta_description: '',
      is_published: true,
      published_at: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingBlog.id) {
        await supabase.from('blogs').update(editingBlog).eq('id', editingBlog.id);
      } else {
        await supabase.from('blogs').insert([editingBlog]);
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Insights Manager</h1>
          <p className="text-slate-500 font-medium">Create and manage expert B2B articles and guides.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Article</span>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b">
              <tr>
                <th className="px-8 py-5">Article</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Published</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900">{b.title}</div>
                    <p className="text-[10px] text-slate-400 font-mono">/{b.slug}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-blue-50 text-blue-600 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest">
                      {b.categories?.name}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="flex items-center text-xs text-slate-500 font-bold">
                      <Calendar size={12} className="mr-2" /> {b.published_at}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${b.is_published ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
                      {b.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600"><Eye size={18}/></button>
                      <button onClick={() => handleOpenModal(b)} className="p-2 text-slate-400 hover:text-blue-600"><Edit size={18}/></button>
                      <button className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={18}/></button>
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
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl p-10 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-slate-900">{editingBlog.id ? 'Edit Article' : 'Write Insight'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none font-bold" value={editingBlog.title} onChange={e => setEditingBlog({...editingBlog, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Slug</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none font-mono text-sm" value={editingBlog.slug} onChange={e => setEditingBlog({...editingBlog, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                  <select required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none font-bold" value={editingBlog.category_id} onChange={e => setEditingBlog({...editingBlog, category_id: e.target.value})}>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Publish Date</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none font-bold" value={editingBlog.published_at} onChange={e => setEditingBlog({...editingBlog, published_at: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Content (Markdown Supported)</label>
                <textarea required className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] px-8 py-6 outline-none h-64 resize-none font-medium leading-relaxed" value={editingBlog.content} onChange={e => setEditingBlog({...editingBlog, content: e.target.value})} />
              </div>

              <div className="pt-6 flex items-center justify-end space-x-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 font-bold text-slate-500">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-blue-600 text-white font-black px-12 py-4 rounded-[2rem] shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2">
                  {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  <span>{editingBlog.id ? 'Update Article' : 'Post Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
