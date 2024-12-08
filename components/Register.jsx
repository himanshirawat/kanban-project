"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");
    setIsOtpSent(false);

    const userData = { username, email, password };

    try {
      const response = await axios.post("/api/register", userData);
      if (response.status === 200) {
        setIsOtpSent(true);
      } else {
        setError(response.data.message || "Error occurred");
      }
    } catch (error) {
      setError("Error registering user");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("OTP is required");
      return;
    }

    try {
      const response = await axios.post("/api/register", {
        email,
        otpEntered: otp,
      });

      if (response.status === 201) {
        const result = await axios.post("/api/users", {
          username,
          email,
          password,
        });
        if (result.status === 201) {
          router.push("/login");
        }
      } else {
        setError(response.data.error || "Error occurred");
      }
    } catch (error) {
      setError("Invalid OTP or Email");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-[10%] rounded-xl shadow-md ">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form
        onSubmit={isOtpSent ? handleOtpSubmit : handleRegister}
        className="space-y-4"
      >
        {!isOtpSent ? (
          <>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </>
        ) : (
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <p>*OTP has been sent to your email</p>
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {loading ? "Processing..." : isOtpSent ? "Verify OTP" : "Register"}
        </button>
      </form>
    </div>
  );
}
