export const carrier = {
  async lookup(orderId) {
    const res = await fetch(`https://carrier.example/track/${orderId}`);
    return res.json();
  },
};
