export function formattedPrice(
  price: number = 0,
  currency: string = "USD",
  exchangeRate: number = 1
) {
  price *= exchangeRate;
  const priceFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  });
  return priceFormatter.format(price);
}
