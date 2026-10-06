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
  {
    id: 'cat_creator_tools',
    name: 'Creator Tools',
    slug: 'creator-tools',
    description: 'Precision calculators and decision tools for YouTubers, influencers, and digital creators.',
    icon: 'Sparkles',
    displayOrder: 4,
    isActive: true,
    seo: {
      ...createDefaultSeoMetadata(
        'Creator Tools & YouTube Monetization Calculators | Veritas SEO',
        'Calculate YouTube revenue, estimate Shorts RPM, plan income milestones, and model channel growth scenarios with free precision tools.',
        'https://veritas-seo.dev/category/creator-tools'
      ),
      focusKeyword: 'creator tools',
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
  {
    id: 'subcat_youtube_creator',
    categoryId: 'cat_creator_tools',
    name: 'YouTube Creator Tools',
    slug: 'youtube-creator-tools',
    description: 'Revenue calculators, RPM analyzers, and upload velocity planners for YouTube creators.',
    displayOrder: 1,
    isActive: true,
    seo: createDefaultSeoMetadata(
      'YouTube Creator Tools & Monetization Calculators | Veritas SEO',
      'Calculate YouTube ad revenue, hybrid Shorts blended RPM, and required view goals for channels.'
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
        'Writing a good SEO title is only part of the job. You also want to know how much space that title takes up when it appears in a search result.\n\nEnter your title into the Google SERP Pixel Width Simulator to check its approximate pixel width and see a search-result preview. You can use the preview to spot titles that look too long, put important information too far to the right, or simply don\'t look good at a glance. It is a quick way to check your title before you publish a page.\n\nWhy check the pixel width of a title?\nYou may have heard that an SEO title should be around 50–60 characters. That can be a useful starting point, but characters do not all take up the same amount of space. For example, a title made mostly of narrow letters such as "i" can take up much less horizontal space than one containing many wide letters such as "W". That\'s why character count alone cannot tell you exactly how wide a title will appear. Pixel width gives you another way to look at the title: how much horizontal space the text takes up. The goal isn\'t to hit a magic number. The goal is to make sure the important part of your title is clear and useful to someone looking at the search result.\n\nHow to use the SERP Pixel Width Simulator\nUsing the tool is simple:\n1. Enter your SEO title — Paste or type the title you plan to use for your page.\n2. Check the pixel width — The tool estimates how wide your title is in pixels, giving you more information than character count alone.\n3. Look at the search preview — Check if the main topic is obvious, important info appears early, and if it feels unnecessarily long.\n4. Check different screen sizes — Review both desktop and mobile layouts where available.\n5. Edit only when there is a reason — Make changes when they improve clarity rather than chasing arbitrary numbers.\n\nWhat is SERP pixel width?\nSERP pixel width refers to the horizontal space that text takes up when displayed in a search result. A pixel is a unit used to measure screen dimensions. Unlike character count, pixel width accounts for actual letters, numbers, spaces, and symbols used.\n\nIs there a maximum pixel width for Google titles?\nThere isn\'t one permanent, official pixel-width number that guarantees a title will always fit in Google\'s search results. You will often see recommendations around 580–600 pixels, but these should be treated as practical estimates rather than an official Google rule.\n\nWhy does Google sometimes change my title?\nYou may write one title in your page\'s HTML and see something slightly different in Google because Google can generate the title link using information from the page and other sources.\n\nWhat about the meta description?\nThe same basic idea applies to your meta description. There isn\'t one fixed character or pixel limit that guarantees your description will always appear exactly as written.',
      formulaMethodology:
        'Pixel width vs. character count:\n- Character count tells you how many characters are in the title.\n- Pixel width tells you approximately how much horizontal space the title uses.\n- SERP preview gives you a visual idea of how the title appears.\n\nHow to write a useful SEO title:\n1. Tell people what the page is about.\n2. Put the important information early.\n3. Don\'t add words just to reach a target length.\n4. Keep it natural and write for the person searching.\n5. Make sure it matches the page content.\n\nA simple workflow for better SEO titles:\nWrite → Check → Preview → Improve → Publish',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Enter Your SEO Title',
          stepDescription: 'Paste or type the title you plan to use for your page in the simulator input.',
        },
        {
          id: 'step_2',
          stepTitle: 'Check Pixel Width & Preview',
          stepDescription: 'Review the estimated pixel width and inspect the visual search result preview as a user would see it.',
        },
        {
          id: 'step_3',
          stepTitle: 'Review Desktop & Mobile Layouts',
          stepDescription: 'Verify that important keywords appear early and won\'t be truncated on different screen sizes.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_1',
        question: 'What does a SERP pixel width simulator do?',
        answer:
          'It estimates how much horizontal space your SEO title takes up and shows a visual search-result preview. This lets you check the title before publishing instead of relying only on its character count.',
      },
      {
        id: 'faq_2',
        question: 'Why can two titles with the same number of characters have different widths?',
        answer:
          "Letters and symbols don't all have the same width. For example, a title containing several W characters will generally take up more space than one containing the same number of i characters. Pixel width accounts for this difference, while character count does not.",
      },
      {
        id: 'faq_3',
        question: 'What pixel width should my SEO title be?',
        answer:
          'There is no single pixel width that guarantees a title will display perfectly in every Google search result. Common figures such as 580–600 pixels are useful reference points, but they are not official Google limits. Use the number together with the preview rather than trying to hit one exact target.',
      },
      {
        id: 'faq_4',
        question: 'Is a 60-character SEO title limit required by Google?',
        answer:
          'No. Google does not require titles to stay within 60 characters. The 50–60 character guideline is a common SEO recommendation, but titles can be shorter or longer. What matters more is whether the title clearly describes the page and puts useful information where people can see it.',
      },
      {
        id: 'faq_5',
        question: 'Can a title fit within the pixel width but still be a bad SEO title?',
        answer:
          "Yes. A title can have a reasonable width and still be vague, misleading, repetitive, or difficult to understand. Pixel width only tells you about the space the text occupies. It doesn't tell you whether the title is useful or relevant to the page.",
      },
      {
        id: 'faq_6',
        question: 'Will the simulator show exactly what Google will display?',
        answer:
          'No. A simulator is an approximation. Google can change the way search results are displayed, and the final appearance can vary depending on factors such as the device, search query, and other search-result elements. Use the preview to review your title, not as a guarantee of its final appearance.',
      },
      {
        id: 'faq_7',
        question: "Why doesn't Google always show the title I wrote?",
        answer:
          'Google can create the title link shown in search results from information on the page and other relevant sources. Because of this, the text you put in the HTML <title> element is not an absolute guarantee of what Google will display.',
      },
      {
        id: 'faq_8',
        question: 'Should I shorten a title if the simulator shows it as too wide?',
        answer:
          'Not automatically. First check whether the title contains unnecessary words or whether the important information could be moved earlier. If the title is clear and useful as it is, changing it solely to reach a particular pixel number may not improve it.',
      },
      {
        id: 'faq_9',
        question: 'Is pixel width more important than character count?',
        answer:
          'They measure different things. Character count tells you how many characters your title contains. Pixel width estimates how much horizontal space those characters occupy. Neither number should be treated as a standalone rule for writing titles.',
      },
      {
        id: 'faq_10',
        question: 'Why should I check the mobile preview?',
        answer:
          'Mobile screens generally provide less horizontal space than desktop layouts. Looking at the mobile preview can help you notice when a title becomes crowded or when important information appears too far into the title.',
      },
      {
        id: 'faq_11',
        question: 'Can this tool tell me whether my page will rank?',
        answer:
          'No. Pixel width is a presentation measurement, not a ranking metric. The tool can help you review the appearance and readability of your title, but it cannot predict where your page will appear in Google.',
      },
      {
        id: 'faq_12',
        question: 'Does the simulator check my meta description too?',
        answer:
          'That depends on the features provided by the tool. If a meta description preview is available, it can help you review how the description may look in a search result. However, Google may generate a different snippet from the content on your page.',
      },
      {
        id: 'faq_13',
        question: 'What should I look for after checking my title?',
        answer:
          "Don't focus only on the pixel number. Read the title as if you were seeing it in a search result. Check that the page topic is clear, key info isn't buried, there are no unnecessary words, it sounds natural, matches the page, and makes sense on smaller screens.",
      },
      {
        id: 'faq_14',
        question: 'Should I try to make every SEO title the same length?',
        answer:
          'No. Different pages need different titles. A product page, blog post, category page, and SEO tool page may need different amounts of information to describe what they offer. Write the clearest title for the specific page, then use the pixel-width check to review how it may appear.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'Google SERP Pixel Width Simulator | Title & Meta Check',
        'Test title and description lengths in pixels with our free Google SERP Simulator. Prevent truncation in search results and optimize click-through rates.',
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
        'Keyword Density & N-Gram Analyzer | Free SEO Tool',
        'Analyze keyword density, frequency, and N-grams instantly. Optimize content relevance, prevent keyword stuffing, and improve on-page SEO.',
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
    sections: [
      {
        id: 'sec_hero',
        title: 'Tool Header & Summary Section',
        subtitle: 'Tool H1 headline, badge, and short summary',
        type: 'hero_header',
        isEnabled: true,
        displayOrder: 0,
      },
      {
        id: 'sec_engine',
        title: 'Interactive Tool Execution Engine Canvas',
        subtitle: 'Primary interactive calculator / simulator inputs and live metrics',
        type: 'interactive_engine',
        isEnabled: true,
        displayOrder: 1,
      },
      {
        id: 'sec_guide',
        title: 'Technical Execution Guide & Formula Methodology',
        subtitle: 'Comprehensive guide to Schema.org JSON-LD generation and Google rich results',
        type: 'educational_methodology',
        isEnabled: true,
        displayOrder: 2,
      },
      {
        id: 'sec_tutorial',
        title: 'Step-by-Step Practical Tutorial',
        subtitle: '',
        type: 'step_tutorial',
        isEnabled: false,
        displayOrder: 3,
      },
      {
        id: 'sec_faqs',
        title: 'Frequently Asked Questions (FAQ)',
        subtitle: '',
        type: 'faq_accordion',
        isEnabled: false,
        displayOrder: 4,
      },
      {
        id: 'sec_related',
        title: 'Related SEO Tools in Category',
        subtitle: '',
        type: 'related_tools',
        isEnabled: true,
        displayOrder: 5,
      },
    ],
    educationalContent: {
      howItWorks: 'The builder generates Schema.org JSON-LD structured data by transforming input properties into valid JSON-LD 1.1 script tags.',
      formulaMethodology: 'Structured according to official Schema.org vocabularies and Google Search Central technical guidelines.',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Select Schema Entity Type',
          stepDescription: 'Choose the entity type (Article, Product, Organization, etc.) that accurately represents your webpage.',
        },
        {
          id: 'step_2',
          stepTitle: 'Enter Real Properties',
          stepDescription: 'Add names, URLs, dates, prices, images, and author details that match visible page content.',
        },
        {
          id: 'step_3',
          stepTitle: 'Copy & Test Markup',
          stepDescription: 'Copy the generated JSON-LD script snippet and validate with Google Rich Results Test.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_1',
        question: 'What is a JSON-LD Schema Generator?',
        answer: 'A JSON-LD Schema Generator creates Schema.org structured data in JSON-LD format from information you provide, so you don\'t have to write the markup manually.',
      },
      {
        id: 'faq_2',
        question: 'What is a structured data builder?',
        answer: 'A structured data builder helps you create structured data by selecting an appropriate schema type and entering its relevant properties.',
      },
      {
        id: 'faq_3',
        question: 'What is a Schema Markup Tool?',
        answer: 'A Schema Markup Tool helps create or work with structured data that describes the content and entities on a webpage.',
      },
      {
        id: 'faq_4',
        question: 'Is JSON-LD the same as Schema.org?',
        answer: 'No. Schema.org provides the vocabulary, while JSON-LD is one format used to express structured data.',
      },
      {
        id: 'faq_5',
        question: 'Does JSON-LD improve Google rankings?',
        answer: 'Valid JSON-LD does not guarantee higher rankings. It can help search engines understand page content and may make eligible pages suitable for supported rich-result features.',
      },
      {
        id: 'faq_6',
        question: 'Why isn\'t my schema showing as a rich result?',
        answer: 'Check that the schema matches the page, required properties are present, the information is accurate, and Google can access the page. Even valid markup does not guarantee a rich result.',
      },
      {
        id: 'faq_7',
        question: 'Does valid JSON mean my schema is correct?',
        answer: 'No. Valid JSON only confirms that the data follows JSON syntax. The schema can still use the wrong type, contain incorrect information or fail Google\'s requirements.',
      },
      {
        id: 'faq_8',
        question: 'Should Schema markup match visible content?',
        answer: 'Yes. Important information in your structured data should accurately represent what users can find on the page.',
      },
      {
        id: 'faq_9',
        question: 'Should I fill every Schema field?',
        answer: 'No. Use required properties and relevant optional properties that contain accurate information. More properties do not automatically make better Schema.',
      },
      {
        id: 'faq_10',
        question: 'How do I test JSON-LD?',
        answer: 'Use Google\'s Rich Results Test for supported Google rich-result features. The Schema.org Validator can also help inspect Schema.org markup.',
      },
      {
        id: 'faq_11',
        question: 'Can I have multiple Schema types on one page?',
        answer: 'Yes, when they genuinely describe relevant entities or content on the page. Avoid adding unrelated types simply to target more search features.',
      },
      {
        id: 'faq_12',
        question: 'Can I use FAQPage schema on any website?',
        answer: 'FAQPage is a valid Schema.org type, but Google currently limits FAQ rich-result eligibility primarily to well-known authoritative government and health websites.',
      },
      {
        id: 'faq_13',
        question: 'Where should I put JSON-LD?',
        answer: 'JSON-LD is commonly placed in a <script type="application/ld+json"> block on the page. Follow the implementation requirements of your website platform.',
      },
      {
        id: 'faq_14',
        question: 'Should I check for existing Schema markup?',
        answer: 'Yes. Your CMS, SEO plugin, theme, ecommerce platform or framework may already generate structured data.',
      },
      {
        id: 'faq_15',
        question: 'Can I use this tool without knowing JSON-LD?',
        answer: 'Yes. The builder creates the JSON-LD structure for you. You should still review the generated information before publishing it.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'Schema.org JSON-LD Generator | Free Structured Data Tool',
        'Build valid JSON-LD schema markup easily. Generate schema for articles, products, FAQs, and local businesses to boost rich snippets in Google SERPs.',
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
    sections: [
      {
        id: 'sec_hero',
        title: 'Tool Header & Summary Section',
        subtitle: 'Tool H1 headline, badge, and short summary',
        type: 'hero_header',
        isEnabled: true,
        displayOrder: 0,
      },
      {
        id: 'sec_engine',
        title: 'Interactive Tool Execution Engine Canvas',
        subtitle: 'Primary interactive calculator / simulator inputs and live metrics',
        type: 'interactive_engine',
        isEnabled: true,
        displayOrder: 1,
      },
      {
        id: 'sec_guide',
        title: 'Technical Execution Guide & Formula Methodology',
        subtitle: '',
        type: 'educational_methodology',
        isEnabled: false,
        displayOrder: 2,
      },
      {
        id: 'sec_tutorial',
        title: 'Step-by-Step Practical Tutorial',
        subtitle: '',
        type: 'step_tutorial',
        isEnabled: false,
        displayOrder: 3,
      },
      {
        id: 'sec_faqs',
        title: 'Frequently Asked Questions (FAQ)',
        subtitle: '',
        type: 'faq_accordion',
        isEnabled: false,
        displayOrder: 4,
      },
      {
        id: 'sec_related',
        title: 'Related SEO Tools in Category',
        subtitle: '',
        type: 'related_tools',
        isEnabled: false,
        displayOrder: 5,
      },
    ],
    educationalContent: {
      howItWorks: '',
      formulaMethodology: '',
      stepByStepGuide: [],
    },
    faqs: [
      {
        id: 'faq_redir_1',
        question: 'What is a 301 redirect?',
        answer: 'A 301 tells clients and search engines that a URL has moved permanently to another location.',
      },
      {
        id: 'faq_redir_2',
        question: 'What is a redirect chain?',
        answer: 'A redirect chain happens when one URL redirects to another URL, which redirects again before reaching the final page.',
      },
      {
        id: 'faq_redir_3',
        question: 'Are redirect chains bad for SEO?',
        answer: 'Long or unnecessary chains can add latency and make crawling less efficient. Google recommends redirecting directly to the final destination when possible.',
      },
      {
        id: 'faq_redir_4',
        question: 'What is the difference between 301 and 302?',
        answer: 'A 301 indicates a permanent move, while a 302 indicates a temporary redirect. Google treats them differently when determining which URL should be canonical.',
      },
      {
        id: 'faq_redir_5',
        question: 'What does 200 OK mean?',
        answer: 'It means the server successfully returned the requested resource.',
      },
      {
        id: 'faq_redir_6',
        question: 'What does 404 mean?',
        answer: 'A 404 means the requested resource could not be found.',
      },
      {
        id: 'faq_redir_7',
        question: 'What should I do if a redirect ends in 404?',
        answer: 'Check the redirect rule and make sure the destination URL exists and is the intended replacement.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'HTTP Status & 301 Redirect Chain Inspector | Free Tool',
        'Trace 301 redirect chains, inspect HTTP status codes, and fix broken URLs instantly. Optimize site architecture and crawl efficiency.',
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
    sections: [
      {
        id: 'sec_hero',
        title: 'Tool Header & Summary Section',
        subtitle: 'Tool H1 headline, badge, and short summary',
        type: 'hero_header',
        isEnabled: true,
        displayOrder: 0,
      },
      {
        id: 'sec_engine',
        title: 'Interactive Tool Execution Engine Canvas',
        subtitle: 'Primary interactive calculator / simulator inputs and live metrics',
        type: 'interactive_engine',
        isEnabled: true,
        displayOrder: 1,
      },
      {
        id: 'sec_guide',
        title: 'Technical Execution Guide & Formula Methodology',
        subtitle: '',
        type: 'educational_methodology',
        isEnabled: false,
        displayOrder: 2,
      },
      {
        id: 'sec_tutorial',
        title: 'Step-by-Step Practical Tutorial',
        subtitle: '',
        type: 'step_tutorial',
        isEnabled: false,
        displayOrder: 3,
      },
      {
        id: 'sec_faqs',
        title: 'Frequently Asked Questions (FAQ)',
        subtitle: '',
        type: 'faq_accordion',
        isEnabled: false,
        displayOrder: 4,
      },
      {
        id: 'sec_related',
        title: 'Related SEO Tools in Category',
        subtitle: '',
        type: 'related_tools',
        isEnabled: false,
        displayOrder: 5,
      },
    ],
    educationalContent: {
      howItWorks: '',
      formulaMethodology: '',
      stepByStepGuide: [],
    },
    faqs: [],
    seo: {
      ...createDefaultSeoMetadata(
        'Hreflang Tag Generator & International SEO Validator',
        'Validate hreflang tags, check multi-language setups, and fix regional targeting errors. Ensure search engines serve the right language version.',
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
    sections: [
      {
        id: 'sec_hero',
        title: 'Tool Header & Summary Section',
        subtitle: 'Tool H1 headline, badge, and short summary',
        type: 'hero_header',
        isEnabled: true,
        displayOrder: 0,
      },
      {
        id: 'sec_engine',
        title: 'Interactive Tool Execution Engine Canvas',
        subtitle: 'Primary interactive calculator / simulator inputs and live metrics',
        type: 'interactive_engine',
        isEnabled: true,
        displayOrder: 1,
      },
      {
        id: 'sec_guide',
        title: 'Technical Execution Guide & Formula Methodology',
        subtitle: '',
        type: 'educational_methodology',
        isEnabled: false,
        displayOrder: 2,
      },
      {
        id: 'sec_tutorial',
        title: 'Step-by-Step Practical Tutorial',
        subtitle: '',
        type: 'step_tutorial',
        isEnabled: false,
        displayOrder: 3,
      },
      {
        id: 'sec_faqs',
        title: 'Frequently Asked Questions (FAQ)',
        subtitle: '',
        type: 'faq_accordion',
        isEnabled: false,
        displayOrder: 4,
      },
      {
        id: 'sec_related',
        title: 'Related SEO Tools in Category',
        subtitle: '',
        type: 'related_tools',
        isEnabled: false,
        displayOrder: 5,
      },
    ],
    educationalContent: {
      howItWorks: '',
      formulaMethodology: '',
      stepByStepGuide: [],
    },
    faqs: [],
    seo: {
      ...createDefaultSeoMetadata(
        'Google SERP CTR Forecaster & Traffic Calculator',
        'Estimate organic search traffic and click-through rates using official Google SERP position curves. Forecast SEO growth and potential clicks.',
        'https://veritas-seo.dev/tool/serp-ctr-forecaster'
      ),
      focusKeyword: 'serp ctr forecaster',
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
    sections: [
      {
        id: 'sec_hero',
        title: 'Tool Header & Summary Section',
        subtitle: 'Tool H1 headline, badge, and short summary',
        type: 'hero_header',
        isEnabled: true,
        displayOrder: 0,
      },
      {
        id: 'sec_engine',
        title: 'Interactive Tool Execution Engine Canvas',
        subtitle: 'Primary interactive calculator / simulator inputs and live metrics',
        type: 'interactive_engine',
        isEnabled: true,
        displayOrder: 1,
      },
      {
        id: 'sec_guide',
        title: 'Technical Execution Guide & Formula Methodology',
        subtitle: '',
        type: 'educational_methodology',
        isEnabled: false,
        displayOrder: 2,
      },
      {
        id: 'sec_tutorial',
        title: 'Step-by-Step Practical Tutorial',
        subtitle: '',
        type: 'step_tutorial',
        isEnabled: false,
        displayOrder: 3,
      },
      {
        id: 'sec_faqs',
        title: 'Frequently Asked Questions (FAQ)',
        subtitle: '',
        type: 'faq_accordion',
        isEnabled: false,
        displayOrder: 4,
      },
      {
        id: 'sec_related',
        title: 'Related SEO Tools in Category',
        subtitle: '',
        type: 'related_tools',
        isEnabled: false,
        displayOrder: 5,
      },
    ],
    educationalContent: {
      howItWorks: '',
      formulaMethodology: '',
      stepByStepGuide: [],
    },
    faqs: [
      {
        id: 'faq_redir_1',
        question: 'What is a 301 redirect?',
        answer: 'A 301 tells clients and search engines that a URL has moved permanently to another location.',
      },
      {
        id: 'faq_redir_2',
        question: 'What is a redirect chain?',
        answer: 'A redirect chain happens when one URL redirects to another URL, which redirects again before reaching the final page.',
      },
      {
        id: 'faq_redir_3',
        question: 'Are redirect chains bad for SEO?',
        answer: 'Long or unnecessary chains can add latency and make crawling less efficient. Google recommends redirecting directly to the final destination when possible.',
      },
      {
        id: 'faq_redir_4',
        question: 'What is the difference between 301 and 302?',
        answer: 'A 301 indicates a permanent move, while a 302 indicates a temporary redirect. Google treats them differently when determining which URL should be canonical.',
      },
      {
        id: 'faq_redir_5',
        question: 'What does 200 OK mean?',
        answer: 'It means the server successfully returned the requested resource.',
      },
      {
        id: 'faq_redir_6',
        question: 'What does 404 mean?',
        answer: 'A 404 means the requested resource could not be found.',
      },
      {
        id: 'faq_redir_7',
        question: 'What should I do if a redirect ends in 404?',
        answer: 'Check the redirect rule and make sure the destination URL exists and is the intended replacement.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'Googlebot & AI Crawler HTTP Header Checker',
        'Inspect HTTP response headers, user-agent rendering, and status codes for Googlebot, ChatGPT, and other AI web scrapers.',
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
    sections: [
      {
        id: 'sec_hero',
        title: 'Tool Header & Summary Section',
        subtitle: 'Tool H1 headline, badge, and short summary',
        type: 'hero_header',
        isEnabled: true,
        displayOrder: 0,
      },
      {
        id: 'sec_engine',
        title: 'Interactive Tool Execution Engine Canvas',
        subtitle: 'Primary interactive calculator / simulator inputs and live metrics',
        type: 'interactive_engine',
        isEnabled: true,
        displayOrder: 1,
      },
      {
        id: 'sec_guide',
        title: 'Technical Execution Guide & Formula Methodology',
        subtitle: '',
        type: 'educational_methodology',
        isEnabled: false,
        displayOrder: 2,
      },
      {
        id: 'sec_tutorial',
        title: 'Step-by-Step Practical Tutorial',
        subtitle: '',
        type: 'step_tutorial',
        isEnabled: false,
        displayOrder: 3,
      },
      {
        id: 'sec_faqs',
        title: 'Frequently Asked Questions (FAQ)',
        subtitle: '',
        type: 'faq_accordion',
        isEnabled: false,
        displayOrder: 4,
      },
      {
        id: 'sec_related',
        title: 'Related SEO Tools in Category',
        subtitle: '',
        type: 'related_tools',
        isEnabled: false,
        displayOrder: 5,
      },
    ],
    educationalContent: {
      howItWorks: '',
      formulaMethodology: '',
      stepByStepGuide: [],
    },
    faqs: [],
    seo: {
      ...createDefaultSeoMetadata(
        'Open Graph & Twitter Card Generator & Previewer',
        'Design, preview, and test Open Graph and Twitter card meta tags. Ensure your shared social links look stunning on Facebook, X, and LinkedIn.',
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
    sections: [
      {
        id: 'sec_hero',
        title: 'Tool Header & Summary Section',
        subtitle: 'Tool H1 headline, badge, and short summary',
        type: 'hero_header',
        isEnabled: true,
        displayOrder: 0,
      },
      {
        id: 'sec_engine',
        title: 'Interactive Tool Execution Engine Canvas',
        subtitle: 'Primary interactive calculator / simulator inputs and live metrics',
        type: 'interactive_engine',
        isEnabled: true,
        displayOrder: 1,
      },
      {
        id: 'sec_guide',
        title: 'Technical Execution Guide & Formula Methodology',
        subtitle: '',
        type: 'educational_methodology',
        isEnabled: false,
        displayOrder: 2,
      },
      {
        id: 'sec_tutorial',
        title: 'Step-by-Step Practical Tutorial',
        subtitle: '',
        type: 'step_tutorial',
        isEnabled: false,
        displayOrder: 3,
      },
      {
        id: 'sec_faqs',
        title: 'Frequently Asked Questions (FAQ)',
        subtitle: '',
        type: 'faq_accordion',
        isEnabled: false,
        displayOrder: 4,
      },
      {
        id: 'sec_related',
        title: 'Related SEO Tools in Category',
        subtitle: '',
        type: 'related_tools',
        isEnabled: false,
        displayOrder: 5,
      },
    ],
    educationalContent: {
      howItWorks: '',
      formulaMethodology: '',
      stepByStepGuide: [],
    },
    faqs: [],
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
    sections: [
      {
        id: 'sec_hero',
        title: 'Tool Header & Summary Section',
        subtitle: 'Tool H1 headline, badge, and short summary',
        type: 'hero_header',
        isEnabled: true,
        displayOrder: 0,
      },
      {
        id: 'sec_engine',
        title: 'Interactive Tool Execution Engine Canvas',
        subtitle: 'Primary interactive calculator / simulator inputs and live metrics',
        type: 'interactive_engine',
        isEnabled: true,
        displayOrder: 1,
      },
      {
        id: 'sec_guide',
        title: 'Technical Execution Guide & Formula Methodology',
        subtitle: '',
        type: 'educational_methodology',
        isEnabled: false,
        displayOrder: 2,
      },
      {
        id: 'sec_tutorial',
        title: 'Step-by-Step Practical Tutorial',
        subtitle: '',
        type: 'step_tutorial',
        isEnabled: false,
        displayOrder: 3,
      },
      {
        id: 'sec_faqs',
        title: 'Frequently Asked Questions (FAQ)',
        subtitle: '',
        type: 'faq_accordion',
        isEnabled: false,
        displayOrder: 4,
      },
      {
        id: 'sec_related',
        title: 'Related SEO Tools in Category',
        subtitle: '',
        type: 'related_tools',
        isEnabled: false,
        displayOrder: 5,
      },
    ],
    educationalContent: {
      howItWorks: '',
      formulaMethodology: '',
      stepByStepGuide: [],
    },
    faqs: [],
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
    sections: [
      {
        id: 'sec_hero',
        title: 'Tool Header & Summary Section',
        subtitle: 'Tool H1 headline, badge, and short summary',
        type: 'hero_header',
        isEnabled: true,
        displayOrder: 0,
      },
      {
        id: 'sec_engine',
        title: 'Interactive Tool Execution Engine Canvas',
        subtitle: 'Primary interactive calculator / simulator inputs and live metrics',
        type: 'interactive_engine',
        isEnabled: true,
        displayOrder: 1,
      },
      {
        id: 'sec_guide',
        title: 'Technical Execution Guide & Formula Methodology',
        subtitle: '',
        type: 'educational_methodology',
        isEnabled: false,
        displayOrder: 2,
      },
      {
        id: 'sec_tutorial',
        title: 'Step-by-Step Practical Tutorial',
        subtitle: '',
        type: 'step_tutorial',
        isEnabled: false,
        displayOrder: 3,
      },
      {
        id: 'sec_faqs',
        title: 'Frequently Asked Questions (FAQ)',
        subtitle: '',
        type: 'faq_accordion',
        isEnabled: false,
        displayOrder: 4,
      },
      {
        id: 'sec_related',
        title: 'Related SEO Tools in Category',
        subtitle: '',
        type: 'related_tools',
        isEnabled: false,
        displayOrder: 5,
      },
    ],
    educationalContent: {
      howItWorks:
        "A page can load quickly and still feel bad to use.\n\nYou click a button and it moves. You start reading and an image pushes the text down. An ad appears and the content jumps.\n\nThat's the kind of problem CLS (Cumulative Layout Shift) is meant to measure.\n\nUse the calculator to work with the three Core Web Vitals:\n* CLS for visual stability\n* LCP for loading performance\n* INP for interaction responsiveness\n\nThe CLS calculator lets you change the Impact Fraction and Distance Fraction and see how they affect the layout-shift score. You can also enter LCP and INP values to check them against their recommended thresholds.",
      formulaMethodology:
        "Layout Shift Score = Impact Fraction × Distance Fraction\n\nImpact Fraction represents the portion of the viewport affected by the shift. If a large part of the visible page is affected, the impact fraction is larger.\n\nDistance Fraction describes how far the affected content moved compared with the viewport. A small movement produces a smaller value; a larger movement produces a larger value.\n\nGoogle's current thresholds are:\n- 0.10 or less: Good\n- More than 0.10 up to 0.25: Needs Improvement\n- More than 0.25: Poor",
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Start with the score',
          stepDescription: 'Find out whether the page is in the Good, Needs Improvement, or Poor range.',
        },
        {
          id: 'step_2',
          stepTitle: 'Find the shift',
          stepDescription: 'Use a browser performance tool or field data to identify what actually moved.',
        },
        {
          id: 'step_3',
          stepTitle: 'Find the cause',
          stepDescription: 'Determine whether it was an image, ad, font, iframe, dynamic component or something else.',
        },
        {
          id: 'step_4',
          stepTitle: 'Reserve the space',
          stepDescription: 'Where appropriate, make the expected dimensions known before the content arrives.',
        },
        {
          id: 'step_5',
          stepTitle: 'Measure again',
          stepDescription: "Don't assume a fix worked because the code looks right. Test the page again.",
        },
      ],
    },
    faqs: [],
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
    shortSummary:
      'Writing something can be technically correct and still be difficult to read. Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, and sentence complexity in real time.',
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
    sections: [
      {
        id: 'sec_hero',
        title: 'Tool Header & Summary Section',
        subtitle: 'Tool H1 headline, badge, and short summary',
        type: 'hero_header',
        isEnabled: true,
        displayOrder: 0,
      },
      {
        id: 'sec_engine',
        title: 'Interactive Tool Execution Engine Canvas',
        subtitle: 'Primary interactive calculator / simulator inputs and live metrics',
        type: 'interactive_engine',
        isEnabled: true,
        displayOrder: 1,
      },
      {
        id: 'sec_guide',
        title: 'Technical Execution Guide & Formula Methodology',
        subtitle: '',
        type: 'educational_methodology',
        isEnabled: false,
        displayOrder: 2,
      },
      {
        id: 'sec_tutorial',
        title: 'Step-by-Step Practical Tutorial',
        subtitle: '',
        type: 'step_tutorial',
        isEnabled: false,
        displayOrder: 3,
      },
      {
        id: 'sec_faqs',
        title: 'Frequently Asked Questions (FAQ)',
        subtitle: '',
        type: 'faq_accordion',
        isEnabled: false,
        displayOrder: 4,
      },
    ],
    educationalContent: {
      howItWorks:
        'Writing something can be technically correct and still be difficult to read. This analyzer gives you a quick way to check that. Paste your text into the tool and it calculates Flesch Reading Ease, Flesch-Kincaid Grade Level, syllable count, word count, sentence count, and other basic readability measurements.',
      formulaMethodology:
        'Flesch Reading Ease: 206.835 − 1.015 × (words / sentences) − 84.6 × (syllables / words)\nFlesch-Kincaid Grade Level: 0.39 × (words / sentences) + 11.8 × (syllables / words) − 15.59',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Write normally',
          stepDescription: "Don't constantly watch the score while drafting.",
        },
        {
          id: 'step_2',
          stepTitle: 'Run the text through the analyzer',
          stepDescription: 'Look at the overall score and the supporting numbers.',
        },
        {
          id: 'step_3',
          stepTitle: 'Find the difficult parts',
          stepDescription: 'Look for long sentences, dense paragraphs, unnecessary jargon, and repeated ideas.',
        },
        {
          id: 'step_4',
          stepTitle: 'Edit the actual writing',
          stepDescription: 'Split long sentences. Remove words that don\'t add anything. Explain unfamiliar terminology where needed.',
        },
        {
          id: 'step_5',
          stepTitle: 'Run the text again & read the final version yourself',
          stepDescription: 'See whether the changes improved the score without making the writing less useful.',
        },
      ],
    },
    faqs: [],
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
  {
    id: 'tool_compress_pdf',
    title: 'Compress PDF - Online PDF File Size Reducer',
    slug: 'compress-pdf',
    shortSummary:
      'Compress PDF documents online without quality loss. Optimize PDF file size for fast web loading, mobile downloads, and Googlebot crawl budget.',
    icon: 'FileDown',
    badge: 'New',
    categoryId: 'cat_technical_seo',
    subCategoryId: 'subcat_crawl_directives',
    status: 'published',
    isActive: true,
    displayOrder: 13,
    usageCount: 142,
    engineType: 'compress-pdf',
    defaultInputConfig: createDefaultToolInputConfig(),
    sections: [
      {
        id: 'sec_hero',
        title: 'Tool Header & Summary Section',
        subtitle: 'Tool H1 headline, badge, and short summary',
        type: 'hero_header',
        isEnabled: true,
        displayOrder: 0,
      },
      {
        id: 'sec_engine',
        title: 'Interactive Tool Execution Engine Canvas',
        subtitle: 'Primary interactive calculator / simulator inputs and live metrics',
        type: 'interactive_engine',
        isEnabled: true,
        displayOrder: 1,
      },
      {
        id: 'sec_guide',
        title: 'Technical Execution Guide & Formula Methodology',
        subtitle: '',
        type: 'educational_methodology',
        isEnabled: false,
        displayOrder: 2,
      },
      {
        id: 'sec_tutorial',
        title: 'Step-by-Step Practical Tutorial',
        subtitle: '',
        type: 'step_tutorial',
        isEnabled: false,
        displayOrder: 3,
      },
      {
        id: 'sec_faqs',
        title: 'Frequently Asked Questions (FAQ)',
        subtitle: '',
        type: 'faq_accordion',
        isEnabled: false,
        displayOrder: 4,
      },
      {
        id: 'sec_related',
        title: 'Related SEO Tools in Category',
        subtitle: '',
        type: 'related_tools',
        isEnabled: false,
        displayOrder: 5,
      },
    ],
    educationalContent: {
      howItWorks:
        'Analyzes PDF object dictionaries, cross-reference tables, and font streams to eliminate redundant bytes and compress stream structures while preserving vector typography sharpness.',
      formulaMethodology:
        'Size Reduction % = ((Original Bytes − Compressed Bytes) / Original Bytes) × 100. Stream compaction strips non-essential metadata and compacts cross-reference tables.',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Upload or Drag & Drop PDF',
          stepDescription: 'Select any standard PDF document from your device or test with an instant preset sample.',
        },
        {
          id: 'step_2',
          stepTitle: 'Choose Compression Preset',
          stepDescription: 'Select between Extreme (~78% reduction), Recommended (~62% reduction), or Low Compression.',
        },
        {
          id: 'step_3',
          stepTitle: 'Download Optimized Document',
          stepDescription: 'Save your compressed PDF file instantly with stripped metadata and optimized web performance.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_pdf_1',
        question: 'How does in-browser PDF compression work?',
        answer:
          'PDF compression removes redundant data streams, compacts font subsets, reorganizes cross-reference tables, and strips unnecessary metadata directly inside your browser.',
      },
      {
        id: 'faq_pdf_2',
        question: 'Why does PDF file size matter for Googlebot and SEO?',
        answer:
          'Google crawls and indexes PDFs just like HTML pages. Heavy PDFs consume excessive crawl budget and cause mobile download delays.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'Compress PDF Online - Free PDF File Size Reducer & Optimizer | Veritas SEO',
        'Compress and optimize PDF file sizes directly in your browser. Reduce document weight for faster downloads, better mobile UX, and crawl budget efficiency.',
        'https://veritas-seo.dev/tool/compress-pdf'
      ),
      focusKeyword: 'compress pdf online',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
  {
    id: 'tool_youtube_revenue',
    title: 'YouTube Revenue Calculator',
    slug: 'youtube-revenue-calculator',
    shortSummary: 'Calculate YouTube estimated revenue, RPM, Shorts earnings, income goals, and compound growth projections.',
    icon: 'Youtube',
    badge: 'New',
    categoryId: 'cat_creator_tools',
    subCategoryId: 'subcat_youtube_creator',
    status: 'published',
    isActive: true,
    displayOrder: 14,
    usageCount: 184,
    engineType: 'youtube-revenue-calculator',
    defaultInputConfig: createDefaultToolInputConfig(),
    sections: [
      {
        id: 'sec_hero',
        title: 'Tool Header & Summary Section',
        subtitle: 'Tool H1 headline, badge, and short summary',
        type: 'hero_header',
        isEnabled: true,
        displayOrder: 0,
      },
      {
        id: 'sec_engine',
        title: 'Interactive Tool Execution Engine Canvas',
        subtitle: 'Primary interactive calculator / simulator inputs and live metrics',
        type: 'interactive_engine',
        isEnabled: true,
        displayOrder: 1,
      },
      {
        id: 'sec_guide',
        title: 'Technical Execution Guide & Formula Methodology',
        subtitle: 'Comprehensive guide to YouTube RPM, CPM, and monetization mechanics',
        type: 'educational_methodology',
        isEnabled: false,
        displayOrder: 2,
      },
      {
        id: 'sec_tutorial',
        title: 'Step-by-Step Practical Tutorial',
        subtitle: '',
        type: 'step_tutorial',
        isEnabled: false,
        displayOrder: 3,
      },
      {
        id: 'sec_faqs',
        title: 'Frequently Asked Questions (FAQ)',
        subtitle: '',
        type: 'faq_accordion',
        isEnabled: false,
        displayOrder: 4,
      },
      {
        id: 'sec_related',
        title: 'Related SEO Tools in Category',
        subtitle: '',
        type: 'related_tools',
        isEnabled: false,
        displayOrder: 5,
      },
    ],
    educationalContent: {
      howItWorks:
        'Estimates YouTube earnings from views and net creator RPM. Also calculates required views for income goals, reverse RPM, hybrid Long-form + Shorts blended RPM, What-If variations, 3-tier scenario spreads, and multi-month compound projections.',
      formulaMethodology:
        'Estimated Revenue = (Views ÷ 1,000) × RPM. Required Views = (Income Goal ÷ RPM) × 1,000. Blended RPM = (Total Revenue ÷ Total Views) × 1,000.',
      stepByStepGuide: [
        {
          id: 'step_1',
          stepTitle: 'Enter Your View Volume',
          stepDescription: 'Input your monthly or per-video view count for Long-form videos and YouTube Shorts.',
        },
        {
          id: 'step_2',
          stepTitle: 'Set Creator RPM',
          stepDescription: 'Enter your channel RPM from YouTube Studio Analytics or custom rate.',
        },
        {
          id: 'step_3',
          stepTitle: 'Explore Scenarios & Projections',
          stepDescription: 'Switch between Income Goal planning, What-If simulation, 3-Tier Scenarios, and 12-Month Projections.',
        },
      ],
    },
    faqs: [
      {
        id: 'faq_yt_1',
        question: 'How does this YouTube Revenue Calculator work?',
        answer:
          'It calculates estimated revenue from your view count and net creator RPM (Revenue Per Mille). Long-form and Shorts earnings can be modeled individually or blended proportionally for hybrid channels.',
      },
      {
        id: 'faq_yt_2',
        question: 'What is the difference between CPM and RPM?',
        answer:
          'CPM (Cost Per Mille) is what advertisers pay to YouTube per 1,000 ad impressions before YouTube takes its revenue share. RPM (Revenue Per Mille) is your actual net creator earnings per 1,000 total video views across all monetization sources.',
      },
      {
        id: 'faq_yt_3',
        question: 'How many views are required to earn ₹1,00,000 ($1,200) per month?',
        answer:
          'At an RPM of ₹100 ($1.20), a channel needs 1,000,000 monthly views (approximately 32,852 daily views). If your RPM is ₹200 ($2.40), 500,000 monthly views are required for the same target.',
      },
      {
        id: 'faq_yt_4',
        question: 'Why are YouTube Shorts earnings calculated separately from long-form videos?',
        answer:
          'Shorts and long-form videos use different monetization structures. Long-form video ads run directly on videos, while Shorts ad revenue is pooled across the Shorts feed and shared among eligible creators, typically resulting in different RPM rates.',
      },
      {
        id: 'faq_yt_5',
        question: 'Does the calculator connect directly to my YouTube Studio?',
        answer:
          'No. The calculator is a standalone mathematical planning tool that does not access or connect to private YouTube Studio accounts. You enter your own metrics from YouTube Studio Analytics directly into the tool.',
      },
    ],
    seo: {
      ...createDefaultSeoMetadata(
        'YouTube Revenue Calculator | Estimate Views to Income & RPM',
        'Calculate estimated YouTube earnings, RPM, Shorts revenue, and required views for income goals. Free YouTube revenue calculator with real-time calculations and scenario planning.',
        'https://veritas-seo.dev/tool/youtube-revenue-calculator'
      ),
      focusKeyword: 'youtube revenue calculator',
    },
    createdAt: PRESET_TIMESTAMP,
    updatedAt: PRESET_TIMESTAMP,
  },
];

export const DEMO_PRESET_REDIRECTS: RedirectRule[] = [
  {
    id: 'redir_direct_yt_calc',
    fromPath: '/youtube-revenue-calculator',
    toPath: '/tool/youtube-revenue-calculator',
    statusCode: 301,
    reason: 'Direct shortcut route for YouTube Revenue Calculator',
    entityType: 'tool',
    entityId: 'tool_youtube_revenue',
    hits: 12,
    createdAt: PRESET_TIMESTAMP,
  },
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
