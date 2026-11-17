import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import AIToolsShowcase from "@/components/home/AIToolsShowcase";
import WhyUsSection from "@/components/home/WhyUsSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="flex-grow">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: About */}
        <AboutSection />

        {/* Section 3: Featured Courses */}
        <FeaturedCourses />

        {/* Section 4: Popular AI Tools */}
        <AIToolsShowcase />

        {/* Section 5: Why Learn With Us */}
        <WhyUsSection />

        {/* Section 6: Learning Benefits */}
        <BenefitsSection />

        {/* Section 7: Student Testimonials (Demo) */}
        <TestimonialsSection />

        {/* Section 8: Pricing (₹99 Lifetime) */}
        <PricingSection />

        {/* Section 9: FAQ */}
        <FAQSection />
      </main>

      {/* Section 10: Footer with contact, privacy policy, and terms */}
      <Footer />
    </div>
  );
}
