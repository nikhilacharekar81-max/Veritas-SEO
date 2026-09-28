import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function generateId(prefix: string): string {
  const randomPart = Math.random().toString(36).substring(2, 9);
  const timePart = Date.now().toString(36).slice(-4);
  return `${prefix}_${timePart}${randomPart}`;
}

export function formatTimestamp(iso: string): string {
  try {
    const date = new Date(iso);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  } catch {
    return iso;
  }
}

/**
 * Unescapes accidentally escaped HTML formatting tags and preserves multi-paragraph / line-break spacing
 * so HTML is always rendered visually with proper paragraph separation.
 */
export function normalizeRichHtml(input: string): string {
  if (!input) return '';
  let str = input;

  // Unescape double-escaped HTML entities if present (up to 2 passes)
  for (let i = 0; i < 2; i++) {
    if (str.includes('&lt;') || str.includes('&gt;') || str.includes('&amp;lt;')) {
      str = str
        .replace(/&amp;lt;/g, '<')
        .replace(/&amp;gt;/g, '>')
        .replace(/&amp;quot;/g, '"')
        .replace(
          /&lt;(\/?(?:p|strong|b|em|i|u|s|span|div|h[1-6]|ul|ol|li|br|code|blockquote|hr)(?:\s[^&]*?)?)&gt;/gi,
          '<$1>'
        );
    }
  }

  // Convert empty <p></p> (created when user presses Enter for blank lines in TipTap)
  // into <p><br></p> so browsers always render the vertical blank line height
  str = str.replace(/<p>\s*<\/p>/gi, '<p><br></p>');

  // If the string has no HTML block tags at all but contains raw newlines (\n),
  // convert double newlines into <p> paragraphs and single newlines into <br>
  const hasBlockTags = /<(?:p|div|ul|ol|li|h[1-6]|blockquote|br)[\s/>]/i.test(str);
  if (!hasBlockTags && str.includes('\n')) {
    const paragraphs = str.split(/\n{2,}/);
    if (paragraphs.length > 1) {
      str = paragraphs
        .map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
        .join('');
    } else {
      str = str.replace(/\n/g, '<br>');
    }
  }

  // Only strip a single outer <p>...</p> wrapper if there is just 1 paragraph and no inner <br>
  const pCount = (str.match(/<p[\s>]/gi) || []).length;
  if (
    pCount === 1 &&
    str.trim().startsWith('<p>') &&
    str.trim().endsWith('</p>') &&
    !/<br\s*\/?>/i.test(str)
  ) {
    str = str.trim().slice(3, -4);
  }

  return str;
}

/**
 * Converts plain text (with single and double newlines) into clean HTML paragraphs and line breaks
 */
export function plainTextToHtml(plain: string): string {
  if (!plain) return '';
  if (!plain.includes('\n')) return plain;
  const paragraphs = plain.split(/\n{2,}/);
  if (paragraphs.length > 1) {
    return paragraphs
      .map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
      .join('');
  }
  return plain.replace(/\n/g, '<br>');
}

/**
 * Converts HTML string to clean plain text while preserving paragraph breaks (\n\n) and line breaks (\n)
 */
export function htmlToPlainText(input: string): string {
  if (!input) return '';
  let str = input;
  // Unescape any escaped tags first
  for (let i = 0; i < 2; i++) {
    if (str.includes('&lt;') || str.includes('&gt;')) {
      str = str
        .replace(/&lt;(\/?(?:p|strong|b|em|i|u|s|span|div|h[1-6]|ul|ol|li|br|code|blockquote|hr)(?:\s[^&]*?)?)&gt;/gi, '<$1>');
    }
  }

  return str
    .replace(/<p>\s*(?:<br\s*\/?>)?\s*<\/p>/gi, '\n\n')
    .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
    .replace(/<\/h[1-6]>\s*<p[^>]*>/gi, '\n\n')
    .replace(/<\/div>\s*<div[^>]*>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/li>\s*<li[^>]*>/gi, '\n• ')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

