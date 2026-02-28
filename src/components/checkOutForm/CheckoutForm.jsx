import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const cardOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#ffffff",
      backgroundColor: "#1c1c1c",
      "::placeholder": {
        color: "#777",
      },
    },
    invalid: {
      color: "#ff4d4f",
    },
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <div style={formWrapper}>
      <form style={formStyle}>
        <h2 style={titleStyle}>Complete Payment</h2>

        <div style={cardBox}>
          <CardElement options={cardOptions} />
        </div>

        <button style={buttonStyle} disabled={!stripe}>
          Pay ₹500
        </button>
      </form>
    </div>
  );
};

const formWrapper = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

const formStyle = {
  width: "420px",
  backgroundColor: "#1a1a1a",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
};

const titleStyle = {
  color: "#ffffff",
  marginBottom: "25px",
  textAlign: "center",
};

const cardBox = {
  padding: "14px",
  borderRadius: "8px",
  border: "1px solid #333",
  marginBottom: "20px",
  backgroundColor: "#111",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#635bff",
  color: "#ffffff",
  fontWeight: "bold",
  cursor: "pointer",
};

export default CheckoutForm;