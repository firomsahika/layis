'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/data/products';
import { 
  X, 
  Sparkles, 
  Clock, 
  MapPin, 
  Check, 
  ShoppingBag, 
  PhoneCall, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

interface Props {
  product: Product | null;
  onClose: () => void;
}

const SIZES = [
  { id: '38R', label: '38R (IT/EU 48 • US 38)' },
  { id: '40R', label: '40R (IT/EU 50 • US 40)' },
  { id: '42R', label: '42R (IT/EU 52 • US 42)' },
  { id: '44R', label: '44R (IT/EU 54 • US 44)' },
  { id: 'BESPOKE', label: 'Bespoke Custom (Made to Measure)' },
];

export default function GarmentInspectorModal({ product, onClose }: Props) {
  const { format, addToBag, setIsBespokeOpen } = useStore();
  const [selectedSize, setSelectedSize] = useState('40R');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [customNote, setCustomNote] = useState('');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  if (!product) return null;

  const images = [product.image, ...product.secondaryImages];

  const handleAddToBag = () => {
    addToBag(product, selectedSize, customNote);
    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleDirectWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello LAYIS Atelier (+251 91 321 9711), I am inquiring about the *${product.name}* (${format(product.priceUSD)}).\n\nSize preferred: ${selectedSize}\nFabric origin: ${product.origin}\nNotes: ${customNote || 'None'}\n\nPlease advise on tailoring timeline and fitting appointments.`
    );
    window.open(`https://wa.me/251913219711?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Background click to dismiss */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row transition-colors">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/70 hover:bg-black text-stone-200 rounded-full border border-stone-700 transition-colors shadow-lg"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Gallery */}
        <div className="md:w-1/2 bg-stone-950 flex flex-col justify-between p-4 sm:p-6 border-b md:border-b-0 md:border-r border-[var(--border-color)]">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-900 border border-stone-800">
            <Image
              src={images[activeImageIndex]}
              alt={product.name}
              fill
              className="object-cover object-top transition-all duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Badge */}
            {product.badge && (
              <span className="absolute top-4 left-4 bg-black/90 text-stone-100 text-[10px] uppercase tracking-[0.2em] px-3 py-1 font-medium border border-[#D4AF37]">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-20 shrink-0 border transition-all ${
                  activeImageIndex === idx ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]' : 'border-stone-800 opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Provenance Micro-Bar */}
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{product.weavingHours} Loom Hours</span>
            </span>
            <span className="flex items-center gap-1.5 truncate max-w-[200px]">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{product.artisanRegion}</span>
            </span>
          </div>
        </div>

        {/* Right Column: Garment Specification & Bespoke Options */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            
            {/* Category & Amharic Accent */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                {product.categoryLabel}
              </span>
              {product.amharicName && (
                <span className="text-xs text-[var(--text-muted)] font-serif tracking-widest">
                  {product.amharicName}
                </span>
              )}
            </div>

            {/* Title & Price */}
            <div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[var(--text-primary)] leading-tight">
                {product.name}
              </h2>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-serif-luxury text-2xl text-[#D4AF37] font-medium">
                  {format(product.priceUSD)}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                  Includes Custom Alterations
                </span>
              </div>
            </div>

            {/* Origin & Fabric Tags */}
            <div className="p-3.5 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs space-y-2">
              <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold">
                Artisanal Provenance & Textiles
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.fabricTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] bg-[var(--bg-card)] border border-[var(--border-color)] px-2.5 py-0.5 text-[var(--text-secondary)] font-light"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Story & Description */}
            <div className="space-y-2">
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-light">
                {product.description}
              </p>
              <ul className="space-y-1.5 pt-2 border-t border-[var(--border-subtle)]">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 shrink-0"></span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sizing Selection */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-widest text-[var(--text-primary)] font-semibold text-[11px]">
                  Select Sizing / Bespoke
                </span>
                <button
                  onClick={() => {
                    onClose();
                    setIsBespokeOpen(true);
                  }}
                  className="text-[#D4AF37] hover:underline text-[11px] uppercase tracking-wider"
                >
                  Custom Measurements Flow →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SIZES.map((sz) => (
                  <button
                    key={sz.id}
                    onClick={() => setSelectedSize(sz.id)}
                    className={`py-2 px-3 text-left border text-xs tracking-wider transition-all ${
                      selectedSize === sz.id
                        ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-semibold'
                        : 'border-[var(--border-color)] hover:border-stone-500 text-[var(--text-secondary)] bg-[var(--bg-card)]'
                    }`}
                  >
                    <div className="font-medium">{sz.id}</div>
                    <div className={`text-[10px] ${selectedSize === sz.id ? 'text-stone-900' : 'text-[var(--text-muted)]'}`}>
                      {sz.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Notes */}
            <div className="space-y-1.5">
              <label className="block text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
                Custom Tailoring Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Extra sleeve length (+2cm), preferred event date, lining preference"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2.5">
            <button
              onClick={handleAddToBag}
              disabled={isAddedSuccess}
              className={`w-full py-4 text-xs uppercase tracking-[0.25em] font-semibold flex items-center justify-center gap-2 transition-all shadow-xl ${
                isAddedSuccess
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#D4AF37] text-black hover:bg-white'
              }`}
            >
              {isAddedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Commission Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Inquiry Bag • {format(product.priceUSD)}</span>
                </>
              )}
            </button>

            <button
              onClick={handleDirectWhatsAppInquiry}
              className="w-full py-3 border border-[var(--border-strong)] text-[var(--text-primary)] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Inquire via WhatsApp (+251 91 321 9711)</span>
            </button>

            <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] uppercase tracking-widest pt-2">
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-[#D4AF37]" />
                Worldwide DHL / FedEx
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                Certified Ethiopian Artisan
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
