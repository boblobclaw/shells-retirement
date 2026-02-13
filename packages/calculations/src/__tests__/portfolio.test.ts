import { describe, it, expect } from 'vitest';
import { runMonteCarloSimulation, runDeterministicProjection, calculateSustainableWithdrawalRate } from '../portfolio';

describe('Portfolio Calculations', () => {
  describe('runDeterministicProjection', () => {
    it('should calculate correct balance with 7% return', () => {
      const result = runDeterministicProjection(100000, 10000, 30, 0.07);
      
      // After 30 years at 7% with $10k annual contribution
      expect(result[0]).toBe(100000);
      expect(result[result.length - 1]).toBeGreaterThan(100000);
    });

    it('should handle zero contributions', () => {
      const result = runDeterministicProjection(100000, 0, 10, 0.07);
      
      // Pure compound growth
      expect(result[10]).toBeCloseTo(100000 * Math.pow(1.07, 10), -2);
    });
  });

  describe('runMonteCarloSimulation', () => {
    it('should return percentiles in correct order', () => {
      const result = runMonteCarloSimulation({
        startingBalance: 100000,
        annualContribution: 10000,
        years: 10,
        returnMean: 0.07,
        returnStd: 0.15,
        runs: 1000,
      });

      expect(result.percentile10[10]).toBeLessThan(result.percentile25[10]);
      expect(result.percentile25[10]).toBeLessThan(result.median[10]);
      expect(result.median[10]).toBeLessThan(result.percentile75[10]);
      expect(result.percentile75[10]).toBeLessThan(result.percentile90[10]);
    });

    it('should have success rate between 0 and 1', () => {
      const result = runMonteCarloSimulation({
        startingBalance: 100000,
        annualContribution: 10000,
        years: 10,
        returnMean: 0.07,
        returnStd: 0.15,
        runs: 100,
      });

      expect(result.successRate).toBeGreaterThanOrEqual(0);
      expect(result.successRate).toBeLessThanOrEqual(1);
    });
  });

  describe('calculateSustainableWithdrawalRate', () => {
    it('should calculate 4% rule for $1M with $40k expenses', () => {
      const result = calculateSustainableWithdrawalRate(1000000, 40000, 30);
      
      expect(result.rate).toBe(0.04);
      expect(result.successProbability).toBeGreaterThan(0);
    });
  });
});
