import { useState } from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { Summary } from './Summary';
import { PayButton } from './PayButton';

export function Checkout({ cart }) {
  const { savedCarts } = useFlags();
  const total = sumCart(cart);
  return (
    <section className="checkout">
      <Summary total={total} items={cart.items.length} />
      <PayButton amount={total} />
      {savedCarts && <SaveForLaterButton cart={cart} />}
    </section>
  );
}

function SaveForLaterButton({ cart }) {
  const [status, setStatus] = useState('idle');

  async function saveCart() {
    setStatus('saving');
    try {
      const res = await fetch('/v1/carts/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart.items }),
      });
      setStatus(res.ok ? 'saved' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <button
      type="button"
      className="save-for-later"
      onClick={saveCart}
      disabled={status === 'saving' || status === 'saved' || cart.items.length === 0}
    >
      {status === 'saved' ? 'Saved' : status === 'error' ? 'Try again' : 'Save for later'}
    </button>
  );
}

function sumCart(cart) {
  return cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}
