/**
 * Format price in Japanese Yen
 * @param price - Price value (assumes USD value, will be converted for display)
 * @param locale - Locale for formatting (default: 'ja-JP')
 * @returns Formatted price string with ¥ symbol
 */
export function formatYen(price: number, locale: string = 'ja-JP'): string {
  // Convert USD to approximate JPY (roughly 150 JPY = 1 USD)
  // This is for display purposes only
  const yenPrice = Math.round(price * 150);
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(yenPrice);
}

/**
 * Format price without conversion (direct yen display)
 * @param price - Price value in yen
 * @param locale - Locale for formatting (default: 'ja-JP')
 * @returns Formatted price string with ¥ symbol
 */
export function formatYenDirect(price: number, locale: string = 'ja-JP'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
