import React, { useState, useMemo } from 'react';
import { useCms } from '../../lib/store';
import {
  Calendar,
  Flame,
  Zap,
  ShieldCheck,
  Wrench,
  Info,
  TrendingUp,
  Filter,
} from 'lucide-react';

interface DayActivity {
  date: string; // YYYY-MM-DD
  dayOfWeek: number; // 0 (Sun) - 6 (Sat)
  formattedDate: string; // e.g., "Sep 27, 2026"
  toolRuns: number;
  auditEvents: number;
  total: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export const ActivityCalendarHeatmap: React.FC = () => {
  const { toolUsageEvents, auditLogs } = useCms();
  const [metricFilter, setMetricFilter] = useState<'all' | 'tools' | 'audits'>('all');
  const [weeksToShow, setWeeksToShow] = useState<16 | 24 | 36>(24);
  const [hoveredDay, setHoveredDay] = useState<DayActivity | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayActivity | null>(null);

  // Compute 24 weeks of calendar matrix
  const calendarData = useMemo(() => {
    const totalDays = weeksToShow * 7;
    const now = new Date();
    const days: DayActivity[] = [];
    const dateCounts = new Map<string, { toolRuns: number; auditEvents: number }>();

    // Count Tool Usage Events by YYYY-MM-DD
    toolUsageEvents.forEach((evt) => {
      const d = evt.timestamp.split('T')[0];
      const curr = dateCounts.get(d) || { toolRuns: 0, auditEvents: 0 };
      curr.toolRuns += 1;
      dateCounts.set(d, curr);
    });

    // Count SEO Audit Events by YYYY-MM-DD
    auditLogs.forEach((log) => {
      const d = log.timestamp.split('T')[0];
      const curr = dateCounts.get(d) || { toolRuns: 0, auditEvents: 0 };
      curr.auditEvents += 1;
      dateCounts.set(d, curr);
    });

    // Determine max for intensity leveling
    let maxVal = 1;
    dateCounts.forEach((counts) => {
      const val =
        metricFilter === 'all'
          ? counts.toolRuns + counts.auditEvents
          : metricFilter === 'tools'
          ? counts.toolRuns
          : counts.auditEvents;
      if (val > maxVal) maxVal = val;
    });

    // Generate consecutive days ending today aligned to week
    const currentDayOfWeek = now.getDay(); // 0 is Sun, 6 is Sat
    const daysFromEndOfWeek = 6 - currentDayOfWeek;
    const endDate = new Date(now.getTime() + daysFromEndOfWeek * 24 * 3600 * 1000);

    for (let i = totalDays - 1; i >= 0; i--) {
      const targetDate = new Date(endDate.getTime() - i * 24 * 3600 * 1000);
      const dateStr = targetDate.toISOString().split('T')[0];
      const counts = dateCounts.get(dateStr) || { toolRuns: 0, auditEvents: 0 };

      const total =
        metricFilter === 'all'
          ? counts.toolRuns + counts.auditEvents
          : metricFilter === 'tools'
          ? counts.toolRuns
          : counts.auditEvents;

      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (total > 0) {
        const ratio = total / maxVal;
        if (ratio <= 0.25) level = 1;
        else if (ratio <= 0.5) level = 2;
        else if (ratio <= 0.75) level = 3;
        else level = 4;
      }

      days.push({
        date: dateStr,
        dayOfWeek: targetDate.getDay(),
        formattedDate: new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(targetDate),
        toolRuns: counts.toolRuns,
        auditEvents: counts.auditEvents,
        total,
        level,
      });
    }

    return days;
  }, [toolUsageEvents, auditLogs, metricFilter, weeksToShow]);

  // Split into 7-day columns (Sunday to Saturday)
  const columns = useMemo(() => {
    const cols: DayActivity[][] = [];
    for (let i = 0; i < calendarData.length; i += 7) {
      cols.push(calendarData.slice(i, i + 7));
    }
    return cols;
  }, [calendarData]);

  // Month labels across top
  const monthLabels = useMemo(() => {
    const labels: { colIndex: number; label: string }[] = [];
    let lastMonth = '';

    columns.forEach((col, colIndex) => {
      const firstDay = col[0];
      if (firstDay) {
        const d = new Date(firstDay.date);
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(d);
        if (monthName !== lastMonth) {
          labels.push({ colIndex, label: monthName });
          lastMonth = monthName;
        }
      }
    });

    return labels;
  }, [columns]);

  // Summary Metrics
  const stats = useMemo(() => {
    let peakDay: DayActivity | null = null;
    let activeDaysCount = 0;
    const dayOfWeekSums = [0, 0, 0, 0, 0, 0, 0];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    calendarData.forEach((d) => {
      if (d.total > 0) activeDaysCount++;
      if (!peakDay || d.total > peakDay.total) {
        peakDay = d;
      }
      dayOfWeekSums[d.dayOfWeek] += d.total;
    });

    let busiestDayIdx = 0;
    dayOfWeekSums.forEach((sum, idx) => {
      if (sum > dayOfWeekSums[busiestDayIdx]) {
        busiestDayIdx = idx;
      }
    });

    return {
      peakDay: peakDay && (peakDay as DayActivity).total > 0 ? (peakDay as DayActivity) : null,
      activeDaysCount,
      totalActivityDaysRatio: Math.round((activeDaysCount / calendarData.length) * 100),
      busiestDayName: dayNames[busiestDayIdx],
      totalEventsInWindow: calendarData.reduce((acc, curr) => acc + curr.total, 0),
    };
  }, [calendarData]);

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-emerald-200 border-emerald-300';
      case 2:
        return 'bg-emerald-400 border-emerald-500';
      case 3:
        return 'bg-emerald-600 border-emerald-700';
      case 4:
        return 'bg-emerald-900 border-emerald-950 shadow-xs';
      default:
        return 'bg-slate-100/90 border-slate-200/70 hover:border-slate-300';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <Calendar className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Platform Activity Heatmap &amp; Peak Periods
            </h4>
            <p className="text-xs text-slate-500">
              Calendar matrix visualizing daily SEO calculations, technical audits, and peak operational bursts.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Metric selector */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setMetricFilter('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                metricFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              All Activity
            </button>
            <button
              type="button"
              onClick={() => setMetricFilter('tools')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                metricFilter === 'tools' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Tool Runs
            </button>
            <button
              type="button"
              onClick={() => setMetricFilter('audits')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                metricFilter === 'audits' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              SEO Audits
            </button>
          </div>

          {/* Weeks span */}
          <select
            value={weeksToShow}
            onChange={(e) => setWeeksToShow(Number(e.target.value) as 16 | 24 | 36)}
            className="text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium"
          >
            <option value={16}>Last 16 Weeks</option>
            <option value={24}>Last 24 Weeks (~6 Mos)</option>
            <option value={36}>Last 36 Weeks (~9 Mos)</option>
          </select>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Total Activity Events
          </span>
          <span className="text-lg font-extrabold font-mono text-slate-900 tabular-nums">
            {stats.totalEventsInWindow}
          </span>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Active Days Ratio
          </span>
          <span className="text-lg font-extrabold font-mono text-slate-900 tabular-nums">
            {stats.activeDaysCount} <span className="text-xs text-slate-500 font-normal">({stats.totalActivityDaysRatio}%)</span>
          </span>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Peak Day Record
          </span>
          <span className="text-sm font-bold text-slate-900 truncate block">
            {stats.peakDay ? `${stats.peakDay.total} events (${stats.peakDay.date})` : 'None'}
          </span>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Busiest Day of Week
          </span>
          <span className="text-sm font-bold text-emerald-700 truncate block">
            {stats.busiestDayName}
          </span>
        </div>
      </div>

      {/* Calendar Matrix Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          {/* Month Labels Header */}
          <div className="flex text-[10px] font-mono font-semibold text-slate-400 mb-1.5 pl-7">
            {monthLabels.map((m, idx) => (
              <div
                key={idx}
                style={{
                  width: `${(weeksToShow / monthLabels.length) * 16}px`,
                }}
                className="truncate"
              >
                {m.label}
              </div>
            ))}
          </div>

          <div className="flex gap-1.5 items-start">
            {/* Day of Week Labels (Sun, Mon, Wed, Fri) */}
            <div className="flex flex-col gap-1.5 text-[9px] font-mono text-slate-400 pr-1 select-none pt-0.5">
              <span className="h-3.5 leading-none">Sun</span>
              <span className="h-3.5 leading-none opacity-0">Mon</span>
              <span className="h-3.5 leading-none">Tue</span>
              <span className="h-3.5 leading-none opacity-0">Wed</span>
              <span className="h-3.5 leading-none">Thu</span>
              <span className="h-3.5 leading-none opacity-0">Fri</span>
              <span className="h-3.5 leading-none">Sat</span>
            </div>

            {/* Matrix Columns */}
            <div className="flex gap-1.5">
              {columns.map((col, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1.5">
                  {col.map((day) => (
                    <button
                      key={day.date}
                      type="button"
                      onMouseEnter={() => setHoveredDay(day)}
                      onClick={() => setSelectedDay(day)}
                      className={`w-3.5 h-3.5 rounded-[4px] border transition-all cursor-pointer ${getCellColor(
                        day.level
                      )} ${
                        selectedDay?.date === day.date ? 'ring-2 ring-slate-900 scale-125 z-10' : ''
                      }`}
                      title={`${day.formattedDate}: ${day.total} events (${day.toolRuns} tool runs, ${day.auditEvents} audit events)`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend & Hovered / Selected Day Inspector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
        {/* Day Detail Card */}
        <div className="flex items-center gap-2">
          {(hoveredDay || selectedDay) ? (
            <div className="flex items-center gap-3 bg-slate-900 text-white px-3.5 py-1.5 rounded-xl font-mono text-xs shadow-xs animate-in fade-in">
              <span className="font-bold text-emerald-400">
                {(hoveredDay || selectedDay)?.formattedDate}:
              </span>
              <span>{(hoveredDay || selectedDay)?.total} Total Events</span>
              <span className="text-slate-400">·</span>
              <span className="text-emerald-300">{(hoveredDay || selectedDay)?.toolRuns} Runs</span>
              <span className="text-slate-400">·</span>
              <span className="text-blue-300">{(hoveredDay || selectedDay)?.auditEvents} Audits</span>
            </div>
          ) : (
            <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" /> Hover or click any date cell to inspect exact run volume.
            </span>
          )}
        </div>

        {/* Heatmap Level Legend */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
          <span>Less</span>
          <div className="flex gap-1 items-center">
            <span className="w-3 h-3 rounded-[3px] bg-slate-100 border border-slate-200" />
            <span className="w-3 h-3 rounded-[3px] bg-emerald-200 border border-emerald-300" />
            <span className="w-3 h-3 rounded-[3px] bg-emerald-400 border border-emerald-500" />
            <span className="w-3 h-3 rounded-[3px] bg-emerald-600 border border-emerald-700" />
            <span className="w-3 h-3 rounded-[3px] bg-emerald-900 border border-emerald-950" />
          </div>
          <span>More (Peak)</span>
        </div>
      </div>
    </div>
  );
};
