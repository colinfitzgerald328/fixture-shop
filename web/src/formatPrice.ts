export function formatPrice(amount, currency = 'USD', locale = navigator.language) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}
