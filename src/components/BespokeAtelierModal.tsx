'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore, BespokeBrief } from '@/context/StoreContext';
import { 
  X, 
  Check, 
  Scissors, 
  Calendar, 
  Ruler, 
  MapPin, 
  PhoneCall, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Copy, 
  Send,
  ArrowUpRight 
} from 'lucide-react';

const OCCASIONS = [
  {
    id: 'Runway Presentation',
    title: 'Runway Presentation & Editorial Campaign',
    description: 'High-concept avant-garde silhouettes, sculptural shoulder tailoring, and metallic geometric bullion accents.',
    recommendedFabric: 'Featherweight Handloom Shemma with Gold Trim',
  },
  {
    id: 'Modern Habesha Wedding',
    title: 'Modern Habesha Wedding (Bride / Groom / Melse)',
    description: 'Gold-thread bullion embroidery, royal Kaba silhouettes, modern tuxedo blazers for wedding parties.',
    recommendedFabric: 'Pure Wild Silk & Metallic Gold Tibeb',
  },
  {
    id: 'Diplomatic Gala & Red Carpet',
    title: 'Diplomatic Gala & Celebrity Red Carpet',
    description: 'High-contrast architectural tailoring as seen on actress Danait Zerihun at premier Addis ceremonies.',
    recommendedFabric: 'Obsidian Twill with Gold Filigree Lapels',
  },
  {
    id: 'Elevated Casual Luxury',
    title: 'Elevated Everyday Luxury & Creative Direction',
    description: 'Relaxed drop-shoulder shirt-jackets and minimal tunics for international travel and gallery openings.',
    recommendedFabric: '100% Hand-Spun Unbleached Gamo Cotton',
  },
];

const SILHOUETTES = [
  {
    id: 'Iconic Tailored Shirt-Jacket',
    title: 'The Iconic Tailored Shirt-Jacket',
    details: 'Unstructured architectural lapel, horn buttons, tibeb cuffs.',
  },
  {
    id: 'Imperial Kaba & Blazer Ensemble',
    title: 'Imperial Kaba & Blazer Ensemble',
    details: 'Royal Ethiopian ceremonial cape paired with satin-lapel tuxedo.',
  },
  {
    id: 'Ceremonial High-Neck Tunic & Netela',
    title: 'Ceremonial High-Neck Tunic & Netela',
    details: 'Flowing floor-skimming tunic with coordinating netela shoulder scarf.',
  },
  {
    id: 'Avant-Garde Kimono Wrap Jacket',
    title: 'Avant-Garde Kimono Wrap Jacket',
    details: 'Asymmetrical wrap front, internal ties, gold geometric border.',
  },
];

const FABRICS = [
  {
    id: '100% Hand-Spun Highland Gamo Cotton',
    title: '100% Hand-Spun Highland Gamo Cotton',
    weight: '340 GSM Heavyweight Raw Weave',
    provenance: 'Highland Pit Looms',
  },
  {
    id: 'Wild Ethiopian Silk & Metallic Gold Tibeb',
    title: 'Wild Ethiopian Silk & Metallic Gold Tibeb',
    weight: '260 GSM Shimmering Formal Drape',
    provenance: 'Bespoke Atelier Silk Looming',
  },
  {
    id: 'Obsidian Midnight Cotton Twill',
    title: 'Obsidian Midnight Cotton Twill',
    weight: '310 GSM Structured High-Density',
    provenance: 'Central Addis Finishing Workshop',
  },
  {
    id: 'Featherweight Handloom Shemma',
    title: 'Featherweight Handloom Shemma',
    weight: '190 GSM Featherweight Breathable',
    provenance: 'Highland Weavers Guild',
  },
];

export default function BespokeAtelierModal() {
  const { isBespokeOpen, setIsBespokeOpen, generateBespokeWhatsAppUrl } = useStore();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedOccasion, setSelectedOccasion] = useState(OCCASIONS[0].id);
  const [selectedSilhouette, setSelectedSilhouette] = useState(SILHOUETTES[0].id);
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0].id);
  
  const [clientName, setClientName] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [location, setLocation] = useState('Addis Ababa (In-Person Atelier Fitting - Bole)');
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState('');
  
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [height, setHeight] = useState('');
  const [shoulder, setShoulder] = useState('');

  const [ticketId] = useState(() => `LAYIS-${Math.floor(100000 + Math.random() * 900000)}`);
  const [copied, setCopied] = useState(false);

  if (!isBespokeOpen) return null;

  const brief: BespokeBrief = {
    ticketId,
    occasion: selectedOccasion,
    silhouette: selectedSilhouette,
    fabric: selectedFabric,
    measurements: { chest, waist, height, shoulder },
    eventDate: eventDate || 'Within 30–60 Days',
    location,
    clientName: clientName || 'Valued Patron',
    contactMethod: 'WhatsApp / Phone',
    contactValue,
    notes,
  };

  const handleCopyTicket = () => {
    const text = `LAYIS BESPOKE COMMISSION [Ticket: ${ticketId}]
Client: ${clientName || 'Patron'}
Occasion: ${selectedOccasion}
Silhouette: ${selectedSilhouette}
Fabric: ${selectedFabric}
Date: ${eventDate || 'Flexible'}
Location: ${location}
Measurements: Chest: ${chest || 'TBD'}, Waist: ${waist || 'TBD'}, Height: ${height || 'TBD'}
Special Notes: ${notes || 'Standard atelier cut'}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0 -z-10" onClick={() => setIsBespokeOpen(false)} />

      <div className="relative w-full max-w-4xl bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[var(--text-primary)] transition-colors">
        
        {/* Top Header */}
        <div className="px-6 py-5 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#D4AF37]/15 text-[#D4AF37] rounded-xl border border-[#D4AF37]/40">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                Bespoke Atelier Commission
              </div>
              <h2 className="font-serif-luxury text-xl sm:text-2xl text-[var(--text-primary)]">
                The LAYIS Bespoke Flow
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/lets-talk"
              onClick={() => setIsBespokeOpen(false)}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[var(--text-muted)] hover:text-[#D4AF37] mr-3"
            >
              <span>Full Let&apos;s Talk Page</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setIsBespokeOpen(false)}
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors rounded-full"
              aria-label="Close Bespoke Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Progress Tracker */}
        <div className="bg-[var(--bg-input)] border-b border-[var(--border-subtle)] px-6 py-3">
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { num: 1, title: 'Occasion' },
              { num: 2, title: 'Silhouette' },
              { num: 3, title: 'Measurements' },
              { num: 4, title: 'Atelier Docket' },
            ].map((s) => (
              <div
                key={s.num}
                onClick={() => {
                  if (s.num < step) setStep(s.num as any);
                }}
                className={`flex flex-col items-center py-1 cursor-pointer transition-colors ${
                  step === s.num
                    ? 'text-[#D4AF37] font-semibold'
                    : step > s.num
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-muted)]'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      step === s.num
                        ? 'bg-[#D4AF37] text-black font-bold'
                        : step > s.num
                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                        : 'bg-[var(--border-subtle)] text-[var(--text-muted)]'
                    }`}
                  >
                    {step > s.num ? '✓' : s.num}
                  </span>
                  <span className="hidden sm:inline">{s.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Body / Steps */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* STEP 1: OCCASION SELECTION */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                  Step 01 / 04 — Ceremony & Purpose
                </span>
                <h3 className="font-serif-luxury text-2xl text-[var(--text-primary)] mt-1">
                  What is the occasion for this bespoke commission?
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 font-light">
                  Our chief tailor adjusts silhouette geometry, fabric breathability, and embroidery density based on ceremonial etiquette.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {OCCASIONS.map((occ) => {
                  const isSelected = selectedOccasion === occ.id;
                  return (
                    <div
                      key={occ.id}
                      onClick={() => setSelectedOccasion(occ.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[var(--bg-input)] shadow-md ring-1 ring-[#D4AF37]'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-serif-luxury text-lg text-[var(--text-primary)] font-medium">
                            {occ.title}
                          </span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center text-xs">
                              ✓
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">
                          {occ.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold">
                        Recommended: {occ.recommendedFabric}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SILHOUETTE & FABRIC WEIGHT */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                  Step 02 / 04 — Cut & Materiality
                </span>
                <h3 className="font-serif-luxury text-2xl text-[var(--text-primary)] mt-1">
                  Choose your architectural silhouette and handloom fabric
                </h3>
              </div>

              {/* Silhouette Selection */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[var(--text-primary)] font-semibold">
                  A. Master Silhouette Architecture
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SILHOUETTES.map((sil) => {
                    const isSelected = selectedSilhouette === sil.id;
                    return (
                      <div
                        key={sil.id}
                        onClick={() => setSelectedSilhouette(sil.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#D4AF37] bg-[var(--bg-input)] shadow-md ring-1 ring-[#D4AF37]'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif-luxury text-base text-[var(--text-primary)] font-medium">
                            {sil.title}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#D4AF37]" />}
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)]">
                          {sil.details}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fabric Selection */}
              <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                <label className="text-xs uppercase tracking-widest text-[var(--text-primary)] font-semibold">
                  B. Handwoven Pit-Loom Textile
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FABRICS.map((fab) => {
                    const isSelected = selectedFabric === fab.id;
                    return (
                      <div
                        key={fab.id}
                        onClick={() => setSelectedFabric(fab.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#D4AF37] bg-[var(--bg-input)] shadow-md ring-1 ring-[#D4AF37]'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif-luxury text-base text-[var(--text-primary)] font-medium">
                            {fab.title}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#D4AF37]" />}
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)]">
                          {fab.weight}
                        </div>
                        <div className="text-[10px] text-[#D4AF37] font-semibold tracking-wider mt-1 uppercase">
                          {fab.provenance}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: MEASUREMENTS & TIMELINE */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                  Step 03 / 04 — Anatomy & Scheduling
                </span>
                <h3 className="font-serif-luxury text-2xl text-[var(--text-primary)] mt-1">
                  Provide your anatomical proportions and timeline
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 font-light">
                  Estimates are welcome. If uncertain, our concierge conducts a 1-on-1 virtual measurement session over WhatsApp video.
                </p>
              </div>

              {/* Client Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-1">
                    Patron Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elias Bekele / Selamawit T."
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-1">
                    WhatsApp or Direct Phone *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +251 9... or +1 (US) / +44 (UK)"
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Measurements */}
              <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                <label className="text-xs uppercase tracking-widest text-[var(--text-primary)] font-semibold flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Key Proportions (cm or inches)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] uppercase text-[var(--text-muted)] block mb-1">Chest / Bust</label>
                    <input
                      type="text"
                      placeholder="e.g. 102 cm / 40 in"
                      value={chest}
                      onChange={(e) => setChest(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[var(--text-muted)] block mb-1">Waist</label>
                    <input
                      type="text"
                      placeholder="e.g. 84 cm / 33 in"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[var(--text-muted)] block mb-1">Height</label>
                    <input
                      type="text"
                      placeholder="e.g. 180 cm / 5'11"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[var(--text-muted)] block mb-1">Shoulders</label>
                    <input
                      type="text"
                      placeholder="e.g. 46 cm / 18 in"
                      value={shoulder}
                      onChange={(e) => setShoulder(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Location & Event Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[var(--border-subtle)]">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" />
                    <span>Fulfillment / Fitting Location</span>
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full text-xs px-3 py-3 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Addis Ababa (In-Person Atelier Fitting - Bole)">
                      Addis Ababa (In-Person Atelier Fitting - Bole)
                    </option>
                    <option value="International Diaspora (North America - USA/Canada DHL Express)">
                      International Diaspora (North America - USA/Canada DHL Express)
                    </option>
                    <option value="International Diaspora (Europe - UK/Germany/Sweden/Italy FedEx)">
                      International Diaspora (Europe - UK/Germany/Sweden/Italy FedEx)
                    </option>
                    <option value="Middle East & Gulf Diaspora (Dubai/UAE/Saudi)">
                      Middle East & Gulf Diaspora (Dubai/UAE/Saudi)
                    </option>
                    <option value="Other International Country">
                      Other International Country
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D4AF37]" />
                    <span>Ceremony Date / Deadline</span>
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full text-xs px-3 py-3 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Special Tailoring Notes */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium mb-1">
                  Bespoke Notes or Custom Embroidery Directives
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Wedding motif preferences, family monogram, preferred lining color, red carpet event date..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

            </div>
          )}

          {/* STEP 4: INSTANT BRIEF GENERATION & TICKET */}
          {step === 4 && (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              <div className="text-center space-y-1">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                  Docket Generated Successfully
                </span>
                <h3 className="font-serif-luxury text-3xl text-[var(--text-primary)]">
                  Official Atelier Commission Ticket
                </h3>
                <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto font-light">
                  Your reference brief is formatted and ready for transmission to the head tailor at LAYIS Addis Ababa Atelier.
                </p>
              </div>

              {/* Luxury Digital Ticket Box */}
              <div className="bg-[var(--bg-input)] border-2 border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative max-w-2xl mx-auto">
                
                {/* Decorative Ethiopian Tibeb top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#BFA15F] via-[#D4AF37] to-[#BFA15F] rounded-t-2xl" />
                
                <div className="flex items-start justify-between border-b border-[var(--border-subtle)] pb-4 mb-4">
                  <div>
                    <div className="font-serif-luxury text-2xl tracking-[0.25em] text-[var(--text-primary)]">
                      L A Y I S
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                      Atelier de Haute Couture • Addis Ababa
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                      Docket Reference
                    </div>
                    <div className="text-xs font-mono font-bold text-[#D4AF37]">
                      #{ticketId}
                    </div>
                  </div>
                </div>

                {/* Brief Data Grid */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block text-[10px] uppercase text-[var(--text-muted)]">Patron</span>
                    <span className="font-medium text-[var(--text-primary)]">{clientName || 'Valued Patron'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[var(--text-muted)]">Ceremony / Occasion</span>
                    <span className="font-medium text-[#D4AF37]">{selectedOccasion}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[var(--text-muted)]">Silhouette</span>
                    <span className="font-medium text-[var(--text-primary)]">{selectedSilhouette}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[var(--text-muted)]">Handloom Fabric</span>
                    <span className="font-medium text-[var(--text-primary)]">{selectedFabric}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[var(--text-muted)]">Fulfillment Route</span>
                    <span className="font-medium text-[var(--text-primary)]">{location}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[var(--text-muted)]">Target Deadline</span>
                    <span className="font-medium text-[var(--text-primary)]">{eventDate || 'Standard Schedule (14–21 Days)'}</span>
                  </div>
                </div>

                {/* Measurements Summary */}
                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex flex-wrap gap-4 text-[11px] text-[var(--text-muted)] bg-[var(--bg-card)] p-3 rounded-xl border border-[var(--border-subtle)]">
                  <span>Chest: <strong className="text-[var(--text-primary)]">{chest || 'To Be Measured'}</strong></span>
                  <span>Waist: <strong className="text-[var(--text-primary)]">{waist || 'To Be Measured'}</strong></span>
                  <span>Height: <strong className="text-[var(--text-primary)]">{height || 'To Be Measured'}</strong></span>
                  <span>Shoulders: <strong className="text-[var(--text-primary)]">{shoulder || 'To Be Measured'}</strong></span>
                </div>

                {notes && (
                  <div className="mt-3 text-[11px] text-[var(--text-muted)] italic">
                    &ldquo;{notes}&rdquo;
                  </div>
                )}

                <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                  <span>Chief Tailor Concierge: +251 91 321 9711</span>
                  <span>Bole, Addis Ababa</span>
                </div>
              </div>

              {/* 1-Click Action Hub */}
              <div className="max-w-2xl mx-auto space-y-3">
                <a
                  href={generateBespokeWhatsAppUrl(brief)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 bg-[#25D366] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#20ba59] transition-all rounded-full flex items-center justify-center gap-3 shadow-xl group"
                >
                  <Send className="w-4 h-4 fill-white group-hover:translate-x-1 transition-transform" />
                  <span>Transmit Brief to WhatsApp (+251 91 321 9711)</span>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleCopyTicket}
                    className="py-3 border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs uppercase tracking-wider hover:border-[#D4AF37] rounded-full transition-colors flex items-center justify-center gap-2"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Brief Ticket'}</span>
                  </button>

                  <a
                    href="tel:+251913219711"
                    className="py-3 border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs uppercase tracking-wider hover:border-[#D4AF37] rounded-full transition-colors flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Call Concierge Directly</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Navigation Footer */}
        <div className="px-6 py-4 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-5 py-2.5 rounded-full border border-[var(--border-strong)] text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as any)}
              className="px-7 py-2.5 rounded-full bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-widest hover:opacity-90 flex items-center gap-1.5 transition-colors shadow-md"
            >
              <span>Continue</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setIsBespokeOpen(false)}
              className="px-7 py-2.5 rounded-full bg-[var(--border-strong)] text-[var(--text-primary)] text-xs uppercase tracking-widest font-medium hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
            >
              Close Docket
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
