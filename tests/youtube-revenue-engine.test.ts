import {
  calculateRevenue,
  calculateRequiredViews,
  calculateRPM,
  calculateBlendedRPM,
  calculateWhatIf,
  calculateScenario,
  calculateProjection,
  calculateUploadPlan,
  RevenueInputSchema,
  IncomeGoalInputSchema,
  ReverseRpmInputSchema,
  WhatIfInputSchema,
  ScenarioInputSchema,
} from '../src/lib/youtube-revenue-engine';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, errorDetails?: unknown) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${testName}`, errorDetails ? errorDetails : '');
  }
}

console.log('====================================================');
console.log('RUNNING REFINED YOUTUBE REVENUE ENGINE TEST SUITE');
console.log('====================================================\n');

// 1. Primary Test: 100,000 views × ₹100 RPM
{
  console.log('TEST 1: calculateRevenue() — 100,000 views × ₹100 RPM');
  const res = calculateRevenue({ views: 100000, rpm: 100, isMonthlyViews: true });
  assert(res.estimatedRevenue === 10000, 'Estimated monthly revenue is 10,000 (100k / 1k * 100)');
  assert(res.yearlyRevenue === 120000, 'Yearly revenue is 120,000 (10,000 * 12)');
  assert(Math.abs(res.dailyRevenue - 328.51) < 0.1, 'Daily revenue is approx 328.51 (10,000 / 30.44)');
  assert(Math.abs(res.weeklyRevenue - 2299.61) < 0.1, 'Weekly revenue is approx 2299.61');
}

// 2. Test: 500,000 views × ₹80 RPM
{
  console.log('\nTEST 2: calculateRevenue() — 500,000 views × ₹80 RPM');
  const res = calculateRevenue({ views: 500000, rpm: 80, isMonthlyViews: true });
  assert(res.estimatedRevenue === 40000, 'Estimated monthly revenue is 40,000 (500k / 1k * 80)');
  assert(res.yearlyRevenue === 480000, 'Yearly revenue is 480,000');
  assert(Math.abs(res.dailyRevenue - 1314.06) < 0.1, 'Daily revenue is approx 1314.06');
}

// 3. Test: Income Goal — calculateRequiredViews() (₹100,000 goal at ₹100 RPM)
{
  console.log('\nTEST 3: calculateRequiredViews() — (₹100,000 goal at ₹100 RPM)');
  const res = calculateRequiredViews({ incomeGoal: 100000, rpm: 100, isMonthlyGoal: true });
  assert(res.requiredViews === 1000000, 'Required views for 100k goal at 100 RPM is 1,000,000 (1M)');
  assert(res.requiredMonthlyViews === 1000000, 'Required monthly views is 1,000,000');
  assert(Math.abs(res.requiredDailyViews - 32852) < 5, 'Required daily views is approx 32,852 (1M / 30.44)');
  assert(res.isAttainable === true, 'Goal is attainable');
}

// 4. Test: Reverse RPM — calculateRPM()
{
  console.log('\nTEST 4: calculateRPM() — Reverse RPM from revenue and views');
  const res = calculateRPM({ revenue: 10000, views: 100000 });
  assert(res.rpm === 100, 'Calculates RPM of 100 from 10k revenue & 100k views');
  assert(res.isValid === true, 'Reverse RPM result is valid');

  const res2 = calculateRPM({ revenue: 2500, views: 50000 });
  assert(res2.rpm === 50, 'Calculates RPM of 50 from 2.5k revenue & 50k views');
}

// 5. Test: Zero views and Zero RPM edge cases
{
  console.log('\nTEST 5: Zero views and Zero RPM edge cases');
  const zeroViews = calculateRevenue({ views: 0, rpm: 50, isMonthlyViews: true });
  assert(zeroViews.estimatedRevenue === 0, 'Zero views returns 0 revenue');
  assert(zeroViews.yearlyRevenue === 0, 'Zero views returns 0 yearly revenue');

  const zeroRpm = calculateRevenue({ views: 500000, rpm: 0, isMonthlyViews: true });
  assert(zeroRpm.estimatedRevenue === 0, 'Zero RPM returns 0 revenue');

  const zeroGoal = calculateRequiredViews({ incomeGoal: 0, rpm: 100, isMonthlyGoal: true });
  assert(zeroGoal.requiredViews === 0, 'Zero income goal requires 0 views');

  const zeroRpmGoal = calculateRequiredViews({ incomeGoal: 10000, rpm: 0, isMonthlyGoal: true });
  assert(zeroRpmGoal.isAttainable === false, 'Zero RPM makes goal unattainable');

  const zeroViewsRpm = calculateRPM({ revenue: 1000, views: 0 });
  assert(zeroViewsRpm.isValid === false, 'Zero views reverse RPM is flagged invalid');
  assert(zeroViewsRpm.rpm === 0, 'Zero views reverse RPM returns 0 without crashing');
}

// 6. Test: Negative inputs handling via Zod Schema
{
  console.log('\nTEST 6: Negative inputs handling & validation');
  let threwRevenue = false;
  try {
    RevenueInputSchema.parse({ views: -500, rpm: 10 });
  } catch {
    threwRevenue = true;
  }
  assert(threwRevenue === true, 'RevenueInputSchema rejects negative views');

  let threwGoal = false;
  try {
    IncomeGoalInputSchema.parse({ incomeGoal: -1000, rpm: 50 });
  } catch {
    threwGoal = true;
  }
  assert(threwGoal === true, 'IncomeGoalInputSchema rejects negative income goal');

  let threwReverse = false;
  try {
    ReverseRpmInputSchema.parse({ revenue: -100, views: 1000 });
  } catch {
    threwReverse = true;
  }
  assert(threwReverse === true, 'ReverseRpmInputSchema rejects negative revenue');
}

// 7. Test: Hybrid Long-Form + Shorts & Blended RPM
{
  console.log('\nTEST 7: calculateBlendedRPM() — Hybrid Long-Form + Shorts & Blended RPM');
  // Long-form: 200,000 views @ $8 RPM = $1,600
  // Shorts: 1,000,000 views @ $0.15 RPM = $150
  // Total Revenue: $1,750 | Total Views: 1,200,000 | Blended RPM: ($1,750 / 1.2M) * 1000 = $1.46
  const hybrid = calculateBlendedRPM({
    longFormViews: 200000,
    longFormRpm: 8,
    shortsViews: 1000000,
    shortsRpm: 0.15,
  });

  assert(hybrid.longFormRevenue === 1600, 'Long-form revenue is 1,600');
  assert(hybrid.shortsRevenue === 150, 'Shorts revenue is 150');
  assert(hybrid.totalRevenue === 1750, 'Total combined revenue is 1,750');
  assert(hybrid.totalViews === 1200000, 'Total combined views is 1,200,000');
  assert(hybrid.blendedRpm === 1.46, 'Blended RPM is 1.46');
  assert(hybrid.longFormSharePercent === 16.7, 'Long-form view share is 16.7%');
  assert(hybrid.shortsSharePercent === 83.3, 'Shorts view share is 83.3%');
}

// 8. Test: calculateWhatIf()
{
  console.log('\nTEST 8: calculateWhatIf() — Delta Percentage Analysis');
  // Base: 100,000 views @ ₹5 RPM (₹500)
  // Scenario: +50% views (150,000) and +20% RPM (₹6.00) => 150 * 6 = ₹900
  // Difference: +₹400 (+80%)
  const whatIf = calculateWhatIf({
    baseViews: 100000,
    baseRpm: 5,
    viewChangePercent: 50,
    rpmChangePercent: 20,
  });

  assert(whatIf.currentRevenue === 500, 'Current revenue is 500');
  assert(whatIf.scenarioViews === 150000, 'Scenario views is 150,000');
  assert(whatIf.scenarioRpm === 6, 'Scenario RPM is 6.00');
  assert(whatIf.scenarioRevenue === 900, 'Scenario revenue is 900');
  assert(whatIf.revenueDifference === 400, 'Revenue difference is +400');
  assert(whatIf.percentageDifference === 80, 'Percentage difference is +80%');
  assert(whatIf.isPositiveGrowth === true, 'Positive growth identified');
}

// 9. Test: calculateScenario() — 3-Tier Multi-Scenario Planning
{
  console.log('\nTEST 9: calculateScenario() — Conservative / Expected / Optimistic Tiers');
  const scenario = calculateScenario({
    conservative: { name: 'Conservative', views: 100000, rpm: 40 },
    expected: { name: 'Expected', views: 100000, rpm: 80 },
    optimistic: { name: 'Strong', views: 100000, rpm: 150 },
  });

  assert(scenario.conservative.monthlyRevenue === 4000, 'Conservative tier monthly revenue is 4,000 (100k @ ₹40)');
  assert(scenario.conservative.yearlyRevenue === 48000, 'Conservative tier yearly revenue is 48,000');
  assert(scenario.expected.monthlyRevenue === 8000, 'Expected tier monthly revenue is 8,000 (100k @ ₹80)');
  assert(scenario.expected.yearlyRevenue === 96000, 'Expected tier yearly revenue is 96,000');
  assert(scenario.optimistic.monthlyRevenue === 15000, 'Optimistic tier monthly revenue is 15,000 (100k @ ₹150)');
  assert(scenario.optimistic.yearlyRevenue === 180000, 'Optimistic tier yearly revenue is 180,000');
  assert(scenario.spreadDifference === 11000, 'Spread difference between Optimistic and Conservative is 11,000');
}

// 10. Test: calculateProjection() — Compound Monthly Projection
{
  console.log('\nTEST 10: calculateProjection() — Compound Monthly Projection (12 Months)');
  // Starting: 100,000 views, 5% monthly view growth, $10 starting RPM, 0% RPM change, 12 months
  const proj = calculateProjection({
    startingMonthlyViews: 100000,
    monthlyViewGrowthPercent: 5,
    startingRpm: 10,
    monthlyRpmChangePercent: 0,
    months: 12,
  });

  assert(proj.monthlyItems.length === 12, 'Generates exactly 12 month items');
  assert(proj.monthlyItems[0].views === 100000, 'Month 1 starting views is 100,000');
  assert(proj.monthlyItems[0].monthlyRevenue === 1000, 'Month 1 revenue is 1,000');
  assert(proj.monthlyItems[1].views === 105000, 'Month 2 views is 105,000 (5% growth)');
  assert(proj.monthlyItems[1].monthlyRevenue === 1050, 'Month 2 revenue is 1,050');
  assert(proj.monthlyItems[11].views === 171034, 'Month 12 views is approx 171,034');
  assert(proj.totalProjectedRevenue > 15000, 'Total 12-month projected revenue is cumulative sum (> 15k)');
}

// 11. Test: calculateUploadPlan() — Upload Frequency Planner
{
  console.log('\nTEST 11: calculateUploadPlan() — Upload Planner');
  // 8 uploads/month, 25,000 views/video, $6.50 RPM
  // Monthly views: 8 * 25k = 200,000
  // Revenue per video: (25k / 1k) * 6.50 = $162.50
  // Monthly revenue: (200k / 1k) * 6.50 = $1,300
  // Yearly revenue: $1,300 * 12 = $15,600
  const plan = calculateUploadPlan({
    uploadsPerMonth: 8,
    averageViewsPerVideo: 25000,
    rpm: 6.5,
  });

  assert(plan.monthlyViews === 200000, 'Monthly views is 200,000');
  assert(plan.yearlyViews === 2400000, 'Yearly views is 2,400,000');
  assert(plan.revenuePerVideo === 162.5, 'Revenue per video is 162.50');
  assert(plan.monthlyRevenue === 1300, 'Monthly revenue is 1,300');
  assert(plan.yearlyRevenue === 15600, 'Yearly revenue is 15,600');
}

// 12. Test: Large Numbers (1 Billion Views) & Financial Precision
{
  console.log('\nTEST 12: Large Numbers & Financial Precision');
  const largeRes = calculateRevenue({ views: 1000000000, rpm: 4.75, isMonthlyViews: true });
  assert(largeRes.estimatedRevenue === 4750000, '1 Billion views @ $4.75 RPM is 4,750,000');
  assert(largeRes.yearlyRevenue === 57000000, 'Yearly revenue is 57,000,000');

  // Rounding precision check
  const roundRes = calculateRevenue({ views: 33333, rpm: 7.77, isMonthlyViews: true });
  // 33333 / 1000 * 7.77 = 258.99741 -> 259.00
  assert(roundRes.estimatedRevenue === 259, 'Financial rounding rounds 258.99741 to 259.00 cleanly');
}

console.log('\n====================================================');
console.log(`TEST RESULTS: ${passedTests} / ${totalTests} PASSED (${failedTests} FAILED)`);
console.log('====================================================\n');

if (failedTests > 0) {
  process.exit(1);
}
