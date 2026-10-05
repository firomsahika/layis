"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const CAROUSEL_PIECES = [
  {
    id: "piece-1",
    title: "The Tailor Jacket",
    desc: "Meticulous cuts meet effortless comfort. Perfection meets a cultural statement.",
    image: "/images/Screenshot_20261004_173058_Instagram.jpg",
  },
  {
    id: "piece-2",
    title: "Luxe Handloom Shirt",
    desc: "Lightweight and breathable Gamo cotton for a sleek yet relaxed vibe.",
    image: "/images/Screenshot_20261004_172608_Instagram.jpg",
  },
  {
    id: "piece-3",
    title: "Ceremonial Duster Cape",
    desc: "Cozy highland elegance with an avant-garde architectural edge.",
    image: "/images/Screenshot_20261004_173742_Instagram.jpg",
  },
  {
    id: "piece-4",
    title: "Obsidian Velvet Blazer",
    desc: "Red carpet gala tailoring custom-boned for an imperial hourglass fit.",
    image: "/images/Screenshot_20261004_172443_Instagram.jpg",
  },
  {
    id: "piece-5",
    title: "Avant-Garde Tailored Kimono",
    desc: "Drop-shoulder organic cotton woven with modern architectural drape.",
    image: "/images/Screenshot_20261004_172706_Instagram.jpg",
  },
];

export default function CollectionCarouselSection() {
  const [startIndex, setStartIndex] = useState(0);
  const { setIsBespokeOpen } = useStore();

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % CAROUSEL_PIECES.length);
  };

  const handlePrev = () => {
    setStartIndex(
      (prev) => (prev - 1 + CAROUSEL_PIECES.length) % CAROUSEL_PIECES.length,
    );
  };

  // Get 3 visible items
  const visibleItems = [
    CAROUSEL_PIECES[startIndex],
    CAROUSEL_PIECES[(startIndex + 1) % CAROUSEL_PIECES.length],
    CAROUSEL_PIECES[(startIndex + 2) % CAROUSEL_PIECES.length],
  ];

  return (
    <section className="py-24 sm:py-32 bg-[var(--bg-secondary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-12">
        {/* Header Row: Label & Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--text-muted)] font-medium block">
              EXCLUSIVE COLLABORATION
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[var(--text-primary)] font-light leading-snug">
              Discover our special collaboration with renowned Ethiopian
              artisans, bringing you pieces that redefine modern trends.
            </h2>
          </div>

          {/* Navigation Arrow Circles matching reference */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-[var(--border-strong)] hover:border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] flex items-center justify-center transition-colors shadow-xs"
              aria-label="Previous pieces"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-[var(--border-strong)] hover:border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] flex items-center justify-center transition-colors shadow-xs"
              aria-label="Next pieces"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Rounded Product Cards matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {visibleItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="group flex flex-col space-y-4"
            >
              {/* Rounded Image Container matching reference */}
              <div className="relative aspect-[3/4] w-full rounded-[26px] overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)] group-hover:border-[var(--border-strong)] transition-all duration-300 shadow-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Title & Description matching reference */}
              <div className="space-y-1">
                <h3 className="text-sm uppercase tracking-wider font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
