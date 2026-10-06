import type {
  WebApplication,
  FAQPage,
  BreadcrumbList,
  CollectionPage,
  WithContext,
  Question,
  Answer,
  ListItem,
} from 'schema-dts';
import type { MainCategory, SubCategory, SeoTool } from './schemas';

/**
 * Builds Google-compliant WebApplication / SoftwareApplication JSON-LD schema
 */
export function generateToolWebApplicationSchema(
  tool: SeoTool,
  category?: MainCategory | null,
  subCategory?: SubCategory | null,
  siteBaseUrl = 'https://veritas-seo.dev'
): WithContext<WebApplication> {
  const toolUrl = `${siteBaseUrl}/tool/${tool.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${toolUrl}#software`,
    name: tool.title,
    headline: tool.seo.metaTitle || tool.title,
    description: tool.seo.metaDescription || tool.shortSummary,
    url: toolUrl,
    applicationCategory: tool.seo.schemaApplicationCategory || 'BusinessApplication',
    operatingSystem: 'All Modern Web Browsers (Chrome, Safari, Firefox, Edge)',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    featureList: [
      tool.shortSummary,
      'Real-time Metric Calculation',
      'Scenario & Projection Modeling',
    ].filter(Boolean),
    publisher: {
      '@type': 'Organization',
      name: 'Veritas SEO Platform',
      url: siteBaseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteBaseUrl}/favicon.ico`,
      },
    },
    inLanguage: 'en-US',
  };
}

/**
 * Builds Google-compliant FAQPage JSON-LD schema
 */
export function generateFaqPageSchema(
  faqs: { question: string; answer: string }[],
  pageUrl: string
): WithContext<FAQPage> | null {
  if (!faqs || faqs.length === 0) return null;

  const mainEntity: Question[] = faqs.map((faq) => {
    const answerObj: Answer = {
      '@type': 'Answer',
      text: faq.answer,
    };

    return {
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: answerObj,
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity,
  };
}

/**
 * Builds Google-compliant BreadcrumbList JSON-LD schema
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
  siteBaseUrl = 'https://veritas-seo.dev'
): WithContext<BreadcrumbList> {
  const itemListElement: ListItem[] = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : `${siteBaseUrl}${item.url}`,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

/**
 * Builds Google-compliant CollectionPage JSON-LD schema for Category / Subcategory hubs
 */
export function generateCollectionPageSchema(
  category: MainCategory | SubCategory,
  tools: SeoTool[],
  pageUrl: string,
  siteBaseUrl = 'https://veritas-seo.dev'
): WithContext<CollectionPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    name: category.name,
    description: category.seo.metaDescription || category.description,
    url: pageUrl,
    hasPart: tools.map((t) => ({
      '@type': 'WebApplication',
      name: t.title,
      description: t.shortSummary,
      url: `${siteBaseUrl}/tool/${t.slug}`,
    })),
  };
}
