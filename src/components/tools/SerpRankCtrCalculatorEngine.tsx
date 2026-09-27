import React, { useState, useMemo } from 'react';
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
  const [monthlyVolume, setMonthlyVolume] = useState<number>(14500);
  const [currentRank, setCurrentRank] = useState<number>(6);
  const [targetRank, setTargetRank] = useState<number>(2);
  const [selectedModel, setSelectedModel] = useState<'standard' | 'branded' | 'ai_overview'>('standard');
  const [cpcEstimate, setCpcEstimate] = useState<number>(2.85);

  const modelData = CTR_MODELS[selectedModel];

  // Calculations
  const calculations = useMemo(() => {
    const curve = modelData.curve;
    const currentCtr = curve[currentRank - 1] || 0.5;
    const targetCtr = curve[targetRank - 1] || 0.5;

    const currentMonthlyClicks = Math.round((monthlyVolume * currentCtr) / 100);
    const targetMonthlyClicks = Math.round((monthlyVolume * targetCtr) / 100);
    const clickGain = Math.max(0, targetMonthlyClicks - currentMonthlyClicks);

    const currentOrganicValue = Math.round(currentMonthlyClicks * cpcEstimate);
    const targetOrganicValue = Math.round(targetMonthlyClicks * cpcEstimate);
    const valueGain = Math.max(0, targetOrganicValue - currentOrganicValue);

    const percentageGrowth =
      currentMonthlyClicks > 0 ? Math.round((clickGain / currentMonthlyClicks) * 100) : 0;

    return {
      currentCtr,
      targetCtr,
      currentMonthlyClicks,
      targetMonthlyClicks,
      clickGain,
      currentOrganicValue,
      targetOrganicValue,
      valueGain,
      percentageGrowth,
    };
  }, [monthlyVolume, currentRank, targetRank, selectedModel, cpcEstimate, modelData]);

  // Chart data for full 1-20 position curve
  const chartData = useMemo(() => {
    return modelData.curve.map((ctr, idx) => ({
      position: idx + 1,
      rankLabel: `#${idx + 1}`,
      ctr,
      estimatedClicks: Math.round((monthlyVolume * ctr) / 100),
    }));
  }, [modelData, monthlyVolume]);

  const handleInputChange = () => {
    onPerformCalculation?.();
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-8">
      {/* Title & Model Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" /> Organic Search CTR Curve &amp; Traffic Forecaster
          </h3>
          <p className="text-xs text-slate-500">
            Model organic click distributions, simulate rank progression (#1–#20), and calculate equivalent Google Ads traffic value.
          </p>
        </div>

        {/* Model Tabs */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl">
          {(Object.keys(CTR_MODELS) as ('standard' | 'branded' | 'ai_overview')[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setSelectedModel(key);
                handleInputChange();
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedModel === key ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              {key === 'standard' ? 'Standard Non-Branded' : key === 'branded' ? 'Branded Query' : 'Google SGE/AI'}
            </button>
          ))}
        </div>
      </div>

      {/* Input Parameters Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-slate-50/70 rounded-2xl border border-slate-200/80">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">Monthly Search Volume</label>
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
              className="w-full pl-9 pr-3 py-2 text-xs font-mono font-bold bg-white border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">Current Rank Position</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={1}
              max={20}
              value={currentRank}
              onChange={(e) => {
                setCurrentRank(Number(e.target.value));
                handleInputChange();
              }}
              className="flex-1 accent-slate-900 cursor-pointer"
            />
            <span className="w-10 text-center font-mono font-bold text-xs bg-slate-900 text-white py-1 rounded-lg">
              #{currentRank}
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">Target Projected Rank</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={1}
              max={20}
              value={targetRank}
              onChange={(e) => {
                setTargetRank(Number(e.target.value));
                handleInputChange();
              }}
              className="flex-1 accent-emerald-600 cursor-pointer"
            />
            <span className="w-10 text-center font-mono font-bold text-xs bg-emerald-600 text-white py-1 rounded-lg">
              #{targetRank}
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">Avg Google Ads CPC ($)</label>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="number"
              step="0.1"
              value={cpcEstimate}
              onChange={(e) => {
                setCpcEstimate(Math.max(0.1, Number(e.target.value)));
                handleInputChange();
              }}
              className="w-full pl-9 pr-3 py-2 text-xs font-mono font-bold bg-white border border-slate-200 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Forecast KPI Output Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Current Position Clicks
          </span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {calculations.currentMonthlyClicks.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-400">/ mo</span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Position #{currentRank} ({calculations.currentCtr}% CTR)
          </p>
        </div>

        <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
            Projected Target Clicks
          </span>
          <div className="text-2xl font-extrabold text-emerald-950 font-mono">
            {calculations.targetMonthlyClicks.toLocaleString()}{' '}
            <span className="text-xs font-normal text-emerald-700">/ mo</span>
          </div>
          <p className="text-[11px] text-emerald-800 font-mono font-bold">
            Position #{targetRank} ({calculations.targetCtr}% CTR)
          </p>
        </div>

        <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Estimated Monthly Click Gain
          </span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono flex items-center gap-1.5">
            <ArrowUpRight className="w-5 h-5" />
            +{calculations.clickGain.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-300 font-mono font-semibold">
            +{calculations.percentageGrowth}% Traffic Expansion
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Monthly Organic Equity Value
          </span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            ${calculations.targetOrganicValue.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-700 font-mono font-bold">
            +${calculations.valueGain.toLocaleString()} / month vs Current
          </p>
        </div>
      </div>

      {/* Interactive CTR Curve Chart */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-emerald-600" /> Full Google SERP Ranking Curve (Position #1–#20)
          </h4>
          <span className="text-[11px] font-mono text-slate-400">
            Model: {modelData.name}
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="ctrGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
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
                formatter={(value: any) => [`${value}% CTR`, 'CTR']}
                labelFormatter={(label) => `Google Rank Position ${label}`}
              />
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
    </div>
  );
};
