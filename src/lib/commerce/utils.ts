/**
 * Commerce utilities for formatting prices and handling currency.
 * Default currency is set to Indian Rupee (INR / ₹).
 */

export function formatPrice(amount: number | string | undefined | null, currencyCode: string = 'INR'): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : (amount ?? 0);
  const safeAmount = isNaN(numericAmount) ? 0 : numericAmount;
  const code = (currencyCode || 'INR').toUpperCase();

  if (code === 'INR') {
    const formatted = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: safeAmount % 1 === 0 ? 0 : 2,
    }).format(safeAmount);
    return `₹${formatted}`;
  }

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: safeAmount % 1 === 0 ? 0 : 2,
    }).format(safeAmount);
  } catch {
    return `${code} ${safeAmount.toFixed(2)}`;
  }
}
