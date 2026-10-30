import { useState } from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { Summary } from './Summary';
import { PayButton } from './PayButton';

const PROMO_CODES = { SAVE10: 0.1 };

export function Checkout({ cart }) {
  const { promoCodes } = useFlags();
  const [promoCode, setPromoCode] = useState('');
  const subtotal = sumCart(cart);
  const total = promoCodes ? applyPromo(subtotal, promoCode) : subtotal;
  return (
    <section className="checkout">
      {promoCodes && (
        <label className="promo-code">
          Promo code
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
        </label>
      )}
      <Summary total={total} items={cart.items.length} />
      <PayButton amount={total} />
    </section>
  );
}

function sumCart(cart) {
  return cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function applyPromo(total, code) {
  const discount = PROMO_CODES[code.trim().toUpperCase()] ?? 0;
  return Math.round(total * (1 - discount) * 100) / 100;
}
