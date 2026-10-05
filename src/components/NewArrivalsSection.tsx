'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NewArrivalsSection() {
  return (
    <section id="campaign" className="py-24 sm:py-32 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Description & "NEW ARRIVALS." */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-16">
            <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed max-w-[220px]">
              Curated fashion pieces that blend modern style with timeless Ethiopian pit-loom appeal.
            </p>

            <div>
              <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-light tracking-wide leading-[1.05]">
                NEW <br />
                ARRIVALS.
              </h2>
            </div>
          </div>

          {/* Center Column: Overlapping Rounded Look Cards matching reference */}
          <div className="lg:col-span-5 relative flex justify-center py-6">
            
            {/* Primary Rounded Vertical Look Card */}
            <div className="relative w-64 sm:w-72 h-[380px] sm:h-[440px] rounded-[34px] overflow-hidden shadow-2xl border border-[var(--border-color)] z-10 bg-[var(--bg-card)] group">
              <Image
                src="/images/Screenshot_20261004_172513_Instagram.jpg"
                alt="LAYIS New Arrival Look"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>

            {/* Overlapping Offset Secondary Rounded Look Card */}
            <div className="absolute right-2 sm:-right-4 top-12 w-48 sm:w-56 h-[320px] sm:h-[360px] rounded-[30px] overflow-hidden shadow-2xl border border-[var(--border-color)] z-20 bg-[var(--bg-card)] group">
              <Image
                src="/images/Screenshot_20261004_172523_Instagram.jpg"
                alt="LAYIS Black Atelier Look"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 240px"
              />
            </div>

          </div>

          {/* Right Column: 3 Curated Product Details */}
          <div className="lg:col-span-3 space-y-8 pl-0 lg:pl-6">
            
            <div className="space-y-1">
              <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--text-primary)]">
                Oversized Jacket
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                Fine quality Gamo cotton garment with custom tibeb placket lining.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--text-primary)]">
                Luxe Shirt-Jacket
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                Light, breathable and perfect for any high ceremonial occasion.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--text-primary)]">
                Pleated Pant & Kaba
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                Elevate your steps with our architectural bespoke tailoring designs.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/gallery"
                className="inline-block text-[11px] uppercase tracking-[0.2em] text-[var(--text-primary)] border-b border-[var(--border-strong)] pb-1 hover:opacity-75 transition-opacity"
              >
                View Complete Archive →
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
