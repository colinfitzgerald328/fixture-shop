import { app } from '../app';
import { db } from '../db';

export interface Order {
  id: string;
  total: number;
  status: 'pending' | 'paid' | 'shipped';
  giftNote?: string;
}

app.get('/v1/orders', listOrders);
app.get('/v1/orders/:id', getOrder);
app.get('/v2/orders', listOrdersV2);

async function listOrders(req, res) {
  const orders = await db.orders.list({ userId: req.user.id });
  res.json({ orders });
}

async function getOrder(req, res) {
  const order = await db.orders.find(req.params.id);
  if (!order) return res.status(404).json({ error: 'not_found' });
  res.json({ id: order.id, total: order.total, status: order.status });
}

async function listOrdersV2(req, res) {
  const page = await db.orders.page({ userId: req.user.id, cursor: req.query.cursor });
  res.json({ data: page.items, cursor: page.next });
}
