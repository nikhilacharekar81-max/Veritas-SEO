import Decimal from 'decimal.js';

// Configure Decimal.js precision
Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });

/**
 * Approximate Google Desktop and Mobile character pixel width map
 * Based on Google's standard Arial / Roboto rendering for SERP snippets
 */
const CHAR_WIDTH_MAP_DESKTOP: Record<string, number> = {
  ' ': 4,
  'i': 4,
  'l': 4,
  'I': 4,
  'j': 4,
  't': 5,
  'f': 5,
  'r': 5,
  's': 6,
  'c': 6,
  'z': 6,
  'a': 7,
  'e': 7,
  'g': 7,
  'n': 7,
  'o': 7,
  'u': 7,
  'v': 7,
  'x': 7,
  'y': 7,
  'b': 8,
  'd': 8,
  'h': 8,
  'k': 8,
  'p': 8,
  'q': 8,
  'A': 8,
  'B': 8,
  'C': 8,
  'E': 8,
  'F': 8,
  'G': 9,
  'H': 9,
  'J': 7,
  'K': 8,
  'L': 7,
  'N': 9,
  'O': 9,
  'P': 8,
  'Q': 9,
  'R': 8,
  'S': 8,
  'T': 8,
  'U': 9,
  'V': 8,
  'X': 8,
  'Y': 8,
  'Z': 8,
  'm': 11,
  'w': 10,
  'M': 11,
  'W': 12,
  'D': 9,
  '-': 5,
  '|': 4,
  ':': 4,
  '.': 4,
  ',': 4,
  '&': 9,
  '!': 4,
  '?': 7,
  '/': 5,
  '(': 5,
  ')': 5,
};

/**
 * Calculates exact pixel width of text for SERP title/desc simulation using Decimal.js
 */
export function calculatePixelWidth(
  text: string,
  fontSizePx = 18,
  isMobile = false
): { pixelWidth: number; isTruncated: boolean; maxAllowed: number; percentage: number } {
  if (!text) {
    return { pixelWidth: 0, isTruncated: false, maxAllowed: isMobile ? 540 : 580, percentage: 0 };
  }

  const baseFontScale = new Decimal(fontSizePx).dividedBy(18);
  const mobileScale = isMobile ? new Decimal(0.92) : new Decimal(1.0);

  let totalWidth = new Decimal(0);

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const rawCharWidth = CHAR_WIDTH_MAP_DESKTOP[char] !== undefined ? CHAR_WIDTH_MAP_DESKTOP[char] : 7.5;
    const scaledCharWidth = new Decimal(rawCharWidth)
      .times(baseFontScale)
      .times(mobileScale);
    totalWidth = totalWidth.plus(scaledCharWidth);
  }

  const maxAllowed = isMobile ? (fontSizePx > 15 ? 540 : 860) : (fontSizePx > 15 ? 580 : 920);
  const maxAllowedDec = new Decimal(maxAllowed);
  const pixelWidth = Math.round(totalWidth.toNumber());
  const isTruncated = totalWidth.greaterThan(maxAllowedDec);
  const percentage = Math.min(
    100,
    Math.round(totalWidth.dividedBy(maxAllowedDec).times(100).toNumber())
  );

  return {
    pixelWidth,
    isTruncated,
    maxAllowed,
    percentage,
  };
}

/**
 * Stop words list for keyword density analysis
 */
export const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'can\'t', 'cannot',
  'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each',
  'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d',
  'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i',
  'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s',
  'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or',
  'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll',
  'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve',
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll',
  'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which',
  'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d',
  'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
]);

// Add to seo-math.ts

export function calculateUniformity(positions: number[], textLength: number): number {
  if (positions.length <= 1) return 1;
  // Measures spread across the document length (0 to 1)
  const normalizedPositions = positions.map(p => p / textLength);
  const mean = normalizedPositions.reduce((a, b) => a + b, 0) / normalizedPositions.length;
  const variance = normalizedPositions.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / normalizedPositions.length;
  // Uniformity = 1 - standard deviation
  return Math.max(0, Math.min(1, 1 - Math.sqrt(variance) * 2));
}

export interface KeywordDensityItem {
  phrase: string;
  count: number;
  density: number; 
  ngram: number; 
  isOverOptimized: boolean;
  isTarget?: boolean;
  prominence: number; // New: count * phrase length
}


/**
 * Calculates keyword density using exact Decimal.js math
 */
export function calculateKeywordDensity(
  text: string,
  targetKeyword = '',
  includeStopWords = false,
  minOccurrence = 2
): {
  totalWords: number;
  uniqueWords: number;
  charCount: number;
  readingTimeMinutes: number;
  targetMetrics?: KeywordDensityItem & { positions: number[] };
  top1Grams: KeywordDensityItem[];
  top2Grams: KeywordDensityItem[];
  top3Grams: KeywordDensityItem[];
  top4Grams: KeywordDensityItem[];
} {
  const cleanText = text.trim();
  if (!cleanText) {
    return {
      totalWords: 0,
      uniqueWords: 0,
      charCount: 0,
      readingTimeMinutes: 0,
      top1Grams: [],
      top2Grams: [],
      top3Grams: [],
      top4Grams: [],
    };
  }

  const rawWords = cleanText
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !/^\d+$/.test(w));

  const totalWords = rawWords.length;
  const totalWordsDec = new Decimal(Math.max(1, totalWords));

  // ... (Count grams logic remains same)
  // [KEEP EXISTING GRAM COUNTING LOGIC]
  const oneGramCounts = new Map<string, number>();
  for (const word of rawWords) {
    if (!includeStopWords && STOP_WORDS.has(word)) continue;
    oneGramCounts.set(word, (oneGramCounts.get(word) || 0) + 1);
  }
  const twoGramCounts = new Map<string, number>();
  for (let i = 0; i < rawWords.length - 1; i++) {
    const w1 = rawWords[i];
    const w2 = rawWords[i + 1];
    if (!includeStopWords && (STOP_WORDS.has(w1) && STOP_WORDS.has(w2))) continue;
    const phrase = `${w1} ${w2}`;
    twoGramCounts.set(phrase, (twoGramCounts.get(phrase) || 0) + 1);
  }
  const threeGramCounts = new Map<string, number>();
  for (let i = 0; i < rawWords.length - 2; i++) {
    const w1 = rawWords[i];
    const w2 = rawWords[i + 1];
    const w3 = rawWords[i + 2];
    if (!includeStopWords && STOP_WORDS.has(w1) && STOP_WORDS.has(w2) && STOP_WORDS.has(w3)) continue;
    const phrase = `${w1} ${w2} ${w3}`;
    threeGramCounts.set(phrase, (threeGramCounts.get(phrase) || 0) + 1);
  }
  const fourGramCounts = new Map<string, number>();
  for (let i = 0; i < rawWords.length - 3; i++) {
    const w1 = rawWords[i];
    const w2 = rawWords[i + 1];
    const w3 = rawWords[i + 2];
    const w4 = rawWords[i + 3];
    if (!includeStopWords && STOP_WORDS.has(w1) && STOP_WORDS.has(w2) && STOP_WORDS.has(w3) && STOP_WORDS.has(w4)) continue;
    const phrase = `${w1} ${w2} ${w3} ${w4}`;
    fourGramCounts.set(phrase, (fourGramCounts.get(phrase) || 0) + 1);
  }
  const formatDensity = (countsMap: Map<string, number>, ngram: number): KeywordDensityItem[] => {
    const list: KeywordDensityItem[] = [];
    countsMap.forEach((count, phrase) => {
      if (count >= minOccurrence) {
        const densityDec = new Decimal(count)
          .times(ngram)
          .dividedBy(totalWordsDec)
          .times(100);
        const density = Number(densityDec.toFixed(2));
        const isOverOptimized = density > (ngram === 1 ? 3.5 : ngram === 2 ? 2.5 : 1.8);
        const prominence = count * phrase.length;
        list.push({ phrase, count, density, ngram, isOverOptimized, prominence });
      }
    });
    return list.sort((a, b) => b.prominence - a.prominence).slice(0, 15);
  };
  const top1Grams = formatDensity(oneGramCounts, 1);
  const top2Grams = formatDensity(twoGramCounts, 2);
  const top3Grams = formatDensity(threeGramCounts, 3);
  // ... (Keep grams logic)

  let targetMetrics: (KeywordDensityItem & { positions: number[] }) | undefined;
  if (targetKeyword.trim()) {
    const normTarget = targetKeyword.toLowerCase().trim();
    const targetWords = normTarget.split(/\s+/).length;
    let targetCount = 0;
    const positions: number[] = [];

    const regex = new RegExp(`\\b${normTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    let match;
    while ((match = regex.exec(cleanText)) !== null) {
        targetCount++;
        positions.push(match.index);
    }

    const densityDec = new Decimal(targetCount)
      .times(targetWords)
      .dividedBy(totalWordsDec)
      .times(100);
    const density = Number(densityDec.toFixed(2));

    targetMetrics = {
      phrase: targetKeyword,
      count: targetCount,
      density,
      ngram: targetWords,
      isOverOptimized: density > (targetWords === 1 ? 3.0 : 2.2),
      isTarget: true,
      positions,
      prominence: targetCount * targetKeyword.length
    };
  }

  const readingTimeMinutes = Math.max(1, Math.ceil(totalWords / 200));

  return {
    totalWords,
    uniqueWords: oneGramCounts.size,
    charCount: cleanText.length,
    readingTimeMinutes,
    targetMetrics,
    top1Grams,
    top2Grams,
    top3Grams,
    top4Grams: formatDensity(fourGramCounts, 4),
  };
}

/**
 * Computes Flesch-Kincaid Reading Ease & Grade Level with Decimal.js
 */
export function calculateReadability(text: string): {
  fleschReadingEase: number;
  fleschGradeLevel: number;
  readingEaseLabel: string;
  totalSentences: number;
  totalWords: number;
  totalSyllables: number;
} {
  const clean = text.trim();
  if (!clean) {
    return {
      fleschReadingEase: 0,
      fleschGradeLevel: 0,
      readingEaseLabel: 'No text provided',
      totalSentences: 0,
      totalWords: 0,
      totalSyllables: 0,
    };
  }

  const sentences = clean.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const totalSentences = Math.max(1, sentences.length);

  const words = clean
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 0);
  const totalWords = Math.max(1, words.length);

  const countSyllablesInWord = (word: string): number => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
    word = word.replace(/^y/, '');
    const syl = word.match(/[aeiouy]{1,2}/g);
    return syl ? Math.max(1, syl.length) : 1;
  };

  let totalSyllables = 0;
  for (const w of words) {
    totalSyllables += countSyllablesInWord(w);
  }

  const wordsDec = new Decimal(totalWords);
  const sentencesDec = new Decimal(totalSentences);
  const syllablesDec = new Decimal(totalSyllables);

  // Flesch Reading Ease formula: 206.835 - (1.015 * (total_words / total_sentences)) - (84.6 * (total_syllables / total_words))
  const wordsPerSentence = wordsDec.dividedBy(sentencesDec);
  const syllablesPerWord = syllablesDec.dividedBy(wordsDec);

  const easeDec = new Decimal(206.835)
    .minus(new Decimal(1.015).times(wordsPerSentence))
    .minus(new Decimal(84.6).times(syllablesPerWord));

  // Flesch-Kincaid Grade Level: (0.39 * (total_words / total_sentences)) + (11.8 * (total_syllables / total_words)) - 15.59
  const gradeDec = new Decimal(0.39)
    .times(wordsPerSentence)
    .plus(new Decimal(11.8).times(syllablesPerWord))
    .minus(15.59);

  const fleschReadingEase = Math.max(0, Math.min(100, Math.round(easeDec.toNumber())));
  const fleschGradeLevel = Math.max(1, Number(gradeDec.toFixed(1)));

  let readingEaseLabel = 'Very Difficult (Post-Graduate)';
  if (fleschReadingEase >= 90) readingEaseLabel = 'Very Easy (5th Grade)';
  else if (fleschReadingEase >= 80) readingEaseLabel = 'Easy (6th Grade)';
  else if (fleschReadingEase >= 70) readingEaseLabel = 'Fairly Easy (7th Grade)';
  else if (fleschReadingEase >= 60) readingEaseLabel = 'Standard (8th-9th Grade)';
  else if (fleschReadingEase >= 50) readingEaseLabel = 'Fairly Difficult (10th-12th Grade)';
  else if (fleschReadingEase >= 30) readingEaseLabel = 'Difficult (College Level)';

  return {
    fleschReadingEase,
    fleschGradeLevel,
    readingEaseLabel,
    totalSentences,
    totalWords,
    totalSyllables,
  };
}

/**
 * On-Page SEO Health Scoring algorithm (0 to 100)
 */
export interface SeoHealthAuditResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  issues: { type: 'critical' | 'warning' | 'pass'; message: string; pointsLost: number }[];
  passedChecks: number;
  totalChecks: number;
}

export function evaluateOnPageSeoHealth(item: {
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  description?: string;
  shortSummary?: string;
  faqsCount?: number;
  stepsCount?: number;
  howItWorks?: string;
  formulaMethodology?: string;
  ogImage?: string;
}): SeoHealthAuditResult {
  let score = new Decimal(100);
  const issues: { type: 'critical' | 'warning' | 'pass'; message: string; pointsLost: number }[] = [];
  let passedChecks = 0;
  let totalChecks = 0;

  const check = (
    condition: boolean,
    type: 'critical' | 'warning',
    failMsg: string,
    passMsg: string,
    penalty: number
  ) => {
    totalChecks++;
    if (condition) {
      passedChecks++;
      issues.push({ type: 'pass', message: passMsg, pointsLost: 0 });
    } else {
      score = score.minus(penalty);
      issues.push({ type, message: failMsg, pointsLost: penalty });
    }
  };

  const metaTitle = item.metaTitle || item.title || '';
  const metaDesc = item.metaDescription || item.shortSummary || item.description || '';
  const content = `${item.howItWorks || ''} ${item.formulaMethodology || ''} ${item.description || ''}`;

  // 1. Meta Title length (35-65 chars)
  check(
    metaTitle.length >= 30 && metaTitle.length <= 65,
    'critical',
    `Meta Title length is ${metaTitle.length} chars (ideal: 30–65 chars / <580px)`,
    `Meta Title length is optimal (${metaTitle.length} chars)`,
    18
  );

  // 2. Meta Description length (110-160 chars)
  check(
    metaDesc.length >= 100 && metaDesc.length <= 165,
    'critical',
    `Meta Description is ${metaDesc.length} chars (ideal: 110–160 chars / <920px)`,
    `Meta Description length is optimal (${metaDesc.length} chars)`,
    18
  );

  // 3. Focus Keyword check
  if (item.focusKeyword && item.focusKeyword.trim()) {
    const kw = item.focusKeyword.toLowerCase().trim();
    check(
      metaTitle.toLowerCase().includes(kw),
      'warning',
      `Focus keyword "${item.focusKeyword}" is missing from the Meta Title`,
      `Focus keyword is present in the Meta Title`,
      12
    );
    check(
      metaDesc.toLowerCase().includes(kw),
      'warning',
      `Focus keyword "${item.focusKeyword}" is missing from the Meta Description`,
      `Focus keyword is present in the Meta Description`,
      10
    );
  } else {
    check(
      false,
      'warning',
      'No primary focus keyword assigned for target search intent',
      'Focus keyword specified',
      8
    );
  }

  // 4. Content depth / Educational guide
  check(
    content.length > 120,
    'warning',
    'Educational content / description is brief (under 120 chars)',
    'Rich educational & methodology content provided',
    14
  );

  // 5. FAQ Page Schema presence
  if (item.faqsCount !== undefined) {
    check(
      item.faqsCount >= 2,
      'warning',
      `Has only ${item.faqsCount} FAQs (recommend at least 2 for rich snippet eligibility)`,
      `Contains ${item.faqsCount} FAQ items for Schema.org FAQPage eligibility`,
      12
    );
  }

  // 6. OpenGraph Asset
  check(
    Boolean(item.ogImage && item.ogImage.startsWith('http')),
    'warning',
    'Missing high-resolution OpenGraph image URL for social previews',
    'Valid OpenGraph image configured',
    8
  );

  // 7. Canonical URL
  check(
    Boolean(item.canonicalUrl && item.canonicalUrl.length > 0),
    'warning',
    'Custom canonical URL is not explicitly configured',
    'Canonical URL tag verified',
    8
  );

  const finalScore = Math.max(0, Math.min(100, Math.round(score.toNumber())));

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' = 'F';
  if (finalScore >= 95) grade = 'A+';
  else if (finalScore >= 85) grade = 'A';
  else if (finalScore >= 75) grade = 'B';
  else if (finalScore >= 60) grade = 'C';
  else if (finalScore >= 45) grade = 'D';

  return {
    score: finalScore,
    grade,
    issues,
    passedChecks,
    totalChecks,
  };
}
