
import { Metadata } from 'next';
import { MOCK_BLOGS } from '@/lib/constants';
import { notFound } from 'next/navigation';
import { Calendar, User, ChevronRight, Sparkles, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = MOCK_BLOGS.find(b => b.slug === params.slug);
  if (!blog) return { title: 'Article Not Found' };
  
  return {
    title: `${blog.title} | BantConfirm Insights`,
    description: blog.metaDescription,
  };
}

export default function BlogDetailsPage({ params }: Props) {
  const blog = MOCK_BLOGS.find(b => b.slug === params.slug);
  if (!blog) notFound();

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-slate-100">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-3 text-[11px] font-black uppercase tracking-widest text-slate-400">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight size={10} />
          <Link href="/blog" className="hover:text-blue-600">Insights</Link>
          <ChevronRight size={10} />
          <span className="text-slate-900 truncate max-w-[150px]">{blog.title}</span>
        </div>
      </div>

      <article className="pb-32">
        <header className="pt-16 pb-12 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg inline-flex items-center mb-6">
              <Sparkles size={12} className="mr-1.5" /> {blog.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.15]">{blog.title}</h1>
            <div className="flex items-center space-x-4 border-t border-slate-200 pt-8">
              <div className="w-12 h-12 rounded-2xl bg-slate-200" />
              <div>
                <p className="text-sm font-black text-slate-900">BantConfirm Editorial</p>
                <div className="flex items-center space-x-4 text-xs text-slate-400 font-bold uppercase">
                  <span className="flex items-center"><Calendar size={12} className="mr-1" /> {blog.publishedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 max-w-3xl pt-16 text-lg text-slate-700 leading-relaxed space-y-6">
          <p className="font-medium italic text-xl text-slate-600 border-l-4 border-blue-600 pl-6">
            {blog.metaDescription}
          </p>
          <div className="whitespace-pre-line">{blog.content}</div>
        </div>
      </article>
    </div>
  );
}
