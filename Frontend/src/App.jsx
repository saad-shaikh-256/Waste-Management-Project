import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage"; // Import your new LoginPage

function App() {
  return (
    <>
      {/* Header and Footer can be outside Routes to appear on every page,
          or you can place them inside specific routes if needed. */}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* You can add more routes here later, e.g., for signup */}
          {/* <Route path="/signup" element={<SignupPage />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
