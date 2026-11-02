import { useFlags } from 'launchdarkly-react-client-sdk';
import { Summary } from './Summary';
import { PayButton } from './PayButton';
import { ExpressPay } from './ExpressPay';

export function Checkout({ cart }) {
  const { expressCheckout } = useFlags();
  const total = sumCart(cart);
  return (
    <section className="checkout">
      <Summary total={total} items={cart.items.length} />
      {expressCheckout && <ExpressPay amount={total} />}
      <PayButton amount={total} />
    </section>
  );
}

function sumCart(cart) {
  return cart.items.reduce((sum, item) => sum + item.price * item.qty, 0) + cart.tax;
}
