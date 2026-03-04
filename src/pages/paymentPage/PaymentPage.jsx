import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../lib/stripe";
import CheckoutForm from "../../components/checkOutForm/CheckoutForm";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const { movie, totalPrice, selectedSeats, showId } = location.state || {};

  // console.log(showId);
  

  return (
    <div style={{ paddingTop: "100px" }}>
      <Elements stripe={stripePromise}>
        <CheckoutForm movie={{ movie, totalPrice, selectedSeats, showId }} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
