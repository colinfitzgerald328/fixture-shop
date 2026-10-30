import { usePaymentRequest } from '../hooks/usePaymentRequest';

export function ExpressPay({ amount }) {
  const request = usePaymentRequest(amount);
  if (!request.available) return null;
  return <button className="express-pay" onClick={request.show}>Pay with one tap</button>;
}
