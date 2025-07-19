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

export const formatDateTime = (date: string, type = "en-IN") => {
  return new Date(date).toLocaleString(type);
};

export const ellipseText = (text: string, maxLength = 20) =>
  text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;

export const getCardType = (number: string) => {
  const cleaned = number.replace(/\D/g, "");

  if (/^4/.test(cleaned)) return "Visa";
  if (/^5[1-5]/.test(cleaned)) return "MasterCard";
  if (/^3[47]/.test(cleaned)) return "American Express";
  if (/^6(?:011|5)/.test(cleaned)) return "Discover";
  return "";
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "text-yellow-600";
    case "processing":
      return "text-blue-500";
    case "shipped":
      return "text-indigo-600";
    case "delivered":
      return "text-green-600";
    case "cancelled":
      return "text-red-600";
    default:
      return "text-gray-500";
  }
};

export const getPaymentColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "text-yellow-900";
    case "paid":
      return "text-green-700";
    case "failed":
      return "text-red-900";
    default:
      return "text-blue-900";
  }
};
