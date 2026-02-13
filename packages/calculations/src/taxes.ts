/**
 * Federal tax brackets for 2024 (single filer)
 */
const FEDERAL_BRACKETS_SINGLE = [
  { limit: 11600, rate: 0.10 },
  { limit: 47150, rate: 0.12 },
  { limit: 100525, rate: 0.22 },
  { limit: 191950, rate: 0.24 },
  { limit: 243725, rate: 0.32 },
  { limit: 609350, rate: 0.35 },
  { limit: Infinity, rate: 0.37 },
];

/**
 * Federal tax brackets for 2024 (married filing jointly)
 */
const FEDERAL_BRACKETS_MARRIED = [
  { limit: 23200, rate: 0.10 },
  { limit: 94300, rate: 0.12 },
  { limit: 201050, rate: 0.22 },
  { limit: 383900, rate: 0.24 },
  { limit: 487450, rate: 0.32 },
  { limit: 731200, rate: 0.35 },
  { limit: Infinity, rate: 0.37 },
];

export type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_household';

/**
 * Calculate federal income tax
 */
export function calculateFederalTax(
  taxableIncome: number,
  filingStatus: FilingStatus = 'single'
): number {
  const brackets = filingStatus === 'married_joint' 
    ? FEDERAL_BRACKETS_MARRIED 
    : FEDERAL_BRACKETS_SINGLE;
  
  let tax = 0;
  let remainingIncome = taxableIncome;
  let previousLimit = 0;
  
  for (const bracket of brackets) {
    const bracketSize = bracket.limit - previousLimit;
    const taxableInBracket = Math.min(remainingIncome, bracketSize);
    
    if (taxableInBracket <= 0) break;
    
    tax += taxableInBracket * bracket.rate;
    remainingIncome -= taxableInBracket;
    previousLimit = bracket.limit;
  }
  
  return tax;
}

/**
 * Calculate standard deduction for 2024
 */
export function getStandardDeduction(filingStatus: FilingStatus): number {
  const deductions: Record<FilingStatus, number> = {
    single: 14600,
    married_joint: 29200,
    married_separate: 14600,
    head_household: 21900,
  };
  
  return deductions[filingStatus] || 14600;
}

/**
 * Calculate taxable income
 */
export function calculateTaxableIncome(
  grossIncome: number,
  filingStatus: FilingStatus,
  deductions?: number
): number {
  const standardDeduction = getStandardDeduction(filingStatus);
  const totalDeductions = deductions || standardDeduction;
  
  return Math.max(0, grossIncome - totalDeductions);
}

/**
 * Calculate effective tax rate
 */
export function calculateEffectiveTaxRate(
  grossIncome: number,
  filingStatus: FilingStatus = 'single',
  deductions?: number
): number {
  const taxableIncome = calculateTaxableIncome(grossIncome, filingStatus, deductions);
  const tax = calculateFederalTax(taxableIncome, filingStatus);
  
  return grossIncome > 0 ? tax / grossIncome : 0;
}
