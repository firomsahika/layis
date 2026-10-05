'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { 
  Sparkles, 
  Eye, 
  ShoppingBag, 
  Clock, 
  ArrowRight, 
  Scissors,
  Images 
} from 'lucide-react';
import GarmentInspectorModal from './GarmentInspectorModal';

type FilterCategory = 'all' | 'shirt-jackets' | 'ceremonial' | 'wedding' | 'celebrity';

const CATEGORIES: { id: FilterCategory; label: string; badge?: string }[] = [
  { id: 'all', label: 'Capsule Drops (8)' },
  { id: 'shirt-jackets', label: 'Iconic Shirt-Jackets' },
  { id: 'ceremonial', label: 'Avant-Garde & Runway' },
  { id: 'wedding', label: 'Bespoke Wedding' },
  { id: 'celebrity', label: 'Celebrity Editions', badge: 'Danait' },
];

export default function CapsuleCollection() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const { format, addToBag, inspectingProduct, setInspectingProduct, setIsBespokeOpen } = useStore();

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="collection" className="py-20 sm:py-28 bg-[var(--bg-primary)] border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[var(--border-subtle)]">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
              <span className="w-6 h-[1.5px] bg-[#D4AF37]"></span>
              <span>Noir Capsule Lookbook 2026/27</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] font-light">
              THE ARTIFACTS OF <br />
              <span className="italic font-normal text-[#D4AF37]">CULTURAL</span> COUTURE.
            </h2>
          </div>

          <div className="max-w-md space-y-3">
            <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed font-light">
              Every garment is woven on traditional wooden pit-looms by master artisans across Southern Ethiopia and tailored in our Addis Ababa salon. Each archetype is strictly limited to 15 pieces per release.
            </p>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37] hover:text-white transition-colors"
            >
              <Images className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Browse Full 62-Garment Archive Gallery →</span>
            </Link>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="py-8 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)]">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all relative rounded-xs ${
                    isActive
                      ? 'bg-[#D4AF37] text-black font-semibold shadow-md'
                      : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] border border-[var(--border-color)]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {cat.label}
                    {cat.badge && (
                      <span className="text-[9px] bg-black text-[#D4AF37] px-1.5 py-0.2 rounded-full font-bold">
                        {cat.badge}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bespoke Fitting shortcut & Gallery shortcut */}
          <div className="flex items-center gap-4">
            <Link
              href="/gallery"
              className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[#D4AF37] font-medium flex items-center gap-1.5 transition-colors py-2"
            >
              <Images className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>62 Looks Exhibition</span>
            </Link>
            <button
              onClick={() => setIsBespokeOpen(true)}
              className="text-xs uppercase tracking-[0.18em] text-[#D4AF37] hover:text-white font-medium flex items-center gap-1.5 transition-colors py-2"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Commission Bespoke →</span>
            </button>
          </div>
        </div>

        {/* Garment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-10">
          {filteredProducts.map((product) => {
            return (
              <div
                key={product.id}
                className="group flex flex-col bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-[#D4AF37]/60"
              >
                {/* Image Container with 3:4 Aspect Ratio */}
                <div 
                  className="relative aspect-[3/4] w-full overflow-hidden bg-stone-900 cursor-pointer"
                  onClick={() => setInspectingProduct(product)}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-70 group-hover:opacity-90 transition-opacity" />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-black/90 text-stone-100 text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium border border-[#D4AF37]/60">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Weaving hours pill */}
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-xs text-[#D4AF37] border border-[#D4AF37]/30 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm flex items-center gap-1 font-medium">
                    <Clock className="w-2.5 h-2.5 text-[#D4AF37]" />
                    <span>{product.weavingHours}h Weave</span>
                  </div>

                  {/* Hover Overlay Buttons */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectingProduct(product);
                      }}
                      className="w-full py-2.5 bg-white text-black text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-stone-100 flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Inspect Look</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToBag(product, '40R');
                      }}
                      className="w-full py-2.5 bg-[#D4AF37] text-black text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-white flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Inquire Piece</span>
                    </button>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
                      <span>{product.categoryLabel}</span>
                      {product.celebrityWornBy && (
                        <span className="text-stone-400 font-medium">Celebrity Pick</span>
                      )}
                    </div>

                    <h3 
                      onClick={() => setInspectingProduct(product)}
                      className="font-serif-luxury text-lg text-[var(--text-primary)] leading-snug cursor-pointer hover:text-[#D4AF37] transition-colors"
                    >
                      {product.name}
                    </h3>

                    {/* Primary Fabric Highlight Tag */}
                    <div className="pt-1 flex flex-wrap gap-1">
                      <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded-xs line-clamp-1 border border-[var(--border-subtle)]">
                        {product.fabricTags[0]}
                      </span>
                    </div>
                  </div>

                  {/* Price & Inspect link */}
                  <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <div>
                      <span className="font-serif-luxury text-lg text-[var(--text-primary)] font-medium">
                        {format(product.priceUSD)}
                      </span>
                      <span className="block text-[9px] uppercase tracking-wider text-[var(--text-muted)] -mt-0.5">
                        Made to Order
                      </span>
                    </div>

                    <button
                      onClick={() => setInspectingProduct(product)}
                      className="text-[11px] uppercase tracking-[0.15em] text-[#D4AF37] hover:text-[var(--text-primary)] font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Diaspora Footnote Banner */}
        <div className="mt-14 p-6 bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-black border border-stone-800 text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--text-primary)]">
                International Diaspora Bespoke Concierge
              </div>
              <div className="text-xs text-[var(--text-secondary)] font-light">
                Tailored remote measurements via WhatsApp video consultation with express courier dispatch to North America, Europe, and the Middle East.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/gallery"
              className="px-5 py-3 border border-[var(--border-strong)] text-[var(--text-primary)] text-xs uppercase tracking-[0.2em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
            >
              Exhibition Gallery (62)
            </Link>
            <button
              onClick={() => setIsBespokeOpen(true)}
              className="px-6 py-3 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors"
            >
              Start Commission
            </button>
          </div>
        </div>

      </div>

      {/* Garment Inspector Modal */}
      <GarmentInspectorModal
        product={inspectingProduct}
        onClose={() => setInspectingProduct(null)}
      />
    </section>
  );
}
