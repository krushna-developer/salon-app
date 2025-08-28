// src/App.jsx

import React, { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Import Components
import TopBar from "./components/TopBar";
import Stepper from "./components/Stepper";
import SearchBar from "./components/SearchBar";
import SalonGrid from "./components/SalonGrid";
import DateTimeStep from "./components/DateTimeStep";
import ReviewCard from "./components/ReviewCard";
import PaymentPane from "./components/PaymentPane";

// Stripe Initialization
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let baseUrl = API_BASE_URL || "";

export default function App() {
  // ⚙️ Settings
  

  // 🔎 Filters
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [onlyTopRated, setOnlyTopRated] = useState(false);

  // 📦 Data
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🪜 Steps & selection
  const [step, setStep] = useState(0);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const selectedServicesList = useMemo(
    () =>
      (selectedSalon?.services || []).filter((s) =>
        selectedServices.includes(s.id || s.name)
      ),
    [selectedServices, selectedSalon]
  );
  const amount = useMemo(
    () => selectedServicesList.reduce((a, s) => a + (s.price || 0), 0),
    [selectedServicesList]
  );

  // 🔄 Fetch salons
  useEffect(() => {
    let ignore = false;
    const fetchSalons = async () => {
      setLoading(true);
      setError("");
      try {
        if (!baseUrl) {
          setLoading(false);
          return;
        }
        const res = await fetch(`${baseUrl.replace(/\/$/, "")}/salons`);
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data = await res.json();
        if (!ignore) setSalons(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "Failed to load salons");
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
    return () => {
      ignore = true;
    };
  }, [baseUrl]);

  // 🔍 Filtered view
  const filtered = useMemo(() => {
    return salons.filter((s) => {
      const matchesQuery = query
        ? s.name?.toLowerCase().includes(query.toLowerCase()) ||
          (s.services || []).some((x) =>
            x.name?.toLowerCase().includes(query.toLowerCase())
          )
        : true;
      const matchesCity = city
        ? s.location?.toLowerCase().includes(city.toLowerCase())
        : true;
      const matchesRating = onlyTopRated ? (s.rating || 0) >= 4 : true;
      return matchesQuery && matchesCity && matchesRating;
    });
  }, [salons, query, city, onlyTopRated]);

  // ▶️ Actions
  const proceedFromSalon = (salon) => {
    setSelectedSalon(salon);
    setStep(1);
  };
  const proceedFromDateTime = () => {
    if (selectedSalon) setStep(2);
  };
  const confirmBooking = async () => {
    const payload = {
      salonId: selectedSalon?.id,
      date,
      time,
      services: selectedServices,
      amount,
    };
    try {
      if (baseUrl) {
        const res = await fetch(`${baseUrl.replace(/\/$/, "")}/bookings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Booking failed");
      }
      setStep(3);
    } catch (e) {
      alert(e.message || "Could not create booking");
    }
  };
  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          serviceName: selectedServicesList.map((s) => s.name).join(", "),
        }),
      });
      const data = await res.json();
      if (!data.id) throw new Error("No session id returned");

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      alert(err.message || "Payment failed to start");
    }
  };

  return (
    <div className="min-h-screen bg-stone-200">
      <TopBar />

      <>
        <Stepper step={step} />

        {/* Search Bar is only visible on step 0 */}
        {step === 0 && (
          <SearchBar
            query={query}
            setQuery={setQuery}
            city={city}
            setCity={setCity}
            onlyTopRated={onlyTopRated}
            setOnlyTopRated={setOnlyTopRated}
          />
        )}

        {/* Step 0 – Choose Salon */}
        {step === 0 && (
          <div className="max-w-6xl mx-auto px-4 mt-6">
            {loading && (
              <div className="text-center text-gray-500 py-10">Loading salons…</div>
            )}
            {error && <div className="text-center text-red-600 py-2">{error}</div>}
            {!loading && <SalonGrid salons={filtered} onSelect={proceedFromSalon} />}
          </div>
        )}

        {/* Step 1 – Date & Time */}
        {step === 1 && (
          <div className="max-w-6xl mx-auto px-4 mt-4">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <div className="bg-white border rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedSalon?.image}
                      alt={selectedSalon?.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div>
                      <div className="font-semibold text-lg">{selectedSalon?.name}</div>
                      <div className="text-sm text-gray-600">{selectedSalon?.location}</div>
                      <div className="text-xs text-gray-500">⭐ {selectedSalon?.rating}</div>
                    </div>
                  </div>
                  <DateTimeStep
                    date={date}
                    setDate={setDate}
                    time={time}
                    setTime={setTime}
                    services={selectedSalon?.services}
                    selectedServices={selectedServices}
                    setSelectedServices={setSelectedServices}
                  />
                  <div className="mt-5 flex items-center justify-end gap-3">
                    <button
                      onClick={() => setStep(0)}
                      className="px-4 py-2 rounded-xl border hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={proceedFromDateTime}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 – Review */}
        {step === 2 && (
          <>
            <ReviewCard
              salon={selectedSalon}
              date={date}
              time={time}
              services={selectedSalon?.services}
              selectedServiceIds={selectedServices}
            />
            <div className="max-w-3xl mx-auto px-4 mt-4 mb-10 flex items-center justify-end gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl border hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={confirmBooking}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                Confirm Booking
              </button>
            </div>
          </>
        )}

        {/* Step 3 – Payment */}
        {step === 3 && (
          <>
            <ReviewCard
              salon={selectedSalon}
              date={date}
              time={time}
              services={selectedSalon?.services}
              selectedServiceIds={selectedServices}
            />
            <PaymentPane amount={amount} onPay={handlePayment} />
          </>
        )}
      </>

      <footer className="max-w-6xl mx-auto px-4 py-10 text-center text-xs text-gray-500">
        Built by ❤️ Krushna 
      </footer>
    </div>
  );
}