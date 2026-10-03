'use client';

import React, { useState, useMemo, useEffect } from 'react';
import type { SeoTool } from '../../lib/schemas';
import {
  TrendingUp,
  DollarSign,
  Search,
  ArrowUpRight,
  BarChart3,
  Sparkles,
  Zap,
  Sliders,
  RotateCcw,
  CheckCircle2,
  Activity,
  Layers,
  HelpCircle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';
import { SerpCtrForecasterGuide } from './SerpCtrForecasterGuide';

interface Props {
  tool: SeoTool;
  onPerformCalculation?: () => void;
}

// Google Search Central Industry Benchmark Organic CTR Curves
const CTR_MODELS: Record<string, { name: string; description: string; curve: number[] }> = {
  standard: {
    name: 'Standard Non-Branded Desktop',
    description: 'Empirical CTR benchmark for competitive non-branded keyword queries.',
    curve: [28.5, 15.7, 11.0, 8.0, 6.1, 4.4, 3.5, 2.8, 2.2, 1.8, 1.4, 1.1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2],
  },
  branded: {
    name: 'Branded High-Intent',
    description: 'High navigation intent queries where position #1 dominates over 45% CTR.',
    curve: [46.2, 12.8, 7.5, 5.2, 3.8, 2.9, 2.1, 1.6, 1.2, 0.9, 0.7, 0.5, 0.4, 0.3, 0.3, 0.2, 0.2, 0.1, 0.1, 0.1],
  },
  ai_overview: {
    name: 'SERP with Google AI Overview (SGE)',
    description: 'SERPs containing interactive generative AI snapshots pushing traditional blue links down.',
    curve: [19.2, 11.4, 8.1, 6.2, 4.8, 3.6, 2.7, 2.1, 1.7, 1.3, 1.0, 0.8, 0.6, 0.5, 0.4, 0.4, 0.3, 0.2, 0.2, 0.1],
  },
};

export const SerpRankCtrCalculatorEngine: React.FC<Props> = ({ onPerformCalculation }) => {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(15000);
  const [currentRank, setCurrentRank] = useState<number>(10);
  const [targetRank, setTargetRank] = useState<number>(5);
  const [selectedModel, setSelectedModel] = useState<'standard' | 'branded' | 'ai_overview'>('standard');
  const [cpcEstimate, setCpcEstimate] = useState<number>(2.85);

  // Custom Editable CTR Overrides (null means follow model benchmark default)
  const [customCurrentCtr, setCustomCurrentCtr] = useState<number | null>(null);
  const [customTargetCtr, setCustomTargetCtr] = useState<number | null>(null);

  // Range Bracket Toggle (Conservative -20% vs Aggressive +20%)
  const [showRangeBracket, setShowRangeBracket] = useState<boolean>(true);
  const [rangePercent, setRangePercent] = useState<number>(20); // 20%

  const modelData = CTR_MODELS[selectedModel];

  // Benchmark default values
  const defaultCurrentCtr = modelData.curve[currentRank - 1] ?? 1.8;
  const defaultTargetCtr = modelData.curve[targetRank - 1] ?? 6.1;

  // Active effective CTRs (either user custom override or benchmark default)
  const effectiveCurrentCtr = customCurrentCtr !== null ? customCurrentCtr : defaultCurrentCtr;
  const effectiveTargetCtr = customTargetCtr !== null ? customTargetCtr : defaultTargetCtr;

  // Calculations
  const calculations = useMemo(() => {
    const baseCurrentClicks = Math.round((monthlyVolume * effectiveCurrentCtr) / 100);
    const baseTargetClicks = Math.round((monthlyVolume * effectiveTargetCtr) / 100);
    const baseClickGain = Math.max(0, baseTargetClicks - baseCurrentClicks);

    const baseCurrentValue = Math.round(baseCurrentClicks * cpcEstimate);
    const baseTargetValue = Math.round(baseTargetClicks * cpcEstimate);
    const baseValueGain = Math.max(0, baseTargetValue - baseCurrentValue);

    const percentageGrowth =
      baseCurrentClicks > 0 ? Math.round((baseClickGain / baseCurrentClicks) * 100) : 0;

    // Range Calculations (±rangePercent)
    const factorLow = 1 - rangePercent / 100;
    const factorHigh = 1 + rangePercent / 100;

    const lowCurrentClicks = Math.round(baseCurrentClicks * factorLow);
    const highCurrentClicks = Math.round(baseCurrentClicks * factorHigh);

    const lowTargetClicks = Math.round(baseTargetClicks * factorLow);
    const highTargetClicks = Math.round(baseTargetClicks * factorHigh);

    const lowClickGain = Math.max(0, lowTargetClicks - highCurrentClicks);
    const highClickGain = Math.max(0, highTargetClicks - lowCurrentClicks);

    const lowTargetValue = Math.round(lowTargetClicks * cpcEstimate);
    const highTargetValue = Math.round(highTargetClicks * cpcEstimate);

    return {
      effectiveCurrentCtr,
      effectiveTargetCtr,
      isCurrentCustom: customCurrentCtr !== null,
      isTargetCustom: customTargetCtr !== null,
      // Base
      baseCurrentClicks,
      baseTargetClicks,
      baseClickGain,
      baseCurrentValue,
      baseTargetValue,
      baseValueGain,
      percentageGrowth,
      // Range Brackets
      lowCurrentClicks,
      highCurrentClicks,
      lowTargetClicks,
      highTargetClicks,
      lowClickGain,
      highClickGain,
      lowTargetValue,
      highTargetValue,
    };
  }, [
    monthlyVolume,
    effectiveCurrentCtr,
    effectiveTargetCtr,
    customCurrentCtr,
    customTargetCtr,
    cpcEstimate,
    rangePercent,
  ]);

  // Chart data for full 1-20 position curve with active current and target points
  const chartData = useMemo(() => {
    return modelData.curve.map((baseCtr, idx) => {
      const pos = idx + 1;
      let effectivePointCtr = baseCtr;
      if (pos === currentRank && customCurrentCtr !== null) {
        effectivePointCtr = customCurrentCtr;
      } else if (pos === targetRank && customTargetCtr !== null) {
        effectivePointCtr = customTargetCtr;
      }

      return {
        position: pos,
        rankLabel: `#${pos}`,
        ctr: effectivePointCtr,
        lowCtr: parseFloat((effectivePointCtr * (1 - rangePercent / 100)).toFixed(1)),
        highCtr: parseFloat((effectivePointCtr * (1 + rangePercent / 100)).toFixed(1)),
        estimatedClicks: Math.round((monthlyVolume * effectivePointCtr) / 100),
      };
    });
  }, [modelData, monthlyVolume, currentRank, targetRank, customCurrentCtr, customTargetCtr, rangePercent]);

  const handleInputChange = () => {
    onPerformCalculation?.();
  };

  return (
    <div id="interactive-calculator" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-8 scroll-mt-24">
      {/* Title & Model Selector Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold mb-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Interactive Traffic Forecaster
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Google SERP CTR Curve &amp; Traffic Scenario Modeler
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Compare current vs target rankings. Customize CTR assumptions from Search Console and toggle uncertainty brackets.
          </p>
        </div>

        {/* Action Controls: Model Selector & Range Bracket Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Model Switcher */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/70">
            {(Object.keys(CTR_MODELS) as ('standard' | 'branded' | 'ai_overview')[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedModel(key);
                  handleInputChange();
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedModel === key ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {key === 'standard' ? 'Standard Desktop' : key === 'branded' ? 'Branded Query' : 'Google AI Overview'}
              </button>
            ))}
          </div>

          {/* Range Uncertainty Toggle */}
          <button
            type="button"
            onClick={() => setShowRangeBracket(!showRangeBracket)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 ${
              showRangeBracket
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Range Mode (±{rangePercent}%)</span>
          </button>
        </div>
      </div>

      {/* Uncertainty Range Mode Alert Notice */}
      {showRangeBracket && (
        <div className="p-3.5 sm:p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-emerald-950">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>
              <strong>Forecast Ranges Active (±{rangePercent}%):</strong> Showing conservative and aggressive bounds alongside base estimates to avoid false precision.
            </span>
          </div>

          <div className="flex items-center gap-1 font-mono shrink-0">
            {[10, 20, 30].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setRangePercent(pct)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-colors ${
                  rangePercent === pct
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white text-slate-700 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                ±{pct}%
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Parameters Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 bg-slate-50/70 rounded-2xl border border-slate-200/80">
        {/* 1. Monthly Search Volume */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">Monthly Search Volume</label>
            <span className="text-[10px] font-mono text-slate-400">Demand</span>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="number"
              value={monthlyVolume}
              onChange={(e) => {
                setMonthlyVolume(Math.max(10, Number(e.target.value)));
                handleInputChange();
              }}
              min={10}
              className="w-full pl-9 pr-3 py-2 text-xs font-mono font-bold bg-white border border-slate-200 rounded-xl focus:outline-emerald-500 shadow-2xs"
            />
          </div>
          {/* Quick Volume Shortcuts */}
          <div className="flex items-center gap-1 pt-1">
            {[5000, 15000, 50000, 100000].map((vol) => (
              <button
                key={vol}
                type="button"
                onClick={() => {
                  setMonthlyVolume(vol);
                  handleInputChange();
                }}
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md transition-colors ${
                  monthlyVolume === vol
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {vol >= 1000 ? `${vol / 1000}k` : vol}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Current Rank & Editable CTR Assumption */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">Current Position</label>
            <div className="flex items-center gap-1.5">
              <span className="w-8 text-center font-mono font-bold text-xs bg-slate-900 text-white py-0.5 rounded-md">
                #{currentRank}
              </span>
            </div>
          </div>

          <input
            type="range"
            min={1}
            max={20}
            value={currentRank}
            onChange={(e) => {
              setCurrentRank(Number(e.target.value));
              handleInputChange();
            }}
            className="w-full accent-slate-900 cursor-pointer"
          />

          {/* Editable CTR Assumption for Current Rank */}
          <div className="pt-1 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-600 font-medium">CTR Assumption:</span>
              {customCurrentCtr !== null ? (
                <button
                  type="button"
                  onClick={() => setCustomCurrentCtr(null)}
                  className="text-[10px] text-amber-700 hover:underline flex items-center gap-0.5 font-semibold"
                  title="Reset to benchmark default"
                >
                  <RotateCcw className="w-2.5 h-2.5" /> Reset ({defaultCurrentCtr}%)
                </button>
              ) : (
                <span className="text-[10px] text-slate-400 font-mono">Benchmark Default</span>
              )}
            </div>

            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0.05"
                max="100"
                value={effectiveCurrentCtr}
                onChange={(e) => {
                  const val = Math.max(0.05, Math.min(100, Number(e.target.value)));
                  setCustomCurrentCtr(val);
                  handleInputChange();
                }}
                className={`w-full px-3 py-1.5 text-xs font-mono font-bold rounded-xl border transition-all ${
                  customCurrentCtr !== null
                    ? 'border-amber-400 bg-amber-50/40 text-amber-950 focus:ring-amber-400'
                    : 'border-slate-200 bg-white text-slate-900 focus:outline-emerald-500'
                }`}
              />
              <span className="absolute right-3 top-1.5 text-xs font-mono font-bold text-slate-400">%</span>
            </div>
          </div>
        </div>

        {/* 3. Target Rank & Editable CTR Assumption */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">Target Position</label>
            <div className="flex items-center gap-1.5">
              <span className="w-8 text-center font-mono font-bold text-xs bg-emerald-600 text-white py-0.5 rounded-md">
                #{targetRank}
              </span>
            </div>
          </div>

          <input
            type="range"
            min={1}
            max={20}
            value={targetRank}
            onChange={(e) => {
              setTargetRank(Number(e.target.value));
              handleInputChange();
            }}
            className="w-full accent-emerald-600 cursor-pointer"
          />

          {/* Editable CTR Assumption for Target Rank */}
          <div className="pt-1 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-600 font-medium">Target CTR:</span>
              {customTargetCtr !== null ? (
                <button
                  type="button"
                  onClick={() => setCustomTargetCtr(null)}
                  className="text-[10px] text-amber-700 hover:underline flex items-center gap-0.5 font-semibold"
                  title="Reset to benchmark default"
                >
                  <RotateCcw className="w-2.5 h-2.5" /> Reset ({defaultTargetCtr}%)
                </button>
              ) : (
                <span className="text-[10px] text-slate-400 font-mono">Benchmark Default</span>
              )}
            </div>

            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0.05"
                max="100"
                value={effectiveTargetCtr}
                onChange={(e) => {
                  const val = Math.max(0.05, Math.min(100, Number(e.target.value)));
                  setCustomTargetCtr(val);
                  handleInputChange();
                }}
                className={`w-full px-3 py-1.5 text-xs font-mono font-bold rounded-xl border transition-all ${
                  customTargetCtr !== null
                    ? 'border-emerald-500 bg-emerald-50/40 text-emerald-950 focus:ring-emerald-400'
                    : 'border-slate-200 bg-white text-slate-900 focus:outline-emerald-500'
                }`}
              />
              <span className="absolute right-3 top-1.5 text-xs font-mono font-bold text-slate-400">%</span>
            </div>
          </div>
        </div>

        {/* 4. Avg Google Ads CPC ($) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">Avg Google Ads CPC</label>
            <span className="text-[10px] font-mono text-slate-400">PPC Equivalent</span>
          </div>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={cpcEstimate}
              onChange={(e) => {
                setCpcEstimate(Math.max(0.1, Number(e.target.value)));
                handleInputChange();
              }}
              className="w-full pl-9 pr-3 py-2 text-xs font-mono font-bold bg-white border border-slate-200 rounded-xl focus:outline-emerald-500 shadow-2xs"
            />
          </div>
          {/* Quick CPC Presets */}
          <div className="flex items-center gap-1 pt-1">
            {[1.25, 2.85, 5.5, 12.0].map((cpc) => (
              <button
                key={cpc}
                type="button"
                onClick={() => {
                  setCpcEstimate(cpc);
                  handleInputChange();
                }}
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md transition-colors ${
                  cpcEstimate === cpc
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                ${cpc}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Forecast KPI Output Scorecards with Range Support */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Current Position Clicks */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Current Position Clicks
          </span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {showRangeBracket ? (
              <span className="text-xl sm:text-2xl">
                {calculations.lowCurrentClicks.toLocaleString()} – {calculations.highCurrentClicks.toLocaleString()}
              </span>
            ) : (
              <span>{calculations.baseCurrentClicks.toLocaleString()}</span>
            )}
            <span className="text-xs font-normal text-slate-400 font-sans ml-1">/ mo</span>
          </div>

          <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between">
            <span>
              Rank #{currentRank} @ {calculations.effectiveCurrentCtr}% CTR
            </span>
            {calculations.isCurrentCustom && (
              <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-bold font-sans">
                Custom
              </span>
            )}
          </div>

          {showRangeBracket && (
            <p className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100">
              Base: {calculations.baseCurrentClicks.toLocaleString()} clicks/mo
            </p>
          )}
        </div>

        {/* Card 2: Projected Target Clicks */}
        <div className="p-4 sm:p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 shadow-xs space-y-1.5">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
            Projected Target Clicks
          </span>
          <div className="text-2xl font-extrabold text-emerald-950 font-mono">
            {showRangeBracket ? (
              <span className="text-xl sm:text-2xl">
                {calculations.lowTargetClicks.toLocaleString()} – {calculations.highTargetClicks.toLocaleString()}
              </span>
            ) : (
              <span>{calculations.baseTargetClicks.toLocaleString()}</span>
            )}
            <span className="text-xs font-normal text-emerald-700 font-sans ml-1">/ mo</span>
          </div>

          <div className="text-[11px] text-emerald-800 font-mono flex items-center justify-between">
            <span>
              Rank #{targetRank} @ {calculations.effectiveTargetCtr}% CTR
            </span>
            {calculations.isTargetCustom && (
              <span className="text-[10px] text-emerald-800 bg-emerald-200/80 px-1.5 py-0.5 rounded font-bold font-sans">
                Custom
              </span>
            )}
          </div>

          {showRangeBracket && (
            <p className="text-[10px] text-emerald-700 font-mono pt-1 border-t border-emerald-100">
              Base: {calculations.baseTargetClicks.toLocaleString()} clicks/mo
            </p>
          )}
        </div>

        {/* Card 3: Estimated Monthly Click Gain */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl shadow-xs space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Estimated Monthly Click Gain
          </span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono flex items-center gap-1.5">
            <ArrowUpRight className="w-5 h-5 shrink-0" />
            {showRangeBracket ? (
              <span className="text-xl sm:text-2xl">
                +{calculations.lowClickGain.toLocaleString()} to +{calculations.highClickGain.toLocaleString()}
              </span>
            ) : (
              <span>+{calculations.baseClickGain.toLocaleString()}</span>
            )}
          </div>
          <p className="text-[11px] text-slate-300 font-mono font-semibold">
            +{calculations.percentageGrowth}% Traffic Expansion
          </p>
          {showRangeBracket && (
            <p className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800">
              Base scenario: +{calculations.baseClickGain.toLocaleString()} clicks/mo
            </p>
          )}
        </div>

        {/* Card 4: Monthly Organic Equity Value */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Monthly Organic Equity Value
          </span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {showRangeBracket ? (
              <span className="text-lg sm:text-xl">
                ${calculations.lowTargetValue.toLocaleString()} – ${calculations.highTargetValue.toLocaleString()}
              </span>
            ) : (
              <span>${calculations.baseTargetValue.toLocaleString()}</span>
            )}
          </div>
          <p className="text-[11px] text-emerald-700 font-mono font-bold">
            +${calculations.baseValueGain.toLocaleString()} / mo vs Current
          </p>
          {showRangeBracket && (
            <p className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100">
              @ ${cpcEstimate.toFixed(2)} Google Ads CPC
            </p>
          )}
        </div>
      </div>

      {/* Interactive CTR Curve Chart */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-emerald-600" /> Full Google SERP Ranking Curve (Position #1–#20)
          </h4>
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
            <span>Model: {modelData.name}</span>
            {showRangeBracket && (
              <span className="text-emerald-700 font-bold">• ±{rangePercent}% Uncertainty Band</span>
            )}
          </div>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="ctrGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="bandGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="rankLabel" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit="%" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(value: any, name: any) => {
                  if (name === 'CTR') return [`${value}% CTR`, 'Base CTR'];
                  if (name === 'High CTR') return [`${value}% CTR`, `Aggressive (+${rangePercent}%)`];
                  if (name === 'Low CTR') return [`${value}% CTR`, `Conservative (-${rangePercent}%)`];
                  return [value, name];
                }}
                labelFormatter={(label) => `Google Rank Position ${label}`}
              />
              {showRangeBracket && (
                <Area
                  type="monotone"
                  dataKey="highCtr"
                  name="High CTR"
                  stroke="#a7f3d0"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  fillOpacity={1}
                  fill="url(#bandGradient)"
                />
              )}
              <Area
                type="monotone"
                dataKey="ctr"
                name="CTR"
                stroke="#059669"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#ctrGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* COMPREHENSIVE SERP CTR FORECASTER GUIDE */}
      <div className="w-full h-auto pt-8 border-t border-slate-200/80">
        <SerpCtrForecasterGuide />
      </div>
    </div>
  );
};
