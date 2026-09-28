import type {
  MainCategory,
  SubCategory,
  SeoTool,
  RedirectRule,
  AuditLogEntry,
  RobotsTxtConfig,
  BlogPost,
} from './schemas';
import { createDefaultSeoMetadata, createDefaultToolInputConfig } from './schemas';

const PRESET_TIMESTAMP = '2026-09-28T00:00:00.000Z';

export const DEMO_PRESET_CATEGORIES: MainCategory[] = [
  {
    id: 'cat_technical_seo',
    name: 'Technical SEO & Crawlability',
    slug: 'technical-seo',
    description: 'Deep technical audits, robots directive validators, HTTP redirect chain checkers, and indexation controls.',
    icon: 'Terminal',
    displayOrder: 1,
    isActive: true,
    seo: {
      ...createDefaultSeoMetadata(
        'Technical SEO Tools & Crawlability Suite | Veritas SEO',
        'Inspect HTTP redirect chains, validate robots.txt rules, simulate search bot user agents, and diagnose indexation bottlenecks.',
        'https://veritas-seo.dev/category/technical-seo'
      ),
      focusKeyword: 'technical seo',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'cat_onpage_content',
    name: 'On-Page & SERP Optimization',
    slug: 'on-page-serp',
    description: 'Pixel-width SERP snippet simulators, keyword density analyzers, Flesch readability grade calculators, and meta tag editors.',
    icon: 'Search',
    displayOrder: 2,
    isActive: true,
    seo: {
      ...createDefaultSeoMetadata(
        'On-Page SEO & Google SERP Simulator Suite | Veritas SEO',
        'Simulate Google Desktop and Mobile SERP title pixel widths, calculate n-gram keyword density, and score Flesch readability levels.',
        'https://veritas-seo.dev/category/on-page-serp'
      ),
      focusKeyword: 'on-page seo',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'cat_schema_structured_data',
    name: 'Structured Data & Schema.org',
    slug: 'structured-data',
    description: 'Enterprise Schema.org JSON-LD builders, Google Rich Results validators, and semantic entity graph generators.',
    icon: 'Code2',
    displayOrder: 3,
    isActive: true,
    seo: {
      ...createDefaultSeoMetadata(
        'Schema.org JSON-LD Generators & Rich Snippet Suite | Veritas SEO',
        'Generate validated JSON-LD structured data for WebApplication, FAQPage, Organization, and BreadcrumbList markup.',
        'https://veritas-seo.dev/category/structured-data'
      ),
      focusKeyword: 'schema json-ld',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
];

export const DEMO_PRESET_SUBCATEGORIES: SubCategory[] = [
  {
    id: 'subcat_serp_preview',
    categoryId: 'cat_onpage_content',
    name: 'SERP & Meta Snippets',
    slug: 'serp-snippets',
    description: 'Simulate search engine results pages with pixel truncation rules and rich snippet previews.',
    displayOrder: 1,
    isActive: true,
    seo: createDefaultSeoMetadata(
      'Google SERP & Meta Snippet Simulators | Veritas SEO',
      'Test title and meta description pixel widths to prevent Google truncation on desktop and mobile displays.'
    ),
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'subcat_content_analysis',
    categoryId: 'cat_onpage_content',
    name: 'Content & Readability',
    slug: 'content-readability',
    description: 'Audit keyword frequencies, n-gram densities, and linguistic readability grades.',
    displayOrder: 2,
    isActive: true,
    seo: createDefaultSeoMetadata(
      'Keyword Density & Readability Auditing | Veritas SEO',
      'Analyze 1-gram, 2-gram, and 3-gram keyword distributions and calculate Flesch-Kincaid grade levels.'
    ),
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'subcat_crawl_directives',
    categoryId: 'cat_technical_seo',
    name: 'Directives & Redirects',
    slug: 'directives-redirects',
    description: 'Inspect status code chains, robots.txt exclusions, and canonical tag integrity.',
    displayOrder: 1,
    isActive: true,
    seo: createDefaultSeoMetadata(
      'Robots Directives & 301 Redirect Inspector | Veritas SEO',
      'Audit 301/302 redirect loops, inspect response headers, and validate robots.txt crawl rules.'
    ),
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'subcat_jsonld_schemas',
    categoryId: 'cat_schema_structured_data',
    name: 'JSON-LD Generators',
    slug: 'jsonld-generators',
    description: 'Build Google-approved schema markup with zero syntax errors.',
    displayOrder: 1,
    isActive: true,
    seo: createDefaultSeoMetadata(
      'Interactive Schema.org JSON-LD Generators | Veritas SEO',
      'Create and validate WebApplication, FAQPage, and BreadcrumbList structured data for search rich snippets.'
    ),
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
];

export const DEMO_PRESET_TOOLS: SeoTool[] = [
  {
    id: 'tool_serp_simulator',
    title: 'Google SERP Pixel Width Simulator',
    slug: 'serp-pixel-simulator',
    shortSummary: 'Preview title and description pixel truncation for Google desktop (580px) and mobile (540px) SERPs in real time.',
    icon: 'MonitorSmartphone',
    badge: 'Popular',
    categoryId: 'cat_onpage_content',
    subCategoryId: 'subcat_serp_preview',
    status: 'published',
    isActive: true,
    displayOrder: 1,
    usageCount: 148,
    engineType: 'serp-pixel-simulator',
    defaultInputConfig: {
      ...createDefaultToolInputConfig(),
      sampleTitle: 'Enterprise Technical SEO Guide: Zero-CLS & Schema.org Architecture',
      sampleDescription:
        'Master enterprise technical SEO with our complete guide on semantic HTML5 hierarchy, schema-dts structured data, and sub-millisecond Core Web Vitals.',
      sampleTargetKeyword: 'enterprise technical seo',
      sampleUrl: 'https://veritas-seo.dev/enterprise-seo-guide',
    },
    educationalContent: {
      howItWorks:
        'Google measures title and meta description boundaries by rendered pixel width rather than raw character counts. Because proportional fonts (like Arial or Roboto) give wider bounding boxes to capital letters and wide glyphs (e.g., "W", "M") than thin letters (e.g., "i", "l"), calculating exact pixel math prevents unwanted truncation on search result pages.',
      formulaMethodology:
        'Desktop Title Limit = 580px max (approx. 55-60 chars). Mobile Title Limit = 540px max. Meta Description Desktop Limit = 920px (approx. 155-160 chars). The calculation uses Decimal.js character width scaling maps derived from Google Chromium layout engine metrics.',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Enter Proposed URL & Title Tag',
          stepDescription: 'Type your title tag and watch the real-time pixel meter. Keep the bar in the green zone (<580px).',
        },
        {
          id: 'step_2',
          stepTitle: 'Craft Compelling Meta Description',
          stepDescription: 'Include primary call-to-actions while maintaining a pixel width below 920px.',
        },
        {
          id: 'step_3',
          stepTitle: 'Toggle Mobile / Desktop & Rich Snippets',
          stepDescription: 'Inspect star ratings, breadcrumbs, and publication dates to verify snippet presentation.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_1',
        question: 'Why does Google truncate titles by pixel width instead of character count?',
        answer:
          'Google renders SERP snippets using a fixed-width container. Since letters like "W" and "M" occupy up to 12 pixels while "i" and "l" occupy only 4 pixels, character counts can be misleading. Pixel width measurement guarantees precision.',
      },
      {
        id: 'faq_2',
        question: 'What happens if my title exceeds 580 pixels?',
        answer:
          'Google will cut off the title with an ellipsis (...) or may dynamically rewrite the title using on-page H1 or OpenGraph tags.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'Google SERP Pixel Width Simulator & Meta Previewer | Veritas SEO',
        'Test Google Desktop and Mobile title and meta description pixel widths with zero layout truncation. Free real-time SERP simulator.',
        'https://veritas-seo.dev/tool/serp-pixel-simulator'
      ),
      focusKeyword: 'serp pixel width simulator',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'tool_keyword_density',
    title: 'Free Online Keyword Density & N-Gram Analyzer',
    slug: 'keyword-density-analyzer',
    shortSummary:
      'Gain deep semantic insights into your text. Analyze word frequencies, multi-word phrases, and visual keyword distribution instantly without leaving your browser.',
    icon: 'Percent',
    badge: 'Pro',
    categoryId: 'cat_onpage_content',
    subCategoryId: 'subcat_content_analysis',
    status: 'published',
    isActive: true,
    displayOrder: 2,
    usageCount: 94,
    engineType: 'keyword-density-analyzer',
    defaultInputConfig: {
      ...createDefaultToolInputConfig(),
      sampleTargetKeyword: 'technical seo',
      sampleBodyText:
        'Technical SEO is the foundation of any enterprise search strategy. By optimizing technical SEO parameters such as crawl budget, canonicalization, and structured data, search bots can index deep content efficiently. When technical SEO audit scores improve, organic visibility scales exponentially.',
    },
    educationalContent: {
      howItWorks:
        'Simple word counters only tell half the story. If you write an article about digital marketing strategies, a basic tool counts "digital," "marketing," and "strategies" as completely separate words. N-Gram analysis looks at 1-Gram (Unigram), 2-Gram (Bigram), 3-Gram (Trigram), and 4-Gram (Quadgram) phrase patterns to uncover natural long-tail phrases, identify unintended word repetition, and align your writing with how modern search engines understand context.',
      formulaMethodology:
        'Prominence Score = Frequency × Phrase Length. Density Percentage = (Total Occurrences × N-Gram Words / Total Words) × 100. Color-Coded Target Diagnostics evaluate Natural (0.5% – 2.5%), High Density (2.5% – 4.0%), and Over-Optimized (> 4.0%) thresholds alongside a 10-segment Live Visual Distribution Map.',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Paste Target Copy',
          stepDescription: 'Insert your drafted article, blog post, or landing page copy into the analyzer text area for 100% client-side processing.',
        },
        {
          id: 'step_2',
          stepTitle: 'Check Live Visual Distribution & Target Diagnostics',
          stepDescription: 'Inspect the 10-segment distribution map and color-coded density status bar to eliminate uneven keyword clustering.',
        },
        {
          id: 'step_3',
          stepTitle: 'Switch N-Gram Tabs & Export',
          stepDescription: 'Audit 1-Gram, 2-Gram, 3-Gram, and 4-Gram phrases ranked by Prominence Score and export your report to CSV.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_1',
        question: 'Does Google penalize high keyword density?',
        answer:
          'Google does not enforce a specific keyword density percentage. However, excessively repeating target keywords (known as keyword stuffing) degrades readability and can trigger algorithmic search penalties. Keeping density under 2.5% ensures natural writing.',
      },
      {
        id: 'faq_2',
        question: 'What is Lexical Diversity and why does it matter?',
        answer:
          'Lexical Diversity measures the variety of unique words used in a document. High lexical diversity indicates rich, descriptive vocabulary, which improves engagement and readability for human readers.',
      },
      {
        id: 'faq_3',
        question: 'How does the Stopword Toggle work?',
        answer:
          'Turning the Stopword Toggle ON filters out common functional words like "the," "and," "is," and "in." This allows you to focus purely on topic-specific search terms and entities.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'Free Keyword Density & N-Gram Analyzer | Real-Time SEO Tool',
        'Analyze text frequency, unigrams, bigrams, and trigrams in real-time. Check keyword placement, lexical diversity, and prevent over-optimization for free.',
        'https://veritas-seo.dev/tool/keyword-density-analyzer'
      ),
      focusKeyword: 'keyword density analyzer',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'tool_schema_jsonld',
    title: 'Schema.org JSON-LD Structured Data Builder',
    slug: 'schema-jsonld-generator',
    shortSummary: 'Generate validated Schema.org JSON-LD for WebApplication, FAQPage, BreadcrumbList, and Organization entities.',
    icon: 'FileJson',
    badge: 'New',
    categoryId: 'cat_schema_structured_data',
    subCategoryId: 'subcat_jsonld_schemas',
    status: 'published',
    isActive: true,
    displayOrder: 3,
    usageCount: 76,
    engineType: 'schema-jsonld-generator',
    defaultInputConfig: createDefaultToolInputConfig(),
    educationalContent: {
      howItWorks:
        'Constructs schema-dts compliant JSON-LD structured data scripts that can be directly embedded into Next.js or HTML5 <head> tags for Google Rich Snippets.',
      formulaMethodology:
        'Implements Google Search Central schema specifications with strict type validation for required properties, IDs, and nested child entities.',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Choose Schema Type',
          stepDescription: 'Select between WebApplication, FAQPage, Breadcrumbs, or Article schemas.',
        },
        {
          id: 'step_2',
          stepTitle: 'Populate Entity Fields',
          stepDescription: 'Fill in required schema properties including URLs, titles, and questions.',
        },
        {
          id: 'step_3',
          stepTitle: 'Copy & Validate',
          stepDescription: 'Copy the generated JSON-LD script and test in Google Rich Results Test.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_1',
        question: 'Why is JSON-LD preferred over Microdata or RDFa?',
        answer:
          'Google officially recommends JSON-LD because it is decoupled from presentation HTML, easier to maintain programmatically, and less prone to syntax errors during template refactors.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'Schema.org JSON-LD Generator & Rich Snippet Builder | Veritas SEO',
        'Build and validate Google-compliant JSON-LD structured data markup for WebApplication, FAQPage, and BreadcrumbList.',
        'https://veritas-seo.dev/tool/schema-jsonld-generator'
      ),
      focusKeyword: 'schema json-ld generator',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'tool_redirect_inspector',
    title: 'HTTP Status & 301 Redirect Chain Inspector',
    slug: 'redirect-chain-inspector',
    shortSummary: 'Simulate and diagnose 301/302 redirect hops, prevent infinite redirect loops, and verify canonical preservation.',
    icon: 'GitFork',
    badge: 'Pro',
    categoryId: 'cat_technical_seo',
    subCategoryId: 'subcat_crawl_directives',
    status: 'published',
    isActive: true,
    displayOrder: 4,
    usageCount: 52,
    engineType: 'redirect-chain-inspector',
    defaultInputConfig: createDefaultToolInputConfig(),
    educationalContent: {
      howItWorks:
        'Analyzes multi-hop HTTP redirect pathways, identifies loss of link equity (PageRank dampening), and flags non-permanent 302/307 status codes.',
      formulaMethodology:
        'Every unnecessary redirect hop adds server latency (TTFB) and risks crawl abandonment. Best practice limits redirect chains to a single direct 301 hop.',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Input Source URL Path',
          stepDescription: 'Provide the legacy URL and subsequent destination hops.',
        },
        {
          id: 'step_2',
          stepTitle: 'Trace Hop Sequence',
          stepDescription: 'Inspect status codes, response headers, and loop warnings.',
        },
        {
          id: 'step_3',
          stepTitle: 'Flatten Chain',
          stepDescription: 'Update CMS rewrite rules to route legacy paths directly to the final 200 OK canonical target.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_1',
        question: 'Does a 301 redirect pass 100% of link equity?',
        answer:
          'Google has confirmed that 301 redirects pass full PageRank without penalty, but long chains (>3 hops) can cause crawlers to drop out before reaching the final URL.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'HTTP Status & 301 Redirect Chain Inspector | Veritas SEO',
        'Inspect multi-hop 301 and 302 redirect chains, detect loops, and eliminate latency bottlenecks.',
        'https://veritas-seo.dev/tool/redirect-chain-inspector'
      ),
      focusKeyword: '301 redirect chain inspector',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'tool_hreflang_matrix',
    title: 'Hreflang Tag Matrix & International SEO Validator',
    slug: 'hreflang-tag-matrix',
    shortSummary: 'Generate validated bidirectional hreflang tags with ISO 639-1 / 3166-1 codes and x-default fallbacks.',
    icon: 'Globe',
    badge: 'New',
    categoryId: 'cat_technical_seo',
    subCategoryId: 'subcat_crawl_directives',
    status: 'published',
    isActive: true,
    displayOrder: 5,
    usageCount: 68,
    engineType: 'hreflang-tag-matrix',
    defaultInputConfig: createDefaultToolInputConfig(),
    educationalContent: {
      howItWorks:
        'Validates bidirectional multi-language and regional alternate URL links to prevent geo-targeting conflicts and duplicate content penalties in Google search results.',
      formulaMethodology:
        'Ensures every target language-region pairing points reciprocally back to all alternates with a global x-default fallback for unmatched geographical users.',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Configure Regional Locales',
          stepDescription: 'Specify ISO language and country codes (e.g. en-US, en-GB, fr-FR, de-DE).',
        },
        {
          id: 'step_2',
          stepTitle: 'Designate x-Default Fallback',
          stepDescription: 'Select the primary global landing page for unmatched visitor locales.',
        },
        {
          id: 'step_3',
          stepTitle: 'Deploy HTML or XML Sitemap',
          stepDescription: 'Copy the generated <link rel="alternate"> HTML or XML sitemap node block.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_1',
        question: 'Why is bidirectional hreflang required by Google?',
        answer:
          'If Page A links to Page B as an alternate, Page B must also link back to Page A. Without bidirectional confirmation, Google ignores the directive to prevent unauthorized third-party claiming.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'Hreflang Tag Matrix & Multi-Region SEO Validator | Veritas SEO',
        'Generate and validate bidirectional hreflang tags with x-default fallbacks and ISO language-region compliance.',
        'https://veritas-seo.dev/tool/hreflang-tag-matrix'
      ),
      focusKeyword: 'hreflang tag validator',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'tool_ctr_forecaster',
    title: 'Google SERP CTR Curve & Traffic Forecaster',
    slug: 'serp-ctr-forecaster',
    shortSummary: 'Forecast monthly organic click growth and Google Ads traffic equity by simulating rank improvements (#1 through #20).',
    icon: 'TrendingUp',
    badge: 'Popular',
    categoryId: 'cat_onpage_content',
    subCategoryId: 'subcat_serp_preview',
    status: 'published',
    isActive: true,
    displayOrder: 6,
    usageCount: 114,
    engineType: 'serp-rank-calculator',
    defaultInputConfig: createDefaultToolInputConfig(),
    educationalContent: {
      howItWorks:
        'Simulates organic click-through distributions based on real-world Search Central empirical CTR models and Google AI Overview (SGE) displacement benchmarks.',
      formulaMethodology:
        'Monthly Clicks = (Search Volume × CTR %) / 100. Organic Traffic Value = Clicks × Avg Equivalent Google Ads Cost-Per-Click ($).',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Enter Monthly Keyword Search Volume',
          stepDescription: 'Input the aggregate monthly search volume for your target keyword topic.',
        },
        {
          id: 'step_2',
          stepTitle: 'Set Current & Target Positions',
          stepDescription: 'Select your current ranking rank (#1–20) and your projected target rank.',
        },
        {
          id: 'step_3',
          stepTitle: 'Review Traffic & Revenue Uplift',
          stepDescription: 'Analyze the estimated monthly click expansion and PPC advertising replacement value.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_1',
        question: 'How do Google AI Overviews impact organic CTR curves?',
        answer:
          'AI Overviews occupy prime real estate above position #1, typically reducing traditional #1 blue link CTR from ~28% down to ~19% while shifting discovery into citation carousels.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'Google SERP CTR Curve & Organic Traffic Forecaster | Veritas SEO',
        'Model organic click distributions, simulate rank progression (#1 to #20), and calculate equivalent PPC value.',
        'https://veritas-seo.dev/tool/serp-ctr-forecaster'
      ),
      focusKeyword: 'serp ctr curve calculator',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'tool_bot_headers',
    title: 'Googlebot & AI Crawler HTTP Header Inspector',
    slug: 'bot-header-inspector',
    shortSummary: 'Simulate and inspect HTTP/2 response headers, X-Robots-Tag, Brotli compression, and CSP rules across bot user-agents.',
    icon: 'Terminal',
    badge: 'Pro',
    categoryId: 'cat_technical_seo',
    subCategoryId: 'subcat_crawl_directives',
    status: 'published',
    isActive: true,
    displayOrder: 7,
    usageCount: 82,
    engineType: 'bot-header-inspector',
    defaultInputConfig: createDefaultToolInputConfig(),
    educationalContent: {
      howItWorks:
        'Simulates crawler requests from Googlebot Smartphone, Bingbot, GPTBot, and Applebot to evaluate HTTP/2 server response headers, compression algorithms, and indexing control headers.',
      formulaMethodology:
        'X-Robots-Tag HTTP headers take precedence over HTML meta robots tags when crawling non-HTML assets (PDFs, images) or verifying server-level indexing permissions.',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Select Target Bot User-Agent',
          stepDescription: 'Choose between Googlebot Mobile, Desktop, Bingbot, GPTBot, or Applebot.',
        },
        {
          id: 'step_2',
          stepTitle: 'Configure Simulated Directives',
          stepDescription: 'Toggle X-Robots-Tag, HSTS Preload, and Content Security Policy headers.',
        },
        {
          id: 'step_3',
          stepTitle: 'Analyze Raw Wire Stream',
          stepDescription: 'Verify HTTP status codes and cache-control directives for optimal crawl efficiency.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_1',
        question: 'What is the advantage of X-Robots-Tag over HTML meta robots?',
        answer:
          'X-Robots-Tag headers can be applied to non-HTML files such as PDFs, images, and API endpoints, allowing webmasters to prevent indexation of media without parsing DOM trees.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'Googlebot HTTP Header Inspector & AI Crawler Sandbox | Veritas SEO',
        'Inspect server response headers, X-Robots-Tag, and bot user-agent rendering for technical SEO audits.',
        'https://veritas-seo.dev/tool/bot-header-inspector'
      ),
      focusKeyword: 'googlebot http header inspector',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'tool_social_cards',
    title: 'Open Graph & Twitter Social Card Studio',
    slug: 'social-card-studio',
    shortSummary: 'Design, preview, and generate Open Graph and Twitter/X card metadata for high-CTR social sharing.',
    icon: 'Share2',
    badge: 'New',
    categoryId: 'cat_onpage_content',
    subCategoryId: 'subcat_serp_preview',
    status: 'published',
    isActive: true,
    displayOrder: 8,
    usageCount: 95,
    engineType: 'social-card-studio',
    defaultInputConfig: createDefaultToolInputConfig(),
    educationalContent: {
      howItWorks:
        'Simulates social feed link unfurling across X (Twitter), Facebook, LinkedIn, Discord, and Slack to optimize visual aspect ratios and prevent truncated headline titles.',
      formulaMethodology:
        'Standard Open Graph image dimensions require 1200×630 pixels with an exact 1.91:1 aspect ratio. Social titles should remain between 30 and 60 characters for complete visibility.',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Specify Target Destination URL',
          stepDescription: 'Input the canonical web address where social clicks should land.',
        },
        {
          id: 'step_2',
          stepTitle: 'Customize Title, Summary & Image',
          stepDescription: 'Provide engaging copy and a high-resolution 1200×630px image URL.',
        },
        {
          id: 'step_3',
          stepTitle: 'Preview & Copy <meta> Tags',
          stepDescription: 'Inspect real-time feed cards and copy standard Open Graph HTML tags into your website <head>.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_1',
        question: 'What is the recommended size for og:image tags?',
        answer:
          '1200×630 pixels (1.91:1 ratio) is the universal standard for Facebook, LinkedIn, X / Twitter Large Cards, Discord, and Slack unfurls.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'Open Graph & Twitter Card Studio | Veritas SEO',
        'Preview and generate Open Graph and Twitter Card tags for Facebook, LinkedIn, Discord, and X.',
        'https://veritas-seo.dev/tool/social-card-studio'
      ),
      focusKeyword: 'open graph social card generator',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'tool_robots_validator',
    title: 'Robots.txt & XML Sitemap Directive Validator',
    slug: 'robots-sitemap-validator',
    shortSummary: 'Test User-Agent crawl permissions, Disallow wildcard rules, and XML Sitemap directives against target URLs.',
    icon: 'Bot',
    badge: 'Popular',
    categoryId: 'cat_technical_seo',
    subCategoryId: 'subcat_crawl_directives',
    status: 'published',
    isActive: true,
    displayOrder: 9,
    usageCount: 89,
    engineType: 'robots-sitemap-validator',
    defaultInputConfig: createDefaultToolInputConfig(),
    educationalContent: {
      howItWorks:
        'Evaluates standard REP (Robots Exclusion Protocol) longest-match precedence rules for Googlebot, Bingbot, and AI crawlers against your target URL paths.',
      formulaMethodology:
        'Google follows longest-path specificity when resolving conflicting Allow and Disallow directives based on character byte length.',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Paste or Edit Robots.txt Rules',
          stepDescription: 'Configure User-agent blocks, Allow/Disallow rules, and Sitemap URLs.',
        },
        {
          id: 'step_2',
          stepTitle: 'Enter Test URL Path',
          stepDescription: 'Specify the relative path you want to test against crawler directives.',
        },
        {
          id: 'step_3',
          stepTitle: 'Verify Crawl Eligibility',
          stepDescription: 'Check whether the target crawler is allowed or blocked and export your validated robots.txt file.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_1',
        question: 'Does robots.txt prevent a URL from being indexed in Google?',
        answer:
          'No. Blocking a URL in robots.txt prevents crawling, but if external pages link to that URL, Google may still index the URL without page content. Use a noindex meta tag or X-Robots-Tag to guarantee de-indexation.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'Robots.txt & XML Sitemap Directive Validator | Veritas SEO',
        'Validate robots.txt Disallow/Allow rules and test Googlebot crawl access in real time.',
        'https://veritas-seo.dev/tool/robots-sitemap-validator'
      ),
      focusKeyword: 'robots txt validator',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'tool_onpage_scorer',
    title: 'On-Page Technical SEO Audit Scorer',
    slug: 'onpage-audit-scorer',
    shortSummary: 'Run a comprehensive 100-point on-page SEO checklist evaluating title tags, H1 hierarchy, keyword placement, and meta directives.',
    icon: 'CheckCircle2',
    badge: 'Pro',
    categoryId: 'cat_onpage_content',
    subCategoryId: 'subcat_content_analysis',
    status: 'published',
    isActive: true,
    displayOrder: 10,
    usageCount: 112,
    engineType: 'onpage-audit-scorer',
    defaultInputConfig: createDefaultToolInputConfig(),
    educationalContent: {
      howItWorks:
        'Audits your page title, meta description, canonical URL, heading hierarchy, and body copy against weighted technical SEO ranking signals.',
      formulaMethodology:
        'Calculates a weighted 0–100 Technical SEO Health Score across Title Optimization (25%), Meta & Canonical Setup (25%), Heading Semantics (25%), and Keyword Relevance (25%).',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Enter Target Keyword & Meta Tags',
          stepDescription: 'Input your primary focus keyword, title tag, and meta description.',
        },
        {
          id: 'step_2',
          stepTitle: 'Provide Heading & Body Content',
          stepDescription: 'Paste your H1 headline and body content to evaluate semantic alignment.',
        },
        {
          id: 'step_3',
          stepTitle: 'Resolve Flagged Warnings',
          stepDescription: 'Follow the prioritized recommendations to achieve a 90+ SEO Audit Score.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_1',
        question: 'Where should the primary focus keyword appear on a page?',
        answer:
          'For optimal semantic signaling, include your primary keyword in the <title> tag, the URL slug, the primary <h1> heading, and within the first 100 words of body copy.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'On-Page Technical SEO Audit Scorer | Veritas SEO',
        'Score your webpage on a 100-point technical SEO checklist and fix on-page optimization gaps.',
        'https://veritas-seo.dev/tool/onpage-audit-scorer'
      ),
      focusKeyword: 'onpage seo audit scorer',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'tool_cwv_cls',
    title: 'Core Web Vitals & CLS Layout Shift Calculator',
    slug: 'cwv-cls-calculator',
    shortSummary: 'Calculate exact Cumulative Layout Shift (CLS) scores from impact and distance fractions to pass Google Core Web Vitals.',
    icon: 'Activity',
    badge: 'Pro',
    categoryId: 'cat_technical_seo',
    subCategoryId: 'subcat_crawl_directives',
    status: 'published',
    isActive: true,
    displayOrder: 11,
    usageCount: 64,
    engineType: 'cwv-cls-calculator',
    defaultInputConfig: createDefaultToolInputConfig(),
    educationalContent: {
      howItWorks:
        'Measures visual stability by multiplying the viewport Impact Fraction by the Distance Fraction for shifting DOM elements during page load.',
      formulaMethodology:
        'CLS Score = Impact Fraction × Distance Fraction. Google Core Web Vitals thresholds: Good (≤ 0.10), Needs Improvement (0.10 – 0.25), Poor (> 0.25).',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Set Viewport Dimensions',
          stepDescription: 'Configure device viewport height and width (e.g. Desktop 1920×1080 or Mobile 390×844).',
        },
        {
          id: 'step_2',
          stepTitle: 'Input Element Size & Shift Distance',
          stepDescription: 'Specify the unstable element height and how many pixels it shifted vertically.',
        },
        {
          id: 'step_3',
          stepTitle: 'Inspect CLS Pass/Fail Status',
          stepDescription: 'Verify that your calculated CLS score stays below Google’s 0.10 threshold.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_1',
        question: 'What is the most common cause of high CLS scores?',
        answer:
          'Images, embeds, and ad containers without explicit width and height attributes (or CSS aspect-ratio boxes), as well as late-loading web fonts causing FOUT/FOIT.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'Core Web Vitals & CLS Layout Shift Calculator | Veritas SEO',
        'Calculate Cumulative Layout Shift (CLS) impact and distance fractions for Google Core Web Vitals.',
        'https://veritas-seo.dev/tool/cwv-cls-calculator'
      ),
      focusKeyword: 'cls layout shift calculator',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'tool_readability_flesch',
    title: 'Flesch-Kincaid Readability Grade Analyzer',
    slug: 'readability-flesch-analyzer',
    shortSummary: 'Compute Flesch Reading Ease scores, Flesch-Kincaid grade levels, syllable density, and sentence complexity in real time.',
    icon: 'BookOpen',
    badge: 'New',
    categoryId: 'cat_onpage_content',
    subCategoryId: 'subcat_content_analysis',
    status: 'published',
    isActive: true,
    displayOrder: 12,
    usageCount: 79,
    engineType: 'readability-flesch-analyzer',
    defaultInputConfig: createDefaultToolInputConfig(),
    educationalContent: {
      howItWorks:
        'Analyzes sentence length and syllable-per-word ratios to determine how easy your copy is to read and comprehend for general web audiences.',
      formulaMethodology:
        'Flesch Reading Ease = 206.835 − 1.015 × (Total Words / Total Sentences) − 84.6 × (Total Syllables / Total Words).',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Paste Article or Landing Page Copy',
          stepDescription: 'Insert your text into the readability analyzer.',
        },
        {
          id: 'step_2',
          stepTitle: 'Check Reading Ease & Grade Level',
          stepDescription: 'Aim for a Flesch Reading Ease score between 60 and 70 (Grade 7–8 level) for broad web audiences.',
        },
        {
          id: 'step_3',
          stepTitle: 'Shorten Complex Sentences',
          stepDescription: 'Break up long sentences (>25 words) and replace multi-syllable jargon with clear terminology.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_1',
        question: 'What is a good Flesch Reading Ease score for SEO content?',
        answer:
          'A score between 60 and 70 is considered plain English (8th to 9th grade reading level) and performs best for user engagement and dwell time on web articles.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'Flesch-Kincaid Readability Grade & Reading Ease Analyzer | Veritas SEO',
        'Calculate Flesch Reading Ease and Flesch-Kincaid Grade Level scores to improve content readability.',
        'https://veritas-seo.dev/tool/readability-flesch-analyzer'
      ),
      focusKeyword: 'flesch kincaid readability calculator',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
];

export const DEMO_PRESET_REDIRECTS: RedirectRule[] = [
  {
    id: 'redir_legacy_serp_title',
    fromPath: '/tool/google-serp-title-checker',
    toPath: '/tool/serp-pixel-simulator',
    statusCode: 301,
    reason: 'Legacy slug alias updated to canonical tool slug',
    entityType: 'tool',
    entityId: 'tool_serp_pixel',
    hits: 42,
    createdAt: PRESET_TIMESTAMP,
  },
];

export const DEMO_PRESET_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post_ngram_seo_guide',
    title: 'How N-Gram Phrase Frequency Replaces Outdated Keyword Stuffing in 2026',
    slug: 'ngram-phrase-frequency-seo-guide',
    excerpt:
      'Discover why search engines evaluate bigrams, trigrams, and document-wide keyword distribution rather than raw single-word density percentages.',
    content:
      '<p>For over a decade, content writers relied on basic single-word density counters to optimize articles. However, modern semantic search engines evaluate <strong>co-occurrence</strong> and <strong>multi-word phrase structures (N-Grams)</strong> to understand topical depth.</p><h2>What Are N-Grams in Technical SEO?</h2><p>An N-Gram is a contiguous sequence of <em>n</em> words extracted from a document after stop-word filtering and tokenization:</p><ul><li><strong>1-Gram (Unigram):</strong> Single foundational entities (e.g., "crawler", "canonical").</li><li><strong>2-Gram (Bigram):</strong> Core topic pairs (e.g., "keyword density", "redirect chain").</li><li><strong>3-Gram (Trigram):</strong> Specific intent phrases (e.g., "structured data generator").</li></ul><h2>Why Positional Distribution Matters</h2><p>When a primary topic only appears in the opening paragraph and disappears for the rest of the article, semantic relevance drops. Splitting your copy into 10 equal segments ensures your key phrases appear naturally across the introduction, body sections, and conclusion.</p>',
    category: 'On-Page Optimization',
    tags: ['N-Grams', 'Keyword Density', 'Semantic SEO', 'Content Audit'],
    author: 'Nikhil Acharekar',
    featuredImage: '',
    status: 'published',
    readingTimeMinutes: 5,
    seoTitle: 'How N-Gram Phrase Frequency Replaces Outdated Keyword Stuffing | Veritas SEO',
    seoDescription:
      'Learn how bigrams, trigrams, and 10-segment positional distribution help you write semantically rich SEO content without over-optimization.',
    focusKeyword: 'n-gram phrase frequency seo',
    publishedAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'post_serp_pixel_truncation',
    title: 'Google SERP Pixel Width Limits Explained: Why Character Counts Lie',
    slug: 'google-serp-pixel-width-limits-explained',
    excerpt:
      'A 60-character title tag packed with capital W and M letters will truncate in Google Search, while a 68-character title with narrow letters fits cleanly.',
    content:
      '<p>Most SEO plugins still warn you when a title tag exceeds 60 characters. Yet Google does not measure title tags by character count—it measures the rendered <strong>pixel width</strong> in a 20px Arial container (capped at approximately <strong>580px on desktop</strong>).</p><h2>Proportional Font Rendering in Google Search</h2><p>In proportional typography, each glyph occupies a distinct horizontal width:</p><ul><li>Wide glyphs like <code>W</code>, <code>M</code>, and <code>G</code> consume 15px to 19px each.</li><li>Narrow glyphs like <code>i</code>, <code>l</code>, and <code>t</code> consume only 4px to 6px each.</li></ul><p>By testing your title tags in a real Canvas 2D pixel simulator before publishing, you prevent mid-word ellipsis truncation and preserve your click-through rate (CTR).</p>',
    category: 'Technical SEO',
    tags: ['SERP Simulator', 'Title Tags', 'CTR Optimization'],
    author: 'Nikhil Acharekar',
    featuredImage: '',
    status: 'published',
    readingTimeMinutes: 4,
    seoTitle: 'Google SERP Pixel Width Limits Explained (580px Rule) | Veritas SEO',
    seoDescription:
      'Understand why Google truncates titles based on 580px Arial pixel width rather than character counts.',
    focusKeyword: 'google serp pixel width limits',
    publishedAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'post_redirect_chains_crawl_budget',
    title: 'Eliminating 301 Redirect Chains to Recover Lost Crawl Budget & Link Equity',
    slug: 'eliminating-301-redirect-chains-crawl-budget',
    excerpt:
      'Every extra hop in a redirect chain adds network latency and risks Googlebot abandoning the crawl before reaching your canonical destination URL.',
    content:
      '<p>During site migrations and taxonomy restructures, legacy URLs often accumulate multi-hop redirect chains (<code>URL A → URL B → URL C</code>). While single 301 redirects preserve link equity, multi-hop chains degrade both user experience and crawler efficiency.</p><h2>How to Flatten Redirect Chains</h2><p>Whenever a category, sub-category, or tool slug changes, your CMS should automatically point all historical paths directly to the final destination URL in a single 301 hop.</p>',
    category: 'Technical SEO',
    tags: ['301 Redirects', 'Crawl Budget', 'Site Architecture'],
    author: 'Nikhil Acharekar',
    featuredImage: '',
    status: 'published',
    readingTimeMinutes: 4,
    seoTitle: 'Eliminating 301 Redirect Chains to Recover Crawl Budget | Veritas SEO',
    seoDescription:
      'Learn how to audit and flatten multi-hop 301 redirect chains to protect link equity and server response times.',
    focusKeyword: '301 redirect chains crawl budget',
    publishedAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
];
