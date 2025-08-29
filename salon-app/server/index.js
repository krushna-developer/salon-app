require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Allow both local dev + deployed frontend
const allowedOrigins = [
  'http://localhost:5173',                  // local Vite dev
  'https://salon-app-1.onrender.com' // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
       console.warn(`CORS blocked: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, serviceName } = req.body; // amount in rupees

    if (!amount || !serviceName) {
      return res.status(400).json({ error: 'Missing amount/serviceName' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: { name: serviceName },
            unit_amount: Math.round(amount * 100) // rupees → paise
          },
          quantity: 1
        }
      ],
      // ✅ Use frontend Render domain here
      success_url: 'https://salon-app-1.onrender.com/success',
      cancel_url: 'https://salon-app-1.onrender.com/cancel'
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe error', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Stripe server running on port ${PORT}`));
