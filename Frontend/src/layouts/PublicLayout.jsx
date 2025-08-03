import React from "react";
import { Outlet } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer'; // Use the @ alias

const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This is where LandingPage, etc., will be rendered */}
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
