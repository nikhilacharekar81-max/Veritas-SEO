'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useCms } from '../../lib/store';
import type { BlogPost, BlogPostStatus } from '../../lib/schemas';
import { slugify, htmlToPlainText, normalizeRichHtml, plainTextToHtml } from '../../lib/utils';

const RichTextEditor = dynamic(
  () => import('./RichTextEditor').then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="p-6 text-center text-slate-400 font-mono text-xs animate-pulse">
        Loading Post Editor...
      </div>
    ),
  }
);
import {
  FileText,
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  Check,
  X,
  Folder,
  Tag,
  ArrowLeft,
  Globe,
  RotateCcw,
} from 'lucide-react';

interface Props {
  onViewPostOnFrontend?: (slug: string) => void;
  initialEditPostId?: string | null;
}

type WpSubScreen = 'all_posts' | 'editor' | 'categories';

export const BlogManager: React.FC<Props> = ({
  onViewPostOnFrontend,
  initialEditPostId = null,
}) => {
  const {
    blogPosts,
    blogCategories,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    addBlogCategory,
    deleteBlogCategory,
  } = useCms();

  const [screen, setScreen] = useState<WpSubScreen>(initialEditPostId ? 'editor' : 'all_posts');
  const [editingPostId, setEditingPostId] = useState<string | null>(initialEditPostId);

  // Filters for "All Posts" screen
  const [statusFilter, setStatusFilter] = useState<'all' | BlogPostStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Editor form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isEditingSlug, setIsEditingSlug] = useState(false);
  const [content, setContent] = useState('');
  const [editorMode, setEditorMode] = useState<'visual' | 'text'>('visual');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState(blogCategories[0] || 'Technical SEO');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [author, setAuthor] = useState('Nikhil Acharekar');
  const [status, setStatus] = useState<BlogPostStatus>('published');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');

  // Inline new category in sidebar or categories screen
  const [newCatName, setNewCatName] = useState('');
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  // Load post into editor when opening
  const openNewPostEditor = () => {
    setEditingPostId(null);
    setTitle('');
    setSlug('');
    setIsEditingSlug(false);
    setContent('<p>Start writing your article here...</p>');
    setExcerpt('');
    setCategory(blogCategories[0] || 'Technical SEO');
    setTags([]);
    setTagInput('');
    setAuthor('Nikhil Acharekar');
    setStatus('published');
    setSeoTitle('');
    setSeoDescription('');
    setFocusKeyword('');
    setSaveNotice(null);
    setScreen('editor');
  };

  const openEditPostEditor = (post: BlogPost) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setIsEditingSlug(false);
    setContent(post.content);
    setExcerpt(post.excerpt);
    setCategory(post.category);
    setTags(post.tags || []);
    setTagInput('');
    setAuthor(post.author || 'Nikhil Acharekar');
    setStatus(post.status);
    setSeoTitle(post.seoTitle || post.title);
    setSeoDescription(post.seoDescription || post.excerpt);
    setFocusKeyword(post.focusKeyword || '');
    setSaveNotice(null);
    setScreen('editor');
  };

  // Word count & auto reading time
  const plainBody = useMemo(() => htmlToPlainText(content), [content]);
  const wordCount = useMemo(() => {
    const words = plainBody.trim().split(/\s+/).filter(Boolean);
    return words.length;
  }, [plainBody]);
  const calculatedReadingTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleSavePost = (targetStatus: BlogPostStatus) => {
    const cleanTitle = title.trim() || 'Untitled Post';
    const cleanSlug = slugify(slug.trim() || cleanTitle) || 'untitled-post';
    const cleanExcerpt =
      excerpt.trim() || plainBody.slice(0, 155).trim() + (plainBody.length > 155 ? '...' : '');

    if (editingPostId) {
      updateBlogPost(editingPostId, {
        title: cleanTitle,
        slug: cleanSlug,
        content: normalizeRichHtml(content),
        excerpt: cleanExcerpt,
        category,
        tags,
        author: author.trim() || 'Editorial Team',
        status: targetStatus,
        readingTimeMinutes: calculatedReadingTime,
        seoTitle: seoTitle.trim() || `${cleanTitle} | Veritas SEO`,
        seoDescription: seoDescription.trim() || cleanExcerpt,
        focusKeyword: focusKeyword.trim(),
        featuredImage: '',
      });
      setStatus(targetStatus);
      setSlug(cleanSlug);
      setSaveNotice(
        targetStatus === 'published'
          ? 'Post updated and published live!'
          : 'Draft saved successfully.'
      );
    } else {
      const created = createBlogPost({
        title: cleanTitle,
        slug: cleanSlug,
        content: normalizeRichHtml(content),
        excerpt: cleanExcerpt,
        category,
        tags,
        author: author.trim() || 'Editorial Team',
        status: targetStatus,
        readingTimeMinutes: calculatedReadingTime,
        seoTitle: seoTitle.trim() || `${cleanTitle} | Veritas SEO`,
        seoDescription: seoDescription.trim() || cleanExcerpt,
        focusKeyword: focusKeyword.trim(),
        featuredImage: '',
      });
      setEditingPostId(created.id);
      setStatus(targetStatus);
      setSlug(created.slug);
      setSaveNotice(
        targetStatus === 'published'
          ? 'Post published live!'
          : 'Post saved as draft.'
      );
    }

    setTimeout(() => setSaveNotice(null), 3500);
  };

  const handleAddTag = () => {
    const parts = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    if (parts.length === 0) return;
    const next = Array.from(new Set([...tags, ...parts]));
    setTags(next);
    setTagInput('');
  };

  const handleCreateCategoryInline = () => {
    const trimmed = newCatName.trim();
    if (!trimmed) return;
    addBlogCategory(trimmed);
    setCategory(trimmed);
    setNewCatName('');
  };

  // Counts for WP status links
  const counts = useMemo(() => {
    return {
      all: blogPosts.filter((p) => p.status !== 'trash').length,
      published: blogPosts.filter((p) => p.status === 'published').length,
      draft: blogPosts.filter((p) => p.status === 'draft').length,
      trash: blogPosts.filter((p) => p.status === 'trash').length,
    };
  }, [blogPosts]);

  // Filtered posts for All Posts table
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      if (statusFilter === 'all' && post.status === 'trash') return false;
      if (statusFilter !== 'all' && post.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && post.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.slug.toLowerCase().includes(q) ||
          post.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [blogPosts, statusFilter, categoryFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top WordPress-Style Header & Sub-Navigation */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Blog Posts CMS</h1>
            <p className="text-xs text-slate-500">
              Simple WordPress-style post editor, categories, and permalink management.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setScreen('all_posts')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              screen === 'all_posts'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Posts ({counts.all})
          </button>

          <button
            type="button"
            onClick={openNewPostEditor}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              screen === 'editor' && !editingPostId
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Post</span>
          </button>

          <button
            type="button"
            onClick={() => setScreen('categories')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              screen === 'categories'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>Categories ({blogCategories.length})</span>
          </button>
        </div>
      </div>

      {/* SCREEN 1: ALL POSTS LIST (WORDPRESS TABLE STYLE) */}
      {screen === 'all_posts' && (
        <div className="space-y-4">
          {/* Status Links & Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* WordPress Status Filter Links: All | Published | Drafts | Trash */}
            <div className="flex items-center gap-3 text-xs font-medium text-slate-600 flex-wrap">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`hover:text-slate-900 ${
                  statusFilter === 'all' ? 'font-bold text-slate-900 underline underline-offset-4' : ''
                }`}
              >
                All <span className="text-slate-400">({counts.all})</span>
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => setStatusFilter('published')}
                className={`hover:text-slate-900 ${
                  statusFilter === 'published'
                    ? 'font-bold text-emerald-700 underline underline-offset-4'
                    : ''
                }`}
              >
                Published <span className="text-slate-400">({counts.published})</span>
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => setStatusFilter('draft')}
                className={`hover:text-slate-900 ${
                  statusFilter === 'draft'
                    ? 'font-bold text-amber-700 underline underline-offset-4'
                    : ''
                }`}
              >
                Drafts <span className="text-slate-400">({counts.draft})</span>
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => setStatusFilter('trash')}
                className={`hover:text-slate-900 ${
                  statusFilter === 'trash'
                    ? 'font-bold text-red-600 underline underline-offset-4'
                    : ''
                }`}
              >
                Trash <span className="text-slate-400">({counts.trash})</span>
              </button>
            </div>

            {/* Category Dropdown + Search Box */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                aria-label="Filter by blog category"
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-slate-900"
              >
                <option value="all">All Categories</option>
                {blogCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts..."
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-slate-900 w-48"
                />
              </div>
            </div>
          </div>

          {/* WordPress Posts Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-5">Title</th>
                    <th className="py-3.5 px-4">Author</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Tags</th>
                    <th className="py-3.5 px-4">Date &amp; Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredPosts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        No blog posts found matching your filter. Click &ldquo;Add New Post&rdquo; to write one.
                      </td>
                    </tr>
                  ) : (
                    filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="py-4 px-5 max-w-md">
                          <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openEditPostEditor(post)}
                              className="hover:text-emerald-700 text-left transition-colors"
                            >
                              {post.title}
                            </button>
                            {post.status === 'draft' && (
                              <span className="text-amber-700 font-semibold text-xs">
                                — Draft
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                            /blog/{post.slug}
                          </div>

                          {/* WordPress Row Actions */}
                          <div className="flex items-center gap-2.5 mt-2 text-[11px] font-semibold">
                            <button
                              type="button"
                              onClick={() => openEditPostEditor(post)}
                              className="text-emerald-700 hover:underline flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" /> Edit
                            </button>
                            <span className="text-slate-300">|</span>
                            {post.status !== 'trash' ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateBlogPost(post.id, {
                                      status: post.status === 'published' ? 'draft' : 'published',
                                    })
                                  }
                                  className="text-slate-600 hover:text-slate-900 hover:underline"
                                >
                                  {post.status === 'published' ? 'Switch to Draft' : 'Publish Now'}
                                </button>
                                <span className="text-slate-300">|</span>
                                {onViewPostOnFrontend && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => onViewPostOnFrontend(post.slug)}
                                      className="text-indigo-600 hover:underline flex items-center gap-1"
                                    >
                                      <Eye className="w-3 h-3" /> View
                                    </button>
                                    <span className="text-slate-300">|</span>
                                  </>
                                )}
                                <button
                                  type="button"
                                  onClick={() => deleteBlogPost(post.id, false)}
                                  className="text-red-600 hover:underline flex items-center gap-1"
                                >
                                  <Trash2 className="w-3 h-3" /> Trash
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() => updateBlogPost(post.id, { status: 'draft' })}
                                  className="text-emerald-700 hover:underline flex items-center gap-1"
                                >
                                  <RotateCcw className="w-3 h-3" /> Restore
                                </button>
                                <span className="text-slate-300">|</span>
                                <button
                                  type="button"
                                  onClick={() => deleteBlogPost(post.id, true)}
                                  className="text-red-600 hover:underline flex items-center gap-1"
                                >
                                  <Trash2 className="w-3 h-3" /> Delete Permanently
                                </button>
                              </>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-4 text-slate-600">{post.author}</td>

                        <td className="py-4 px-4 text-slate-700 font-medium">{post.category}</td>

                        <td className="py-4 px-4 text-slate-500">
                          {post.tags && post.tags.length > 0 ? post.tags.join(', ') : '—'}
                        </td>

                        <td className="py-4 px-4 text-slate-500">
                          <div className="font-medium text-slate-800 capitalize">{post.status}</div>
                          <div className="text-[11px] font-mono text-slate-400">
                            {post.updatedAt.slice(0, 10)}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 2: WORDPRESS 2-COLUMN POST EDITOR */}
      {screen === 'editor' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setScreen('all_posts')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to All Posts
            </button>

            {saveNotice && (
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{saveNotice}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT MAIN COLUMN (8 cols): Title, Permalink, Visual/Text Editor, Excerpt, SEO */}
            <div className="lg:col-span-8 space-y-5">
              {/* Post Title & Permalink Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    const nextTitle = e.target.value;
                    setTitle(nextTitle);
                    if (!editingPostId && !isEditingSlug) {
                      setSlug(slugify(nextTitle));
                    }
                  }}
                  placeholder="Add title"
                  className="w-full text-xl sm:text-2xl font-bold text-slate-900 placeholder:text-slate-300 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-slate-900"
                />

                {/* WordPress Permalink Bar */}
                <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 px-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-600">Permalink:</span>
                  <span className="font-mono text-slate-500">https://veritas-seo.dev/blog/</span>
                  {isEditingSlug ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(slugify(e.target.value))}
                        className="px-2 py-0.5 text-xs font-mono bg-slate-50 border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => setIsEditingSlug(false)}
                        className="px-2 py-0.5 bg-slate-900 text-white text-[11px] font-semibold rounded"
                      >
                        OK
                      </button>
                    </div>
                  ) : (
                    <>
                      <strong className="font-mono text-emerald-700">
                        {slug || slugify(title) || 'post-slug'}
                      </strong>
                      <button
                        type="button"
                        onClick={() => setIsEditingSlug(true)}
                        className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded transition-colors"
                      >
                        Edit Slug
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* WordPress Content Editor Box (Visual / Plain Text Tabs) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-800">Post Content</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setEditorMode('visual')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        editorMode === 'visual'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Visual Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode('text')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        editorMode === 'text'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Plain Text
                    </button>
                  </div>
                </div>

                {editorMode === 'visual' ? (
                  <RichTextEditor
                    content={content}
                    onChange={(html) => setContent(html)}
                  />
                ) : (
                  <textarea
                    value={htmlToPlainText(content)}
                    onChange={(e) => setContent(plainTextToHtml(e.target.value))}
                    rows={12}
                    placeholder="Write your post in plain text (double Enter for new paragraph)..."
                    className="w-full p-4 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-slate-900 focus:bg-white leading-relaxed"
                  />
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                  <span>Word count: {wordCount} words</span>
                  <span>Estimated reading time: ~{calculatedReadingTime} min read</span>
                </div>
              </div>

              {/* Excerpt Meta Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  Excerpt (Short Summary)
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  placeholder="Write a brief 1-2 sentence summary shown on the blog listing page..."
                  className="w-full p-3 text-xs sm:text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:bg-white"
                />
              </div>

              {/* Simple SEO Settings Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Post SEO Meta Box
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Focus Keyword
                    </label>
                    <input
                      type="text"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="e.g. technical seo audit"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      SEO Title ({(seoTitle || title).length}/60)
                    </label>
                    <input
                      type="text"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder={title || 'SEO Title'}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Meta Description ({(seoDescription || excerpt).length}/160)
                  </label>
                  <textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    rows={2}
                    placeholder={excerpt || 'Enter custom meta description for search engines...'}
                    className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR COLUMN (4 cols): Publish Box, Categories Box, Tags Box */}
            <div className="lg:col-span-4 space-y-5">
              {/* Publish Box */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-2.5 flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Publish
                  </h3>
                  <span className="text-xs font-semibold capitalize text-emerald-700">
                    Status: {status}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600 block">Author</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-slate-900"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleSavePost('draft')}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                    >
                      Save Draft
                    </button>

                    {editingPostId && onViewPostOnFrontend && (
                      <button
                        type="button"
                        onClick={() => onViewPostOnFrontend(slug || slugify(title))}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-indigo-700 font-semibold rounded-xl flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Post
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  {editingPostId ? (
                    <button
                      type="button"
                      onClick={() => {
                        deleteBlogPost(editingPostId, false);
                        setScreen('all_posts');
                      }}
                      className="text-xs font-semibold text-red-600 hover:underline"
                    >
                      Move to Trash
                    </button>
                  ) : (
                    <span />
                  )}

                  <button
                    type="button"
                    onClick={() => handleSavePost('published')}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingPostId ? 'Update Post' : 'Publish Post'}</span>
                  </button>
                </div>
              </div>

              {/* Categories Meta Box */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2.5">
                  Categories
                </h3>

                <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                  {blogCategories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer py-1 px-2 rounded-lg hover:bg-slate-50"
                    >
                      <input
                        type="radio"
                        name="wp_blog_category"
                        checked={category === cat}
                        onChange={() => setCategory(cat)}
                        className="accent-emerald-600"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>

                {/* Inline Add New Category */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5">
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleCreateCategoryInline();
                      }
                    }}
                    placeholder="+ Add New Category"
                    className="flex-1 px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900"
                  />
                  <button
                    type="button"
                    onClick={handleCreateCategoryInline}
                    className="px-2.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Tags Meta Box */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2.5">
                  Tags
                </h3>

                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Add tags separated with commas"
                    className="flex-1 px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
                  >
                    Add
                  </button>
                </div>

                {tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg"
                      >
                        <Tag className="w-3 h-3 text-slate-400" />
                        <span>{t}</span>
                        <button
                          type="button"
                          onClick={() => setTags(tags.filter((item) => item !== t))}
                          className="text-slate-400 hover:text-red-600 ml-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 3: WORDPRESS BLOG CATEGORIES SCREEN */}
      {screen === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left: Add New Category */}
          <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900">Add New Blog Category</h2>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Category Name</label>
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Technical Case Studies"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
              />
            </div>
            <button
              type="button"
              onClick={handleCreateCategoryInline}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
            >
              Add New Category
            </button>
          </div>

          {/* Right: Existing Categories Table */}
          <div className="md:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-5">Category Name</th>
                  <th className="py-3.5 px-4">Slug</th>
                  <th className="py-3.5 px-4">Posts Count</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogCategories.map((cat) => {
                  const postCount = blogPosts.filter(
                    (p) => p.category === cat && p.status !== 'trash'
                  ).length;
                  return (
                    <tr key={cat} className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-5 font-bold text-slate-900">{cat}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">{slugify(cat)}</td>
                      <td className="py-3.5 px-4 text-slate-600">{postCount} posts</td>
                      <td className="py-3.5 px-4 text-right">
                        {blogCategories.length > 1 && (
                          <button
                            type="button"
                            onClick={() => deleteBlogCategory(cat)}
                            className="text-red-600 hover:underline font-semibold"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
