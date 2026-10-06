import React, { useState } from 'react';
import type { SeoTool } from '../../lib/schemas';
import Decimal from 'decimal.js';
import { Gauge, Zap, Layout, Clock, Sparkles } from 'lucide-react';
import { CoreWebVitalsGuide } from './CoreWebVitalsGuide';

interface Props {
  tool: SeoTool;
  onPerformCalculation?: () => void;
}

export const CoreWebVitalsCalculatorEngine: React.FC<Props> = () => {
  // CLS Parameters
  const [impactFraction, setImpactFraction] = useState(0.25);
  const [distanceFraction, setDistanceFraction] = useState(0.12);

  // Other CWV metrics
  const [lcpMs, setLcpMs] = useState(1850);
  const [inpMs, setInpMs] = useState(120);
  const [ttfbMs, setTtfbMs] = useState(240);

  // Exact CLS Calculation using Decimal.js: Layout Shift Score = impact fraction * distance fraction
  const clsScore = Number(
    new Decimal(impactFraction).times(new Decimal(distanceFraction)).toFixed(3)
  );

  const getClsStatus = (val: number) => {
    if (val <= 0.1) return { label: 'Good (<= 0.1)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (val <= 0.25) return { label: 'Needs Improvement (0.1 - 0.25)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'Poor (> 0.25)', color: 'text-red-700 bg-red-50 border-red-200' };
  };

  const getLcpStatus = (val: number) => {
    if (val <= 2500) return { label: 'Good (<= 2.5s)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (val <= 4000) return { label: 'Needs Improvement (2.5s - 4.0s)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'Poor (> 4.0s)', color: 'text-red-700 bg-red-50 border-red-200' };
  };

  const getInpStatus = (val: number) => {
    if (val <= 200) return { label: 'Good (<= 200ms)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (val <= 500) return { label: 'Needs Improvement (200ms - 500ms)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'Poor (> 500ms)', color: 'text-red-700 bg-red-50 border-red-200' };
  };

  const clsStatus = getClsStatus(clsScore);
  const lcpStatus = getLcpStatus(lcpMs);
  const inpStatus = getInpStatus(inpMs);

  return (
    <div className="space-y-10">
      {/* Intro Hook Section */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-4">
        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          A page can load quickly and still feel bad to use.
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          You click a button and it moves. You start reading and an image pushes the text down. An ad appears and the content jumps.
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          That's the kind of problem <strong className="text-slate-900 font-bold">CLS (Cumulative Layout Shift)</strong> is meant to measure.
        </p>
        <div className="space-y-2 pt-2">
          <p className="text-sm sm:text-base font-semibold text-slate-900">
            Use the calculator to work with the three Core Web Vitals:
          </p>
          <ul className="list-disc pl-5 text-sm sm:text-base text-slate-700 space-y-1">
            <li><strong className="text-slate-900 font-bold">CLS</strong> for visual stability</li>
            <li><strong className="text-slate-900 font-bold">LCP</strong> for loading performance</li>
            <li><strong className="text-slate-900 font-bold">INP</strong> for interaction responsiveness</li>
          </ul>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
          The CLS calculator lets you change the <strong className="text-slate-900 font-bold">Impact Fraction</strong> and <strong className="text-slate-900 font-bold">Distance Fraction</strong> and see how they affect the layout-shift score. You can also enter LCP and INP values to check them against their recommended thresholds.
        </p>
        <div className="pt-2">
          <a
            href="#calculator"
            className="inline-flex items-center gap-1.5 font-bold text-sm text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            Ready to check a value? Jump to the calculator →
          </a>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <div id="calculator" className="space-y-10 scroll-mt-24">
        {/* CWV Scorecards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* CLS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Layout className="w-4 h-4 text-emerald-600" /> CLS (Layout Shift)
            </span>
            <span className="text-[11px] font-mono text-slate-400">Target: &lt; 0.1</span>
          </div>
          <div className="text-3xl font-bold font-mono text-slate-900 tabular-nums">{clsScore}</div>
          <div className={`text-xs font-semibold px-2.5 py-1 rounded-lg border inline-block ${clsStatus.color}`}>
            {clsStatus.label}
          </div>
        </div>

        {/* LCP */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" /> LCP (Largest Paint)
            </span>
            <span className="text-[11px] font-mono text-slate-400">Target: &lt; 2.5s</span>
          </div>
          <div className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
            {(lcpMs / 1000).toFixed(2)}s <span className="text-xs text-slate-400 font-normal">({lcpMs}ms)</span>
          </div>
          <div className={`text-xs font-semibold px-2.5 py-1 rounded-lg border inline-block ${lcpStatus.color}`}>
            {lcpStatus.label}
          </div>
        </div>

        {/* INP */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-purple-600" /> INP (Next Paint)
            </span>
            <span className="text-[11px] font-mono text-slate-400">Target: &lt; 200ms</span>
          </div>
          <div className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
            {inpMs} <span className="text-xs text-slate-400 font-normal">ms</span>
          </div>
          <div className={`text-xs font-semibold px-2.5 py-1 rounded-lg border inline-block ${inpStatus.color}`}>
            {inpStatus.label}
          </div>
        </div>
      </div>

      {/* Interactive CLS Math Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <h3 className="text-base font-semibold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" /> Layout Shift Component Math
          </h3>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Impact Fraction (Viewport Area Affected)</span>
              <span className="font-mono tabular-nums">{(impactFraction * 100).toFixed(0)}% ({impactFraction})</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="1.0"
              step="0.01"
              value={impactFraction}
              onChange={(e) => setImpactFraction(parseFloat(e.target.value))}
              className="w-full accent-slate-900"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Distance Fraction (Distance Shifted Relative to Viewport)</span>
              <span className="font-mono tabular-nums">{(distanceFraction * 100).toFixed(0)}% ({distanceFraction})</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="1.0"
              step="0.01"
              value={distanceFraction}
              onChange={(e) => setDistanceFraction(parseFloat(e.target.value))}
              className="w-full accent-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">LCP Render Time (ms)</label>
              <input
                type="number"
                min={200}
                max={10000}
                value={lcpMs}
                onChange={(e) => setLcpMs(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">INP Interaction Latency (ms)</label>
              <input
                type="number"
                min={20}
                max={2000}
                value={inpMs}
                onChange={(e) => setInpMs(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Gauge className="w-4 h-4 text-emerald-400" /> Google Ranking Weight Analysis
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Google Core Web Vitals form the foundation of Google's Page Experience ranking signal. Zero CLS (0.00) is achieved by reserving static aspect-ratio containers for images, embeds, and dynamic widgets.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-emerald-400 border border-slate-800">
              <code>CLS = ImpactFraction ({impactFraction}) × DistanceFraction ({distanceFraction}) = {clsScore}</code>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
            Passing all 3 Core Web Vitals thresholds grants full eligibility for Google search ranking signals.
          </div>
        </div>
      </div>
    </div>

    {/* Comprehensive Guide */}
    <CoreWebVitalsGuide />
  </div>
);
};
