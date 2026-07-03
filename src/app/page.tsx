"use client";

import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { Footer } from "@/components/layout/Footer";

import { MenuSection } from "@/components/product/MenuSection";

export default function HomePage() {


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header/>

      <main className="flex-1">
        <Hero />
        <MenuSection />
      </main>

      <Footer />

      
    </div>
  );
}
