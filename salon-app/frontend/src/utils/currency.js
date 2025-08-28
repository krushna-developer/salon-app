// src/utils/currency.js

export const currency = (n) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "INR",
  }).format(n || 0);