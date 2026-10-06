import React, { useState, useMemo } from 'react';
import type { SeoTool } from '../../lib/schemas';
import {
  calculateRevenue,
  calculateRequiredViews,
  calculateRPM,
  calculateBlendedRPM,
  calculateWhatIf,
  calculateScenario,
  calculateProjection,
  calculateUploadPlan,
} from '../../lib/youtube-revenue-engine';
import {
  Youtube,
  DollarSign,
  TrendingUp,
  Target,
  Layers,
  Calendar,
  Sparkles,
  Sliders,
  PieChart,
  Video,
  Film,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  Calculator,
} from 'lucide-react';
import { YouTubeRevenueCalculatorGuide } from './YouTubeRevenueCalculatorGuide';

interface Props {
  tool: SeoTool;
  onPerformCalculation?: () => void;
}

type TabType = 'calculator' | 'goal' | 'reverse' | 'whatif' | 'scenarios' | 'projection' | 'planner';
type VideoFormatType = 'hybrid' | 'longform' | 'shorts';
type CurrencyType = 'INR' | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';

const CURRENCIES: { code: CurrencyType; symbol: string; label: string }[] = [
  { code: 'INR', symbol: '₹', label: 'INR (₹)' },
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'CAD', symbol: 'C$', label: 'CAD (C$)' },
  { code: 'AUD', symbol: 'A$', label: 'AUD (A$)' },
];

const VIEW_PRESETS = [
  { label: '10K', value: 10000 },
  { label: '50K', value: 50000 },
  { label: '100K', value: 100000 },
  { label: '500K', value: 500000 },
  { label: '1M', value: 1000000 },
  { label: '5M', value: 5000000 },
];

const SAMPLE_LONGFORM_RPMS = [25, 50, 75, 100, 150, 200];
const SAMPLE_SHORTS_RPMS = [0.1, 0.5, 1.0, 1.5, 2.0];

const safeParseNumber = (val: string | number, maxVal = 100_000_000_000): number => {
  if (typeof val === 'number') {
    if (isNaN(val) || !isFinite(val)) return 0;
    return Math.max(0, Math.min(maxVal, val));
  }
  const parsed = parseFloat(val);
  if (isNaN(parsed) || !isFinite(parsed)) return 0;
  return Math.max(0, Math.min(maxVal, parsed));
};

export const YouTubeRevenueCalculatorEngine: React.FC<Props> = ({ onPerformCalculation }) => {
  const [activeTab, setActiveTab] = useState<TabType>('calculator');
  const [currency, setCurrency] = useState<CurrencyType>('INR');

  // Format Helper
  const currSymbol = CURRENCIES.find((c) => c.code === currency)?.symbol || '₹';

  const formatCurrency = (val: number): string => {
    if (isNaN(val) || val === null || val === undefined || !isFinite(val)) return `${currSymbol}0`;
    return `${currSymbol}${val.toLocaleString('en-US', {
      minimumFractionDigits: val % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatNumber = (val: number): string => {
    if (isNaN(val) || val === null || val === undefined || !isFinite(val)) return '0';
    return val.toLocaleString('en-US');
  };

  // ----------------------------------------------------
  // 1. Primary Calculator State
  // ----------------------------------------------------
  const [formatType, setFormatType] = useState<VideoFormatType>('hybrid');
  const [longFormViews, setLongFormViews] = useState<number>(100000);
  const [longFormRpm, setLongFormRpm] = useState<number>(100);
  const [shortsViews, setShortsViews] = useState<number>(500000);
  const [shortsRpm, setShortsRpm] = useState<number>(1.2);
  const [isMonthlyFrequency, setIsMonthlyFrequency] = useState<boolean>(true);

  // Pure Calculation: Hybrid or Single
  const singleLongFormResult = useMemo(() => {
    return calculateRevenue({
      views: safeParseNumber(longFormViews),
      rpm: safeParseNumber(longFormRpm),
      isMonthlyViews: isMonthlyFrequency,
    });
  }, [longFormViews, longFormRpm, isMonthlyFrequency]);

  const singleShortsResult = useMemo(() => {
    return calculateRevenue({
      views: safeParseNumber(shortsViews),
      rpm: safeParseNumber(shortsRpm),
      isMonthlyViews: isMonthlyFrequency,
    });
  }, [shortsViews, shortsRpm, isMonthlyFrequency]);

  const blendedResult = useMemo(() => {
    return calculateBlendedRPM({
      longFormViews: safeParseNumber(longFormViews),
      longFormRpm: safeParseNumber(longFormRpm),
      shortsViews: safeParseNumber(shortsViews),
      shortsRpm: safeParseNumber(shortsRpm),
    });
  }, [longFormViews, longFormRpm, shortsViews, shortsRpm]);

  // Active revenue result display based on format selection
  const activePrimaryRevenue = useMemo(() => {
    if (formatType === 'longform') {
      return singleLongFormResult;
    }
    if (formatType === 'shorts') {
      return singleShortsResult;
    }
    // Hybrid: wrap into revenue result
    return calculateRevenue({
      views: blendedResult.totalViews,
      rpm: blendedResult.blendedRpm,
      isMonthlyViews: isMonthlyFrequency,
    });
  }, [formatType, singleLongFormResult, singleShortsResult, blendedResult, isMonthlyFrequency]);

  // ----------------------------------------------------
  // 2. Income Goal State
  // ----------------------------------------------------
  const [incomeGoal, setIncomeGoal] = useState<number>(100000);
  const [goalRpm, setGoalRpm] = useState<number>(100);
  const incomeGoalResult = useMemo(() => {
    return calculateRequiredViews({
      incomeGoal: safeParseNumber(incomeGoal),
      rpm: safeParseNumber(goalRpm),
      isMonthlyGoal: true,
    });
  }, [incomeGoal, goalRpm]);

  // ----------------------------------------------------
  // 3. Reverse RPM State
  // ----------------------------------------------------
  const [knownRevenue, setKnownRevenue] = useState<number>(10000);
  const [knownViews, setKnownViews] = useState<number>(100000);
  const reverseRpmResult = useMemo(() => {
    return calculateRPM({
      revenue: safeParseNumber(knownRevenue),
      views: safeParseNumber(knownViews),
    });
  }, [knownRevenue, knownViews]);

  // ----------------------------------------------------
  // 4. What-If Scenario State
  // ----------------------------------------------------
  const [whatIfBaseViews, setWhatIfBaseViews] = useState<number>(100000);
  const [whatIfBaseRpm, setWhatIfBaseRpm] = useState<number>(100);
  const [whatIfViewDelta, setWhatIfViewDelta] = useState<number>(25);
  const [whatIfRpmDelta, setWhatIfRpmDelta] = useState<number>(15);
  const whatIfResult = useMemo(() => {
    return calculateWhatIf({
      baseViews: safeParseNumber(whatIfBaseViews),
      baseRpm: safeParseNumber(whatIfBaseRpm),
      viewChangePercent: whatIfViewDelta,
      rpmChangePercent: whatIfRpmDelta,
    });
  }, [whatIfBaseViews, whatIfBaseRpm, whatIfViewDelta, whatIfRpmDelta]);

  // ----------------------------------------------------
  // 5. Multi-Tier Scenarios State
  // ----------------------------------------------------
  const [scenarioViews, setScenarioViews] = useState<number>(100000);
  const [consRpm, setConsRpm] = useState<number>(40);
  const [expRpm, setExpRpm] = useState<number>(80);
  const [optRpm, setOptRpm] = useState<number>(150);
  const scenarioResult = useMemo(() => {
    return calculateScenario({
      conservative: { name: 'Conservative Scenario', views: safeParseNumber(scenarioViews), rpm: safeParseNumber(consRpm) },
      expected: { name: 'Expected Baseline', views: safeParseNumber(scenarioViews), rpm: safeParseNumber(expRpm) },
      optimistic: { name: 'Optimistic / Peak', views: safeParseNumber(scenarioViews), rpm: safeParseNumber(optRpm) },
    });
  }, [scenarioViews, consRpm, expRpm, optRpm]);

  // ----------------------------------------------------
  // 6. Compound Projection State
  // ----------------------------------------------------
  const [projStartingViews, setProjStartingViews] = useState<number>(100000);
  const [projViewGrowth, setProjViewGrowth] = useState<number>(5);
  const [projStartingRpm, setProjStartingRpm] = useState<number>(80);
  const [projRpmGrowth, setProjRpmGrowth] = useState<number>(1);
  const [projMonths, setProjMonths] = useState<number>(12);
  const projectionResult = useMemo(() => {
    return calculateProjection({
      startingMonthlyViews: safeParseNumber(projStartingViews),
      monthlyViewGrowthPercent: projViewGrowth,
      startingRpm: safeParseNumber(projStartingRpm),
      monthlyRpmChangePercent: projRpmGrowth,
      months: Math.min(60, Math.max(1, projMonths)),
    });
  }, [projStartingViews, projViewGrowth, projStartingRpm, projRpmGrowth, projMonths]);

  // ----------------------------------------------------
  // 7. Upload Planner State
  // ----------------------------------------------------
  const [uploadsPerMonth, setUploadsPerMonth] = useState<number>(8);
  const [avgViewsPerVideo, setAvgViewsPerVideo] = useState<number>(25000);
  const [plannerRpm, setPlannerRpm] = useState<number>(85);
  const uploadPlanResult = useMemo(() => {
    return calculateUploadPlan({
      uploadsPerMonth: safeParseNumber(uploadsPerMonth),
      averageViewsPerVideo: safeParseNumber(avgViewsPerVideo),
      rpm: safeParseNumber(plannerRpm),
    });
  }, [uploadsPerMonth, avgViewsPerVideo, plannerRpm]);

  const handleInteraction = () => {
    if (onPerformCalculation) {
      onPerformCalculation();
    }
  };

  return (
    <div className="space-y-8" onClick={handleInteraction}>
      {/* Top Controls Bar: Tool Navigation Tabs & Currency Picker */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Navigation Tabs */}
        <div role="tablist" aria-label="YouTube Revenue Calculator Modes" className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <button
            id="tab-btn-calculator"
            role="tab"
            aria-selected={activeTab === 'calculator'}
            aria-controls="panel-calculator"
            type="button"
            onClick={() => setActiveTab('calculator')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 ${
              activeTab === 'calculator'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-red-500" />
            Revenue Calculator
          </button>

          <button
            id="tab-btn-goal"
            role="tab"
            aria-selected={activeTab === 'goal'}
            aria-controls="panel-goal"
            type="button"
            onClick={() => setActiveTab('goal')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 ${
              activeTab === 'goal'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            Income Goal
          </button>

          <button
            id="tab-btn-reverse"
            role="tab"
            aria-selected={activeTab === 'reverse'}
            aria-controls="panel-reverse"
            type="button"
            onClick={() => setActiveTab('reverse')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 ${
              activeTab === 'reverse'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            Reverse RPM
          </button>

          <button
            id="tab-btn-whatif"
            role="tab"
            aria-selected={activeTab === 'whatif'}
            aria-controls="panel-whatif"
            type="button"
            onClick={() => setActiveTab('whatif')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 ${
              activeTab === 'whatif'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            What-If Simulator
          </button>

          <button
            id="tab-btn-scenarios"
            role="tab"
            aria-selected={activeTab === 'scenarios'}
            aria-controls="panel-scenarios"
            type="button"
            onClick={() => setActiveTab('scenarios')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 ${
              activeTab === 'scenarios'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            3-Tier Scenarios
          </button>

          <button
            id="tab-btn-projection"
            role="tab"
            aria-selected={activeTab === 'projection'}
            aria-controls="panel-projection"
            type="button"
            onClick={() => setActiveTab('projection')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 ${
              activeTab === 'projection'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            12M Projection
          </button>

          <button
            id="tab-btn-planner"
            role="tab"
            aria-selected={activeTab === 'planner'}
            aria-controls="panel-planner"
            type="button"
            onClick={() => setActiveTab('planner')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 ${
              activeTab === 'planner'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            Upload Planner
          </button>
        </div>

        {/* Currency Selector */}
        <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
          <label htmlFor="currency-select" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Currency:</label>
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            {CURRENCIES.map((c) => (
              <button
                key={c.code}
                type="button"
                aria-label={`Switch currency to ${c.label}`}
                onClick={() => setCurrency(c.code)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 ${
                  currency === c.code
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {c.symbol} {c.code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PRIMARY REVENUE CALCULATOR (LONG-FORM / SHORTS / HYBRID)           */}
      {/* ========================================================================= */}
      {activeTab === 'calculator' && (
        <div id="panel-calculator" role="tabpanel" aria-labelledby="tab-btn-calculator" className="space-y-8 animate-in fade-in duration-150">
          {/* Format Selector Bar */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-red-600" />
                  YouTube Content Format &amp; Volume Architecture
                </h2>
                <p className="text-xs text-slate-500">
                  Select your content mix. Long-form and Shorts have separate monetization structures.
                </p>
              </div>

              {/* Format Pills */}
              <div className="inline-flex rounded-2xl bg-slate-100 p-1 border border-slate-200 flex-wrap">
                <button
                  type="button"
                  aria-pressed={formatType === 'hybrid'}
                  onClick={() => setFormatType('hybrid')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    formatType === 'hybrid'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  Hybrid (Long-form + Shorts)
                </button>
                <button
                  type="button"
                  aria-pressed={formatType === 'longform'}
                  onClick={() => setFormatType('longform')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    formatType === 'longform'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Film className="w-3.5 h-3.5 text-indigo-600" />
                  Long-form Only
                </button>
                <button
                  type="button"
                  aria-pressed={formatType === 'shorts'}
                  onClick={() => setFormatType('shorts')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    formatType === 'shorts'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-red-600" />
                  Shorts Only
                </button>
              </div>
            </div>

            {/* Frequency Toggle */}
            <div className="pt-2 flex flex-wrap items-center gap-3 border-t border-slate-100 text-xs">
              <span className="font-semibold text-slate-500">View Input Basis:</span>
              <button
                type="button"
                onClick={() => setIsMonthlyFrequency(true)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 ${
                  isMonthlyFrequency
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Monthly Views
              </button>
              <button
                type="button"
                onClick={() => setIsMonthlyFrequency(false)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 ${
                  !isMonthlyFrequency
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Per-Video / Custom Total Views
              </button>
            </div>
          </div>

          {/* Input Controls Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Long-form Card */}
            {(formatType === 'hybrid' || formatType === 'longform') && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Film className="w-4 h-4 text-indigo-600" />
                    Long-Form Video Parameters
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Standard In-Video Ads
                  </span>
                </div>

                {/* Long-form Views */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="input-longform-views" className="text-xs font-bold text-slate-700">
                      {isMonthlyFrequency ? 'Monthly Long-Form Views' : 'Long-Form Views'}
                    </label>
                    <span className="text-xs font-mono font-bold text-indigo-600">
                      {formatNumber(longFormViews)} views
                    </span>
                  </div>
                  <input
                    id="input-longform-views"
                    type="number"
                    min="0"
                    step="1000"
                    value={longFormViews || ''}
                    onChange={(e) => setLongFormViews(safeParseNumber(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm font-mono font-bold text-slate-900"
                    placeholder="e.g. 100000"
                  />
                  {/* View Presets */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {VIEW_PRESETS.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setLongFormViews(p.value)}
                        className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Long-form RPM */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="input-longform-rpm" className="text-xs font-bold text-slate-700">
                      Estimated Creator RPM ({currSymbol} per 1,000 views)
                    </label>
                    <span className="text-xs font-mono font-bold text-slate-900">
                      {formatCurrency(longFormRpm)}
                    </span>
                  </div>
                  <input
                    id="input-longform-rpm"
                    type="number"
                    min="0"
                    step="0.5"
                    value={longFormRpm || ''}
                    onChange={(e) => setLongFormRpm(safeParseNumber(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm font-mono font-bold text-slate-900"
                    placeholder="e.g. 100"
                  />
                  {/* Sample RPM Presets */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-medium text-slate-400">Sample RPM Values:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {SAMPLE_LONGFORM_RPMS.map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setLongFormRpm(rate)}
                          className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-md transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900"
                        >
                          {currSymbol}{rate}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Shorts Card */}
            {(formatType === 'hybrid' || formatType === 'shorts') && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Video className="w-4 h-4 text-red-600" />
                    YouTube Shorts Parameters
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                    Pooled Revenue Feed
                  </span>
                </div>

                {/* Shorts Views */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="input-shorts-views" className="text-xs font-bold text-slate-700">
                      {isMonthlyFrequency ? 'Monthly Shorts Views' : 'Shorts Views'}
                    </label>
                    <span className="text-xs font-mono font-bold text-red-600">
                      {formatNumber(shortsViews)} views
                    </span>
                  </div>
                  <input
                    id="input-shorts-views"
                    type="number"
                    min="0"
                    step="10000"
                    value={shortsViews || ''}
                    onChange={(e) => setShortsViews(safeParseNumber(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm font-mono font-bold text-slate-900"
                    placeholder="e.g. 500000"
                  />
                  {/* View Presets */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {VIEW_PRESETS.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setShortsViews(p.value)}
                        className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shorts RPM */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="input-shorts-rpm" className="text-xs font-bold text-slate-700">
                      Shorts Creator RPM ({currSymbol} per 1,000 views)
                    </label>
                    <span className="text-xs font-mono font-bold text-slate-900">
                      {formatCurrency(shortsRpm)}
                    </span>
                  </div>
                  <input
                    id="input-shorts-rpm"
                    type="number"
                    min="0"
                    step="0.05"
                    value={shortsRpm || ''}
                    onChange={(e) => setShortsRpm(safeParseNumber(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm font-mono font-bold text-slate-900"
                    placeholder="e.g. 1.2"
                  />
                  {/* Sample Shorts RPM Presets */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-medium text-slate-400">Sample Shorts RPM Values:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {SAMPLE_SHORTS_RPMS.map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setShortsRpm(rate)}
                          className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 rounded-md transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900"
                        >
                          {currSymbol}{rate}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Display Landmark */}
          <div aria-live="polite" className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Live Calculation Results
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                  Estimated YouTube Earnings
                </h3>
              </div>
              <div className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                Formula: <span className="font-mono text-slate-200">(Views ÷ 1,000) × RPM</span>
              </div>
            </div>

            {/* Primary Stat Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Monthly */}
              <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 space-y-1">
                <span className="text-xs font-medium text-slate-400">Estimated Monthly</span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tabular-nums">
                  {formatCurrency(activePrimaryRevenue.monthlyRevenue)}
                </div>
                <span className="text-[11px] text-slate-500">Based on entered view volume</span>
              </div>

              {/* Yearly */}
              <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 space-y-1">
                <span className="text-xs font-medium text-slate-400">Projected Yearly</span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white tabular-nums">
                  {formatCurrency(activePrimaryRevenue.yearlyRevenue)}
                </div>
                <span className="text-[11px] text-slate-500">12 × Monthly Revenue</span>
              </div>

              {/* Weekly */}
              <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 space-y-1">
                <span className="text-xs font-medium text-slate-400">Weekly Average</span>
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-200 tabular-nums">
                  {formatCurrency(activePrimaryRevenue.weeklyRevenue)}
                </div>
                <span className="text-[11px] text-slate-500">(Monthly ÷ 30.44) × 7</span>
              </div>

              {/* Daily */}
              <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 space-y-1">
                <span className="text-xs font-medium text-slate-400">Daily Average</span>
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-200 tabular-nums">
                  {formatCurrency(activePrimaryRevenue.dailyRevenue)}
                </div>
                <span className="text-[11px] text-slate-500">Monthly ÷ 30.44 days</span>
              </div>
            </div>

            {/* Hybrid Breakdown Panel if in Hybrid Mode */}
            {formatType === 'hybrid' && (
              <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <PieChart className="w-4 h-4 text-blue-400" />
                    Hybrid Revenue &amp; Blended RPM Breakdown
                  </span>
                  <span className="font-mono text-emerald-400 font-black">
                    Blended RPM: {formatCurrency(blendedResult.blendedRpm)} / 1K views
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Long-form tile */}
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between font-medium text-slate-400">
                      <span>Long-Form Content ({blendedResult.longFormSharePercent}% views)</span>
                      <span className="font-mono text-white">{formatNumber(blendedResult.longFormViews)} views</span>
                    </div>
                    <div className="text-lg font-bold font-mono text-indigo-400">
                      {formatCurrency(blendedResult.longFormRevenue)}
                    </div>
                  </div>

                  {/* Shorts tile */}
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1.5">
                    <div className="flex justify-between font-medium text-slate-400">
                      <span>Shorts Content ({blendedResult.shortsSharePercent}% views)</span>
                      <span className="font-mono text-white">{formatNumber(blendedResult.shortsViews)} views</span>
                    </div>
                    <div className="text-lg font-bold font-mono text-red-400">
                      {formatCurrency(blendedResult.shortsRevenue)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INCOME GOAL TO REQUIRED VIEWS PLANNER                              */}
      {/* ========================================================================= */}
      {activeTab === 'goal' && (
        <div id="panel-goal" role="tabpanel" aria-labelledby="tab-btn-goal" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4" /> Reverse Goal Planning
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              Required Views for YouTube Income Goal
            </h2>
            <p className="text-xs text-slate-500">
              Calculate how many views your channel needs to hit your target earnings based on your RPM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Target Income Input */}
            <div className="space-y-2">
              <label htmlFor="input-income-goal" className="text-xs font-bold text-slate-700">Target Monthly Income ({currSymbol})</label>
              <input
                id="input-income-goal"
                type="number"
                min="0"
                step="5000"
                value={incomeGoal || ''}
                onChange={(e) => setIncomeGoal(safeParseNumber(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm font-mono font-bold text-slate-900"
                placeholder="e.g. 100000"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[10000, 25000, 50000, 100000, 200000, 500000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setIncomeGoal(amt)}
                    className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    {formatCurrency(amt)}
                  </button>
                ))}
              </div>
            </div>

            {/* Target RPM Input */}
            <div className="space-y-2">
              <label htmlFor="input-goal-rpm" className="text-xs font-bold text-slate-700">Expected Creator RPM ({currSymbol} / 1K views)</label>
              <input
                id="input-goal-rpm"
                type="number"
                min="0"
                step="5"
                value={goalRpm || ''}
                onChange={(e) => setGoalRpm(safeParseNumber(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm font-mono font-bold text-slate-900"
                placeholder="e.g. 100"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[25, 50, 80, 100, 150, 200].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setGoalRpm(rate)}
                    className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    {currSymbol}{rate}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Goal Output Cards */}
          <div aria-live="polite" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase">Monthly Views Needed</span>
              <div className="text-2xl font-black font-mono text-emerald-950">
                {formatNumber(incomeGoalResult.requiredMonthlyViews)}
              </div>
              <span className="text-[11px] text-emerald-700">Views required per month</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Daily Views Needed</span>
              <div className="text-2xl font-black font-mono text-emerald-400">
                {formatNumber(incomeGoalResult.requiredDailyViews)}
              </div>
              <span className="text-[11px] text-slate-400">Daily average view run-rate</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-600 uppercase">Weekly Views Needed</span>
              <div className="text-2xl font-black font-mono text-slate-900">
                {formatNumber(incomeGoalResult.requiredWeeklyViews)}
              </div>
              <span className="text-[11px] text-slate-500">Weekly traffic benchmark</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-600 uppercase">Annualized Target</span>
              <div className="text-2xl font-black font-mono text-slate-900">
                {formatCurrency(incomeGoal * 12)}
              </div>
              <span className="text-[11px] text-slate-500">12 × monthly income goal</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: REVERSE RPM CALCULATOR FROM KNOWN DATA                             */}
      {/* ========================================================================= */}
      {activeTab === 'reverse' && (
        <div id="panel-reverse" role="tabpanel" aria-labelledby="tab-btn-reverse" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4" /> Reverse RPM Estimator
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              Calculate True RPM from Your Historical Payouts
            </h2>
            <p className="text-xs text-slate-500">
              Input your actual earnings and views from a past video or billing period to find your exact creator RPM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="input-known-revenue" className="text-xs font-bold text-slate-700">Actual Revenue Earned ({currSymbol})</label>
              <input
                id="input-known-revenue"
                type="number"
                min="0"
                step="100"
                value={knownRevenue || ''}
                onChange={(e) => setKnownRevenue(safeParseNumber(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm font-mono font-bold text-slate-900"
                placeholder="e.g. 10000"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="input-known-views" className="text-xs font-bold text-slate-700">Total Views for Period</label>
              <input
                id="input-known-views"
                type="number"
                min="0"
                step="1000"
                value={knownViews || ''}
                onChange={(e) => setKnownViews(safeParseNumber(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm font-mono font-bold text-slate-900"
                placeholder="e.g. 100000"
              />
            </div>
          </div>

          <div aria-live="polite" className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-800 uppercase">Calculated Creator RPM</span>
              <div className="text-3xl font-black font-mono text-amber-950">
                {formatCurrency(reverseRpmResult.rpm)} <span className="text-sm font-sans font-normal text-amber-800">per 1,000 views</span>
              </div>
              <span className="text-xs text-amber-700 font-mono">Formula: ({formatCurrency(knownRevenue)} ÷ {formatNumber(knownViews)}) × 1,000</span>
            </div>
            <div className="text-xs text-amber-900 bg-white/80 p-3.5 rounded-xl border border-amber-200/80 max-w-sm leading-relaxed">
              Use this calculated rate in the primary calculator or goals simulator for realistic forecasts.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: WHAT-IF SIMULATOR                                                  */}
      {/* ========================================================================= */}
      {activeTab === 'whatif' && (
        <div id="panel-whatif" role="tabpanel" aria-labelledby="tab-btn-whatif" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div>
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4" /> What-If Sensitivity Simulator
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              Test View Spikes &amp; RPM Fluctuations
            </h2>
            <p className="text-xs text-slate-500">
              Model the financial impact when your view count or RPM rises or drops.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label htmlFor="input-whatif-base-views" className="text-xs font-bold text-slate-700">Baseline Monthly Views</label>
              <input
                id="input-whatif-base-views"
                type="number"
                min="0"
                step="5000"
                value={whatIfBaseViews || ''}
                onChange={(e) => setWhatIfBaseViews(safeParseNumber(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="input-whatif-base-rpm" className="text-xs font-bold text-slate-700">Baseline RPM ({currSymbol})</label>
              <input
                id="input-whatif-base-rpm"
                type="number"
                min="0"
                step="5"
                value={whatIfBaseRpm || ''}
                onChange={(e) => setWhatIfBaseRpm(safeParseNumber(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="input-whatif-view-delta" className="text-xs font-bold text-slate-700">
                View Change (%): {whatIfViewDelta > 0 ? `+${whatIfViewDelta}` : whatIfViewDelta}%
              </label>
              <input
                id="input-whatif-view-delta"
                type="range"
                min="-75"
                max="200"
                step="5"
                value={whatIfViewDelta}
                onChange={(e) => setWhatIfViewDelta(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="input-whatif-rpm-delta" className="text-xs font-bold text-slate-700">
                RPM Change (%): {whatIfRpmDelta > 0 ? `+${whatIfRpmDelta}` : whatIfRpmDelta}%
              </label>
              <input
                id="input-whatif-rpm-delta"
                type="range"
                min="-50"
                max="150"
                step="5"
                value={whatIfRpmDelta}
                onChange={(e) => setWhatIfRpmDelta(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
            </div>
          </div>

          <div aria-live="polite" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase">Current Baseline</span>
              <div className="text-2xl font-black font-mono text-slate-900">
                {formatCurrency(whatIfResult.currentRevenue)}
              </div>
              <span className="text-[11px] text-slate-500">{formatNumber(whatIfBaseViews)} views @ {currSymbol}{whatIfBaseRpm}</span>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-50 border border-cyan-200 space-y-1">
              <span className="text-xs font-bold text-cyan-800 uppercase">Simulated Scenario</span>
              <div className="text-2xl font-black font-mono text-cyan-950">
                {formatCurrency(whatIfResult.scenarioRevenue)}
              </div>
              <span className="text-[11px] text-cyan-700">{formatNumber(whatIfResult.scenarioViews)} views @ {currSymbol}{whatIfResult.scenarioRpm.toFixed(2)}</span>
            </div>

            <div className={`p-5 rounded-2xl border space-y-1 ${whatIfResult.revenueDifference >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
              <span className="text-xs font-bold uppercase flex items-center gap-1">
                {whatIfResult.revenueDifference >= 0 ? (
                  <><ArrowUpRight className="w-4 h-4 text-emerald-600" /> Revenue Increase</>
                ) : (
                  <><ArrowDownRight className="w-4 h-4 text-red-600" /> Revenue Decline</>
                )}
              </span>
              <div className={`text-2xl font-black font-mono ${whatIfResult.revenueDifference >= 0 ? 'text-emerald-950' : 'text-red-950'}`}>
                {whatIfResult.revenueDifference >= 0 ? '+' : ''}{formatCurrency(whatIfResult.revenueDifference)}
              </div>
              <span className={`text-[11px] font-bold ${whatIfResult.revenueDifference >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                {whatIfResult.revenueDifference >= 0 ? '+' : ''}{whatIfResult.percentageDifference.toFixed(1)}% delta
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: 3-TIER SCENARIOS                                                   */}
      {/* ========================================================================= */}
      {activeTab === 'scenarios' && (
        <div id="panel-scenarios" role="tabpanel" aria-labelledby="tab-btn-scenarios" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Planning Ranges
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              3-Tier Scenario Spread (Conservative / Expected / Optimistic)
            </h2>
            <p className="text-xs text-slate-500">
              Establish revenue ranges across different market conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label htmlFor="input-scenario-views" className="text-xs font-bold text-slate-700">Monthly View Volume</label>
              <input
                id="input-scenario-views"
                type="number"
                min="0"
                step="5000"
                value={scenarioViews || ''}
                onChange={(e) => setScenarioViews(safeParseNumber(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="input-cons-rpm" className="text-xs font-bold text-slate-700">Conservative RPM ({currSymbol})</label>
              <input
                id="input-cons-rpm"
                type="number"
                min="0"
                step="5"
                value={consRpm || ''}
                onChange={(e) => setConsRpm(safeParseNumber(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="input-exp-rpm" className="text-xs font-bold text-slate-700">Expected RPM ({currSymbol})</label>
              <input
                id="input-exp-rpm"
                type="number"
                min="0"
                step="5"
                value={expRpm || ''}
                onChange={(e) => setExpRpm(safeParseNumber(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="input-opt-rpm" className="text-xs font-bold text-slate-700">Optimistic RPM ({currSymbol})</label>
              <input
                id="input-opt-rpm"
                type="number"
                min="0"
                step="5"
                value={optRpm || ''}
                onChange={(e) => setOptRpm(safeParseNumber(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          <div aria-live="polite" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 uppercase">Conservative</span>
                <span className="text-xs font-mono text-slate-500 font-bold">{currSymbol}{consRpm} RPM</span>
              </div>
              <div className="text-2xl font-black font-mono text-slate-900">
                {formatCurrency(scenarioResult.conservative.monthlyRevenue)}
                <span className="text-xs font-sans text-slate-500 font-normal"> / mo</span>
              </div>
              <div className="text-xs text-slate-500">
                Annual: {formatCurrency(scenarioResult.conservative.yearlyRevenue)}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase">Expected</span>
                <span className="text-xs font-mono text-emerald-800 font-bold">{currSymbol}{expRpm} RPM</span>
              </div>
              <div className="text-2xl font-black font-mono text-emerald-950">
                {formatCurrency(scenarioResult.expected.monthlyRevenue)}
                <span className="text-xs font-sans text-emerald-800 font-normal"> / mo</span>
              </div>
              <div className="text-xs text-emerald-700">
                Annual: {formatCurrency(scenarioResult.expected.yearlyRevenue)}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-800 uppercase">Optimistic</span>
                <span className="text-xs font-mono text-blue-800 font-bold">{currSymbol}{optRpm} RPM</span>
              </div>
              <div className="text-2xl font-black font-mono text-blue-950">
                {formatCurrency(scenarioResult.optimistic.monthlyRevenue)}
                <span className="text-xs font-sans text-blue-800 font-normal"> / mo</span>
              </div>
              <div className="text-xs text-blue-700">
                Annual: {formatCurrency(scenarioResult.optimistic.yearlyRevenue)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: 12-MONTH PROJECTION                                                */}
      {/* ========================================================================= */}
      {activeTab === 'projection' && (
        <div id="panel-projection" role="tabpanel" aria-labelledby="tab-btn-projection" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> Multi-Month Projections
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              Compound Channel Growth &amp; Revenue Projection
            </h2>
            <p className="text-xs text-slate-500">
              Simulate cumulative channel earnings over a full year with compound monthly view growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label htmlFor="input-proj-views" className="text-xs font-bold text-slate-700">Month 1 Starting Views</label>
              <input
                id="input-proj-views"
                type="number"
                min="0"
                step="5000"
                value={projStartingViews || ''}
                onChange={(e) => setProjStartingViews(safeParseNumber(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="input-proj-growth" className="text-xs font-bold text-slate-700">Monthly View Growth (%)</label>
              <input
                id="input-proj-growth"
                type="number"
                step="0.5"
                value={projViewGrowth || ''}
                onChange={(e) => setProjViewGrowth(safeParseNumber(e.target.value, 100))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="input-proj-rpm" className="text-xs font-bold text-slate-700">Starting RPM ({currSymbol})</label>
              <input
                id="input-proj-rpm"
                type="number"
                min="0"
                step="5"
                value={projStartingRpm || ''}
                onChange={(e) => setProjStartingRpm(safeParseNumber(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="input-proj-rpm-growth" className="text-xs font-bold text-slate-700">Monthly RPM Growth (%)</label>
              <input
                id="input-proj-rpm-growth"
                type="number"
                step="0.5"
                value={projRpmGrowth || ''}
                onChange={(e) => setProjRpmGrowth(safeParseNumber(e.target.value, 50))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          <div aria-live="polite" className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Month</th>
                  <th className="p-3">Projected Views</th>
                  <th className="p-3">Estimated RPM</th>
                  <th className="p-3">Monthly Revenue</th>
                  <th className="p-3">Cumulative Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {projectionResult.monthlyItems.map((m) => (
                  <tr key={m.month} className="hover:bg-slate-50">
                    <td className="p-3 font-bold font-sans text-slate-900">Month {m.month}</td>
                    <td className="p-3 text-slate-700">{formatNumber(m.views)}</td>
                    <td className="p-3 text-slate-700">{currSymbol}{m.rpm.toFixed(2)}</td>
                    <td className="p-3 font-bold text-emerald-600">{formatCurrency(m.monthlyRevenue)}</td>
                    <td className="p-3 font-bold text-slate-900">{formatCurrency(m.cumulativeRevenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: UPLOAD PLANNER                                                     */}
      {/* ========================================================================= */}
      {activeTab === 'planner' && (
        <div id="panel-planner" role="tabpanel" aria-labelledby="tab-btn-planner" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Production Scheduling
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              Upload Cadence &amp; Output Planner
            </h2>
            <p className="text-xs text-slate-500">
              Plan your revenue by video upload frequency and expected average views per video.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="input-uploads-per-month" className="text-xs font-bold text-slate-700">Uploads Per Month</label>
              <input
                id="input-uploads-per-month"
                type="number"
                min="0"
                step="1"
                value={uploadsPerMonth || ''}
                onChange={(e) => setUploadsPerMonth(safeParseNumber(e.target.value, 1000))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="input-avg-views-per-video" className="text-xs font-bold text-slate-700">Average Views Per Video</label>
              <input
                id="input-avg-views-per-video"
                type="number"
                min="0"
                step="1000"
                value={avgViewsPerVideo || ''}
                onChange={(e) => setAvgViewsPerVideo(safeParseNumber(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="input-planner-rpm" className="text-xs font-bold text-slate-700">Expected RPM ({currSymbol})</label>
              <input
                id="input-planner-rpm"
                type="number"
                min="0"
                step="5"
                value={plannerRpm || ''}
                onChange={(e) => setPlannerRpm(safeParseNumber(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Planner Outcome Grid */}
          <div aria-live="polite" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1">
              <span className="text-xs font-bold text-indigo-700 uppercase">Revenue Per Video</span>
              <div className="text-2xl font-black font-mono text-indigo-950">
                {formatCurrency(uploadPlanResult.revenuePerVideo)}
              </div>
              <span className="text-[11px] text-indigo-700">{formatNumber(uploadPlanResult.averageViewsPerVideo)} views × RPM</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase">Monthly Revenue</span>
              <div className="text-2xl font-black font-mono text-emerald-400">
                {formatCurrency(uploadPlanResult.monthlyRevenue)}
              </div>
              <span className="text-[11px] text-slate-400">{formatNumber(uploadPlanResult.monthlyViews)} total views/mo</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-600 uppercase">Projected Annual</span>
              <div className="text-2xl font-black font-mono text-slate-900">
                {formatCurrency(uploadPlanResult.yearlyRevenue)}
              </div>
              <span className="text-[11px] text-slate-500">12 × Monthly Output</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-600 uppercase">Annual Upload Target</span>
              <div className="text-2xl font-black font-mono text-slate-900">
                {uploadPlanResult.uploadsPerMonth * 12} Videos
              </div>
              <span className="text-[11px] text-slate-500">{formatNumber(uploadPlanResult.yearlyViews)} annual views</span>
            </div>
          </div>
        </div>
      )}

      {/* Educational Guide, RPM Methodology & FAQ Accordion Section */}
      <YouTubeRevenueCalculatorGuide />
    </div>
  );
};
