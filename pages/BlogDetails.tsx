
import React, { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_BLOGS } from '../constants';
import { Calendar, User, ArrowLeft, Share2, Facebook, Linkedin, Twitter, Sparkles, ChevronRight } from 'lucide-react';

export const BlogDetails: React.FC = () => {
  const { slug } = useParams();
  const blog = useMemo(() => MOCK_BLOGS.find(b => b.slug === slug), [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-32 text-center h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl font-black text-slate-900 mb-4">Article Not Found</h2>
        <Link to="/blog" className="bg-blue-600 text-white font-bold px-10 py-4 rounded-2xl">Back to Insights</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-slate-100">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-3 text-[11px] font-black uppercase tracking-widest text-slate-400">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight size={10} />
          <Link to="/blog" className="hover:text-blue-600">Insights</Link>
          <ChevronRight size={10} />
          <span className="text-slate-900 truncate max-w-[150px]">{blog.title}</span>
        </div>
      </div>

      <article className="pb-32">
        {/* Header Section */}
        <header className="pt-16 pb-12 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center space-x-2 mb-6">
               <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center">
                 <Sparkles size={12} className="mr-1.5" />
                 {blog.category}
               </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.15]">
              {blog.title}
            </h1>
            <div className="flex items-center justify-between border-t border-slate-200 pt-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-200 overflow-hidden ring-4 ring-white shadow-sm">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="Author" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">BantConfirm Editorial</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Industry Analyst</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-slate-400 font-black text-[11px] uppercase tracking-[0.2em]">
                <div className="flex items-center space-x-2">
                  <Calendar size={14} className="text-blue-600" />
                  <span>{blog.publishedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="container mx-auto px-4 max-w-5xl -mt-12 mb-16">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 border-8 border-white aspect-[21/9]">
            <img src={`https://picsum.photos/seed/${blog.id}/1200/600`} className="w-full h-full object-cover" alt={blog.title} />
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-xl text-slate-600 font-medium leading-relaxed mb-10 italic border-l-4 border-blue-600 pl-6">
              {blog.metaDescription || "Empowering Indian businesses with intelligence to drive growth and efficiency."}
            </p>
            
            <div className="text-slate-800 leading-relaxed text-lg space-y-8">
              {/* Using split as a simple way to simulate paragraphs from mock content */}
              {blog.content.split('\n').map((para, i) => (
                <p key={i}>{para || "Leveraging AI for B2B sales means more than just automation—it's about accuracy. In the modern marketplace, high-intent leads are the lifeblood of sustainable growth. By qualifying requirements through the BANT framework, enterprises can ensure their sales teams are focused on deals that are actually ready to close."}</p>
              ))}
              
              <h2 className="text-3xl font-black text-slate-900 pt-8">Key Takeaways for MSMEs</h2>
              <ul className="space-y-4 list-disc pl-6 text-slate-600">
                <li>Identify budget early to save sales bandwidth.</li>
                <li>Connect with decision makers directly using our platform.</li>
                <li>Verify the immediate business need to prioritize implementation.</li>
              </ul>

              <div className="bg-blue-50 border border-blue-100 p-10 rounded-[2.5rem] mt-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Sparkles size={80} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-black text-blue-800 mb-4">Want to read more?</h3>
                <p className="text-blue-600 text-sm font-medium mb-6">Join 10,000+ business owners receiving our weekly insights on IT procurement.</p>
                <div className="flex gap-2">
                  <input className="flex-1 bg-white border border-blue-200 rounded-xl px-5 py-3 text-sm outline-none" placeholder="Enter your work email" />
                  <button className="bg-blue-600 text-white font-black px-6 py-3 rounded-xl text-sm whitespace-nowrap">Subscribe</button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Share */}
          <div className="mt-20 pt-12 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Share this Article</span>
              <div className="flex space-x-2">
                <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Facebook size={18} /></button>
                <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all"><Twitter size={18} /></button>
                <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-blue-800 hover:text-white transition-all"><Linkedin size={18} /></button>
              </div>
            </div>
            <button className="flex items-center space-x-2 text-blue-600 font-bold text-sm">
              <Share2 size={18} />
              <span>Copy Link</span>
            </button>
          </div>
        </div>
      </article>

      {/* Recommended Articles */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-slate-900">Recommended Reading</h2>
            <Link to="/blog" className="text-blue-600 font-bold flex items-center">
              View All Insights <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {MOCK_BLOGS.filter(b => b.slug !== slug).slice(0, 2).map(rec => (
              <Link key={rec.id} to={`/blog/${rec.slug}`} className="group flex bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-xl transition-all h-full">
                <div className="w-1/3 shrink-0">
                  <img src={`https://picsum.photos/seed/${rec.id}/400/400`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                   <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">{rec.category}</span>
                   <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-2">{rec.title}</h3>
                   <p className="text-xs text-slate-400 font-bold">{rec.publishedAt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
