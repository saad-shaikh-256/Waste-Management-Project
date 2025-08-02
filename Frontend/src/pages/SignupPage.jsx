import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  // State for all form fields
  const [userType, setUserType] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error on new submission

    // --- Form Validation ---
    if (!userType) {
      setError("Please select your role.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!termsAccepted) {
      setError("You must accept the Terms of Service to continue.");
      return;
    }

    // If all checks pass, proceed with registration logic
    console.log({
      userType,
      fullName,
      email,
      password,
    });

    alert(`Simulating account creation for ${fullName} as a ${userType}!`);
    // Here you would send the data to your backend API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="mx-auto bg-green-500 w-16 h-16 rounded-2xl flex items-center justify-center shadow-md mb-4">
            <span className="text-white text-2xl font-bold">E</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-gray-600">
            Join the community and start making an impact.
          </p>
        </div>

        <form
          className="mt-8 space-y-6 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="space-y-5">
            {/* User Role Dropdown */}
            <div className="space-y-1">
              <label
                htmlFor="user-type"
                className="text-sm font-medium text-gray-700 pl-1"
              >
                I am a
              </label>
              <select
                id="user-type"
                required
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
              >
                <option value="" disabled>
                  Select your role...
                </option>
                <option value="waste-generator">Waste Generator</option>
                <option value="waste-collector">Waste Collector</option>
                <option value="ngo">NGO</option>
              </select>
            </div>

            {/* Full Name Input */}
            <div className="space-y-1">
              <label
                htmlFor="full-name"
                className="text-sm font-medium text-gray-700 pl-1"
              >
                Full Name
              </label>
              <input
                id="full-name"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                placeholder="John Doe"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label
                htmlFor="email-address"
                className="text-sm font-medium text-gray-700 pl-1"
              >
                Email Address
              </label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 pl-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1">
              <label
                htmlFor="confirm-password"
                className="text-sm font-medium text-gray-700 pl-1"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-green-600 hover:text-green-500">
                  Terms of Service
                </a>
              </label>
            </div>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="text-center text-sm text-red-600 bg-red-100 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={!termsAccepted}
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-green-600 hover:text-green-500 transition"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
