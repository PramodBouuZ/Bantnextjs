
import React, { useState } from 'react';
import { MOCK_BLOGS } from '../constants';
import { Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BlogPage: React.FC = () => {
  // In a real app, this would fetch from an API or a shared global state
  const [articles] = useState(MOCK_BLOGS);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in duration-700">
        <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 inline-block">Insights & Articles</span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">Learn how to scale <br /> your business with IT</h1>
        <p className="text-slate-500 text-lg">Expert advice on B2B sales, procurement, and enterprise technology landscape in India.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map((blog, idx) => (
          <div 
            key={blog.id} 
            className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="h-64 bg-slate-200 relative overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/${blog.id}/800/600`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt={blog.title} 
              />
              <div className="absolute top-6 left-6">
                <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-blue-600 shadow-sm flex items-center">
                  <Sparkles size={12} className="mr-1.5" />
                  {blog.category}
                </span>
              </div>
            </div>
            <div className="p-8 flex flex-col h-[calc(100%-256px)]">
              <div className="flex items-center space-x-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">
                <div className="flex items-center space-x-1.5">
                  <Calendar size={12} className="text-blue-500" />
                  <span>{blog.publishedAt}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <User size={12} className="text-amber-500" />
                  <span>Editorial</span>
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                {blog.title}
              </h3>
              <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed flex-grow">
                {blog.metaDescription || blog.content.substring(0, 150) + '...'}
              </p>
              <Link to={`/blog/${blog.slug}`} className="inline-flex items-center space-x-2 text-blue-600 font-black text-sm group/btn uppercase tracking-widest">
                <span>Read Full Article</span>
                <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
