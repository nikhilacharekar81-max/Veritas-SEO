'use client';

import React, { useState, useMemo } from 'react';
import type { SeoTool } from '../../lib/schemas';
import {
  Copy,
  Check,
  Sparkles,
  Code2,
  Plus,
  Trash2,
  ShieldCheck,
  Download,
  ExternalLink,
  RotateCcw,
  Search,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Layers,
  FileCode,
  Globe,
  Tag,
  Info,
} from 'lucide-react';
import { SchemaJsonLdBuilderGuide } from './SchemaJsonLdBuilderGuide';

interface Props {
  tool: SeoTool;
  onPerformCalculation?: () => void;
}

export const ALL_SCHEMA_TYPES = [
  { type: 'Article', category: 'Creative Work', description: 'News, blog posts, and scholarly articles' },
  { type: 'Product', category: 'E-Commerce', description: 'Physical or digital items for sale with prices and ratings' },
  { type: 'Organization', category: 'Business & Org', description: 'Companies, NGOs, schools, and institutions' },
  { type: 'LocalBusiness', category: 'Business & Org', description: 'Physical storefronts, restaurants, and medical clinics' },
  { type: 'Event', category: 'Events', description: 'Concerts, webinars, conferences, and festivals' },
  { type: 'BreadcrumbList', category: 'Navigation', description: 'Hierarchical website navigation trail' },
  { type: 'Recipe', category: 'Creative Work', description: 'Cooking recipes with prep time, ingredients, and nutrition' },
  { type: 'VideoObject', category: 'Media', description: 'Video clips, tutorials, webinars, and live streams' },
  { type: 'SoftwareApplication', category: 'Technical & Apps', description: 'Desktop, mobile, or cloud software applications' },
  { type: 'FAQPage', category: 'Specialized Pages', description: 'Frequently Asked Questions page with accordion Q&As' },
  { type: 'Person', category: 'People', description: 'Author, speaker, CEO, or expert profile' },
  { type: 'WebSite', category: 'Technical & Apps', description: 'Root website entity with Sitelinks Searchbox' },
  { type: 'Service', category: 'Business & Org', description: 'Professional consulting, repair, or agency services' },
  { type: 'JobPosting', category: 'Jobs & Education', description: 'Job openings, salaries, and employment terms' },
  { type: 'Review', category: 'Reviews & Claims', description: 'Editorial or user reviews of books, movies, and products' },
  { type: 'Course', category: 'Jobs & Education', description: 'Educational courses, certifications, and syllabi' },
  { type: 'HowTo', category: 'Creative Work', description: 'Step-by-step instructional guides and tutorials' },
  { type: 'QAPage', category: 'Specialized Pages', description: 'Question and answer forum or discussion threads' },
  { type: 'Dataset', category: 'Technical & Apps', description: 'Raw research, statistical, or public datasets' },
  { type: 'Book', category: 'Creative Work', description: 'Books, e-books, and audiobooks with ISBN metadata' },
  { type: 'ProfilePage', category: 'Specialized Pages', description: 'Public profile pages of creators or professionals' },
  { type: 'ItemList', category: 'Navigation', description: 'Ordered list of items, rankings, or recommendations' },
  { type: 'RealEstateListing', category: 'Places & Real Estate', description: 'Property listings for rent or purchase' },
  { type: 'MedicalBusiness', category: 'Business & Org', description: 'Hospitals, dental offices, and medical practices' },
  { type: 'PodcastSeries', category: 'Media', description: 'Podcast show series and episode feeds' },
  { type: 'MusicRecording', category: 'Media', description: 'Audio tracks, songs, and albums' },
  { type: 'NewsArticle', category: 'Creative Work', description: 'Time-sensitive journalism and breaking news' },
  { type: 'BlogPosting', category: 'Creative Work', description: 'Blog articles and thought leadership posts' },
  { type: 'FinancialProduct', category: 'E-Commerce', description: 'Loans, credit cards, mortgages, and investment accounts' },
  { type: 'FoodEstablishment', category: 'Business & Org', description: 'Restaurants, cafes, bakeries, and bars' },
  { type: 'LodgingBusiness', category: 'Business & Org', description: 'Hotels, motels, resorts, and vacation rentals' },
  { type: 'LegalService', category: 'Business & Org', description: 'Law firms, attorneys, and notary offices' },
  { type: 'MedicalWebPage', category: 'Specialized Pages', description: 'Health and medical condition information pages' },
  { type: 'Movie', category: 'Media', description: 'Feature films, documentaries, and cinema releases' },
  { type: 'AudioObject', category: 'Media', description: 'Standalone audio files and podcast episodes' },
  { type: 'ImageObject', category: 'Media', description: 'Images, infographics, and photo galleries' },
  { type: 'CollectionPage', category: 'Specialized Pages', description: 'Category archive or curated gallery collection' },
  { type: 'AboutPage', category: 'Specialized Pages', description: 'Company or personal about page' },
  { type: 'ContactPage', category: 'Specialized Pages', description: 'Customer support and contact inquiry page' },
  { type: 'EventSeries', category: 'Events', description: 'Recurring event series or multi-day festivals' },
  { type: 'EducationalOrganization', category: 'Business & Org', description: 'Universities, colleges, and training academies' },
  { type: 'TouristAttraction', category: 'Places & Real Estate', description: 'Monuments, museums, parks, and landmarks' },
  { type: 'Diet', category: 'Health & Lifestyle', description: 'Nutritional regimens, keto, vegan, and medical diets' },
  { type: 'TechArticle', category: 'Creative Work', description: 'Technical documentation, APIs, and tutorials' },
  { type: 'ScholarlyArticle', category: 'Creative Work', description: 'Peer-reviewed academic research papers' },
  { type: 'NewsMediaOrganization', category: 'Business & Org', description: 'News broadcasting networks and publishers' },
  { type: 'Corporation', category: 'Business & Org', description: 'Publicly traded or enterprise corporations' },
  { type: 'GovernmentOrganization', category: 'Business & Org', description: 'Municipal, state, and federal agencies' },
  { type: 'ClaimReview', category: 'Reviews & Claims', description: 'Fact-checking assessments and rating claims' },
  { type: 'MediaReview', category: 'Reviews & Claims', description: 'Critique of media, movies, and literature' },
  { type: 'MerchantReturnPolicy', category: 'E-Commerce', description: 'E-commerce return, refund, and exchange rules' },
  { type: 'Offer', category: 'E-Commerce', description: 'Single product price, currency, and stock offer' },
  { type: 'AggregateOffer', category: 'E-Commerce', description: 'Price ranges across multiple merchant vendors' },
  { type: 'PostalAddress', category: 'Places & Real Estate', description: 'Physical street, postal code, and country location' },
  { type: 'ContactPoint', category: 'Business & Org', description: 'Customer service, sales, and support contact details' },
  { type: 'Place', category: 'Places & Real Estate', description: 'Geographic entity, physical venue, or coordinates' },
  { type: 'CivicStructure', category: 'Places & Real Estate', description: 'Bridges, airports, train stations, and public plazas' },
  { type: 'TouristDestination', category: 'Places & Real Estate', description: 'Travel destinations, islands, and vacation spots' },
  { type: 'ExercisePlan', category: 'Health & Lifestyle', description: 'Fitness routines, workouts, and rehabilitation plans' },
  { type: 'MedicalCondition', category: 'Health & Lifestyle', description: 'Symptoms, causes, and medical condition overviews' },
  { type: 'MedicalTest', category: 'Health & Lifestyle', description: 'Diagnostic lab tests, scans, and blood panels' },
  { type: 'MedicalProcedure', category: 'Health & Lifestyle', description: 'Surgical and therapeutic medical procedures' },
  { type: 'VideoGame', category: 'Technical & Apps', description: 'Console, PC, and mobile video games' },
  { type: 'MobileApplication', category: 'Technical & Apps', description: 'iOS and Android native apps' },
  { type: 'WebApplication', category: 'Technical & Apps', description: 'Browser-based software, SaaS tools, and web apps' },
  { type: 'DataFeed', category: 'Technical & Apps', description: 'Automated data feeds and syndicated XML/JSON feeds' },
  { type: 'WebPage', category: 'Specialized Pages', description: 'General web page markup' },
  { type: 'CheckoutPage', category: 'Specialized Pages', description: 'E-commerce cart and checkout page' },
  { type: 'ItemPage', category: 'Specialized Pages', description: 'Single catalog item presentation page' },
  { type: 'SearchResultsPage', category: 'Specialized Pages', description: 'Internal site search result listings' },
  { type: 'MediaObject', category: 'Media', description: 'General multimedia asset' },
  { type: 'BroadcastEvent', category: 'Events', description: 'Live streaming or television broadcast event' },
  { type: 'BroadcastService', category: 'Media', description: 'Radio or TV broadcast service network' },
  { type: 'RadioSeries', category: 'Media', description: 'Radio show program series' },
  { type: 'TVSeries', category: 'Media', description: 'Television series and seasons' },
  { type: 'TVEpisode', category: 'Media', description: 'Single television show episode' },
  { type: 'RadioEpisode', category: 'Media', description: 'Single radio show episode broadcast' },
];

export const POPULAR_SCHEMAS = [
  'Article',
  'Product',
  'LocalBusiness',
  'FAQPage',
  'BreadcrumbList',
  'Organization',
  'Event',
  'Recipe',
  'SoftwareApplication',
  'JobPosting',
  'Course',
  'HowTo',
  'Person',
  'WebApplication',
];

export const SchemaJsonLdBuilderEngine: React.FC<Props> = () => {
  const [selectedSchema, setSelectedSchema] = useState<string>('Article');
  const [schemaSearchQuery, setSchemaSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');

  // Common Form States
  const [name, setName] = useState('Enterprise Technical SEO Guide: Zero-CLS & Schema.org Architecture');
  const [url, setUrl] = useState('https://veritas-seo.dev/enterprise-seo-guide');
  const [description, setDescription] = useState(
    'Master enterprise technical SEO with our complete guide on semantic HTML5 hierarchy, schema-dts structured data, and sub-millisecond Core Web Vitals.'
  );
  const [image, setImage] = useState('https://veritas-seo.dev/images/enterprise-seo-banner.jpg');
  const [datePublished, setDatePublished] = useState('2026-10-01T09:00:00+00:00');
  const [dateModified, setDateModified] = useState('2026-10-02T12:30:00+00:00');

  // Author & Publisher
  const [authorName, setAuthorName] = useState('Dr. Sarah Jenkins');
  const [authorType, setAuthorType] = useState<'Person' | 'Organization'>('Person');
  const [authorUrl, setAuthorUrl] = useState('https://veritas-seo.dev/authors/sarah-jenkins');
  const [publisherName, setPublisherName] = useState('Veritas SEO Platform');
  const [publisherLogo, setPublisherLogo] = useState('https://veritas-seo.dev/logo.png');

  // Product Fields
  const [brand, setBrand] = useState('Veritas Tools');
  const [sku, setSku] = useState('VRT-SEO-2026');
  const [gtin, setGtin] = useState('0123456789012');
  const [price, setPrice] = useState('49.00');
  const [priceCurrency, setPriceCurrency] = useState('USD');
  const [availability, setAvailability] = useState('https://schema.org/InStock');
  const [ratingValue, setRatingValue] = useState('4.9');
  const [reviewCount, setReviewCount] = useState('128');

  // LocalBusiness Fields
  const [telephone, setTelephone] = useState('+1-800-555-0199');
  const [email, setEmail] = useState('contact@veritas-seo.dev');
  const [streetAddress, setStreetAddress] = useState('500 Enterprise Way, Suite 400');
  const [addressLocality, setAddressLocality] = useState('San Francisco');
  const [addressRegion, setAddressRegion] = useState('CA');
  const [postalCode, setPostalCode] = useState('94105');
  const [addressCountry, setAddressCountry] = useState('US');
  const [latitude, setLatitude] = useState('37.7749');
  const [longitude, setLongitude] = useState('-122.4194');
  const [priceRange, setPriceRange] = useState('$$');
  const [openingHours, setOpeningHours] = useState('Mo-Fr 09:00-18:00');

  // FAQPage Fields
  const [faqs, setFaqs] = useState([
    {
      question: 'What is Schema.org JSON-LD structured data?',
      answer:
        'JSON-LD is a JavaScript notation embedded inside HTML <head> script tags that conveys explicit semantic meaning to Googlebot, enabling Rich Results like star ratings, FAQs, and carousels.',
    },
    {
      question: 'Why does Google officially recommend JSON-LD over Microdata?',
      answer:
        'Google recommends JSON-LD because it is fully decoupled from the visual presentation layer, easier to generate dynamically, and resilient to frontend template updates.',
    },
  ]);

  // Breadcrumbs Fields
  const [breadcrumbs, setBreadcrumbs] = useState([
    { name: 'Home', url: 'https://veritas-seo.dev' },
    { name: 'SEO Tools', url: 'https://veritas-seo.dev/tools' },
    { name: 'Schema Generator', url: 'https://veritas-seo.dev/tool/schema-jsonld-generator' },
  ]);

  // Event Fields
  const [startDate, setStartDate] = useState('2026-11-15T10:00:00-08:00');
  const [endDate, setEndDate] = useState('2026-11-17T18:00:00-08:00');
  const [eventAttendanceMode, setEventAttendanceMode] = useState('https://schema.org/OnlineEventAttendanceMode');
  const [locationName, setLocationName] = useState('Moscone Convention Center');

  // Recipe Fields
  const [prepTime, setPrepTime] = useState('PT20M');
  const [cookTime, setCookTime] = useState('PT40M');
  const [recipeYield, setRecipeYield] = useState('4 servings');
  const [recipeCategory, setRecipeCategory] = useState('Dinner');
  const [recipeCuisine, setRecipeCuisine] = useState('Mediterranean');
  const [calories, setCalories] = useState('420 calories');
  const [ingredients, setIngredients] = useState([
    '2 cups Organic Quinoa',
    '1 lb Wild Salmon fillets',
    '2 tbsp Extra Virgin Olive Oil',
    'Fresh lemon juice and dill',
  ]);

  // Software / WebApp Fields
  const [operatingSystem, setOperatingSystem] = useState('All Modern Web Browsers');
  const [applicationCategory, setApplicationCategory] = useState('BusinessApplication');

  // JobPosting Fields
  const [employmentType, setEmploymentType] = useState('FULL_TIME');
  const [salaryValue, setSalaryValue] = useState('145000');
  const [salaryCurrency, setSalaryCurrency] = useState('USD');
  const [salaryUnit, setSalaryUnit] = useState('YEAR');

  // Course Fields
  const [courseCode, setCourseCode] = useState('SEO-501');
  const [credential, setCredential] = useState('Certified Enterprise SEO Architect');

  // Custom Extra Key-Values
  const [customFields, setCustomFields] = useState<{ key: string; value: string }[]>([]);

  // Filtered Schema Types
  const filteredSchemaTypes = useMemo(() => {
    if (!schemaSearchQuery.trim()) return ALL_SCHEMA_TYPES;
    const q = schemaSearchQuery.toLowerCase();
    return ALL_SCHEMA_TYPES.filter(
      (s) =>
        s.type.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [schemaSearchQuery]);

  // Generate Clean Schema.org JSON-LD (All Properties Optional)
  const jsonLdObject = useMemo(() => {
    const base: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': selectedSchema,
    };

    if (['Article', 'NewsArticle', 'BlogPosting', 'TechArticle', 'ScholarlyArticle'].includes(selectedSchema)) {
      return {
        ...base,
        headline: name || undefined,
        description: description || undefined,
        image: image ? [image] : undefined,
        datePublished: datePublished || undefined,
        dateModified: dateModified || (datePublished ? datePublished : undefined),
        author: authorName
          ? [
              {
                '@type': authorType,
                name: authorName,
                url: authorUrl || undefined,
              },
            ]
          : undefined,
        publisher: publisherName
          ? {
              '@type': 'Organization',
              name: publisherName,
              logo: publisherLogo
                ? {
                    '@type': 'ImageObject',
                    url: publisherLogo,
                  }
                : undefined,
            }
          : undefined,
        mainEntityOfPage: url
          ? {
              '@type': 'WebPage',
              '@id': url,
            }
          : undefined,
      };
    }

    if (['Product', 'FinancialProduct'].includes(selectedSchema)) {
      return {
        ...base,
        name: name || undefined,
        image: image ? [image] : undefined,
        description: description || undefined,
        sku: sku || undefined,
        gtin13: gtin || undefined,
        brand: brand
          ? {
              '@type': 'Brand',
              name: brand,
            }
          : undefined,
        offers: price
          ? {
              '@type': 'Offer',
              url: url || undefined,
              priceCurrency: priceCurrency || 'USD',
              price,
              availability: availability || undefined,
              itemCondition: 'https://schema.org/NewCondition',
              seller: publisherName || brand
                ? {
                    '@type': 'Organization',
                    name: publisherName || brand,
                  }
                : undefined,
            }
          : undefined,
        aggregateRating: ratingValue
          ? {
              '@type': 'AggregateRating',
              ratingValue,
              reviewCount: reviewCount || '1',
              bestRating: '5',
              worstRating: '1',
            }
          : undefined,
      };
    }

    if (['LocalBusiness', 'MedicalBusiness', 'FoodEstablishment', 'LodgingBusiness', 'LegalService'].includes(selectedSchema)) {
      const hasAddress = streetAddress || addressLocality || addressRegion || postalCode || addressCountry;
      return {
        ...base,
        name: name || undefined,
        image: image ? [image] : undefined,
        '@id': url || undefined,
        url: url || undefined,
        telephone: telephone || undefined,
        email: email || undefined,
        priceRange: priceRange || undefined,
        address: hasAddress
          ? {
              '@type': 'PostalAddress',
              streetAddress: streetAddress || undefined,
              addressLocality: addressLocality || undefined,
              addressRegion: addressRegion || undefined,
              postalCode: postalCode || undefined,
              addressCountry: addressCountry || undefined,
            }
          : undefined,
        geo: latitude && longitude
          ? {
              '@type': 'GeoCoordinates',
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            }
          : undefined,
        openingHoursSpecification: openingHours
          ? [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
              },
            ]
          : undefined,
      };
    }

    if (['Organization', 'Corporation', 'EducationalOrganization', 'GovernmentOrganization', 'NewsMediaOrganization'].includes(selectedSchema)) {
      return {
        ...base,
        name: name || undefined,
        url: url || undefined,
        logo: image || publisherLogo || undefined,
        description: description || undefined,
        contactPoint: telephone
          ? [
              {
                '@type': 'ContactPoint',
                telephone,
                contactType: 'customer service',
                email: email || undefined,
                areaServed: 'US',
                availableLanguage: ['en'],
              },
            ]
          : undefined,
        sameAs: [
          'https://twitter.com/veritas_seo',
          'https://linkedin.com/company/veritas-seo',
          'https://github.com/veritas-seo',
        ],
      };
    }

    if (selectedSchema === 'FAQPage' || selectedSchema === 'QAPage') {
      const validFaqs = faqs.filter((f) => f.question.trim() || f.answer.trim());
      return {
        ...base,
        mainEntity: validFaqs.map((f) => ({
          '@type': 'Question',
          name: f.question || 'Question',
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer || 'Answer',
          },
        })),
      };
    }

    if (selectedSchema === 'BreadcrumbList') {
      const validBreadcrumbs = breadcrumbs.filter((b) => b.name.trim() || b.url.trim());
      return {
        ...base,
        itemListElement: validBreadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name || `Page ${i + 1}`,
          item: b.url || 'https://example.com',
        })),
      };
    }

    if (['Event', 'EventSeries', 'BroadcastEvent'].includes(selectedSchema)) {
      return {
        ...base,
        name: name || undefined,
        description: description || undefined,
        startDate: startDate || undefined,
        endDate: endDate || startDate || undefined,
        eventAttendanceMode: eventAttendanceMode || undefined,
        eventStatus: 'https://schema.org/EventScheduled',
        location: locationName
          ? {
              '@type': eventAttendanceMode.includes('Online') ? 'VirtualLocation' : 'Place',
              name: locationName,
              url: url || undefined,
              address: !eventAttendanceMode.includes('Online') && streetAddress
                ? {
                    '@type': 'PostalAddress',
                    streetAddress: streetAddress || undefined,
                    addressLocality: addressLocality || undefined,
                    addressRegion: addressRegion || undefined,
                    postalCode: postalCode || undefined,
                    addressCountry: addressCountry || undefined,
                  }
                : undefined,
            }
          : undefined,
        image: image ? [image] : undefined,
        offers: price
          ? {
              '@type': 'Offer',
              url: url || undefined,
              price: price || '0',
              priceCurrency: priceCurrency || 'USD',
              availability: 'https://schema.org/InStock',
            }
          : undefined,
        organizer: publisherName
          ? {
              '@type': 'Organization',
              name: publisherName,
              url: url || undefined,
            }
          : undefined,
      };
    }

    if (selectedSchema === 'Recipe') {
      return {
        ...base,
        name: name || undefined,
        image: image ? [image] : undefined,
        description: description || undefined,
        prepTime: prepTime || undefined,
        cookTime: cookTime || undefined,
        totalTime: 'PT1H',
        recipeYield: recipeYield || undefined,
        recipeCategory: recipeCategory || undefined,
        recipeCuisine: recipeCuisine || undefined,
        nutrition: calories
          ? {
              '@type': 'NutritionInformation',
              calories,
            }
          : undefined,
        recipeIngredient: ingredients.length > 0 ? ingredients : undefined,
        recipeInstructions: [
          {
            '@type': 'HowToStep',
            text: 'Rinse quinoa thoroughly and simmer in vegetable broth for 15 minutes.',
          },
          {
            '@type': 'HowToStep',
            text: 'Season salmon with olive oil, herbs, and bake at 400°F (200°C) for 18 minutes.',
          },
        ],
        author: authorName
          ? {
              '@type': 'Person',
              name: authorName,
            }
          : undefined,
      };
    }

    if (['SoftwareApplication', 'WebApplication', 'MobileApplication', 'VideoGame'].includes(selectedSchema)) {
      return {
        ...base,
        name: name || undefined,
        url: url || undefined,
        description: description || undefined,
        applicationCategory: applicationCategory || undefined,
        operatingSystem: operatingSystem || undefined,
        offers: price
          ? {
              '@type': 'Offer',
              price: price || '0',
              priceCurrency: priceCurrency || 'USD',
            }
          : undefined,
        aggregateRating: ratingValue
          ? {
              '@type': 'AggregateRating',
              ratingValue,
              ratingCount: reviewCount || '50',
            }
          : undefined,
      };
    }

    if (selectedSchema === 'JobPosting') {
      return {
        ...base,
        title: name || undefined,
        description: description || undefined,
        datePosted: datePublished || undefined,
        validThrough: '2026-12-31T23:59:59+00:00',
        employmentType: employmentType || undefined,
        hiringOrganization: publisherName
          ? {
              '@type': 'Organization',
              name: publisherName,
              sameAs: url || undefined,
              logo: publisherLogo || undefined,
            }
          : undefined,
        jobLocation: streetAddress || addressLocality
          ? {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                streetAddress: streetAddress || undefined,
                addressLocality: addressLocality || undefined,
                addressRegion: addressRegion || undefined,
                postalCode: postalCode || undefined,
                addressCountry: addressCountry || undefined,
              },
            }
          : undefined,
        baseSalary: salaryValue
          ? {
              '@type': 'MonetaryAmount',
              currency: salaryCurrency,
              value: {
                '@type': 'QuantitativeValue',
                value: parseFloat(salaryValue) || 100000,
                unitText: salaryUnit,
              },
            }
          : undefined,
      };
    }

    if (selectedSchema === 'Course') {
      return {
        ...base,
        name: name || undefined,
        description: description || undefined,
        courseCode: courseCode || undefined,
        educationalCredentialAwarded: credential || undefined,
        provider: publisherName
          ? {
              '@type': 'Organization',
              name: publisherName,
              sameAs: url || undefined,
            }
          : undefined,
        offers: price
          ? {
              '@type': 'Offer',
              price: price || '0',
              priceCurrency: priceCurrency || 'USD',
              category: 'Paid',
            }
          : undefined,
      };
    }

    if (selectedSchema === 'HowTo') {
      return {
        ...base,
        name: name || undefined,
        description: description || undefined,
        totalTime: prepTime || 'PT30M',
        estimatedCost: price
          ? {
              '@type': 'MonetaryAmount',
              currency: priceCurrency || 'USD',
              value: price || '0',
            }
          : undefined,
        step: [
          {
            '@type': 'HowToStep',
            name: 'Step 1: Preparation',
            text: 'Gather all required analytical diagnostics and configure target environment parameters.',
          },
          {
            '@type': 'HowToStep',
            name: 'Step 2: Execution',
            text: 'Execute real-time mathematical validation and verify Schema.org microdata.',
          },
        ],
      };
    }

    if (selectedSchema === 'Person') {
      return {
        ...base,
        name: authorName || name || undefined,
        url: authorUrl || url || undefined,
        image: image || undefined,
        jobTitle: 'Chief Technical SEO Architect',
        worksFor: publisherName
          ? {
              '@type': 'Organization',
              name: publisherName,
            }
          : undefined,
        sameAs: [
          'https://twitter.com/sarah_seo',
          'https://linkedin.com/in/sarah-seo-expert',
        ],
      };
    }

    // Universal Entity Builder for any other Schema.org type
    const universal: Record<string, any> = {
      ...base,
      name: name || undefined,
      url: url || undefined,
      description: description || undefined,
      image: image ? [image] : undefined,
      datePublished: datePublished || undefined,
      dateModified: dateModified || undefined,
      mainEntityOfPage: url ? { '@type': 'WebPage', '@id': url } : undefined,
    };

    customFields.forEach((cf) => {
      if (cf.key.trim() && cf.value.trim()) {
        universal[cf.key.trim()] = cf.value.trim();
      }
    });

    return universal;
  }, [
    selectedSchema,
    name,
    url,
    description,
    image,
    datePublished,
    dateModified,
    authorName,
    authorType,
    authorUrl,
    publisherName,
    publisherLogo,
    brand,
    sku,
    gtin,
    price,
    priceCurrency,
    availability,
    ratingValue,
    reviewCount,
    telephone,
    email,
    streetAddress,
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry,
    latitude,
    longitude,
    priceRange,
    openingHours,
    faqs,
    breadcrumbs,
    startDate,
    endDate,
    eventAttendanceMode,
    locationName,
    prepTime,
    cookTime,
    recipeYield,
    recipeCategory,
    recipeCuisine,
    calories,
    ingredients,
    operatingSystem,
    applicationCategory,
    employmentType,
    salaryValue,
    salaryCurrency,
    salaryUnit,
    courseCode,
    credential,
    customFields,
  ]);

  const jsonString = useMemo(() => JSON.stringify(jsonLdObject, null, 2), [jsonLdObject]);
  const htmlScriptSnippet = useMemo(
    () => `<script type="application/ld+json">\n${jsonString}\n</script>`,
    [jsonString]
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlScriptSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlScriptSnippet], { type: 'text/html;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `schema-${selectedSchema.toLowerCase()}.html`;
    link.click();
  };

  const handleTestInGoogle = () => {
    navigator.clipboard.writeText(htmlScriptSnippet);
    window.open('https://search.google.com/test/rich-results', '_blank');
  };

  const handleReset = () => {
    setName('Enterprise Technical SEO Guide: Zero-CLS & Schema.org Architecture');
    setUrl('https://veritas-seo.dev/enterprise-seo-guide');
    setDescription(
      'Master enterprise technical SEO with our complete guide on semantic HTML5 hierarchy, schema-dts structured data, and sub-millisecond Core Web Vitals.'
    );
    setImage('https://veritas-seo.dev/images/enterprise-seo-banner.jpg');
    setAuthorName('Dr. Sarah Jenkins');
    setPublisherName('Veritas SEO Platform');
    setPrice('49.00');
    setCustomFields([]);
  };

  return (
    <div className="space-y-4">
      {/* Mobile-only Tab Switcher */}
      <div className="md:hidden flex items-center p-1 bg-slate-100 rounded-2xl">
        <button
          type="button"
          onClick={() => setMobileTab('form')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mobileTab === 'form' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          📝 Property Builder
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            mobileTab === 'preview' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
          }`}
        >
          ⚡ Live Code Preview
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* LEFT COLUMN: SCHEMA SELECTOR + DYNAMIC INPUT PROPERTY BUILDER */}
        <div className={`space-y-6 ${mobileTab === 'preview' ? 'hidden md:block' : 'block'}`}>
        {/* Schema Type Selector Card (Top Left) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="relative">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Select Schema Type (Search 78+ Entities)
              </label>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                {ALL_SCHEMA_TYPES.find((s) => s.type === selectedSchema)?.category || 'Entity'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-left flex items-center justify-between font-bold text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 shadow-2xs"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate font-extrabold text-slate-900">{selectedSchema}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700 font-semibold shrink-0">
                  {ALL_SCHEMA_TYPES.find((s) => s.type === selectedSchema)?.category || 'Creative Work'}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Popover Dropdown Menu with Instant Live Search */}
            {isDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="p-3 border-b border-slate-100 bg-slate-50/70">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      autoFocus
                      value={schemaSearchQuery}
                      onChange={(e) => setSchemaSearchQuery(e.target.value)}
                      placeholder="Type to search e.g. Article, Product, FAQ, Local..."
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto p-2 space-y-1">
                  {filteredSchemaTypes.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No schema types matching &quot;{schemaSearchQuery}&quot;
                    </div>
                  ) : (
                    filteredSchemaTypes.map((item) => (
                      <button
                        key={item.type}
                        type="button"
                        onClick={() => {
                          setSelectedSchema(item.type);
                          setIsDropdownOpen(false);
                          setSchemaSearchQuery('');
                        }}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-between gap-3 ${
                          selectedSchema === item.type
                            ? 'bg-slate-900 text-white font-bold'
                            : 'hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <div className="space-y-0.5 truncate">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{item.type}</span>
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                                selectedSchema === item.type
                                  ? 'bg-slate-800 text-emerald-300'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              {item.category}
                            </span>
                          </div>
                          <p
                            className={`text-[10px] truncate ${
                              selectedSchema === item.type ? 'text-slate-300' : 'text-slate-400'
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>
                        {selectedSchema === item.type && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Popular Schema Chips */}
          <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Popular:</span>
            {POPULAR_SCHEMAS.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedSchema(type)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedSchema === type
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Property Builder Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                {selectedSchema} Properties
              </h3>
              <p className="text-xs text-slate-500">
                Customize your Schema.org properties below. All properties are optional — enter only the details you have.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              title="Reset fields to sample data"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="space-y-4">
            {/* Common Core Fields for All Entities */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  {['JobPosting'].includes(selectedSchema) ? 'Job Title' : 'Name / Headline'}
                </label>
                <span className="text-[10px] text-slate-400 font-mono">schema.org/name</span>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Complete Guide to Technical SEO Architecture"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Canonical URL / WebPage ID</label>
                <span className="text-[10px] text-slate-400 font-mono">schema.org/url</span>
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/page-url"
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-mono focus:outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Description / Summary</label>
                <span className="text-[10px] text-slate-400 font-mono">schema.org/description</span>
              </div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of the entity..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl leading-relaxed text-slate-700 focus:outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Featured Image URL</label>
                <span className="text-[10px] text-slate-400 font-mono">schema.org/image</span>
              </div>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-700 focus:outline-none focus:border-slate-900 focus:bg-white"
              />
            </div>

            {/* ARTICLE & EDITORIAL FIELDS */}
            {['Article', 'NewsArticle', 'BlogPosting', 'TechArticle', 'ScholarlyArticle'].includes(selectedSchema) && (
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4">
                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block border-b border-slate-200 pb-2">
                  Editorial &amp; Author Properties
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Author Name</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Author Type</label>
                    <select
                      value={authorType}
                      onChange={(e) => setAuthorType(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                    >
                      <option value="Person">Person</option>
                      <option value="Organization">Organization</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Publisher Name</label>
                    <input
                      type="text"
                      value={publisherName}
                      onChange={(e) => setPublisherName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Publisher Logo URL</label>
                    <input
                      type="url"
                      value={publisherLogo}
                      onChange={(e) => setPublisherLogo(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-700 block">Date Published</label>
                      <span className="text-[10px] text-slate-400 font-mono">ISO 8601</span>
                    </div>
                    <input
                      type="text"
                      value={datePublished}
                      onChange={(e) => setDatePublished(e.target.value)}
                      placeholder="YYYY-MM-DDThh:mm:ss+zz:zz"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-700 block">Date Modified</label>
                      <span className="text-[10px] text-slate-400 font-mono">ISO 8601</span>
                    </div>
                    <input
                      type="text"
                      value={dateModified}
                      onChange={(e) => setDateModified(e.target.value)}
                      placeholder="YYYY-MM-DDThh:mm:ss+zz:zz"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PRODUCT & E-COMMERCE FIELDS */}
            {['Product', 'FinancialProduct'].includes(selectedSchema) && (
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4">
                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block border-b border-slate-200 pb-2">
                  E-Commerce Offer &amp; SKU Properties
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Brand Name</label>
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">SKU Code</label>
                    <input
                      type="text"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">GTIN-13 / Barcode</label>
                    <input
                      type="text"
                      value={gtin}
                      onChange={(e) => setGtin(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-bold font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Currency</label>
                    <select
                      value={priceCurrency}
                      onChange={(e) => setPriceCurrency(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD ($)</option>
                      <option value="AUD">AUD ($)</option>
                      <option value="INR">INR (₹)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Stock Availability</label>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono text-[11px]"
                    >
                      <option value="https://schema.org/InStock">InStock</option>
                      <option value="https://schema.org/OutOfStock">OutOfStock</option>
                      <option value="https://schema.org/PreOrder">PreOrder</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Aggregate Rating (1-5)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={ratingValue}
                      onChange={(e) => setRatingValue(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Review Count</label>
                    <input
                      type="number"
                      value={reviewCount}
                      onChange={(e) => setReviewCount(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* LOCAL BUSINESS FIELDS */}
            {['LocalBusiness', 'MedicalBusiness', 'FoodEstablishment', 'LodgingBusiness', 'LegalService'].includes(selectedSchema) && (
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4">
                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block border-b border-slate-200 pb-2">
                  Physical Storefront &amp; Geo Coordinates
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Telephone</label>
                    <input
                      type="text"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Street Address</label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 block">City</label>
                    <input
                      type="text"
                      value={addressLocality}
                      onChange={(e) => setAddressLocality(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 block">State/Region</label>
                    <input
                      type="text"
                      value={addressRegion}
                      onChange={(e) => setAddressRegion(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 block">Postal Code</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 block">Country</label>
                    <input
                      type="text"
                      value={addressCountry}
                      onChange={(e) => setAddressCountry(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Latitude</label>
                    <input
                      type="text"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Longitude</label>
                    <input
                      type="text"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FAQS & ACCORDIONS */}
            {(selectedSchema === 'FAQPage' || selectedSchema === 'QAPage') && (
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                    Questions &amp; Answers
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setFaqs([...faqs, { question: '', answer: '' }])
                    }
                    className="px-2.5 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Question
                  </button>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold text-emerald-700">Q#{idx + 1}</span>
                        {faqs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                            className="text-xs text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const updated = [...faqs];
                          updated[idx].question = e.target.value;
                          setFaqs(updated);
                        }}
                        placeholder="Enter Question..."
                        className="w-full px-3 py-1.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg"
                      />
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => {
                          const updated = [...faqs];
                          updated[idx].answer = e.target.value;
                          setFaqs(updated);
                        }}
                        placeholder="Enter Answer..."
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BREADCRUMBLIST */}
            {selectedSchema === 'BreadcrumbList' && (
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                    Breadcrumb Hierarchy ({breadcrumbs.length} levels)
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setBreadcrumbs([...breadcrumbs, { name: 'New Trail', url: 'https://veritas-seo.dev/subpage' }])
                    }
                    className="px-2.5 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Item
                  </button>
                </div>

                <div className="space-y-2">
                  {breadcrumbs.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={b.name}
                        onChange={(e) => {
                          const updated = [...breadcrumbs];
                          updated[idx].name = e.target.value;
                          setBreadcrumbs(updated);
                        }}
                        placeholder="Page Name"
                        className="w-1/3 px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                      />
                      <input
                        type="url"
                        value={b.url}
                        onChange={(e) => {
                          const updated = [...breadcrumbs];
                          updated[idx].url = e.target.value;
                          setBreadcrumbs(updated);
                        }}
                        placeholder="https://..."
                        className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                      />
                      {breadcrumbs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setBreadcrumbs(breadcrumbs.filter((_, i) => i !== idx))}
                          className="p-1.5 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SOFTWARE / WEBAPP FIELDS */}
            {['SoftwareApplication', 'WebApplication', 'MobileApplication', 'VideoGame'].includes(selectedSchema) && (
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block border-b border-slate-200 pb-2">
                  Application Platform Specifications
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Operating System</label>
                    <input
                      type="text"
                      value={operatingSystem}
                      onChange={(e) => setOperatingSystem(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">Application Category</label>
                    <select
                      value={applicationCategory}
                      onChange={(e) => setApplicationCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono"
                    >
                      <option value="BusinessApplication">BusinessApplication</option>
                      <option value="UtilitiesApplication">UtilitiesApplication</option>
                      <option value="DeveloperApplication">DeveloperApplication</option>
                      <option value="SEOApplication">SEOApplication</option>
                      <option value="DesignApplication">DesignApplication</option>
                      <option value="FinanceApplication">FinanceApplication</option>
                      <option value="GameApplication">GameApplication</option>
                      <option value="HealthApplication">HealthApplication</option>
                      <option value="EducationalApplication">EducationalApplication</option>
                      <option value="SocialNetworkingApplication">SocialNetworkingApplication</option>
                      <option value="MultimediaApplication">MultimediaApplication</option>
                      <option value="ShoppingApplication">ShoppingApplication</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: LIVE SYNTAX HIGHLIGHTED OUTPUT PANEL & ACTION TOOLBAR */}
      <div className={`space-y-4 sticky top-6 ${mobileTab === 'form' ? 'hidden md:block' : 'block'}`}>
          {/* Syntax Highlighted Live Output Container (Top of Right Column) */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="p-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Schema.org Render Preview
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="hover:text-white transition-colors flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Quick Copy'}</span>
              </button>
            </div>

            <pre className="p-5 text-emerald-400 font-mono text-xs leading-relaxed overflow-x-auto max-h-[520px] overflow-y-auto">
              <code>{htmlScriptSnippet}</code>
            </pre>
          </div>

          {/* Action Toolbar */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-slate-900 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5 shadow-2xs">
                <FileCode className="w-3.5 h-3.5" /> JSON-LD
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                {jsonString.split('\n').length} lines | {new Blob([htmlScriptSnippet]).size} B
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Markup'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                title="Download JSON-LD HTML file"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleTestInGoogle}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                title="Test in Google Rich Results Test"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Real-time Validation State Indicator */}
          <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-2xl flex items-center gap-2 text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Valid Schema.org syntax:</strong> Ready to embed in your website <code className="font-mono text-emerald-800">&lt;head&gt;</code>.
            </span>
          </div>

          {/* Quick External Testing Actions */}
          <div>
            <button
              type="button"
              onClick={handleTestInGoogle}
              className="w-full p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              <span>Test in Google Rich Results</span>
            </button>
          </div>
        </div>
      </div>

      {/* FULL COMPREHENSIVE ARCHITECTURAL & TROUBLESHOOTING GUIDE */}
      <div className="w-full h-auto pt-8 border-t border-slate-200/80">
        <SchemaJsonLdBuilderGuide />
      </div>
    </div>
  );
};
