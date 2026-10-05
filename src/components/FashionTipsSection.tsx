"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function FashionTipsSection() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--bg-secondary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-12">
        {/* Header matching reference */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--text-muted)] font-medium block">
            FASHION TIPS & TRENDS
          </span>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
            Stay ahead of the style game with our latest fashion insights. From
            mastering timeless looks to discovering bold new trends, our expert
            tips will help you elevate your wardrobe with confidence.
          </p>
        </div>

        {/* Bento Grid Layout matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: 2 Stacked Horizontal Cards */}
          <div className="lg:col-span-6 flex flex-col gap-6 justify-between">
            {/* Top Horizontal Card */}
            <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border border-white/5 group shadow-xl bg-stone-900">
              <Image
                src="/images/Screenshot_20261004_173154_Instagram.jpg"
                alt="5 ways to master the Monochrome Look"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="inline-block text-xs uppercase tracking-wider font-medium text-white bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/10">
                  5 ways to master the Monochrome Look
                </span>
              </div>
            </div>

            {/* Bottom Horizontal Card */}
            <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden border border-white/5 group shadow-xl bg-stone-900">
              <Image
                src="/images/Screenshot_20261004_172847_Instagram.jpg"
                alt="Minimalist Outfits That Stand Out"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="inline-block text-xs uppercase tracking-wider font-medium text-white bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/10">
                  Minimalist Outfits That Stand Out
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 1 Large Tall Vertical Card matching reference */}
          <div className="lg:col-span-6 relative min-h-[480px] lg:min-h-[530px] rounded-3xl overflow-hidden border border-white/5 group shadow-2xl bg-stone-900 flex flex-col justify-end p-8 sm:p-10">
            <Image
              src="/images/Screenshot_20261004_172856_Instagram.jpg"
              alt="Must-Have Accessories to Elevate Your Style"
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            <div className="relative z-10 space-y-3 max-w-md">
              <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-normal leading-snug">
                Must-Have Accessories to Elevate Your Style
              </h3>
              <p className="text-xs text-stone-300 font-light leading-relaxed">
                Complete your look with statement Ethiopian tibeb sashes and
                handmade horn accessories that add flair and personality to any
                outfit.
              </p>
              <div className="pt-2">
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-white text-[11px] uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                >
                  <span>Explore Gallery</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
