'use client';

import React from 'react';
import Image from 'next/image';

const TESTIMONIALS = [
  {
    quote:
      'Finding cultural clothing that balances modern architecture with authentic pit-loom handlooms was impossible until LAYIS. Wearing their tailored shirt-jacket in London turned heads all evening.',
    author: 'Elias Anderson',
    role: 'Creative Director, London Diaspora',
    avatar: '/images/Screenshot_20261004_172744_Instagram.jpg',
  },
  {
    quote:
      'I\'ve always struggled to find clothing that balances comfort with style, but this collection does it flawlessly. Now, dressing up feels exciting because I know I\'m wearing pieces that reflect my heritage.',
    author: 'Olivia Parker',
    role: 'Architectural Consultant, Addis Ababa',
    avatar: '/images/Screenshot_20261004_172443_Instagram.jpg',
  },
  {
    quote:
      'Our wedding groom ensemble was commissioned through the LAYIS concierge. The Solomonic gold bullion embroidery and 140 hours of master handloom was the highlight of our reception in Washington DC.',
    author: 'Ethan Brooks',
    role: 'Matrimonial Patron, Washington DC',
    avatar: '/images/Screenshot_20261004_172630_Instagram.jpg',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-12">
        
        {/* Header matching reference */}
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--text-muted)] font-medium block">
            TESTIMONIALS
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[var(--text-primary)] font-light">
            What our customers say
          </h2>
        </div>

        {/* 3 Dark/Light Frosted Cards matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-8 hover:border-[var(--border-strong)] transition-all shadow-xl"
            >
              <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] font-light leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-medium text-[var(--text-primary)]">
                    {t.author}
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)]">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
