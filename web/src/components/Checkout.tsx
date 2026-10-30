import { useFlags } from 'launchdarkly-react-client-sdk';
import { Summary } from './Summary';
import { PayButton } from './PayButton';
import { formatPrice } from '../formatPrice';

export function Checkout({ cart }) {
  const { localizedPrices } = useFlags();
  const total = sumCart(cart);
  const displayTotal = localizedPrices ? formatPrice(total, cart.currency) : total;
  return (
    <section className="checkout">
      <Summary total={displayTotal} items={cart.items.length} />
      <PayButton amount={total} />
    </section>
  );
}

function sumCart(cart) {
  return cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}
