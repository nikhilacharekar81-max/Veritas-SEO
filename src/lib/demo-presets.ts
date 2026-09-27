import type {
  MainCategory,
  SubCategory,
  SeoTool,
  RedirectRule,
  AuditLogEntry,
  RobotsTxtConfig,
} from './schemas';
import { createDefaultSeoMetadata, createDefaultToolInputConfig } from './schemas';

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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tool_keyword_density',
    title: 'Keyword Density & N-Gram Analyzer',
    slug: 'keyword-density-analyzer',
    shortSummary: 'Calculate exact 1-gram, 2-gram, and 3-gram keyword distributions and detect over-optimization risks using exact math.',
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
        'The analyzer tokenizes the provided text, filters out English stop words (unless included), computes exact n-gram occurrences (1-word, 2-word, and 3-word combinations), and evaluates density using Decimal.js precision formulas.',
      formulaMethodology:
        'Density Percentage = (Total Occurrences × N-Gram Words / Total Non-Stop Words) × 100. Over-optimization flags trigger if 1-gram density > 3.5% or 2-gram density > 2.5%.',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Paste Target Copy',
          stepDescription: 'Insert your drafted article, blog post, or landing page copy into the analyzer text area.',
        },
        {
          id: 'step_2',
          stepTitle: 'Set Target Focus Keyword',
          stepDescription: 'Specify your core keyword phrase to track its isolated density and frequency.',
        },
        {
          id: 'step_3',
          stepTitle: 'Review N-Gram Tables',
          stepDescription: 'Verify that secondary phrases feel organic and do not trigger over-optimization warnings.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_1',
        question: 'What is an ideal keyword density for Google in 2026?',
        answer:
          'Modern search algorithms rely on semantic entity salience and natural language processing. A safe keyword density is between 1.0% and 2.5% for primary terms, avoiding repetitive keyword stuffing.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'Keyword Density & N-Gram Analyzer Tool | Veritas SEO',
        'Analyze 1-gram, 2-gram, and 3-gram keyword frequencies with stop-word filtering and over-optimization detection.',
        'https://veritas-seo.dev/tool/keyword-density-analyzer'
      ),
      focusKeyword: 'keyword density analyzer',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tool_ctr_forecaster',
    title: 'Google SERP CTR Curve & Traffic Forecaster',
    slug: 'serp-ctr-forecaster',
    shortSummary: 'Forecast monthly organic click growth and Google Ads traffic equity by simulating rank improvements (#1 through #20).',
    icon: 'TrendingUp',
    badge: 'Popular',
    categoryId: 'cat_onpage_content',
    subCategoryId: 'subcat_serp_simulators',
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tool_social_cards',
    title: 'Open Graph & Twitter Social Card Studio',
    slug: 'social-card-studio',
    shortSummary: 'Design, preview, and generate Open Graph and Twitter/X card metadata for high-CTR social sharing.',
    icon: 'Share2',
    badge: 'New',
    categoryId: 'cat_onpage_content',
    subCategoryId: 'subcat_serp_simulators',
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
