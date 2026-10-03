import React from 'react';
import {
  Terminal,
  Search,
  Code2,
  MonitorSmartphone,
  Percent,
  FileJson,
  GitFork,
  Layers,
  Gauge,
  ShieldCheck,
  Sparkles,
  Globe,
  Link,
  Compass,
  Database,
  BarChart3,
  Tag,
  FileText,
  LayoutGrid,
  Sliders,
  TrendingUp,
  Share2,
  BookOpen,
  Wrench,
  Activity,
  Bot,
  Folder,
  HelpCircle,
  FileDown,
} from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
}

const ICONS_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Terminal,
  Search,
  Code2,
  MonitorSmartphone,
  Percent,
  FileJson,
  GitFork,
  Layers,
  Gauge,
  ShieldCheck,
  Sparkles,
  Globe,
  Link,
  Compass,
  Database,
  BarChart3,
  Tag,
  FileText,
  LayoutGrid,
  Sliders,
  TrendingUp,
  Share2,
  BookOpen,
  Wrench,
  Activity,
  Bot,
  Folder,
  HelpCircle,
  FileDown,
};

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-5 h-5' }) => {
  const IconComponent = ICONS_MAP[name];

  if (!IconComponent) {
    return <HelpCircle className={className} />;
  }

  return <IconComponent className={className} />;
};

export const AVAILABLE_ICONS = [
  'Terminal',
  'Search',
  'Code2',
  'MonitorSmartphone',
  'Percent',
  'FileJson',
  'GitFork',
  'Layers',
  'Gauge',
  'ShieldCheck',
  'Sparkles',
  'Globe',
  'Link',
  'Compass',
  'Database',
  'BarChart3',
  'Tag',
  'FileText',
  'LayoutGrid',
  'Sliders',
  'TrendingUp',
  'Share2',
];
