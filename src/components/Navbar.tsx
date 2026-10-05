'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import ThemeSwitcher from './ThemeSwitcher';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ArrowUpRight 
} from 'lucide-react';

export default function Navbar() {
  const { 
    bagCount, 
    setIsBagOpen, 
    setIsBespokeOpen,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-glass)] backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link 
          href="/" 
          className="font-serif-luxury text-2xl sm:text-3xl tracking-[0.2em] font-semibold text-[var(--text-primary)] hover:opacity-80 transition-opacity"
        >
          LAYIS
        </Link>

        {/* Center: Minimalist Editorial Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-10 text-[12px] uppercase tracking-[0.16em] text-[var(--text-muted)] font-medium">
          <Link 
            href="/#about" 
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            About
          </Link>
          <Link 
            href="/#campaign" 
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Campaign
          </Link>
          <Link 
            href="/gallery" 
            className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
          >
            <span>Gallery</span>
            <span className="text-[9px] bg-[var(--badge-bg)] text-[var(--text-primary)] px-2 py-0.5 rounded-full font-mono border border-[var(--border-subtle)]">
              62
            </span>
          </Link>
          <Link 
            href="/lets-talk" 
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Contact us
          </Link>
        </nav>

        {/* Right: Pill Button & Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeSwitcher variant="navbar" />

          {/* Cart Bag */}
          <button
            onClick={() => setIsBagOpen(true)}
            className="relative p-2 text-[var(--text-primary)] hover:opacity-75 transition-opacity"
            aria-label="Open Inquiry Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {bagCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {bagCount}
              </span>
            )}
          </button>

          {/* Pill "LET'S TALK" / "INQUIRE" Button matching reference image */}
          <Link
            href="/lets-talk"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-[var(--border-strong)] text-[var(--text-primary)] text-[11px] uppercase tracking-[0.15em] font-medium bg-[var(--pill-bg)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300 shadow-xs"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[var(--text-primary)] hover:opacity-75 transition-opacity"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-card)] border-b border-[var(--border-color)] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300 shadow-xl">
          <nav className="flex flex-col space-y-3 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
            <Link 
              href="/#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[var(--border-subtle)] hover:text-[var(--text-primary)]"
            >
              About
            </Link>
            <Link 
              href="/#campaign" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[var(--border-subtle)] hover:text-[var(--text-primary)]"
            >
              Campaign
            </Link>
            <Link 
              href="/gallery" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[var(--border-subtle)] hover:text-[var(--text-primary)] flex items-center justify-between"
            >
              <span>Product Gallery</span>
              <span className="text-[10px] bg-[var(--badge-bg)] text-[var(--text-primary)] px-2 py-0.5 rounded-full border border-[var(--border-subtle)]">
                62 Looks
              </span>
            </Link>
            <Link 
              href="/lets-talk" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[var(--border-subtle)] hover:text-[var(--text-primary)]"
            >
              Contact us
            </Link>
          </nav>

          <Link
            href="/lets-talk"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full py-3 rounded-full border border-[var(--border-strong)] text-center text-xs uppercase tracking-widest text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors shadow-xs"
          >
            Let&apos;s Talk
          </Link>
        </div>
      )}
    </header>
  );
}
