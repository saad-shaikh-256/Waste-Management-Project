import React, { useState, useLayoutEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { gsap } from "gsap";
import toast from "react-hot-toast"; // --- IMPORT TOAST ---

// --- SVG Icons ---
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);
const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.05 10.05 0 01-4.132 5.411m0 0L21 21"
    />
  </svg>
);
const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const mainRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".login-image", {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".form-content > *", {
        x: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.4,
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);

    if (result.success) {
      toast.success("Successfully logged in!");
      navigate("/dashboard");
    } else {
      toast.error(result.message || "Invalid credentials");
    }
  };

  return (
    <div ref={mainRef} className="min-h-screen flex bg-slate-50">
      {/* Left Pane */}
      <div className="login-image hidden lg:block w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1624285408777-329bc0e28428?q=80&w=687&auto=format&fit=crop"
          alt="Sustainable energy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-opacity-60 flex flex-col justify-end p-12">
          <h1 className="text-white text-4xl font-bold leading-tight">
            Unlock the Future of Sustainable Commerce.
          </h1>
          <p className="text-green-200 mt-4">
            Join thousands of businesses making a tangible impact.
          </p>
        </div>
      </div>

      {/* Right Pane */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-8 left-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-semibold transition-colors"
          >
            <BackArrowIcon /> <span>Home</span>
          </Link>
        </div>

        <div className="max-w-md w-full space-y-8 form-content">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-gray-600">
              Sign in to manage your listings and bids.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon />
                </div>
                <input
                  id="email-address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="you@example.com"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-all cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            New to EcoConnect?{" "}
            <Link
              to="/signup"
              className="font-semibold text-green-600 hover:text-green-500"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
