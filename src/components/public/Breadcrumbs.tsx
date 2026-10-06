import React from 'react';
import Link from 'next/link';
import { generateBreadcrumbSchema } from '../../lib/schema-generator';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  url: string;
}

interface Props {
  items: BreadcrumbItem[];
  onNavigate?: (url: string) => void;
}

export const Breadcrumbs: React.FC<Props> = ({ items, onNavigate }) => {
  const schemaObj = generateBreadcrumbSchema(
    items.map((i) => ({ name: i.label, url: i.url }))
  );

  return (
    <>
      {/* Googlebot Schema.org JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObj) }}
      />

      {/* Semantic HTML5 breadcrumb landmark */}
      <nav aria-label="Breadcrumb" className="py-3">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 font-medium">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                {isLast ? (
                  <span aria-current="page" className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-xs">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate(item.url);
                      }
                    }}
                    className="hover:text-slate-900 transition-colors flex items-center gap-1 text-slate-600"
                  >
                    {index === 0 && <Home className="w-3.5 h-3.5" />}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
