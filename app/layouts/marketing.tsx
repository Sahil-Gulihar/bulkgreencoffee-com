import React from "react";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import FooterBelow from "@/components/footer-below";

export default function MarketingLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  return (
    <div className="relative flex min-h-screen flex-col bg-paper">
      <Navbar />
      <main className="w-full">
        {isHome ? (
          <Outlet />
        ) : (
          <div className="max-w-[1480px] mx-auto">
            <Outlet />
          </div>
        )}
      </main>
      <Footer />
      <FooterBelow />
    </div>
  );
}
