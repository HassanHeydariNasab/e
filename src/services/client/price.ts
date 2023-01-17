export function formattedPrice(
  price?: number,
  currency: string = "USD",
  exchangeRate: number = 1
) {
  if (!price) return "";
  price *= exchangeRate;
  const priceFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  });
  return priceFormatter.format(price);
}
