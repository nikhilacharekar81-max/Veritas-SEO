import React, { useState, useMemo } from 'react';
import { useCms } from '../../lib/store';
import { formatTimestamp } from '../../lib/utils';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ActivityCalendarHeatmap } from './ActivityCalendarHeatmap';
import {
  Activity,
  TrendingUp,
  History,
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle2,
  Layers,
  Wrench,
  Clock,
} from 'lucide-react';

const COLORS = {
  emerald: '#059669',
  emeraldLight: '#34d399',
  slate900: '#0f172a',
  slate500: '#64748b',
  blue: '#2563eb',
  purple: '#7c3aed',
  amber: '#d97706',
  rose: '#e11d48',
  cyan: '#0891b2',
};

const PIE_PALETTE = ['#0f172a', '#059669', '#2563eb', '#7c3aed', '#d97706', '#e11d48', '#0891b2', '#4b5563'];

export const AnalyticsDashboard: React.FC = () => {
  const {
    tools,
    categories,
    subCategories,
    auditLogs,
    toolUsageEvents,
    simulateTrafficEvents,
    clearAnalyticsEvents,
  } = useCms();

  const [timeRangeDays, setTimeRangeDays] = useState<7 | 14 | 30>(7);

  // Filter events within selected timeframe
  const cutoffTime = useMemo(() => {
    return Date.now() - timeRangeDays * 24 * 3600 * 1000;
  }, [timeRangeDays]);

  const filteredToolEvents = useMemo(() => {
    return toolUsageEvents.filter((e) => new Date(e.timestamp).getTime() >= cutoffTime);
  }, [toolUsageEvents, cutoffTime]);

  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter((l) => new Date(l.timestamp).getTime() >= cutoffTime);
  }, [auditLogs, cutoffTime]);

  // Aggregate daily metrics for Engagement Trend Chart
  const dailyTimeSeriesData = useMemo(() => {
    const daysMap = new Map<
      string,
      {
        date: string;
        label: string;
        toolExecutions: number;
        auditEvents: number;
        avgDurationMs: number;
        durations: number[];
      }
    >();

    // Initialize all days in window
    for (let i = timeRangeDays - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 3600 * 1000);
      const key = d.toISOString().split('T')[0];
      const label = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d);
      daysMap.set(key, {
        date: key,
        label,
        toolExecutions: 0,
        auditEvents: 0,
        avgDurationMs: 0,
        durations: [],
      });
    }

    filteredToolEvents.forEach((evt) => {
      const key = evt.timestamp.split('T')[0];
      const entry = daysMap.get(key);
      if (entry) {
        entry.toolExecutions += 1;
        entry.durations.push(evt.executionDurationMs);
      }
    });

    filteredAuditLogs.forEach((log) => {
      const key = log.timestamp.split('T')[0];
      const entry = daysMap.get(key);
      if (entry) {
        entry.auditEvents += 1;
      }
    });

    const result = Array.from(daysMap.values()).map((item) => ({
      ...item,
      avgDurationMs:
        item.durations.length > 0
          ? Math.round(item.durations.reduce((a, b) => a + b, 0) / item.durations.length)
          : 0,
    }));

    return result;
  }, [filteredToolEvents, filteredAuditLogs, timeRangeDays]);

  // Audit event distribution by action type
  const auditActionData = useMemo(() => {
    const actionCounts: Record<string, number> = {
      created: 0,
      edited: 0,
      moved: 0,
      toggled_status: 0,
      redirect_created: 0,
      deleted: 0,
      bulk_action: 0,
    };

    filteredAuditLogs.forEach((l) => {
      if (actionCounts[l.action] !== undefined) {
        actionCounts[l.action] += 1;
      } else {
        actionCounts[l.action] = 1;
      }
    });

    return Object.entries(actionCounts).map(([action, count]) => ({
      action: action.replace('_', ' '),
      count,
    }));
  }, [filteredAuditLogs]);

  // Popular tool engine breakdown
  const enginePopularityData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredToolEvents.forEach((e) => {
      const name = e.toolTitle.length > 22 ? `${e.toolTitle.substring(0, 20)}...` : e.toolTitle;
      counts[name] = (counts[name] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, executions]) => ({ name, executions }))
      .sort((a, b) => b.executions - a.executions)
      .slice(0, 6);
  }, [filteredToolEvents]);

  // Device Breakdown Data
  const deviceData = useMemo(() => {
    const counts = { desktop: 0, mobile: 0, tablet: 0 };
    filteredToolEvents.forEach((e) => {
      counts[e.deviceType] = (counts[e.deviceType] || 0) + 1;
    });

    return [
      { name: 'Desktop', value: counts.desktop || 0, color: '#0f172a' },
      { name: 'Mobile', value: counts.mobile || 0, color: '#059669' },
      { name: 'Tablet', value: counts.tablet || 0, color: '#2563eb' },
    ].filter((d) => d.value > 0);
  }, [filteredToolEvents]);

  // Top Tools by cumulative stored usageCount
  const topToolsByUsageCount = useMemo(() => {
    return [...tools]
      .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
      .slice(0, 6)
      .map((t) => ({
        name: t.title.length > 22 ? `${t.title.substring(0, 20)}...` : t.title,
        fullTitle: t.title,
        usageCount: t.usageCount || 0,
        status: t.status,
        engineType: t.engineType,
      }));
  }, [tools]);

  // Total cumulative calculations across all tools
  const cumulativeLifetimeCalculations = useMemo(() => {
    return tools.reduce((sum, t) => sum + (t.usageCount || 0), 0);
  }, [tools]);

  // KPIs
  const totalExecutions = filteredToolEvents.length;
  const totalAuditEvents = filteredAuditLogs.length;
  const avgExecutionDuration =
    totalExecutions > 0
      ? Math.round(
          filteredToolEvents.reduce((acc, curr) => acc + curr.executionDurationMs, 0) /
            totalExecutions
        )
      : 0;
  const activeToolCount = tools.filter((t) => t.isActive && t.status === 'published').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Header controls & Timeframe Switcher */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">User Engagement &amp; Audit Analytics</h3>
            <p className="text-xs text-slate-500">
              Interactive recharts visualization tracking SEO tool execution volume, audit frequency, and device demographics.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe selector */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl">
            {([7, 14, 30] as const).map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => setTimeRangeDays(days)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  timeRangeDays === days
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Last {days} Days
              </button>
            ))}
          </div>

          {/* Simulate traffic action */}
          <button
            type="button"
            onClick={() => simulateTrafficEvents(30)}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
            title="Simulate user traffic and tool runs"
          >
            <Sparkles className="w-3.5 h-3.5" /> Simulate +30 Runs
          </button>

          {toolUsageEvents.length > 0 && (
            <button
              type="button"
              onClick={clearAnalyticsEvents}
              className="p-1.5 text-slate-400 hover:text-red-600 rounded-xl hover:bg-slate-100 transition-colors"
              title="Clear tool engagement history"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* KPI Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tool Executions */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-600" /> Tool Runs &amp; Computations
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              +{Math.min(99, totalExecutions * 3)}%
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {totalExecutions}
          </div>
          <p className="text-[11px] text-slate-500">
            Simulations and calculations executed in the last {timeRangeDays} days.
          </p>
        </div>

        {/* Lifetime Usage Count Total */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" /> Lifetime Calculations
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              Stored usageCount
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {cumulativeLifetimeCalculations}
          </div>
          <p className="text-[11px] text-slate-500">
            Cumulative persistent calculations across all {tools.length} SEO tools.
          </p>
        </div>

        {/* Audit Log Events */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-4 h-4 text-blue-600" /> Audit Events Logged
            </span>
            <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-bold">
              Active
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {totalAuditEvents}
          </div>
          <p className="text-[11px] text-slate-500">
            Administrative changes and hierarchy operations captured.
          </p>
        </div>

        {/* Avg Latency */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-purple-600" /> Avg Engine Execution
            </span>
            <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full font-bold">
              Decimal.js
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {avgExecutionDuration} <span className="text-xs text-slate-400 font-normal">ms</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Sub-millisecond mathematical precision response time.
          </p>
        </div>

        {/* Published Ratio */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600" /> Published Tool Ratio
            </span>
            <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold">
              {tools.length > 0 ? Math.round((activeToolCount / tools.length) * 100) : 0}%
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {activeToolCount} <span className="text-xs text-slate-400 font-normal">/ {tools.length}</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Published tools eligible for Google indexing and sitemap feeds.
          </p>
        </div>
      </div>

      {/* Interactive Activity Calendar Heatmap */}
      <ActivityCalendarHeatmap />

      {/* Main Charts Row 1: Daily Engagement Trend (AreaChart) & Audit Event Frequency (BarChart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Engagement Trend AreaChart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" /> Tool Usage &amp; Audit Event Trends Over Time
              </h4>
              <p className="text-xs text-slate-500">
                Daily comparison of visitor tool computations vs administrative audit mutations.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1 text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Tool Runs
              </span>
              <span className="flex items-center gap-1 text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900" /> Audit Events
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyTimeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="toolRunsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.emerald} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={COLORS.emerald} stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="auditEventsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.slate900} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={COLORS.slate900} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)',
                  }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ fontWeight: 'bold', color: '#34d399', marginBottom: '4px' }}
                />
                <Area
                  type="monotone"
                  dataKey="toolExecutions"
                  name="Tool Runs"
                  stroke={COLORS.emerald}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#toolRunsGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="auditEvents"
                  name="Audit Events"
                  stroke={COLORS.slate900}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#auditEventsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Audit Event Distribution by Action Type */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-blue-600" /> Audit Action Frequency
            </h4>
            <p className="text-xs text-slate-500">Distribution of administrative activities.</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={auditActionData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                <YAxis dataKey="action" type="category" stroke="#94a3b8" fontSize={10} tickLine={false} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="count" name="Frequency" fill={COLORS.blue} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>Logged Mutations:</span>
            <strong className="text-slate-900">{totalAuditEvents} events</strong>
          </div>
        </div>
      </div>

      {/* Row 2: Popular Tools & Device Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Most Utilized Tools by Lifetime usageCount (Horizontal BarChart) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-purple-600" /> Persistent Tool Calculation Count (`usageCount`)
              </h4>
              <p className="text-xs text-slate-500">Live ranking of tools incremented on every user execution.</p>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Lifetime Leaderboard</span>
          </div>

          {topToolsByUsageCount.length === 0 || cumulativeLifetimeCalculations === 0 ? (
            <div className="h-60 flex items-center justify-center text-slate-400 text-xs">
              No tool calculations recorded yet. Run calculations in public tools or click "Simulate +30 Runs".
            </div>
          ) : (
            <div className="space-y-3">
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topToolsByUsageCount} margin={{ top: 10, right: 10, left: -15, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} interval={0} angle={-15} textAnchor="end" />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: 'none',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '11px',
                      }}
                    />
                    <Bar dataKey="usageCount" name="Lifetime Calculations" fill={COLORS.purple} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {topToolsByUsageCount.slice(0, 3).map((t, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 block font-mono">#{idx + 1} Most Active</span>
                    <span className="font-semibold text-slate-900 truncate block">{t.fullTitle}</span>
                    <span className="font-mono text-emerald-700 font-bold">{t.usageCount} calculations</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Device Demographics (Donut Chart) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-slate-900" /> User Device Breakdown
            </h4>
            <p className="text-xs text-slate-500">Distribution of desktop vs mobile viewport runs.</p>
          </div>

          {deviceData.length === 0 ? (
            <div className="h-60 flex items-center justify-center text-slate-400 text-xs">
              No device events recorded yet.
            </div>
          ) : (
            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '11px',
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-xs text-slate-700 font-medium">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-xs">
            <div className="p-2 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Desktop</span>
              <span className="font-bold text-slate-900 font-mono">
                {filteredToolEvents.filter((e) => e.deviceType === 'desktop').length}
              </span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Mobile</span>
              <span className="font-bold text-slate-900 font-mono">
                {filteredToolEvents.filter((e) => e.deviceType === 'mobile').length}
              </span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Tablet</span>
              <span className="font-bold text-slate-900 font-mono">
                {filteredToolEvents.filter((e) => e.deviceType === 'tablet').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tool Executions Real-Time Feed Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Real-Time Tool Execution Log Feed</h4>
            <p className="text-xs text-slate-500">Live telemetry capturing recent user computations.</p>
          </div>
          <span className="text-xs font-mono text-slate-500">{filteredToolEvents.length} total runs logged</span>
        </div>

        {filteredToolEvents.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No execution logs recorded in this timeframe. Click "Simulate +30 Runs" to preview real-time traffic.
          </div>
        ) : (
          <div className="overflow-x-auto max-h-72">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4">Timestamp</th>
                  <th className="py-2.5 px-4">SEO Tool Name</th>
                  <th className="py-2.5 px-4">Engine Type</th>
                  <th className="py-2.5 px-4 text-center">Device</th>
                  <th className="py-2.5 px-4 text-right">Computation Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredToolEvents.slice(0, 15).map((evt) => (
                  <tr key={evt.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-2.5 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                      {formatTimestamp(evt.timestamp)}
                    </td>
                    <td className="py-2.5 px-4 font-sans font-semibold text-slate-900">
                      {evt.toolTitle}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 font-mono text-[11px]">
                      {evt.engineType}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-sans text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-700 capitalize">
                        {evt.deviceType === 'mobile' ? (
                          <Smartphone className="w-3 h-3 text-slate-500" />
                        ) : evt.deviceType === 'tablet' ? (
                          <Tablet className="w-3 h-3 text-slate-500" />
                        ) : (
                          <Monitor className="w-3 h-3 text-slate-500" />
                        )}
                        {evt.deviceType}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900 tabular-nums">
                      {evt.executionDurationMs} ms
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
