export const isValidExpiry = (expiry: string) => {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;

  const [mm, yy] = expiry.split("/").map(Number);
  if (mm < 1 || mm > 12) return false;

  const now = new Date();
  const currentYear = Number(now.getFullYear().toString().slice(-2)); // last 2 digits
  const currentMonth = now.getMonth() + 1; // Jan = 0

  if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
    return false;
  }

  return true;
};

export const formatCurrency = (amount: number | string, type = "en-IN") => {
  return Number(amount.toString().split(".")[1]) > 0
    ? `₹${Number(amount).toLocaleString(type)}`
    : `₹${Number(amount).toLocaleString(type)}.00`;
};

export const getCardType = (number: string) => {
  const cleaned = number.replace(/\D/g, "");

  if (/^4/.test(cleaned)) return "Visa";
  if (/^5[1-5]/.test(cleaned)) return "MasterCard";
  if (/^3[47]/.test(cleaned)) return "American Express";
  if (/^6(?:011|5)/.test(cleaned)) return "Discover";
  return "";
};
