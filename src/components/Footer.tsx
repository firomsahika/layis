'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] relative overflow-hidden pt-12 pb-12 transition-colors duration-300">
      
      {/* Huge Giant Faint Brand Watermark "LAYIS" matching reference */}
      <div className="w-full text-center pointer-events-none select-none overflow-hidden my-4 sm:my-8">
        <span 
          className="font-serif-luxury text-[20vw] font-bold tracking-[0.08em] leading-none inline-block transition-colors"
          style={{ color: 'var(--watermark-color)' }}
        >
          LAYIS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-16 relative z-10">
        
        {/* Main Footer Grid matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Newsletter Subscription Pill matching reference */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed max-w-sm">
              Stay updated with the latest collections, exclusive deals and Ethiopian haute couture trends directly in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="relative flex items-center max-w-sm">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-full text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-primary)] pr-32 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 px-4 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] uppercase tracking-wider font-semibold rounded-full hover:opacity-90 transition-opacity flex items-center gap-1 shadow-sm"
              >
                {isSubscribed ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Joined</span>
                  </>
                ) : (
                  <span>Subscribe now</span>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: 4 Navigation Columns matching reference */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
            
            {/* About Us */}
            <div className="space-y-3">
              <h4 className="font-medium uppercase tracking-wider text-[var(--text-primary)] text-[11px]">
                About Us
              </h4>
              <ul className="space-y-2 text-[var(--text-muted)] font-light">
                <li><Link href="/#about" className="hover:text-[var(--text-primary)] transition-colors">Our Story</Link></li>
                <li><Link href="/#heritage" className="hover:text-[var(--text-primary)] transition-colors">Sustainability</Link></li>
                <li><Link href="/#about" className="hover:text-[var(--text-primary)] transition-colors">The Shemane</Link></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div className="space-y-3">
              <h4 className="font-medium uppercase tracking-wider text-[var(--text-primary)] text-[11px]">
                Customer Care
              </h4>
              <ul className="space-y-2 text-[var(--text-muted)] font-light">
                <li><Link href="/gallery" className="hover:text-[var(--text-primary)] transition-colors">Archive FAQs</Link></li>
                <li><a href="https://wa.me/251913219711" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Shipping & Returns</a></li>
                <li><a href="tel:+251913219711" className="hover:text-[var(--text-primary)] transition-colors">Contact Concierge</a></li>
              </ul>
            </div>

            {/* Shop */}
            <div className="space-y-3">
              <h4 className="font-medium uppercase tracking-wider text-[var(--text-primary)] text-[11px]">
                Shop
              </h4>
              <ul className="space-y-2 text-[var(--text-muted)] font-light">
                <li><Link href="/#campaign" className="hover:text-[var(--text-primary)] transition-colors">New Arrivals</Link></li>
                <li><Link href="/gallery" className="hover:text-[var(--text-primary)] transition-colors">62 Looks Gallery</Link></li>
                <li><Link href="/#collection" className="hover:text-[var(--text-primary)] transition-colors">Bespoke Drops</Link></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="space-y-3">
              <h4 className="font-medium uppercase tracking-wider text-[var(--text-primary)] text-[11px]">
                Follow Us
              </h4>
              <ul className="space-y-2 text-[var(--text-muted)] font-light">
                <li><a href="https://www.instagram.com/layis._/" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Instagram</a></li>
                <li><a href="https://www.youtube.com/watch?v=IoYW1EUGh7A" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors">YouTube Feature</a></li>
                <li><a href="https://wa.me/251913219711" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors">WhatsApp</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text-muted)] font-light">
          <div>
            © {new Date().getFullYear()} LAYIS Fashion. All Rights Reserved.
          </div>
          <div className="font-serif italic text-[var(--text-secondary)]">
            Crafted in Addis Ababa, Ethiopia
          </div>
        </div>

      </div>

    </footer>
  );
}
