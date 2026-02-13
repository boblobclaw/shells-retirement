/**
 * Healthcare cost estimates by age (pre-Medicare)
 * Includes premiums, out-of-pocket, and estimated total
 */
const PRE_MEDICARE_COSTS: Record<number, { premium: number; outOfPocket: number; total: number }> = {
  55: { premium: 8000, outOfPocket: 3000, total: 11000 },
  56: { premium: 8200, outOfPocket: 3100, total: 11300 },
  57: { premium: 8400, outOfPocket: 3200, total: 11600 },
  58: { premium: 8600, outOfPocket: 3300, total: 11900 },
  59: { premium: 8800, outOfPocket: 3400, total: 12200 },
  60: { premium: 9200, outOfPocket: 3600, total: 12800 },
  61: { premium: 9600, outOfPocket: 3800, total: 13400 },
  62: { premium: 10000, outOfPocket: 4000, total: 14000 },
  63: { premium: 10500, outOfPocket: 4200, total: 14700 },
  64: { premium: 11000, outOfPocket: 4500, total: 15500 },
};

/**
 * Medicare costs (Part B + Part D + Medigap average)
 */
const MEDICARE_COSTS = {
  partBPremium: 174.70 * 12, // Standard premium
  partDPremium: 50 * 12,     // Average
  medigapPremium: 150 * 12,  // Plan G average
  outOfPocket: 2000,         // Estimated annual
};

/**
 * Calculate annual healthcare costs
 */
export function calculateHealthcareCosts(
  age: number,
  medicareAge: number = 65
): number {
  if (age < medicareAge) {
    // Pre-Medicare costs
    const costs = PRE_MEDICARE_COSTS[age];
    if (costs) {
      return costs.total;
    }
    
    // Interpolate between ages
    const lowerAge = Math.floor(age / 5) * 5;
    const upperAge = lowerAge + 5;
    const lowerCost = PRE_MEDICARE_COSTS[lowerAge]?.total || 11000;
    const upperCost = PRE_MEDICARE_COSTS[upperAge]?.total || 15500;
    
    return lowerCost + (upperCost - lowerCost) * ((age - lowerAge) / 5);
  } else {
    // Medicare costs
    return (
      MEDICARE_COSTS.partBPremium +
      MEDICARE_COSTS.partDPremium +
      MEDICARE_COSTS.medigapPremium +
      MEDICARE_COSTS.outOfPocket
    );
  }
}

/**
 * Calculate ACA subsidy (simplified)
 * Based on income as % of Federal Poverty Level
 */
export function calculateACASubsidy(
  annualIncome: number,
  householdSize: number = 1,
  benchmarkPremium: number = 8000
): number {
  // 2024 Federal Poverty Level for 48 contiguous states
  const fpl = householdSize === 1 ? 15060 : 15060 + (householdSize - 1) * 5380;
  
  const incomeAsPercentOfFPL = (annualIncome / fpl) * 100;
  
  // No subsidy above 400% FPL
  if (incomeAsPercentOfFPL > 400) {
    return 0;
  }
  
  // Calculate expected contribution
  let expectedContributionPercent: number;
  
  if (incomeAsPercentOfFPL <= 150) {
    expectedContributionPercent = 0;
  } else if (incomeAsPercentOfFPL <= 200) {
    expectedContributionPercent = 0 + (incomeAsPercentOfFPL - 150) / 50 * 2;
  } else if (incomeAsPercentOfFPL <= 250) {
    expectedContributionPercent = 2 + (incomeAsPercentOfFPL - 200) / 50 * 2;
  } else if (incomeAsPercentOfFPL <= 300) {
    expectedContributionPercent = 4 + (incomeAsPercentOfFPL - 250) / 50 * 2;
  } else if (incomeAsPercentOfFPL <= 400) {
    expectedContributionPercent = 6 + (incomeAsPercentOfFPL - 300) / 100 * 2.5;
  } else {
    expectedContributionPercent = 8.5;
  }
  
  const expectedContribution = annualIncome * (expectedContributionPercent / 100);
  const subsidy = Math.max(0, benchmarkPremium - expectedContribution);
  
  return subsidy;
}
