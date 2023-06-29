// // import Stripe from 'stripe';
// const router = require("express").Router();

// // const stripe = new Stripe(process.env.STRIPE_KEY);
// const stripe = require("stripe")(process.env.STRIPE_KEY);

// router.post("/payment",async(req, res) => {
// // export default async function handler(req, res) {
//   // console.log("req.body.cart");
//   if (req.method === 'POST') {
//     try {
//       const params = {
//         submit_type: 'pay',
//         mode: 'payment',
//         payment_method_types: ['card'],
//         billing_address_collection: 'auto',
//         // shipping_options: [
//         //   { shipping_rate: 'shr_1Kn3IaEnylLNWUqj5rqhg9oV' },
//         // ],
//         line_items: req.body.products.map((item) => {
//           // const img = item.image[0].asset._ref;
//           // const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');

//           return {
//             price_data: { 
//               currency: 'inr',
//               product_data: { 
//                 name: item.title,
//                 // images: [newImage],
//               },
//               unit_amount: item.price * 100,
//             },
//             adjustable_quantity: {
//               enabled:true,
//               minimum: 1,
//             },
//             quantity: item.quantity
//           }
//         }),
//         success_url: `${req.headers.origin}/success`,
//         cancel_url: `${req.headers.origin}/canceled`,
//       }

//       // Create Checkout Sessions from body params.
//       const session = await stripe.checkout.sessions.create(params);

//       res.status(200).json(session);
//     } catch (err) {
//       res.status(err.statusCode || 500).json(err.message);
//     }
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }
// )

const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY="sk_test_51N1krTLYe2nKSSseW6CmphkxzzSWBy6sjWoQBeZsLZo0BcivaNRtoojECK3e37KMNJO5qmNdwVrxwtfd5cYBnqH4005ExZtLmT"
// const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

router.post("/payment",async(req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;



