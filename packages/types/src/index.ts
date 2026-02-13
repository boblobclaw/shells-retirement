// Account Types
export type AccountType = 
  | '401k' 
  | '403b' 
  | '457' 
  | 'traditional_ira' 
  | 'roth_ira' 
  | 'sep_ira' 
  | 'simple_ira' 
  | 'hsa' 
  | 'taxable' 
  | 'annuity' 
  | 'pension' 
  | 'cash_savings';

export type TaxTreatment = 'pre-tax' | 'post-tax' | 'taxable';

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  currentBalance: number;
  monthlyContribution: number;
  employerMatchPercent: number;
  employerMatchMax: number;
  taxTreatment: TaxTreatment;
  stockAllocation: number;
  bondAllocation: number;
  cashAllocation: number;
  rmdStartAge?: number;
}

// Expense Types
export type ExpenseCategory = 
  | 'housing' 
  | 'healthcare' 
  | 'food' 
  | 'transportation' 
  | 'utilities' 
  | 'insurance' 
  | 'debt' 
  | 'dining_out' 
  | 'travel' 
  | 'entertainment' 
  | 'hobbies' 
  | 'shopping' 
  | 'gifts_charity' 
  | 'flex';

export type ExpenseType = 'essential' | 'discretionary';
export type HealthcarePhase = 'pre-medicare' | 'medicare';

export interface Expense {
  id: string;
  userId: string;
  category: ExpenseCategory;
  subcategory?: string;
  amount: number; // Monthly
  type: ExpenseType;
  inflationRate: number;
  startAge: number;
  endAge?: number;
  healthcarePhase?: HealthcarePhase;
}

// Income Types
export type IncomeType = 'social_security' | 'pension' | 'annuity' | 'rental' | 'part_time' | 'other';

export interface IncomeSource {
  id: string;
  userId: string;
  name: string;
  type: IncomeType;
  annualAmount: number;
  startAge: number;
  endAge?: number;
  colaRate: number;
  taxTreatment: 'taxable' | 'tax-free';
  ssaStartAge?: number;
}

// User Types
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';
export type Gender = 'male' | 'female';

export interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  subscription: SubscriptionTier;
  birthDate: Date;
  gender: Gender;
  maritalStatus: MaritalStatus;
  location: {
    city: string;
    state: string;
    zipCode: string;
  };
  lifeExpectancy: number;
}

export type SubscriptionTier = 'free' | 'premium' | 'pro';

// Scenario Types
export type WithdrawalStrategy = 
  | 'four_percent' 
  | 'guardrails' 
  | 'buckets' 
  | 'tax_efficient' 
  | 'variable_percentage';

export type SocialSecurityStrategy = 'early' | 'full' | 'delayed';

export interface Scenario {
  id: string;
  userId: string;
  name: string;
  description?: string;
  createdAt: Date;
  isDefault: boolean;
  retirementAge: number;
  targetLocation?: {
    city: string;
    state: string;
  };
  essentialSpending: number;
  discretionarySpending: number;
  withdrawalStrategy: WithdrawalStrategy;
  socialSecurityStrategy: SocialSecurityStrategy;
  expectedReturn: number;
  inflationRate: number;
  results?: CalculationResults;
  lifestyleDescription?: string;
  insights?: string[];
  recommendations?: Recommendation[];
}

export interface CalculationResults {
  successProbability: number;
  medianEndingBalance: number;
  worstCaseBalance: number;
  yearOfFirstShortfall?: number;
  sustainableWithdrawalRate: number;
  yearlyProjections: YearProjection[];
}

export interface YearProjection {
  year: number;
  age: number;
  startingBalance: number;
  contributions: number;
  withdrawals: number;
  endingBalance: number;
  expenses: number;
  income: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  estimatedImprovement: number;
  actionSteps: string[];
  tradeOffs?: string[];
}

// Calculation Types
export interface PortfolioInputs {
  startingBalance: number;
  annualContribution: number;
  years: number;
  returnMean: number;
  returnStd: number;
  runs?: number;
}

export interface TaxInputs {
  incomeSources: IncomeSource[];
  filingStatus: string;
  state: string;
  year: number;
}

export interface SocialSecurityInputs {
  aime: number;
  startAge: number;
  fra?: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
