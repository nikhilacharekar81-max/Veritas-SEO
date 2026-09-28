'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { normalizeRichHtml } from '../../lib/utils';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  CornerDownLeft,
  ArrowDownUp,
  Minus,
  Code,
  Undo,
  Redo,
} from 'lucide-react';

interface Props {
  content: string;
  onChange: (html: string) => void;
}

export const RichTextEditor: React.FC<Props> = ({ content, onChange }) => {
  const cleanedInitial = normalizeRichHtml(content);

  const editor = useEditor({
    extensions: [StarterKit],
    content: cleanedInitial,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Preserve empty paragraphs (<p></p> -> <p><br></p>) so blank lines & paragraph breaks stay intact
      const rawHtml = editor.getHTML().replace(/<p>\s*<\/p>/gi, '<p><br></p>');
      onChange(rawHtml);
    },
  });

  // Sync external content changes only when editor is not focused
  useEffect(() => {
    if (!editor || editor.isFocused) return;
    const normalizedIncoming = normalizeRichHtml(content);
    const currentNormalized = normalizeRichHtml(editor.getHTML());
    if (normalizedIncoming !== currentNormalized) {
      editor.commands.setContent(normalizedIncoming, { emitUpdate: false });
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-2xs">
      {/* Formatting & Spacing Toolbar */}
      <div className="flex items-center justify-between gap-1.5 px-3 py-2 bg-slate-50 border-b border-slate-200 flex-wrap">
        <div className="flex items-center gap-1 flex-wrap">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1 font-semibold ${
              editor.isActive('bold')
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-200/70'
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-3.5 h-3.5" />
            <span>Bold</span>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1 font-semibold ${
              editor.isActive('italic')
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-200/70'
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-3.5 h-3.5" />
            <span>Italic</span>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1 font-semibold ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-200/70'
            }`}
            title="Heading 2"
          >
            <Heading2 className="w-3.5 h-3.5" />
            <span>H2</span>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1 font-semibold ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-200/70'
            }`}
            title="Heading 3"
          >
            <Heading3 className="w-3.5 h-3.5" />
            <span>H3</span>
          </button>

          <div className="h-4 w-px bg-slate-200 mx-0.5" />

          {/* Line Break & Paragraph Spacing Controls */}
          <button
            type="button"
            onClick={() => editor.chain().focus().setHardBreak().run()}
            className="px-2 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80"
            title="Insert Line Break (Shift+Enter)"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
            <span>Line Break</span>
          </button>

          <button
            type="button"
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertContent('<p><br></p><p></p>')
                .run()
            }
            className="px-2 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80"
            title="Insert Blank Spacer Line Between Paragraphs"
          >
            <ArrowDownUp className="w-3.5 h-3.5" />
            <span>+ Blank Line</span>
          </button>

          <div className="h-4 w-px bg-slate-200 mx-0.5" />

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-2 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1 font-semibold ${
              editor.isActive('bulletList')
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-200/70'
            }`}
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
            <span>Bullets</span>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-2 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1 font-semibold ${
              editor.isActive('orderedList')
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-200/70'
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Numbered</span>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`px-2 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1 font-semibold ${
              editor.isActive('blockquote')
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-200/70'
            }`}
            title="Quote Block"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="px-2 py-1.5 text-xs rounded-lg text-slate-700 hover:bg-slate-200/70 font-semibold flex items-center gap-1"
            title="Insert Horizontal Divider"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`px-2 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1 font-semibold ${
              editor.isActive('code')
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-200/70'
            }`}
            title="Inline Code"
          >
            <Code className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-200 mx-0.5" />

          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            className="p-1.5 text-xs rounded-lg text-slate-600 hover:bg-slate-200/70"
            title="Undo"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            className="p-1.5 text-xs rounded-lg text-slate-600 hover:bg-slate-200/70"
            title="Redo"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="px-3 py-1.5 bg-slate-50/60 border-b border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          Press <strong>Enter</strong> for a new paragraph · <strong>Shift + Enter</strong> for a single line break · Use <strong>+ Blank Line</strong> for extra vertical spacing
        </span>
      </div>

      <div className="p-4">
        <EditorContent
          editor={editor}
          className="veritas-rich-content min-h-[150px] text-sm text-slate-900 focus:outline-none [&_.ProseMirror]:min-h-[150px] [&_.ProseMirror]:outline-none"
        />
      </div>
    </div>
  );
};
