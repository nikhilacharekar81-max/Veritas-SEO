'use client';

import React from 'react';
import { useCms } from '../../lib/store';
import { Breadcrumbs } from './Breadcrumbs';
import { EditableText } from './EditableText';
import { ArrowLeft, Edit3 } from 'lucide-react';

interface Props {
  postSlug: string;
  onNavigateHome: () => void;
  onNavigateBlogHub: () => void;
  onSelectPost: (slug: string) => void;
  onEditInBlogAdmin: (postId: string) => void;
}

export const PublicBlogPostDetail: React.FC<Props> = ({
  postSlug,
  onNavigateHome,
  onNavigateBlogHub,
  onSelectPost,
  onEditInBlogAdmin,
}) => {
  const { publicBlogPosts, updateBlogPost } = useCms();

  const post = publicBlogPosts.find((p) => p.slug === postSlug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Blog Article Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested article does not exist or is currently saved as a draft.
        </p>
        <button
          type="button"
          onClick={onNavigateBlogHub}
          className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  const relatedPosts = publicBlogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/blog' },
    { label: post.title, url: `/blog/${post.slug}` },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Breadcrumbs
          items={breadcrumbs}
          onNavigate={(url) => {
            if (url === '/') onNavigateHome();
            else if (url === '/blog') onNavigateBlogHub();
          }}
        />

        <button
          type="button"
          onClick={() => onEditInBlogAdmin(post.id)}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Edit Post in WP CMS</span>
        </button>
      </div>

      {/* Article Container */}
      <article className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <header className="space-y-4 border-b border-slate-100 pb-6">
          <div className="text-xs font-mono text-slate-500 flex items-center gap-2 flex-wrap">
            <span className="font-bold text-emerald-700">{post.category}</span>
            <span>·</span>
            <span>By {post.author}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>{post.publishedAt.slice(0, 10)}</time>
            <span>·</span>
            <span>{post.readingTimeMinutes} min read</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            <EditableText
              value={post.title}
              onSave={(val) => updateBlogPost(post.id, { title: val })}
              label="Blog Post Title"
            />
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            <EditableText
              value={post.excerpt}
              onSave={(val) => updateBlogPost(post.id, { excerpt: val })}
              label="Blog Post Excerpt"
              multiline
            />
          </p>
        </header>

        {/* Full Article Rich Body Content */}
        <div className="text-sm sm:text-base text-slate-800 leading-relaxed">
          <EditableText
            as="div"
            value={post.content}
            onSave={(val) => updateBlogPost(post.id, { content: val })}
            label="Blog Post Body Content"
            multiline
          />
        </div>

        {/* Tags Footer */}
        {post.tags && post.tags.length > 0 && (
          <footer className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap text-xs text-slate-500">
            <div>
              <span className="font-semibold text-slate-700 mr-2">Topics:</span>
              {post.tags.join(' · ')}
            </div>

            <button
              type="button"
              onClick={onNavigateBlogHub}
              className="font-semibold text-slate-900 hover:text-emerald-700 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Blog Articles
            </button>
          </footer>
        )}
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="space-y-4 pt-2">
          <h2 className="text-base font-bold text-slate-900">More Technical SEO Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPosts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectPost(rel.slug)}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-slate-300 cursor-pointer transition-all space-y-2"
              >
                <div className="text-[11px] font-mono text-emerald-700 font-semibold">
                  {rel.category} · {rel.readingTimeMinutes} min read
                </div>
                <h3 className="text-sm font-bold text-slate-900 hover:text-emerald-700 line-clamp-2">
                  {rel.title}
                </h3>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
