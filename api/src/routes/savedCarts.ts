import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import { ld } from '../ld';

// TODO: replace with persistent storage before rolling the flag out broadly.
const savedCarts = new Map();

export const savedCartsRouter = Router();

savedCartsRouter.post('/v1/carts/saved', async (req, res) => {
  const enabled = await ld.variation('saved-carts', req.ldContext, false);
  if (!enabled) {
    return res.status(404).json({ error: 'Not found' });
  }

  const items = req.body?.items;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart must contain at least one item' });
  }

  const id = randomUUID();
  const savedCart = { id, items, savedAt: new Date().toISOString() };
  savedCarts.set(id, savedCart);

  res.status(201).json(savedCart);
});
