import Decimal from 'decimal.js';
import { z } from 'zod';

// Ensure 28-digit precision and standard rounding for financial accuracy
Decimal.set({ precision: 28, rounding: Decimal.ROUND_HALF_UP });

export const AVERAGE_DAYS_PER_MONTH = new Decimal('30.44');

// ==========================================
// ZOD VALIDATION SCHEMAS
// ==========================================

export const RevenueInputSchema = z.object({
  views: z.number().min(0, 'Views must be non-negative').max(1e14, 'Views exceed maximum threshold'),
  rpm: z.number().min(0, 'RPM must be non-negative').max(100000, 'RPM exceeds realistic maximum threshold'),
  isMonthlyViews: z.boolean().default(true),
});

export type RevenueInput = z.infer<typeof RevenueInputSchema>;

export const IncomeGoalInputSchema = z.object({
  incomeGoal: z.number().min(0, 'Income goal must be non-negative').max(1e12, 'Income goal exceeds maximum threshold'),
  rpm: z.number().min(0, 'RPM must be non-negative').max(100000, 'RPM exceeds realistic maximum threshold'),
  isMonthlyGoal: z.boolean().default(true),
});

export type IncomeGoalInput = z.infer<typeof IncomeGoalInputSchema>;

export const ReverseRpmInputSchema = z.object({
  revenue: z.number().min(0, 'Revenue must be non-negative').max(1e12, 'Revenue exceeds maximum threshold'),
  views: z.number().min(0, 'Views must be non-negative').max(1e14, 'Views exceed maximum threshold'),
});

export type ReverseRpmInput = z.infer<typeof ReverseRpmInputSchema>;

export const HybridFormatInputSchema = z.object({
  longFormViews: z.number().min(0, 'Long-form views must be non-negative').max(1e14),
  longFormRpm: z.number().min(0, 'Long-form RPM must be non-negative').max(100000),
  shortsViews: z.number().min(0, 'Shorts views must be non-negative').max(1e14),
  shortsRpm: z.number().min(0, 'Shorts RPM must be non-negative').max(100000),
});

export type HybridFormatInput = z.infer<typeof HybridFormatInputSchema>;

export const WhatIfInputSchema = z.object({
  baseViews: z.number().min(0, 'Base views must be non-negative').max(1e14),
  baseRpm: z.number().min(0, 'Base RPM must be non-negative').max(100000),
  viewChangePercent: z.number().min(-100, 'View change cannot be less than -100%').max(10000, 'View change exceeds limit'),
  rpmChangePercent: z.number().min(-100, 'RPM change cannot be less than -100%').max(10000, 'RPM change exceeds limit'),
});

export type WhatIfInput = z.infer<typeof WhatIfInputSchema>;

export const ScenarioTierInputSchema = z.object({
  name: z.string().default('Tier'),
  views: z.number().min(0, 'Views must be non-negative').max(1e14),
  rpm: z.number().min(0, 'RPM must be non-negative').max(100000),
});

export type ScenarioTierInput = z.infer<typeof ScenarioTierInputSchema>;

export const ScenarioInputSchema = z.object({
  conservative: ScenarioTierInputSchema,
  expected: ScenarioTierInputSchema,
  optimistic: ScenarioTierInputSchema,
});

export type ScenarioInput = z.infer<typeof ScenarioInputSchema>;

export const ProjectionInputSchema = z.object({
  startingMonthlyViews: z.number().min(0, 'Starting views must be non-negative').max(1e14),
  monthlyViewGrowthPercent: z.number().min(-100, 'Growth cannot be less than -100%').max(1000, 'Growth exceeds limit'),
  startingRpm: z.number().min(0, 'Starting RPM must be non-negative').max(100000),
  monthlyRpmChangePercent: z.number().min(-100, 'RPM change cannot be less than -100%').max(1000, 'RPM change exceeds limit'),
  months: z.number().int('Months must be an integer').min(1, 'Minimum 1 month').max(60, 'Maximum 60 months projection').default(12),
});

export type ProjectionInput = z.infer<typeof ProjectionInputSchema>;

export const UploadPlannerInputSchema = z.object({
  uploadsPerMonth: z.number().int('Uploads must be an integer').min(0, 'Uploads cannot be negative').max(1000, 'Exceeds monthly upload limit'),
  averageViewsPerVideo: z.number().min(0, 'Average views cannot be negative').max(1e14),
  rpm: z.number().min(0, 'RPM cannot be negative').max(100000),
});

export type UploadPlannerInput = z.infer<typeof UploadPlannerInputSchema>;

// ==========================================
// OUTPUT TYPES
// ==========================================

export interface RevenueResult {
  views: number;
  rpm: number;
  estimatedRevenue: number;
  dailyRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  revenuePer1kViews: number;
}

export interface IncomeGoalResult {
  incomeGoal: number;
  rpm: number;
  requiredViews: number;
  requiredDailyViews: number;
  requiredWeeklyViews: number;
  requiredMonthlyViews: number;
  requiredYearlyViews: number;
  isAttainable: boolean;
}

export interface ReverseRpmResult {
  revenue: number;
  views: number;
  rpm: number;
  revenuePer1kViews: number;
  isValid: boolean;
}

export interface HybridFormatResult {
  longFormViews: number;
  longFormRpm: number;
  longFormRevenue: number;
  shortsViews: number;
  shortsRpm: number;
  shortsRevenue: number;
  totalViews: number;
  totalRevenue: number;
  blendedRpm: number;
  longFormSharePercent: number;
  shortsSharePercent: number;
}

export interface WhatIfResult {
  currentViews: number;
  currentRpm: number;
  currentRevenue: number;
  scenarioViews: number;
  scenarioRpm: number;
  scenarioRevenue: number;
  revenueDifference: number;
  percentageDifference: number;
  isPositiveGrowth: boolean;
}

export interface ScenarioTierResult {
  name: string;
  views: number;
  rpm: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  dailyRevenue: number;
}

export interface ScenarioResult {
  conservative: ScenarioTierResult;
  expected: ScenarioTierResult;
  optimistic: ScenarioTierResult;
  spreadDifference: number;
}

export interface MonthlyProjectionItem {
  month: number;
  views: number;
  rpm: number;
  monthlyRevenue: number;
  cumulativeViews: number;
  cumulativeRevenue: number;
}

export interface ProjectionResult {
  monthlyItems: MonthlyProjectionItem[];
  totalProjectedViews: number;
  totalProjectedRevenue: number;
  averageMonthlyRevenue: number;
  finalMonthRevenue: number;
  startingMonthRevenue: number;
  overallGrowthMultiplier: number;
}

export interface UploadPlannerResult {
  uploadsPerMonth: number;
  averageViewsPerVideo: number;
  rpm: number;
  monthlyViews: number;
  yearlyViews: number;
  revenuePerVideo: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
}

// ==========================================
// AUTHORITATIVE CALCULATION ENGINE FUNCTIONS
// ==========================================

/**
 * Authoritative mathematical source of truth for YouTube ad revenue.
 * Formula: Estimated Revenue = (Views / 1,000) * RPM
 * Daily = Monthly / 30.44, Weekly = Daily * 7, Yearly = Monthly * 12
 */
export function calculateRevenue(input: RevenueInput): RevenueResult {
  const parsed = RevenueInputSchema.parse(input);
  const viewsDec = new Decimal(parsed.views);
  const rpmDec = new Decimal(parsed.rpm);

  if (viewsDec.isZero() || rpmDec.isZero()) {
    return {
      views: parsed.views,
      rpm: parsed.rpm,
      estimatedRevenue: 0,
      dailyRevenue: 0,
      weeklyRevenue: 0,
      monthlyRevenue: 0,
      yearlyRevenue: 0,
      revenuePer1kViews: parsed.rpm,
    };
  }

  // Authoritative base calculation
  const baseRevenue = viewsDec.dividedBy(1000).times(rpmDec);

  const monthlyRevDec = baseRevenue;
  const dailyRevDec = monthlyRevDec.dividedBy(AVERAGE_DAYS_PER_MONTH);
  const weeklyRevDec = dailyRevDec.times(7);
  const yearlyRevDec = monthlyRevDec.times(12);

  return {
    views: parsed.views,
    rpm: Number(rpmDec.toFixed(2)),
    estimatedRevenue: Number(baseRevenue.toFixed(2)),
    dailyRevenue: Number(dailyRevDec.toFixed(2)),
    weeklyRevenue: Number(weeklyRevDec.toFixed(2)),
    monthlyRevenue: Number(monthlyRevDec.toFixed(2)),
    yearlyRevenue: Number(yearlyRevDec.toFixed(2)),
    revenuePer1kViews: Number(rpmDec.toFixed(2)),
  };
}

/**
 * Given an income goal and RPM, calculates the views required to reach that goal.
 * Formula: Required Views = (Income Goal / RPM) * 1,000
 */
export function calculateRequiredViews(input: IncomeGoalInput): IncomeGoalResult {
  const parsed = IncomeGoalInputSchema.parse(input);
  const goalDec = new Decimal(parsed.incomeGoal);
  const rpmDec = new Decimal(parsed.rpm);

  if (goalDec.isZero()) {
    return {
      incomeGoal: 0,
      rpm: parsed.rpm,
      requiredViews: 0,
      requiredDailyViews: 0,
      requiredWeeklyViews: 0,
      requiredMonthlyViews: 0,
      requiredYearlyViews: 0,
      isAttainable: true,
    };
  }

  if (rpmDec.isZero()) {
    return {
      incomeGoal: parsed.incomeGoal,
      rpm: 0,
      requiredViews: 0,
      requiredDailyViews: 0,
      requiredWeeklyViews: 0,
      requiredMonthlyViews: 0,
      requiredYearlyViews: 0,
      isAttainable: false,
    };
  }

  // Required Views = (Income Goal / RPM) * 1,000
  const reqViewsDec = goalDec.dividedBy(rpmDec).times(1000);

  const monthlyViewsDec = reqViewsDec;
  const dailyViewsDec = monthlyViewsDec.dividedBy(AVERAGE_DAYS_PER_MONTH);
  const weeklyViewsDec = dailyViewsDec.times(7);
  const yearlyViewsDec = monthlyViewsDec.times(12);

  return {
    incomeGoal: Number(goalDec.toFixed(2)),
    rpm: Number(rpmDec.toFixed(2)),
    requiredViews: Math.round(Number(reqViewsDec.toFixed(0))),
    requiredDailyViews: Math.round(Number(dailyViewsDec.toFixed(0))),
    requiredWeeklyViews: Math.round(Number(weeklyViewsDec.toFixed(0))),
    requiredMonthlyViews: Math.round(Number(monthlyViewsDec.toFixed(0))),
    requiredYearlyViews: Math.round(Number(yearlyViewsDec.toFixed(0))),
    isAttainable: true,
  };
}

/**
 * Calculates reverse RPM from known revenue and view counts.
 * Formula: RPM = (Revenue / Views) * 1,000
 */
export function calculateRPM(input: ReverseRpmInput): ReverseRpmResult {
  const parsed = ReverseRpmInputSchema.parse(input);
  const revDec = new Decimal(parsed.revenue);
  const viewsDec = new Decimal(parsed.views);

  if (viewsDec.isZero()) {
    return {
      revenue: parsed.revenue,
      views: 0,
      rpm: 0,
      revenuePer1kViews: 0,
      isValid: false,
    };
  }

  if (revDec.isZero()) {
    return {
      revenue: 0,
      views: parsed.views,
      rpm: 0,
      revenuePer1kViews: 0,
      isValid: true,
    };
  }

  const rpmDec = revDec.dividedBy(viewsDec).times(1000);
  const rpmNum = Number(rpmDec.toFixed(2));

  return {
    revenue: Number(revDec.toFixed(2)),
    views: parsed.views,
    rpm: rpmNum,
    revenuePer1kViews: rpmNum,
    isValid: true,
  };
}

/**
 * Calculates combined revenue and blended RPM for a creator publishing both Long-Form videos and Shorts.
 * Reuses calculateRevenue() for authoritative revenue calculations.
 * Blended RPM = (Total Revenue / Total Views) * 1,000
 */
export function calculateBlendedRPM(input: HybridFormatInput): HybridFormatResult {
  const parsed = HybridFormatInputSchema.parse(input);

  const lfResult = calculateRevenue({ views: parsed.longFormViews, rpm: parsed.longFormRpm, isMonthlyViews: true });
  const sResult = calculateRevenue({ views: parsed.shortsViews, rpm: parsed.shortsRpm, isMonthlyViews: true });

  const totalRevDec = new Decimal(lfResult.estimatedRevenue).plus(new Decimal(sResult.estimatedRevenue));
  const totalViewsDec = new Decimal(parsed.longFormViews).plus(new Decimal(parsed.shortsViews));

  let blendedRpmDec = new Decimal(0);
  let lfShareDec = new Decimal(0);
  let sShareDec = new Decimal(0);

  if (!totalViewsDec.isZero()) {
    blendedRpmDec = totalRevDec.dividedBy(totalViewsDec).times(1000);
    lfShareDec = new Decimal(parsed.longFormViews).dividedBy(totalViewsDec).times(100);
    sShareDec = new Decimal(parsed.shortsViews).dividedBy(totalViewsDec).times(100);
  }

  return {
    longFormViews: parsed.longFormViews,
    longFormRpm: parsed.longFormRpm,
    longFormRevenue: lfResult.estimatedRevenue,
    shortsViews: parsed.shortsViews,
    shortsRpm: parsed.shortsRpm,
    shortsRevenue: sResult.estimatedRevenue,
    totalViews: Number(totalViewsDec.toFixed(0)),
    totalRevenue: Number(totalRevDec.toFixed(2)),
    blendedRpm: Number(blendedRpmDec.toFixed(2)),
    longFormSharePercent: Number(lfShareDec.toFixed(1)),
    shortsSharePercent: Number(sShareDec.toFixed(1)),
  };
}

/**
 * Calculates "What-If" scenario comparisons given base metrics and view/RPM percentage deltas.
 * Reuses calculateRevenue() for base and scenario calculations.
 */
export function calculateWhatIf(input: WhatIfInput): WhatIfResult {
  const parsed = WhatIfInputSchema.parse(input);

  const currentResult = calculateRevenue({ views: parsed.baseViews, rpm: parsed.baseRpm, isMonthlyViews: true });

  const baseViewsDec = new Decimal(parsed.baseViews);
  const baseRpmDec = new Decimal(parsed.baseRpm);
  const viewDeltaDec = new Decimal(parsed.viewChangePercent).dividedBy(100);
  const rpmDeltaDec = new Decimal(parsed.rpmChangePercent).dividedBy(100);

  const scenarioViewsDec = Decimal.max(0, baseViewsDec.times(new Decimal(1).plus(viewDeltaDec)));
  const scenarioRpmDec = Decimal.max(0, baseRpmDec.times(new Decimal(1).plus(rpmDeltaDec)));

  const scenarioViewsNum = Math.round(Number(scenarioViewsDec.toFixed(0)));
  const scenarioRpmNum = Number(scenarioRpmDec.toFixed(2));

  const scenarioResult = calculateRevenue({ views: scenarioViewsNum, rpm: scenarioRpmNum, isMonthlyViews: true });

  const diffDec = new Decimal(scenarioResult.estimatedRevenue).minus(new Decimal(currentResult.estimatedRevenue));
  let pctDiffDec = new Decimal(0);

  if (currentResult.estimatedRevenue > 0) {
    pctDiffDec = diffDec.dividedBy(new Decimal(currentResult.estimatedRevenue)).times(100);
  } else if (scenarioResult.estimatedRevenue > 0) {
    pctDiffDec = new Decimal(100);
  }

  return {
    currentViews: parsed.baseViews,
    currentRpm: parsed.baseRpm,
    currentRevenue: currentResult.estimatedRevenue,
    scenarioViews: scenarioViewsNum,
    scenarioRpm: scenarioRpmNum,
    scenarioRevenue: scenarioResult.estimatedRevenue,
    revenueDifference: Number(diffDec.toFixed(2)),
    percentageDifference: Number(pctDiffDec.toFixed(1)),
    isPositiveGrowth: diffDec.greaterThanOrEqualTo(0),
  };
}

/**
 * Calculates a multi-tier scenario comparison (Conservative, Expected, Optimistic) using supplied assumptions.
 * Reuses calculateRevenue() for each scenario tier.
 */
export function calculateScenario(input: ScenarioInput): ScenarioResult {
  const parsed = ScenarioInputSchema.parse(input);

  const consResult = calculateRevenue({ views: parsed.conservative.views, rpm: parsed.conservative.rpm, isMonthlyViews: true });
  const expResult = calculateRevenue({ views: parsed.expected.views, rpm: parsed.expected.rpm, isMonthlyViews: true });
  const optResult = calculateRevenue({ views: parsed.optimistic.views, rpm: parsed.optimistic.rpm, isMonthlyViews: true });

  const conservativeTier: ScenarioTierResult = {
    name: parsed.conservative.name || 'Conservative',
    views: parsed.conservative.views,
    rpm: parsed.conservative.rpm,
    monthlyRevenue: consResult.monthlyRevenue,
    yearlyRevenue: consResult.yearlyRevenue,
    dailyRevenue: consResult.dailyRevenue,
  };

  const expectedTier: ScenarioTierResult = {
    name: parsed.expected.name || 'Expected',
    views: parsed.expected.views,
    rpm: parsed.expected.rpm,
    monthlyRevenue: expResult.monthlyRevenue,
    yearlyRevenue: expResult.yearlyRevenue,
    dailyRevenue: expResult.dailyRevenue,
  };

  const optimisticTier: ScenarioTierResult = {
    name: parsed.optimistic.name || 'Optimistic',
    views: parsed.optimistic.views,
    rpm: parsed.optimistic.rpm,
    monthlyRevenue: optResult.monthlyRevenue,
    yearlyRevenue: optResult.yearlyRevenue,
    dailyRevenue: optResult.dailyRevenue,
  };

  const spreadDiff = Number(new Decimal(optResult.monthlyRevenue).minus(new Decimal(consResult.monthlyRevenue)).toFixed(2));

  return {
    conservative: conservativeTier,
    expected: expectedTier,
    optimistic: optimisticTier,
    spreadDifference: spreadDiff,
  };
}

/**
 * Calculates a compound mathematical projection over N months.
 * Reuses calculateRevenue() for each monthly record.
 * Note: This is an analytical scenario model, not a guaranteed financial projection.
 */
export function calculateProjection(input: ProjectionInput): ProjectionResult {
  const parsed = ProjectionInputSchema.parse(input);

  let currentViews = new Decimal(parsed.startingMonthlyViews);
  let currentRpm = new Decimal(parsed.startingRpm);

  const viewGrowthRate = new Decimal(parsed.monthlyViewGrowthPercent).dividedBy(100);
  const rpmGrowthRate = new Decimal(parsed.monthlyRpmChangePercent).dividedBy(100);

  const items: MonthlyProjectionItem[] = [];
  let cumulativeViews = new Decimal(0);
  let cumulativeRevenue = new Decimal(0);

  const startResult = calculateRevenue({
    views: Number(currentViews.toFixed(0)),
    rpm: Number(currentRpm.toFixed(2)),
    isMonthlyViews: true,
  });

  for (let m = 1; m <= parsed.months; m++) {
    if (m > 1) {
      currentViews = Decimal.max(0, currentViews.times(new Decimal(1).plus(viewGrowthRate)));
      currentRpm = Decimal.max(0, currentRpm.times(new Decimal(1).plus(rpmGrowthRate)));
    }

    const monthViewsNum = Math.round(Number(currentViews.toFixed(0)));
    const monthRpmNum = Number(currentRpm.toFixed(2));

    const monthResult = calculateRevenue({ views: monthViewsNum, rpm: monthRpmNum, isMonthlyViews: true });

    cumulativeViews = cumulativeViews.plus(monthViewsNum);
    cumulativeRevenue = cumulativeRevenue.plus(monthResult.monthlyRevenue);

    items.push({
      month: m,
      views: monthViewsNum,
      rpm: monthRpmNum,
      monthlyRevenue: monthResult.monthlyRevenue,
      cumulativeViews: Math.round(Number(cumulativeViews.toFixed(0))),
      cumulativeRevenue: Number(cumulativeRevenue.toFixed(2)),
    });
  }

  const totalRevNum = Number(cumulativeRevenue.toFixed(2));
  const avgRevNum = Number(cumulativeRevenue.dividedBy(parsed.months).toFixed(2));
  const finalMonthRevNum = items.length > 0 ? items[items.length - 1].monthlyRevenue : 0;
  const startRevNum = startResult.monthlyRevenue;

  let multiplier = 1;
  if (startRevNum > 0) {
    multiplier = Number(new Decimal(finalMonthRevNum).dividedBy(startRevNum).toFixed(2));
  }

  return {
    monthlyItems: items,
    totalProjectedViews: Math.round(Number(cumulativeViews.toFixed(0))),
    totalProjectedRevenue: totalRevNum,
    averageMonthlyRevenue: avgRevNum,
    finalMonthRevenue: finalMonthRevNum,
    startingMonthRevenue: startRevNum,
    overallGrowthMultiplier: multiplier,
  };
}

/**
 * Calculates YouTube revenue based on upload frequency and average view velocity per video.
 * Reuses calculateRevenue() for per-video and monthly revenue.
 */
export function calculateUploadPlan(input: UploadPlannerInput): UploadPlannerResult {
  const parsed = UploadPlannerInputSchema.parse(input);

  const uploadsDec = new Decimal(parsed.uploadsPerMonth);
  const viewsPerVideoDec = new Decimal(parsed.averageViewsPerVideo);

  const monthlyViewsDec = uploadsDec.times(viewsPerVideoDec);
  const yearlyViewsDec = monthlyViewsDec.times(12);

  const perVideoResult = calculateRevenue({
    views: parsed.averageViewsPerVideo,
    rpm: parsed.rpm,
    isMonthlyViews: false,
  });

  const monthlyResult = calculateRevenue({
    views: Math.round(Number(monthlyViewsDec.toFixed(0))),
    rpm: parsed.rpm,
    isMonthlyViews: true,
  });

  return {
    uploadsPerMonth: parsed.uploadsPerMonth,
    averageViewsPerVideo: parsed.averageViewsPerVideo,
    rpm: Number(new Decimal(parsed.rpm).toFixed(2)),
    monthlyViews: Math.round(Number(monthlyViewsDec.toFixed(0))),
    yearlyViews: Math.round(Number(yearlyViewsDec.toFixed(0))),
    revenuePerVideo: perVideoResult.estimatedRevenue,
    monthlyRevenue: monthlyResult.monthlyRevenue,
    yearlyRevenue: monthlyResult.yearlyRevenue,
  };
}
