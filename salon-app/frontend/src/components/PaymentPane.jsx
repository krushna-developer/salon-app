// src/components/PaymentPane.jsx

import React from "react";
import { currency } from "../utils/currency";

export default function PaymentPane({ amount, onPay }) {
  return (
    <div className="max-w-3xl mx-auto px-4 mt-6 mb-10">
      <div className="bg-green-50 border rounded-2xl p-5 shadow-sm">
        <h4 className="font-semibold text-lg">Payment</h4>
        <p className="text-sm text-gray-600 mt-1">
          Securely hold your appointment with a refundable advance.
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">Amount</div>
          <div className="text-xl font-bold">{currency(amount)}</div>
        </div>
        <button
          onClick={onPay}
          className="mt-5 w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          Pay & Confirm
        </button>
        <p className="text-[11px] text-gray-500 mt-2">
          Test mode: No real charge. Replace with Stripe/Razorpay Checkout URL in production.
        </p>
      </div>
    </div>
  );
}