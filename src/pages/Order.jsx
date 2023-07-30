import React from "react";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(process.env.StripeKey);
const Order = () => {
  const location = useLocation();
  const productOrder = location.state;
  return (
    <div
      style={{
        background:
          'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center',
      }}
    >
      <Elements stripe={stripePromise}>
        <PaymentForm productOrder={productOrder} />
      </Elements>
    </div>
  );
};

export default Order;
