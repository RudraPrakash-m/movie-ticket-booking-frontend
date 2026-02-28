import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../lib/stripe";
import CheckoutForm from "../../components/checkOutForm/CheckoutForm";

const PaymentPage = () => {
  return (
    <div style={{ paddingTop: "100px" }}>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default PaymentPage;