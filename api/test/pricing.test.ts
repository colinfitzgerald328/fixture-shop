import assert from 'node:assert/strict';
import { test } from 'node:test';
import { orderTotal, shippingFor } from '../src/pricing.ts';

const order = (...lines) => ({ lines: lines.map(([price, qty]) => ({ price, qty })) });

test('adds flat shipping below the free-shipping threshold', async () => {
  assert.equal(await orderTotal(order([20, 2]), {}), 45);
});

test('rounds to cents', async () => {
  assert.equal(await orderTotal(order([0.1, 3]), {}), 5.3);
});

test('shipping is flat below the threshold and free above it', () => {
  assert.equal(shippingFor(10), 5);
  assert.equal(shippingFor(80), 0);
});
