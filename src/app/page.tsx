'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ExclusiveCollaborationSection from '@/components/ExclusiveCollaborationSection';
import NewArrivalsSection from '@/components/NewArrivalsSection';
import CollectionCarouselSection from '@/components/CollectionCarouselSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FashionTipsSection from '@/components/FashionTipsSection';
import Footer from '@/components/Footer';
import BespokeAtelierModal from '@/components/BespokeAtelierModal';
import InquiryBagDrawer from '@/components/InquiryBagDrawer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] transition-colors duration-300">
      {/* 1. Top Navigation Bar matching reference */}
      <Navbar />

      {/* 2. Hero Section: Watermark LAYIS, Central Model Duo, Circular Spinning Badge, OWN YOUR STYLE */}
      <HeroSection />

      {/* 3. Exclusive Collaboration / Manifesto with Floating Tilted Cards */}
      <ExclusiveCollaborationSection />

      {/* 4. NEW ARRIVALS: Overlapping Rounded Look Cards & Curated Details */}
      <NewArrivalsSection />

      {/* 5. Exclusive Collaboration / Product Carousel Slider with Circular Arrows */}
      <CollectionCarouselSection />

      {/* 6. Testimonials: "What our customers say" Frosted Cards */}
      <TestimonialsSection />

      {/* 7. Fashion Tips & Trends: Bento Grid (2 Horizontal + 1 Tall Vertical) */}
      <FashionTipsSection />

      {/* 8. Giant Brand Watermark LAYIS & Editorial Footer with Newsletter Pill */}
      <Footer />

      {/* Interactive Bespoke Concierge & Bag Drawer Modals */}
      <BespokeAtelierModal />
      <InquiryBagDrawer />
    </main>
  );
}
