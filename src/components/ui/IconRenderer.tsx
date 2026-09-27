import React from 'react';
import * as Icons from 'lucide-react';
import { HelpCircle } from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-5 h-5' }) => {
  // Safe lookup from lucide-react exports without any
  const iconsMap = Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  const IconComponent = iconsMap[name];

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
];
