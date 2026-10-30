import { formatMoney } from '../lib/money';

export function Summary({ total, items }) {
  return (
    <div className="summary">
      <span>{items} items</span>
      <strong>{formatMoney(total)}</strong>
    </div>
  );
}
