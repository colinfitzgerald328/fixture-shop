import { app } from '../app';
import { db } from '../db';
import { ld } from '../ld';

export interface Order {
  id: string;
  total: number;
  status: 'pending' | 'paid' | 'shipped';
  note?: string | null;
}

app.get('/v1/orders', listOrders);
app.get('/v1/orders/:id', getOrder);

async function listOrders(req, res) {
  const orders = await db.orders.list({ userId: req.user.id });
  if (await ld.variation('order-notes', req.ldContext, false)) {
    return res.json({ orders });
  }
  res.json({ orders: orders.map(({ note, ...order }) => order) });
}

async function getOrder(req, res) {
  const order = await db.orders.find(req.params.id);
  if (!order) return res.status(404).json({ error: 'not_found' });
  const body: Order = { id: order.id, total: order.total, status: order.status };
  if (await ld.variation('order-notes', req.ldContext, false)) {
    body.note = order.note ?? null;
  }
  res.json(body);
}
