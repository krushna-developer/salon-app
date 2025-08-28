// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // set in .env

app.use(cors({
  origin: 'http://localhost:5173' // allow your vite dev server
}));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, serviceName } = req.body; // amount in whole rupees

    if (!amount || !serviceName) return res.status(400).json({ error: 'Missing amount/serviceName' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: { name: serviceName },
            unit_amount: Math.round(amount * 100) // convert rupees → paise
          },
          quantity: 1
        }
      ],
      success_url: 'http://localhost:5173/success.html',
      cancel_url: 'http://localhost:5173/cancel.html'
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe error', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Stripe server running on http://localhost:${PORT}`));
