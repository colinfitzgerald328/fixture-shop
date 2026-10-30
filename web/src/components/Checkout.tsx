import { Summary } from './Summary';
import { PayButton } from './PayButton';

export function Checkout({ cart }) {
  const total = sumCart(cart);
  return (
    <section className="checkout">
      <Summary total={total} items={cart.items.length} />
      <PayButton amount={total} />
    </section>
  );
}

function sumCart(cart) {
  return cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}
