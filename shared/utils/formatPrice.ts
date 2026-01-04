export function formatPrice(amount: number, hide: boolean = false): string {
  if (hide) {
    return `${amount.toLocaleString("en-NG")}`;
  }
  return `₦${amount.toLocaleString("en-NG")}`;
}
