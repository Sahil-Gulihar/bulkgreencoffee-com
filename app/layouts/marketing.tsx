import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import FooterBelow from "@/components/footer-below";

export default function MarketingLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="w-full">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
      <FooterBelow />
    </div>
  );
}
