export type CurrencyCode = 'ETB' | 'USD' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  flag: string;
  rateFromUSD: number; // 1 USD = rate
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  ETB: {
    code: 'ETB',
    symbol: 'ETB ',
    label: 'ETB (Ethiopian Birr)',
    flag: '🇪🇹',
    rateFromUSD: 125, // Current approximate bank / diaspora valuation
  },
  USD: {
    code: 'USD',
    symbol: '$',
    label: 'USD (US Dollar)',
    flag: '🇺🇸',
    rateFromUSD: 1.0,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    label: 'EUR (Euro)',
    flag: '🇪🇺',
    rateFromUSD: 0.92,
  },
};

export function formatPrice(amountInUSD: number, currency: CurrencyCode): string {
  const config = CURRENCIES[currency];
  const converted = amountInUSD * config.rateFromUSD;
  
  if (currency === 'ETB') {
    return `Br ${Math.round(converted).toLocaleString()}`;
  }
  if (currency === 'EUR') {
    return `€${Math.round(converted).toLocaleString()}`;
  }
  return `$${Math.round(converted).toLocaleString()}`;
}
