import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router-dom

// --- Data for Links (Cleaner & More Maintainable) ---
const platformLinks = [
  { label: "Features", to: "/#features" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "Pricing", to: "/pricing" },
];

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Blog", to: "/#blog" },
  { label: "Contact", to: "/#contact" },
];

// --- SVG Icons ---
const SendIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    ></path>
  </svg>
);

const socialIcons = {
  Facebook: (
    <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0 0 3.603 0 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
    </svg>
  ),
  Twitter: (
    <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
    </svg>
  ),
  LinkedIn: (
    <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
    </svg>
  ),
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center mb-4">
              <div className="bg-green-500 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <h3 className="text-xl font-bold text-white ml-3">
                Eco<span className="text-green-500">Connect</span>
              </h3>
            </Link>
            <p className="mt-4 text-gray-400 max-w-xs">
              Fostering a sustainable, circular economy by digitally connecting
              waste generators with recyclers.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.to}
                    className="hover:text-green-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.to}
                    className="hover:text-green-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4">
            <h4 className="font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get updates on sustainability news.
            </p>
            <form>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2.5 text-gray-800 bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 rounded-r-md hover:bg-green-600 transition-colors flex items-center"
                  aria-label="Subscribe to newsletter"
                >
                  <SendIcon />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-gray-500">
            © {new Date().getFullYear()} EcoConnect. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {Object.entries(socialIcons).map(([name, icon]) => (
              <a
                key={name}
                href="#"
                aria-label={name}
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
