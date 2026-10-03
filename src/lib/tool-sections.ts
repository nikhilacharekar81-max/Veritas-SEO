import type { SeoTool, ToolSection, ToolSectionType } from './schemas';
import { generateId } from './utils';

export const STANDARD_SECTION_TYPES: {
  type: ToolSectionType;
  defaultTitle: string;
  defaultSubtitle: string;
  description: string;
  icon: string;
}[] = [
  {
    type: 'hero_header',
    defaultTitle: 'Tool Header & Summary Section',
    defaultSubtitle: 'Tool H1 headline, status badge, engine indicator, and summary',
    description: 'Displays the top hero banner with tool title, badge, and SEO inspection button.',
    icon: 'Heading1',
  },
  {
    type: 'interactive_engine',
    defaultTitle: 'Interactive Tool Execution Engine Canvas',
    defaultSubtitle: 'Primary interactive calculation canvas, inputs, and real-time outputs',
    description: 'The primary interactive calculator, analyzer, or simulator form component.',
    icon: 'Wrench',
  },
  {
    type: 'educational_methodology',
    defaultTitle: 'Technical Execution Guide & Formula Methodology',
    defaultSubtitle: 'Detailed technical explanation, mathematical formulas, and guidelines',
    description: 'Multi-paragraph educational documentation and mathematical methodology.',
    icon: 'BookOpen',
  },
  {
    type: 'step_tutorial',
    defaultTitle: 'Step-by-Step Practical Tutorial',
    defaultSubtitle: 'Numbered step-by-step workflow for executing the tool',
    description: 'Practical numbered steps guiding the user from setup to execution.',
    icon: 'ListOrdered',
  },
  {
    type: 'faq_accordion',
    defaultTitle: 'Frequently Asked Questions (FAQ)',
    defaultSubtitle: 'Schema.org FAQPage accordions indexed for Google search snippets',
    description: 'Dynamic FAQ questions and answers with instant expandable accordions.',
    icon: 'HelpCircle',
  },
  {
    type: 'related_tools',
    defaultTitle: 'Related SEO Tools in Category',
    defaultSubtitle: 'Category cross-linking hub cards',
    description: 'Displays other SEO tools within the same parent category.',
    icon: 'Sparkles',
  },
  {
    type: 'custom_content',
    defaultTitle: 'Custom Content Section',
    defaultSubtitle: 'Custom rich text, markdown, or HTML block',
    description: 'User-defined content section for benchmarks, tips, videos, or announcements.',
    icon: 'FileText',
  },
];

export function getDefaultToolSections(tool?: Partial<SeoTool>): ToolSection[] {
  return [
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
      subtitle: 'Detailed technical explanation & mathematical methodology',
      type: 'educational_methodology',
      isEnabled: true,
      displayOrder: 2,
    },
    {
      id: 'sec_tutorial',
      title: 'Step-by-Step Practical Tutorial',
      subtitle: 'Numbered action steps for executing SEO workflows',
      type: 'step_tutorial',
      isEnabled: true,
      displayOrder: 3,
    },
    {
      id: 'sec_faqs',
      title: 'Frequently Asked Questions (FAQ)',
      subtitle: 'Schema.org FAQPage accordions and rich search snippets',
      type: 'faq_accordion',
      isEnabled: true,
      displayOrder: 4,
    },
    {
      id: 'sec_related',
      title: 'Related SEO Tools in Category',
      subtitle: 'Cross-linking directory cards in same parent category',
      type: 'related_tools',
      isEnabled: true,
      displayOrder: 5,
    },
  ];
}

export function ensureToolSections(tool: SeoTool): ToolSection[] {
  let sections: ToolSection[];
  if (tool.sections && Array.isArray(tool.sections) && tool.sections.length > 0) {
    sections = tool.sections.map((s) => ({ ...s }));
  } else {
    sections = getDefaultToolSections(tool);
  }

  // Ensure educational guide section is always enabled for tools with dedicated guides
  if (
    tool.engineType === 'schema-jsonld-generator' ||
    tool.slug === 'schema-jsonld-generator' ||
    tool.id === 'tool_schema_jsonld' ||
    tool.engineType === 'serp-pixel-simulator' ||
    tool.engineType === 'keyword-density-analyzer'
  ) {
    const guideSec = sections.find((s) => s.type === 'educational_methodology');
    if (guideSec) {
      guideSec.isEnabled = true;
    } else {
      sections.push({
        id: 'sec_guide',
        title: 'Technical Execution Guide & Formula Methodology',
        subtitle: 'Comprehensive guide to Schema.org JSON-LD generation and Google rich results',
        type: 'educational_methodology',
        isEnabled: true,
        displayOrder: 2,
      });
    }
  }

  return sections.sort((a, b) => a.displayOrder - b.displayOrder);
}
