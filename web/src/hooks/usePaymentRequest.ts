export function usePaymentRequest(amount) {
  const available = typeof window !== 'undefined' && 'PaymentRequest' in window;
  return { available, show: () => new PaymentRequest([], { total: { label: 'Total', amount: { currency: 'USD', value: String(amount) } } }).show() };
}
