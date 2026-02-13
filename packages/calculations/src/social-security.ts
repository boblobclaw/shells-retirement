/**
 * Calculate Average Indexed Monthly Earnings (AIME)
 * This is a simplified version - real calculation uses 35 highest years
 */
export function calculateAIME(
  lifetimeEarnings: number[],
  indexFactor: number = 1.0
): number {
  // Sort and take top 35 years
  const top35Years = lifetimeEarnings
    .sort((a, b) => b - a)
    .slice(0, 35);
  
  const totalIndexedEarnings = top35Years.reduce((sum, earnings) => 
    sum + earnings * indexFactor, 0
  );
  
  // Convert to monthly
  const aime = totalIndexedEarnings / (35 * 12);
  
  return Math.max(0, aime);
}

/**
 * Calculate Primary Insurance Amount (PIA)
 * Using 2024 bend points
 */
export function calculatePIA(aime: number): number {
  // 2024 bend points
  const firstBendPoint = 1174;
  const secondBendPoint = 7078;
  
  let pia = 0;
  
  if (aime <= firstBendPoint) {
    pia = aime * 0.90;
  } else if (aime <= secondBendPoint) {
    pia = firstBendPoint * 0.90 + (aime - firstBendPoint) * 0.32;
  } else {
    pia = firstBendPoint * 0.90 + 
          (secondBendPoint - firstBendPoint) * 0.32 + 
          (aime - secondBendPoint) * 0.15;
  }
  
  return Math.max(0, pia);
}

/**
 * Calculate Social Security benefit based on claiming age
 */
export function calculateSocialSecurityBenefit(
  aime: number,
  claimingAge: number,
  fra: number = 67
): number {
  const pia = calculatePIA(aime);
  
  if (claimingAge < fra) {
    // Early filing - reduction
    const monthsEarly = (fra - claimingAge) * 12;
    
    // First 36 months: 5/9 of 1% per month
    // Beyond 36 months: 5/12 of 1% per month
    let reduction = 0;
    if (monthsEarly <= 36) {
      reduction = monthsEarly * (5 / 900);
    } else {
      reduction = 36 * (5 / 900) + (monthsEarly - 36) * (5 / 1200);
    }
    
    return pia * (1 - Math.min(reduction, 0.30));
  } else if (claimingAge > fra) {
    // Delayed filing - increase
    const monthsDelayed = (claimingAge - fra) * 12;
    const increase = monthsDelayed * (2 / 3 / 100); // 2/3% per month
    
    return pia * (1 + increase);
  } else {
    // Full retirement age
    return pia;
  }
}

/**
 * Get Full Retirement Age based on birth year
 */
export function getFullRetirementAge(birthYear: number): number {
  if (birthYear <= 1937) return 65;
  if (birthYear >= 1960) return 67;
  
  // Gradual increase from 1938-1942
  const gradualYears: Record<number, number> = {
    1938: 65 + 2/12,
    1939: 65 + 4/12,
    1940: 65 + 6/12,
    1941: 65 + 8/12,
    1942: 65 + 10/12,
    1943: 66,
    1954: 66,
    1955: 66 + 2/12,
    1956: 66 + 4/12,
    1957: 66 + 6/12,
    1958: 66 + 8/12,
    1959: 66 + 10/12,
  };
  
  return gradualYears[birthYear] || 67;
}
