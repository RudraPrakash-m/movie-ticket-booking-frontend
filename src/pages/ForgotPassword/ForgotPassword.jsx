import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const TEST_OTP = "123456"; // hardcoded for testing

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOtp = () => {
    setError("");
    setSuccess("");

    if (!email) return setError("Email is required");

    // simulate sending OTP
    setSuccess("OTP sent successfully (Test OTP: 123456)");
    setStep(2);
  };

  const handleVerifyOtp = () => {
    setError("");
    setSuccess("");

    if (!otp) return setError("Enter OTP");

    if (otp !== TEST_OTP) {
      return setError("Invalid OTP");
    }

    setSuccess("OTP verified");
    setStep(3);
  };

  const handleResetPassword = () => {
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      return setError("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setSuccess("Password reset successful");
    setTimeout(() => navigate("/auth"), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-red-600/20 blur-[120px] rounded-full -top-40 -left-40"></div>

      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between text-sm text-gray-400 mb-6">
          <button onClick={() => navigate(-1)}>← Back</button>
          <button onClick={() => navigate("/")}>Home</button>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Forgot Password
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-lg mb-4 text-sm">
            {success}
          </div>
        )}

        {/* STEP 1: EMAIL */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-red-500 outline-none mb-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleSendOtp}
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-red-500 outline-none mb-6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3: RESET PASSWORD */}
        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="New password"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-red-500 outline-none mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-red-500 outline-none mb-6"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
