import React, { useState } from 'react';
import type { SeoTool } from '../../lib/schemas';
import {
  Share2,
  Image as ImageIcon,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Smartphone,
  Monitor,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Info,
} from 'lucide-react';

interface Props {
  tool: SeoTool;
  onPerformCalculation?: () => void;
}

export const SocialCardStudioEngine: React.FC<Props> = ({ onPerformCalculation }) => {
  const [ogTitle, setOgTitle] = useState('Veritas SEO · Enterprise Technical SEO Diagnostic Suite');
  const [ogDescription, setOgDescription] = useState(
    'Audit zero-CLS layouts, validate JSON-LD structured schemas, test Googlebot HTTP headers, and simulate Google SERP truncation in real time.'
  );
  const [ogUrl, setOgUrl] = useState('https://veritas-seo.dev/tool/serp-pixel-simulator');
  const [ogImage, setOgImage] = useState('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=630&q=80');
  const [siteName, setSiteName] = useState('Veritas SEO Labs');
  const [twitterCardType, setTwitterCardType] = useState<'summary_large_image' | 'summary'>('summary_large_image');
  const [twitterHandle, setTwitterHandle] = useState('@VeritasSeoDev');
  const [platformTab, setPlatformTab] = useState<'twitter' | 'facebook' | 'linkedin' | 'discord'>('twitter');
  const [copied, setCopied] = useState(false);

  // Diagnostics
  const titleLength = ogTitle.length;
  const descLength = ogDescription.length;

  const isTitleOptimal = titleLength >= 30 && titleLength <= 60;
  const isDescOptimal = descLength >= 50 && descLength <= 155;

  const handleInputChange = () => {
    onPerformCalculation?.();
  };

  const generateMetaHtml = () => {
    return `<!-- Open Graph / Facebook / LinkedIn / Discord -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${ogUrl}" />
<meta property="og:title" content="${ogTitle}" />
<meta property="og:description" content="${ogDescription}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="${siteName}" />

<!-- Twitter / X Card -->
<meta name="twitter:card" content="${twitterCardType}" />
<meta name="twitter:site" content="${twitterHandle}" />
<meta name="twitter:creator" content="${twitterHandle}" />
<meta name="twitter:title" content="${ogTitle}" />
<meta name="twitter:description" content="${ogDescription}" />
<meta name="twitter:image" content="${ogImage}" />`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMetaHtml());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-8">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-600" /> Open Graph &amp; Twitter Social Card Studio
          </h3>
          <p className="text-xs text-slate-500">
            Preview, test, and generate high-conversion Open Graph &amp; Twitter/X cards across social feeds and messaging clients.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied Meta Tags!' : 'Copy Social <meta> Tags'}
        </button>
      </div>

      {/* Grid: Editor & Live Social Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
              Canonical Target URL
            </label>
            <input
              type="url"
              value={ogUrl}
              onChange={(e) => {
                setOgUrl(e.target.value);
                handleInputChange();
              }}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-700 uppercase tracking-wider">
                Social Title (og:title)
              </label>
              <span className={`font-mono text-[11px] ${isTitleOptimal ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                {titleLength} / 60 chars
              </span>
            </div>
            <input
              type="text"
              value={ogTitle}
              onChange={(e) => {
                setOgTitle(e.target.value);
                handleInputChange();
              }}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-700 uppercase tracking-wider">
                Social Description (og:description)
              </label>
              <span className={`font-mono text-[11px] ${isDescOptimal ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                {descLength} / 155 chars
              </span>
            </div>
            <textarea
              rows={3}
              value={ogDescription}
              onChange={(e) => {
                setOgDescription(e.target.value);
                handleInputChange();
              }}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
              Featured Card Image URL (1200x630, 1.91:1 ratio)
            </label>
            <input
              type="url"
              value={ogImage}
              onChange={(e) => {
                setOgImage(e.target.value);
                handleInputChange();
              }}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Site Brand Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => {
                  setSiteName(e.target.value);
                  handleInputChange();
                }}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Twitter Creator Handle</label>
              <input
                type="text"
                value={twitterHandle}
                onChange={(e) => {
                  setTwitterHandle(e.target.value);
                  handleInputChange();
                }}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-mono"
              />
            </div>
          </div>
        </div>

        {/* Live Multi-Platform Card Simulator */}
        <div className="lg:col-span-6 space-y-4 flex flex-col">
          {/* Platform Tabs */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Feed Unfurl Preview
            </span>

            <div className="inline-flex p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setPlatformTab('twitter')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  platformTab === 'twitter' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                X / Twitter
              </button>
              <button
                type="button"
                onClick={() => setPlatformTab('facebook')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  platformTab === 'facebook' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Facebook / LinkedIn
              </button>
              <button
                type="button"
                onClick={() => setPlatformTab('discord')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  platformTab === 'discord' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Discord / Slack
              </button>
            </div>
          </div>

          {/* Social Card Output Mockups */}
          <div className="flex-1 flex items-center justify-center p-4 bg-slate-100/70 rounded-2xl border border-slate-200/80">
            {platformTab === 'twitter' && (
              <div className="w-full max-w-md bg-black text-white rounded-2xl overflow-hidden border border-neutral-800 shadow-lg font-sans text-left">
                <div className="relative aspect-[1.91/1] w-full bg-neutral-900 overflow-hidden">
                  <img src={ogImage} alt="Social Card" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-xs rounded text-[11px] font-mono text-white/90">
                    {siteName}
                  </div>
                </div>
                <div className="p-3.5 space-y-1 bg-neutral-950">
                  <div className="text-[11px] text-neutral-400 truncate font-mono">{ogUrl.replace(/^https?:\/\//, '')}</div>
                  <h4 className="text-sm font-bold text-white line-clamp-1 leading-snug">{ogTitle}</h4>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{ogDescription}</p>
                </div>
              </div>
            )}

            {platformTab === 'facebook' && (
              <div className="w-full max-w-md bg-white text-slate-900 rounded-xl overflow-hidden border border-slate-300 shadow-md font-sans text-left">
                <div className="relative aspect-[1.91/1] w-full bg-slate-100 overflow-hidden">
                  <img src={ogImage} alt="Social Card" className="w-full h-full object-cover" />
                </div>
                <div className="p-3.5 bg-slate-50/80 space-y-0.5 border-t border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold truncate">
                    {siteName.toUpperCase()}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{ogTitle}</h4>
                  <p className="text-xs text-slate-600 line-clamp-1">{ogDescription}</p>
                </div>
              </div>
            )}

            {platformTab === 'discord' && (
              <div className="w-full max-w-md bg-[#2b2d31] text-[#dbdee1] p-3.5 rounded-lg border-l-4 border-emerald-500 shadow-md font-sans text-left space-y-2">
                <div className="text-[11px] font-semibold text-[#949ba4]">{siteName}</div>
                <h4 className="text-xs font-bold text-[#00a8fc] hover:underline cursor-pointer line-clamp-1">
                  {ogTitle}
                </h4>
                <p className="text-xs text-[#dbdee1] line-clamp-2 leading-relaxed">{ogDescription}</p>
                <div className="rounded-lg overflow-hidden max-h-48 border border-[#1e1f22]">
                  <img src={ogImage} alt="Discord Embed" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Generated Code Output */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          Generated Production &lt;meta&gt; Tags
        </span>
        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <code>{generateMetaHtml()}</code>
        </pre>
      </div>
    </div>
  );
};
