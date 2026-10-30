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

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

async function listOrders(req, res) {
  const paginate = await ld.variation('orders-pagination', req.ldContext, false);
  if (!paginate) {
    const orders = await db.orders.list({ userId: req.user.id });
    return res.json({ orders });
  }

  const limit = parseNonNegativeInt(req.query.limit, DEFAULT_LIMIT);
  const offset = parseNonNegativeInt(req.query.offset, 0);
  if (limit === null || limit < 1 || limit > MAX_LIMIT || offset === null) {
    return res.status(400).json({ error: 'invalid_pagination' });
  }

  const [orders, total] = await Promise.all([
    db.orders.list({ userId: req.user.id, limit, offset }),
    db.orders.count({ userId: req.user.id }),
  ]);
  res.json({ orders, total, limit, offset });
}

function parseNonNegativeInt(value, fallback: number): number | null {
  if (value === undefined) return fallback;
  return /^\d+$/.test(value) ? Number(value) : null;
}

async function getOrder(req, res) {
  const order = await db.orders.find(req.params.id);
  if (!order) return res.status(404).json({ error: 'not_found' });
  res.json({ id: order.id, total: order.total, status: order.status });
}
