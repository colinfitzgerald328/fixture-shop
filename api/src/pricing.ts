import rates from './shipping-rates.json' with { type: 'json' };
import { flags } from './flags.ts';

export async function orderTotal(order, context) {
  const subtotal = order.lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  return Math.round((subtotal + shippingFor(subtotal)) * 100) / 100;
}

export function shippingFor(subtotal) {
  return subtotal >= rates.freeShippingThreshold ? 0 : rates.flatRate;
}
