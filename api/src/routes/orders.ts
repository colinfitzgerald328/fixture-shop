import { app } from '../app';
import { db } from '../db';
import { ld } from '../ld';

export interface Order {
  id: string;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
}

const CANCELLABLE_STATUSES: Order['status'][] = ['pending', 'paid'];

app.get('/v1/orders', listOrders);
app.get('/v1/orders/:id', getOrder);
app.post('/v1/orders/:id/cancel', cancelOrder);

async function listOrders(req, res) {
  const orders = await db.orders.list({ userId: req.user.id });
  res.json({ orders });
}

async function getOrder(req, res) {
  const order = await db.orders.find(req.params.id);
  if (!order) return res.status(404).json({ error: 'not_found' });
  res.json({ id: order.id, total: order.total, status: order.status });
}

async function cancelOrder(req, res) {
  const enabled = await ld.variation('order-cancellation', req.ldContext, false);
  if (!enabled) return res.status(404).json({ error: 'not_found' });

  const order = await db.orders.find(req.params.id);
  if (!order || order.userId !== req.user.id) {
    return res.status(404).json({ error: 'not_found' });
  }
  if (!CANCELLABLE_STATUSES.includes(order.status)) {
    return res.status(409).json({ error: 'not_cancellable', status: order.status });
  }

  await db.orders.update(order.id, { status: 'cancelled' });
  res.json({ id: order.id, total: order.total, status: 'cancelled' });
}
