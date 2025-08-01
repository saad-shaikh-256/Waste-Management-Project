import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#features", label: "Features" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/#blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold text-gray-900 transition hover:opacity-90"
        >
          <div className="bg-green-500 w-8 h-8 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span>
            Eco<span className="text-green-500">Connect</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-700 font-medium hover:text-green-500 transition-colors duration-300 py-2 relative group"
            >
              {link.label}
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <Link
            to="/login"
            className="hidden md:inline-block bg-transparent text-green-600 font-semibold px-5 py-1.5 rounded-full border-2 border-green-500 hover:bg-green-50 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="hidden md:inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-5 py-1.5 rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Join Now
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4 pt-2 flex flex-col space-y-3 bg-white/95 backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="py-2.5 text-gray-700 font-medium hover:text-green-500 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex space-x-3 pt-2">
            <Link
              to="/login"
              className="flex-1 text-center bg-gray-100 text-green-600 font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="flex-1 text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-4 py-2.5 rounded-lg hover:shadow-md transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Join
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
