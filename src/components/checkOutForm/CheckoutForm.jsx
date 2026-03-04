import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { userCon } from "../../contexts/userContext/UserContext";

const CheckoutForm = ({
  movie: { movie, totalPrice, selectedSeats, showId },
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { user } = useContext(userCon);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const paymentSuccess = useRef(false);
  const seatsReleased = useRef(false);

  if (!movie) return null;

  // ---------------- STORE PAYMENT ----------------
  const storePayment = async (paymentIntent) => {
    try {
      await axios.post(
        `${API_URL}/api/user/payment`,
        {
          amount: paymentIntent.amount / 100,
          paymentIntentId: paymentIntent.id,
          movieId: movie._id,
          showId,
          seats: selectedSeats,
        },
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Error storing payment:", error);
    }
  };

  // ---------------- CONFIRM SEATS ----------------
  const confirmSeats = async () => {
    try {
      await axios.post(
        `${API_URL}/api/user/confirm-seats`,
        {
          movieId: movie.id,
          showId,
          seats: selectedSeats,
        },
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Confirm seat error:", error);
    }
  };

  // ---------------- RELEASE SEATS ----------------
  const releaseSeats = async () => {
    if (seatsReleased.current) return;

    seatsReleased.current = true;

    try {
      await axios.post(
        `${API_URL}/api/user/release-seats`,
        {
          movieId: movie.id,
          showId,
          seats: selectedSeats,
        },
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Release seat error:", error);
    }
  };

  // ---------------- HANDLE PAYMENT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post(
        `${API_URL}/api/user/payments/create-intent`,
        {
          amount: totalPrice,
          movieId: movie.id,
        },
        { withCredentials: true },
      );

      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.name,
            email: user?.email,
          },
        },
      });

      // ---------------- PAYMENT FAILED ----------------
      if (result.error) {
        await releaseSeats();

        setMessage(result.error.message || "Payment failed");

        setTimeout(() => {
          navigate("/shows");
        }, 2000);
      }

      // ---------------- PAYMENT SUCCESS ----------------
      else if (result.paymentIntent.status === "succeeded") {
        paymentSuccess.current = true;

        await confirmSeats();
        await storePayment(result.paymentIntent);

        setMessage("Payment Successful 🎉 Redirecting...");

        setTimeout(() => {
          navigate("/shows");
        }, 2000);
      }
    } catch (error) {
      console.error(error);

      await releaseSeats();

      setMessage("Payment failed");

      setTimeout(() => {
        navigate("/shows");
      }, 2000);
    }

    setLoading(false);
  };

  // ---------------- RELEASE SEATS IF USER LEAVES PAGE ----------------
  useEffect(() => {
    return () => {
      if (!paymentSuccess.current) {
        releaseSeats();
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 border">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">{movie.title}</h2>

          <p className="text-gray-500 text-sm">Release: {movie.releaseDate}</p>

          <p className="mt-3 font-semibold text-lg">
            Total Amount: ₹{totalPrice}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border rounded-md p-3 bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                  },
                },
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!stripe || loading || selectedSeats.length === 0}
            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : `Pay ₹${totalPrice}`}
          </button>

          {message && (
            <p className="text-center text-sm text-gray-700">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
