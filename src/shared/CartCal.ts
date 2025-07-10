export interface CartItem {
  price: number;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  tax: number;
  delivery: number;
  savings: number;
  totalRounded: number;
}

const shopCartParams = {
  tax: 0.18,
  delivery: 99,
  MaxDeliveryLimit: 1499,
  MaxDiscountLimit: 1999,
  OfferRate: 0.1,
  DiscountRate: 0.05,
};

export function calculateCartSummary(items: CartItem[]): CartSummary {
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = +(subtotal * shopCartParams.tax).toFixed(2);
  const delivery =
    subtotal > shopCartParams.MaxDeliveryLimit ? 0 : shopCartParams.delivery;
  const baseSavings =
    subtotal > shopCartParams.MaxDiscountLimit
      ? subtotal * shopCartParams.OfferRate
      : subtotal * shopCartParams.DiscountRate;
  const savings = +(
    baseSavings +
    (subtotal + tax + delivery - Math.floor(subtotal + tax + delivery))
  ).toFixed(2);
  const total = subtotal + tax + delivery;
  const totalRounded = Math.floor(total - savings);

  return {
    subtotal,
    tax,
    delivery,
    savings,
    totalRounded,
  };
}
