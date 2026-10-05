"use client";

import React from "react";
import Image from "next/image";

export default function ExclusiveCollaborationSection() {
  return (
    <section
      id="about"
      className="relative py-28 sm:py-36 bg-[var(--bg-secondary)] text-[var(--text-primary)] overflow-hidden border-t border-[var(--border-subtle)] transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10 relative z-10 text-center space-y-6">
        {/* Floating Top-Right Tilted Look Card matching reference */}
        <div className="hidden md:block absolute -top-12 -right-8 lg:-right-20 w-36 h-48 lg:w-44 lg:h-60 rounded-2xl overflow-hidden shadow-2xl rotate-6 border border-[var(--border-color)] hover:rotate-0 transition-transform duration-500 bg-[var(--bg-card)]">
          <Image
            src="/images/Screenshot_20261004_173058_Instagram.jpg"
            alt="LAYIS Modern Silhouette"
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>

        {/* Floating Bottom-Left Tilted Look Card matching reference */}
        <div className="hidden md:block absolute -bottom-16 -left-8 lg:-left-20 w-36 h-48 lg:w-44 lg:h-60 rounded-2xl overflow-hidden shadow-2xl -rotate-6 border border-[var(--border-color)] hover:rotate-0 transition-transform duration-500 bg-[var(--bg-card)]">
          <Image
            src="/images/Screenshot_20261004_172420_Instagram.jpg"
            alt="LAYIS Editorial Piece"
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>

        {/* Label */}
        <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--text-muted)] font-medium">
          EXCLUSIVE COLLABORATION
        </p>

        {/* Main Central Editorial Statement */}
        <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] font-light leading-relaxed max-w-2xl mx-auto">
          We believe fashion is a powerful language of self-expression. With
          diverse collections designed to empower, we invite you to discover
          pieces that speak to your true self.
        </h2>
      </div>
    </section>
  );
}
