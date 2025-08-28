import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600">❌ Payment Cancelled</h1>
      <p className="mt-4 text-lg">Looks like you cancelled the payment.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
      >
        Try Again
      </Link>
    </div>
  );
};

export default Cancel;
