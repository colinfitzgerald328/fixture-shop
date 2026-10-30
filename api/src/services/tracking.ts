import { carrier } from './carrier';

export async function trackingFor(orderId) {
  const shipment = await carrier.lookup(orderId);
  return { carrier: shipment.carrier, eta: shipment.eta };
}
