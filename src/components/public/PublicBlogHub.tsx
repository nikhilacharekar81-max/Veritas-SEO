'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCms } from '../../lib/store';
import { Breadcrumbs } from './Breadcrumbs';
import { EditableText } from './EditableText';
import { FileText, Search, ArrowRight, Plus } from 'lucide-react';

interface Props {
  onNavigateHome?: () => void;
  onSelectPost?: (slug: string) => void;
  onOpenBlogAdmin: () => void;
}

export const PublicBlogHub: React.FC<Props> = ({
  onOpenBlogAdmin,
}) => {
  const { publicBlogPosts, blogCategories, updateBlogPost } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return publicBlogPosts.filter((post) => {
      if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [publicBlogPosts, selectedCategory, searchQuery]);

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'SEO Engineering Blog', url: '/blog' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={breadcrumbs}
      />

      {/* Blog Hub Header */}
      <header className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-semibold">
            <EditableText
              blockKey="blog.hub_kicker"
              defaultContent="Technical SEO Research & Engineering Guides"
              label="Blog Hub Kicker"
            />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            <EditableText
              blockKey="blog.hub_title"
              defaultContent="Veritas SEO Engineering Blog"
              label="Blog Hub Title"
            />
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            <EditableText
              blockKey="blog.hub_subtitle"
              defaultContent="In-depth guides on N-Gram phrase frequency, SERP pixel truncation, Schema.org JSON-LD architecture, and technical crawl optimization."
              label="Blog Hub Subtitle"
              multiline
            />
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenBlogAdmin}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shrink-0 self-start md:self-center shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Write / Manage Posts (WP CMS)</span>
        </button>
      </header>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Articles ({publicBlogPosts.length})
          </button>
          {blogCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-slate-900 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Blog Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <FileText className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-slate-700">No published blog articles found</p>
          <p className="text-xs text-slate-500">
            Try clearing your filter or publish a new post in the WordPress-style Blog CMS.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="space-y-3">
                {/* Unboxed metadata per design discipline */}
                <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                  <span className="font-semibold text-emerald-700">{post.category}</span>
                  <span>·</span>
                  <span>{post.readingTimeMinutes} min read</span>
                  <span>·</span>
                  <time dateTime={post.publishedAt}>{post.publishedAt.slice(0, 10)}</time>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                  <EditableText
                    value={post.title}
                    onSave={(val) => updateBlogPost(post.id, { title: val })}
                    label={`Post Title (${post.slug})`}
                  />
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <EditableText
                    value={post.excerpt}
                    onSave={(val) => updateBlogPost(post.id, { excerpt: val })}
                    label={`Post Excerpt (${post.slug})`}
                    multiline
                  />
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">By {post.author}</span>
                <span className="font-semibold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
