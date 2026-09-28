'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { useCms } from '../../lib/store';
import { normalizeRichHtml, htmlToPlainText, plainTextToHtml } from '../../lib/utils';
import { Edit3, Check, X, RotateCcw, Sparkles, Type } from 'lucide-react';

const RichTextEditor = dynamic(
  () => import('../admin/RichTextEditor').then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="p-6 text-center text-slate-400 font-mono text-xs animate-pulse">
        Loading Rich Visual Editor...
      </div>
    ),
  }
);

interface Props {
  /** Key in global contentBlocks registry */
  blockKey?: string;
  /** Default fallback string if blockKey is used */
  defaultContent?: string;
  /** Controlled value (for Tool/Category fields like title, summary, FAQs) */
  value?: string;
  /** Controlled save callback */
  onSave?: (newValue: string) => void;
  /** Optional className for wrapper */
  className?: string;
  /** Render as inline span or block div */
  as?: 'span' | 'div' | 'p';
  /** Human-readable label shown in the Content Editor modal */
  label?: string;
  /** Use multiline textarea by default */
  multiline?: boolean;
  /** Deprecated prop kept for compatibility */
  allowHtml?: boolean;
}

export const EditableText: React.FC<Props> = memo(({
  blockKey,
  defaultContent = '',
  value,
  onSave,
  className = '',
  as: Component = 'span',
  label,
  multiline = false,
}) => {
  const { getContentBlock, setContentBlock, isFrontendEditMode } = useCms();

  const rawResolved =
    value !== undefined
      ? value
      : blockKey
      ? getContentBlock(blockKey) || defaultContent
      : defaultContent;

  // Normalize so raw/escaped HTML tags render visually without breaking
  const resolvedContent = normalizeRichHtml(rawResolved);

  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [plainDraft, setPlainDraft] = useState('');
  const [editorTab, setEditorTab] = useState<'rich' | 'quick'>('rich');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openEditor = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDraft(resolvedContent);
      setPlainDraft(htmlToPlainText(resolvedContent));
      setIsOpen(true);
    },
    [resolvedContent]
  );

  const handleSave = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const cleaned = normalizeRichHtml(draft);
    if (onSave) {
      onSave(cleaned);
    } else if (blockKey) {
      setContentBlock(blockKey, cleaned);
    }
    setIsOpen(false);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    const fallback = normalizeRichHtml(defaultContent || resolvedContent);
    setDraft(fallback);
    setPlainDraft(htmlToPlainText(fallback));
    if (onSave) {
      onSave(fallback);
    } else if (blockKey) {
      setContentBlock(blockKey, fallback);
    }
    setIsOpen(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const modalPortal =
    isOpen && mounted
      ? createPortal(
          <div
            onClick={handleCancel}
            className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">
                      Live Front-End Content Editor
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {label || blockKey || 'Edit Page Content'}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Editor Mode Switcher */}
              <div className="px-6 pt-4 pb-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEditorTab('rich')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      editorTab === 'rich'
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Rich Visual Editor</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPlainDraft(htmlToPlainText(draft));
                      setEditorTab('quick');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      editorTab === 'quick'
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Type className="w-3.5 h-3.5" />
                    <span>Quick Plain Text Editor</span>
                  </button>
                </div>

                {blockKey && (
                  <span className="text-[11px] font-mono text-slate-400">
                    Block: <strong className="text-slate-700">{blockKey}</strong>
                  </span>
                )}
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                {editorTab === 'quick' ? (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span>Plain Text Copy (Press Enter once for line break, twice for new paragraph)</span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {plainDraft.length} characters
                      </span>
                    </label>
                    <textarea
                      value={plainDraft}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPlainDraft(val);
                        setDraft(plainTextToHtml(val));
                      }}
                      onKeyDown={(e) => {
                        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleSave(e);
                        if (e.key === 'Escape') handleCancel(e as unknown as React.MouseEvent);
                      }}
                      rows={multiline || plainDraft.length > 70 ? 6 : 3}
                      autoFocus
                      className="w-full p-3.5 text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white leading-relaxed"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">
                      Rich Visual Formatting &amp; Paragraph Spacing
                    </label>
                    <RichTextEditor
                      content={draft}
                      onChange={(html) => {
                        setDraft(html);
                        setPlainDraft(htmlToPlainText(html));
                      }}
                    />
                  </div>
                )}

                {/* Live Rendered Front-End Preview */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Live Front-End Preview
                  </span>
                  <div
                    className="veritas-rich-content text-sm text-slate-900 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: normalizeRichHtml(draft) || '<em>Empty content</em>',
                    }}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 flex-wrap">
                <div>
                  {defaultContent && normalizeRichHtml(draft) !== normalizeRichHtml(defaultContent) && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset to Default
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Check className="w-4 h-4" /> Save &amp; Apply Content
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <Component className={`group/editable relative inline ${className}`}>
        <span
          className="veritas-rich-content inline"
          dangerouslySetInnerHTML={{ __html: resolvedContent }}
        />

        {isFrontendEditMode && (
          <span
            role="button"
            tabIndex={0}
            onClick={openEditor}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') openEditor(e as unknown as React.MouseEvent);
            }}
            title={`Edit ${label || blockKey || 'this content'}`}
            className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs align-middle cursor-pointer select-none transition-all hover:scale-105"
          >
            <Edit3 className="w-2.5 h-2.5" />
            <span>Edit</span>
          </span>
        )}
      </Component>
      {modalPortal}
    </>
  );
});

EditableText.displayName = 'EditableText';
