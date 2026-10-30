import { app } from '../app';
import { db } from '../db';
import { ld } from '../ld';

export interface Order {
  id: string;
  total: number;
  status: 'pending' | 'paid' | 'shipped';
}

app.get('/v1/orders', listOrders);
app.get('/v1/orders/:id', getOrder);

async function listOrders(req, res) {
  const orders = await db.orders.list({ userId: req.user.id });
  res.json({ orders });
}

async function getOrder(req, res) {
  const order = await db.orders.find(req.params.id);
  if (!order) return res.status(404).json({ error: 'not_found' });
  const tracking = await ld.variation('order-tracking', req.ldContext, false);
  if (tracking) {
    return res.json({ id: order.id, total: order.total, status: order.status, tracking: await carrier.track(order.id) });
  }
  res.json({ id: order.id, total: order.total, status: order.status.toUpperCase() });
}
