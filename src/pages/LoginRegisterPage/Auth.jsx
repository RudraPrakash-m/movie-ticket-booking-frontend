import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userCon } from "../../contexts/userContext/UserContext";

export default function Auth() {
  const navigate = useNavigate();
  const { login, register } = useContext(userCon);

  const [isRegister, setIsRegister] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------------------
  // Handle Input Change
  // -------------------------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // -------------------------------
  // Toggle Login / Register
  // -------------------------------
  const toggleMode = () => {
    setIsRegister(!isRegister);
    setStep(1);
    setError("");
    setOtp("");
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  // -------------------------------
  // Handle Form Submit (Login/Register)
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.email ||
      !formData.password ||
      (isRegister && !formData.name)
    ) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      if (isRegister) {
        await register(formData);
        setStep(2);
      } else {
        try {
          await login(formData.email, formData.password);
          navigate("/");
        } catch (err) {
          if (err.response?.data?.requiresOtp) {
            setStep(2);
            return;
          }

          setError(err.response?.data?.message || "Login failed");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Handle OTP Verification
  // -------------------------------
  const handleVerifyOtp = async () => {
    setError("");

    if (!otp) {
      return setError("Enter OTP");
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/verify-otp`,
        {
          email: formData.email,
          otp,
        },
        {
          withCredentials: true,
        },
      );

      // After successful verification → login automatically
      await login(formData.email, formData.password);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-red-600/20 blur-[120px] rounded-full -top-40 -left-40"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full -bottom-40 -right-40"></div>

      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-6 text-sm text-gray-400">
          <button onClick={() => navigate(-1)} className="hover:text-white">
            ← Back
          </button>
          <button onClick={() => navigate("/")} className="hover:text-white">
            Go Home
          </button>
        </div>

        <h2 className="text-3xl font-semibold text-center mb-8 tracking-wide">
          {isRegister
            ? step === 1
              ? "Create Account"
              : "Verify OTP"
            : "Welcome Back"}
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-5 text-sm">
            {error}
          </div>
        )}

        {/* STEP 1: FORM */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div>
                <label className="text-sm text-gray-400">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-red-500 outline-none"
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-red-500 outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-red-500 outline-none"
                placeholder={
                  isRegister ? "Create password" : "Enter your password"
                }
              />
            </div>

            {!isRegister && (
              <div className="text-right text-sm">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-gray-400 hover:text-red-400 transition"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 font-semibold"
            >
              {loading
                ? "Please wait..."
                : isRegister
                  ? "Continue to OTP"
                  : "Login"}
            </button>
          </form>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <div className="space-y-5">
            <p className="text-sm text-gray-400 text-center">
              Enter the OTP sent to your email
            </p>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-red-500 outline-none"
              placeholder="Enter OTP"
            />

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 font-semibold"
            >
              {loading ? "Verifying..." : "Verify & Register"}
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full text-sm text-gray-400 hover:text-white"
            >
              ← Back to form
            </button>
          </div>
        )}

        {/* Toggle */}
        {step === 1 && (
          <div className="text-center mt-6 text-sm text-gray-400">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={toggleMode}
                  className="text-red-400 hover:text-red-300"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={toggleMode}
                  className="text-red-400 hover:text-red-300"
                >
                  Register
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
