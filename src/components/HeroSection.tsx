"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Clock,
  MapPin,
  Eye,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/products";

const HERO_LOOKS = [
  {
    id: "look-1 ",
    productId: "layis-01",
    title: "Avant-Garde Kimono Wrap",
    subtitle: "Architectural Drop-Shoulder Selvedge",
    tag: "Runway Look",
    image: "/images/Screenshot_20261004_173757_Instagram.jpg",
    secondaryImage: "/images/Screenshot_20261004_172654_Instagram.jpg",
    weavingHours: "82 hrs",
    provenance: "Addis Ababa Central Workshop",
    priceUSD: 620,
  },
  {
    id: "look-2",
    productId: "layis-01",
    title: "The Signature Tailored Shirt-Jacket",
    subtitle: "Highland Cotton • Geometric Placket",
    tag: "Iconic Signature",
    image: "/images/Screenshot_20261004_172337_Instagram.jpg",
    secondaryImage: "/images/Screenshot_20261004_172351_Instagram.jpg",
    weavingHours: "64 hrs",
    provenance: "Addis Ababa Atelier",
    priceUSD: 480,
  },
  {
    id: "look-3",
    productId: "layis-02",
    title: "The Danait Gala Blazer",
    subtitle: "Obsidian Velvet & Bullion Gold",
    tag: "Celebrity Edition",
    image: "/images/Screenshot_20261004_173707_Instagram.jpg",
    secondaryImage: "/images/Screenshot_20261004_172457_Instagram.jpg",
    weavingHours: "110 hrs",
    provenance: "Worn by Danait Zerihun",
    priceUSD: 890,
  },
  {
    id: "look-4",
    productId: "layis-03",
    title: "The Solstice Runway Robe",
    subtitle: "Wild Silk & Architectural Shemma Drape",
    tag: "Runway Couture",
    image: "/images/Screenshot_20261004_172443_Instagram.jpg",
    secondaryImage: "/images/Screenshot_20261004_172534_Instagram.jpg",
    weavingHours: "95 hrs",
    provenance: "LAYIS Master Atelier",
    priceUSD: 750,
  },
];

export default function HeroSection() {
  const { format, setInspectingProduct } = useStore();
  const [activeLookIndex, setActiveLookIndex] = useState(0);

  const activeLook = HERO_LOOKS[activeLookIndex];

  // Auto-cycle through featured looks gently every 8 seconds if user hasn't clicked
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLookIndex((prev) => (prev + 1) % HERO_LOOKS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleInspect = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setInspectingProduct(found);
    }
  };

  return (
    <section className="relative min-h-[92vh] bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden flex flex-col justify-between pt-4 sm:pt-8 pb-10 transition-colors duration-300">
      {/* 1. Dramatic Brand Watermark "LAYIS" - Crisp, High-Contrast & Visible */}
      <div
        aria-hidden="true"
        className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span
          className="font-serif-luxury text-[25vw] sm:text-[23vw] font-black tracking-[0.08em] leading-none inline-block transition-colors duration-500 opacity-90 scale-y-95"
          style={{
            color: "var(--watermark-color)",
            textShadow: "0 0 100px rgba(212, 175, 55, 0.05)",
          }}
        >
          LAYIS
        </span>
      </div>

      {/* 2. Top Curated Slogan / Eyebrow Pill */}
      {/* <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 relative z-10 mb-6">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)]/80 backdrop-blur-md shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
          </span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--text-primary)]">
            Haute Couture Atelier • Addis Ababa, Ethiopia
          </span>
          <span className="hidden md:inline-block text-[10px] text-[var(--text-muted)] border-l border-[var(--border-subtle)] pl-2">
            AW 2026 Collection Drop
          </span>
        </div>
      </div> */}

      {/* 3. Main Hero Editorial Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">
        {/* Left Side: Brand Narrative, Slogans, Badges & CTAs */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          {/* Main Title & Slogan */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <p className="text-[11px] uppercase tracking-[0.28em] font-semibold text-[#D4AF37]">
                Own Your Style
              </p>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] text-[var(--text-primary)]">
              Where Ancient Weaves Meet{" "}
              <span className="italic font-light text-[#D4AF37]">
                Modern Architecture.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[var(--text-muted)] font-light leading-relaxed max-w-xl">
              Ethiopia’s avant-garde fashion house. We transform 100% hand-spun
              highland Gamo cotton, ancestral pit-loom weaving, and bespoke
              gold-bullion{" "}
              <span className="text-[var(--text-primary)] font-medium">
                tibeb
              </span>{" "}
              into red-carpet tailored garments for visionaries worldwide.
            </p>
          </div>

          {/* Core Feature Badges */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg pt-1">
            <div className="p-3 sm:p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-[var(--text-primary)]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Luxury Handloom</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] font-light leading-tight">
                Artisanal raw weave craft with sculptural selvedge finish.
              </p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-[var(--text-primary)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Bespoke Tailoring</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] font-light leading-tight">
                Custom made-to-measure fittings in Addis or via concierge.
              </p>
            </div>
          </div>

          {/* Action CTAs & Spinning Badge */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            {/* Primary Gallery Button */}
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.16em] font-semibold bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-xl"
            >
              <span>Explore 62 Looks</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Secondary "Let's Talk" Bespoke Atelier Button */}
            <Link
              href="/lets-talk"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs uppercase tracking-[0.16em] font-semibold border border-[var(--border-strong)] text-[var(--text-primary)] hover:border-[var(--text-primary)] bg-[var(--bg-card)]/70 hover:bg-[var(--bg-input)] transition-all duration-300 shadow-sm"
            >
              <span>Let&apos;s Talk / Bespoke</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </Link>

            {/* Rotating Circular Compass Stamp */}
            <Link
              href="/gallery"
              className="group relative w-16 h-16 sm:w-20 sm:h-20 hidden sm:block ml-2 hover:scale-110 transition-transform"
              title="Discover 62 Signature Looks"
            >
              <svg
                className="w-full h-full animate-spin-slow"
                viewBox="0 0 100 100"
              >
                <defs>
                  <path
                    id="heroCirclePath"
                    d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                  />
                </defs>
                <text
                  className="text-[9.2px] uppercase tracking-[0.24em] font-semibold transition-colors"
                  style={{ fill: "var(--badge-spin-text)" }}
                >
                  <textPath href="#heroCirclePath">
                    OWN YOUR STYLE • LAYIS COUTURE •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] group-hover:bg-[#D4AF37] group-hover:text-black flex items-center justify-center transition-all duration-300 border border-[var(--border-strong)] shadow-md">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Right Side: Interactive Editorial Lookbook Showcase */}
        <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end">
          {/* Main Visual Frame with Layered Compositions */}
          <div className="relative w-full max-w-xl">
            {/* Featured Primary Garment Card */}
            <div className="relative h-[480px] sm:h-[560px] w-full rounded-3xl overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-2xl group">
              <Image
                src={activeLook.image}
                alt={activeLook.title}
                fill
                priority
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Luxury Vignette & Gradient Overlays */}
              <div
                className="absolute inset-x-0 bottom-0 h-48 pointer-events-none transition-colors"
                style={{
                  background:
                    "linear-gradient(to top, var(--vignette-color), transparent)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold bg-black/75 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 shadow-lg">
                  {activeLook.tag}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-mono bg-white/10 backdrop-blur-md text-white border border-white/20">
                  {`0${activeLookIndex + 1} / 04`}
                </span>
              </div>

              {/* Secondary Offset Image Peek */}
              <div className="hidden sm:block absolute top-4 right-4 z-20 w-20 h-28 rounded-xl overflow-hidden border-2 border-white/30 shadow-2xl">
                <Image
                  src={activeLook.secondaryImage}
                  alt={`${activeLook.title} Detail`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Look Information Bar */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 space-y-3 text-white">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal tracking-wide text-white">
                      {activeLook.title}
                    </h3>
                    <p className="text-xs text-white/70 font-light mt-0.5">
                      {activeLook.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-white/60 block">
                      Price
                    </span>
                    <span className="text-base font-semibold font-mono text-[#D4AF37]">
                      {format(activeLook.priceUSD)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/15 text-[11px] text-white/80">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      <span>{activeLook.weavingHours}</span>
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span className="truncate max-w-[150px]">
                        {activeLook.provenance}
                      </span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleInspect(activeLook.productId)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-zinc-950 text-[10px] uppercase tracking-widest font-semibold hover:bg-[#D4AF37] transition-colors shadow-md"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Inspect</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Look Selector Strip (Tab switcher) */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {HERO_LOOKS.map((look, idx) => (
                <button
                  key={look.id}
                  onClick={() => setActiveLookIndex(idx)}
                  className={`text-left p-2 rounded-xl border transition-all duration-300 ${
                    activeLookIndex === idx
                      ? "border-[#D4AF37] bg-[var(--bg-card)] shadow-md ring-1 ring-[#D4AF37]"
                      : "border-[var(--border-subtle)] bg-[var(--bg-input)]/60 opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={look.image}
                        alt={look.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 hidden sm:block">
                      <div className="text-[9px] uppercase tracking-wider font-semibold truncate text-[var(--text-primary)]">
                        Look 0{idx + 1}
                      </div>
                      <div className="text-[8px] text-[var(--text-muted)] truncate">
                        {look.tag}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Brand Proof Strip */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 relative z-10 pt-8 mt-6 border-t border-[var(--border-subtle)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="space-y-0.5">
            <span className="text-xl sm:text-2xl font-serif-luxury font-medium text-[var(--text-primary)]">
              62 Looks
            </span>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-light">
              Haute Couture Archive
            </p>
          </div>

          <div className="space-y-0.5">
            <span className="text-xl sm:text-2xl font-serif-luxury font-medium text-[var(--text-primary)]">
              100% Gamo
            </span>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-light">
              Organic Highland Cotton
            </p>
          </div>

          <div className="space-y-0.5">
            <span className="text-xl sm:text-2xl font-serif-luxury font-medium text-[var(--text-primary)]">
              110 Hours
            </span>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-light">
              Master Atelier Handloom
            </p>
          </div>

          <div className="space-y-0.5">
            <span className="text-xl sm:text-2xl font-serif-luxury font-medium text-[var(--text-primary)]">
              Addis Ababa
            </span>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-light">
              Direct Atelier & Global DHL
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
