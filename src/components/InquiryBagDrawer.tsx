'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Send, 
  PhoneCall, 
  ShieldCheck, 
  ShoppingBag, 
  Scissors 
} from 'lucide-react';

export default function InquiryBagDrawer() {
  const {
    isBagOpen,
    setIsBagOpen,
    bag,
    removeFromBag,
    updateQuantity,
    clearBag,
    totalUSD,
    format,
    currency,
    generateBagWhatsAppUrl,
    setIsBespokeOpen,
  } = useStore();

  if (!isBagOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={() => setIsBagOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--bg-card)] border-l border-[var(--border-color)] shadow-2xl flex flex-col justify-between transition-colors">
          
          {/* Header */}
          <div className="p-6 bg-black text-[#FAF8F5] flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <h3 className="font-serif-luxury text-lg tracking-wider text-white">
                  Commission Docket
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]">
                  {bag.length} {bag.length === 1 ? 'Garment Selected' : 'Garments Selected'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsBagOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white transition-colors rounded-full"
              aria-label="Close Bag Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {bag.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] mx-auto flex items-center justify-center text-stone-500 border border-[var(--border-subtle)]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2] text-[#D4AF37]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif-luxury text-xl text-[var(--text-primary)]">
                    Your Inquiry Bag is Empty
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto font-light leading-relaxed">
                    Explore the capsule drop or launch our bespoke commission engine for custom Habesha wedding & gala tailoring.
                  </p>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsBagOpen(false);
                      const el = document.getElementById('collection');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="py-2.5 px-6 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-widest hover:bg-white transition-colors"
                  >
                    Browse Capsule Collection
                  </button>
                  <button
                    onClick={() => {
                      setIsBagOpen(false);
                      setIsBespokeOpen(true);
                    }}
                    className="py-2.5 px-6 border border-[var(--border-strong)] text-[var(--text-primary)] text-xs uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                  >
                    Book Bespoke Fitting
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {bag.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="p-3.5 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex gap-3 relative group"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 shrink-0 bg-stone-900 overflow-hidden border border-[var(--border-color)]">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif-luxury text-sm text-[var(--text-primary)] font-medium leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromBag(item.product.id, item.size)}
                            className="text-stone-400 hover:text-red-500 transition-colors p-0.5"
                            title="Remove piece"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-[11px] text-[var(--text-muted)]">
                          <span className="bg-[var(--bg-primary)] px-1.5 py-0.5 text-[var(--text-secondary)] font-mono border border-[var(--border-subtle)]">
                            Size: {item.size}
                          </span>
                          <span>•</span>
                          <span className="text-[#D4AF37] font-medium">
                            {format(item.product.priceUSD)}
                          </span>
                        </div>

                        {item.notes && (
                          <div className="mt-1 text-[10px] text-[var(--text-secondary)] bg-[var(--bg-primary)] p-1 italic line-clamp-1 border border-[var(--border-subtle)]">
                            Note: &ldquo;{item.notes}&rdquo;
                          </div>
                        )}
                      </div>

                      {/* Quantity Toggles */}
                      <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
                        <div className="flex items-center border border-[var(--border-strong)] bg-[var(--bg-primary)]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, -1)}
                            className="p-1 hover:bg-stone-800 text-[var(--text-secondary)]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 py-0.5 text-xs font-mono font-medium text-[var(--text-primary)]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, 1)}
                            className="p-1 hover:bg-stone-800 text-[var(--text-secondary)]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-serif-luxury text-sm text-[var(--text-primary)] font-medium">
                            {format(item.product.priceUSD * item.quantity)}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}

                <button
                  onClick={clearBag}
                  className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] hover:text-red-500 transition-colors block text-right w-full"
                >
                  Clear All Pieces
                </button>
              </div>
            )}

            {/* Payment & Fulfillment Explainer */}
            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3 text-xs">
              <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Payment & Global Dispatch Guidance</span>
              </div>

              <div className="space-y-2 text-[var(--text-muted)] text-[11px] leading-relaxed font-light">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 shrink-0"></span>
                  <div>
                    <strong className="font-medium text-[var(--text-primary)]">Domestic Ethiopia:</strong> Telebirr, Commercial Bank of Ethiopia (CBE), Bank Transfer, or in-person at Bole Atlas Atelier.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 shrink-0"></span>
                  <div>
                    <strong className="font-medium text-[var(--text-primary)]">Diaspora & International:</strong> Worldwide tracked dispatch via DHL Express & FedEx (5–8 business days) with custom travel trunk.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Drawer Sticky Footer / Checkout CTA */}
          {bag.length > 0 && (
            <div className="p-6 bg-[var(--bg-card)] border-t border-[var(--border-color)] space-y-3">
              
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] block">
                    Estimated Atelier Total
                  </span>
                  <span className="text-[11px] text-[var(--text-secondary)] font-mono">
                    Currency: {currency}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-serif-luxury text-2xl text-[var(--text-primary)] font-medium">
                    {format(totalUSD)}
                  </span>
                </div>
              </div>

              {/* Transmit to WhatsApp CTA */}
              <a
                href={generateBagWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-[#D4AF37] text-black text-xs uppercase tracking-[0.25em] font-semibold hover:bg-white transition-all flex items-center justify-center gap-2.5 shadow-xl group"
              >
                <Send className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                <span>Transmit via WhatsApp Concierge</span>
              </a>

              {/* Direct Phone Call */}
              <a
                href="tel:+251913219711"
                className="w-full py-2.5 border border-[var(--border-strong)] text-[var(--text-primary)] text-xs uppercase tracking-widest text-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Direct Concierge: +251 91 321 9711</span>
              </a>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
