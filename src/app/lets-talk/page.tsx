'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BespokeAtelierModal from '@/components/BespokeAtelierModal';
import InquiryBagDrawer from '@/components/InquiryBagDrawer';
import { 
  MessageSquare, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar, 
  Check, 
  Copy, 
  Send, 
  Sparkles, 
  Scissors, 
  ShieldCheck, 
  ArrowUpRight, 
  ChevronDown, 
  Instagram, 
  Mail,
  User,
  Ruler,
  Globe
} from 'lucide-react';

const OCCASIONS = [
  {
    id: 'Runway Presentation',
    title: 'Runway Presentation & Editorial Campaign',
    desc: 'High-concept avant-garde silhouettes, sculptural shoulder tailoring, and metallic geometric bullion accents.',
    badge: 'Runway & Editorial',
  },
  {
    id: 'Modern Habesha Wedding',
    title: 'Modern Habesha Wedding (Bride / Groom / Melse)',
    desc: 'Gold-thread bullion embroidery, royal Kaba silhouettes, modern tuxedo blazers.',
    badge: 'Wedding & Melse',
  },
  {
    id: 'Diplomatic Gala & Red Carpet',
    title: 'Diplomatic Gala & Red Carpet Gala',
    desc: 'High-contrast architectural tailoring as seen on Danait Zerihun at premier Addis ceremonies.',
    badge: 'Red Carpet Gala',
  },
  {
    id: 'Elevated Everyday Luxury',
    title: 'Elevated Everyday Luxury & Wardrobe Drop',
    desc: 'Drop-shoulder shirt-jackets and minimal tunics for international travel and gallery events.',
    badge: 'Contemporary Casual',
  },
];

const SILHOUETTES = [
  {
    id: 'Iconic Tailored Shirt-Jacket',
    title: 'The Iconic Tailored Shirt-Jacket',
    detail: 'Unstructured architectural lapel, horn buttons, geometric tibeb cuffs.',
  },
  {
    id: 'Danait Gala Corseted Blazer',
    title: 'Imperial Gala Blazer & Cape',
    detail: 'Obsidian velvet lapels, royal gold embroidery, cinched waist architecture.',
  },
  {
    id: 'Ceremonial High-Neck Tunic & Netela',
    title: 'Ceremonial Flowing Tunic Ensemble',
    detail: 'Floor-skimming silhouette with coordinated gossamer netela shoulder scarf.',
  },
  {
    id: 'Avant-Garde Kimono Wrap Jacket',
    title: 'Avant-Garde Kimono Wrap Jacket',
    detail: 'Asymmetrical wrap front, internal ties, raw bone selvage border.',
  },
];

const FABRICS = [
  {
    id: '100% Hand-Spun Highland Gamo Cotton',
    name: '100% Hand-Spun Highland Gamo Cotton',
    weight: '340 GSM Heavyweight Raw Pit-Weave',
    origin: 'Highland Cotton Looms',
  },
  {
    id: 'Wild Ethiopian Silk & Metallic Gold Tibeb',
    name: 'Wild Ethiopian Silk & Metallic Gold Tibeb',
    weight: '260 GSM Shimmering Formal Drape',
    origin: 'Atelier Silk Looming',
  },
  {
    id: 'Obsidian Midnight Cotton Twill',
    name: 'Obsidian Midnight Structured Twill',
    weight: '310 GSM High-Density Weave',
    origin: 'Central Addis Finishing',
  },
  {
    id: 'Featherweight Handloom Shemma',
    name: 'Featherweight Handloom Shemma',
    weight: '190 GSM Featherweight Breathable',
    origin: 'Highland Weavers Guild',
  },
];

const FAQS = [
  {
    q: 'How does an in-person or remote fitting consultation work?',
    a: 'For patrons in Addis Ababa, we welcome you to our private atelier in Bole for fabric selection, precise anatomical measurements, and silhouette draping. For international patrons across London, New York, Dubai, and beyond, our chief stylists conduct a 1-on-1 video consultation and provide our comprehensive self-measurement guide.',
  },
  {
    q: 'What is the production timeline for custom bespoke garments?',
    a: 'Each bespoke garment requires between 64 and 110 hours of handloom pit-weaving by master artisans. Typical completion is 2 to 3 weeks. An expedited 7-to-10 day rush commission service is available for upcoming galas and weddings upon request.',
  },
  {
    q: 'Do you deliver internationally?',
    a: 'Yes. All international commissions are securely dispatched via DHL Express with direct tracking, arriving within 3–5 business days to the US, Europe, Middle East, and Pan-African destinations.',
  },
  {
    q: 'Can I request a custom Tibeb geometric pattern or family crest?',
    a: 'Absolutely. We specialize in custom metallic bullion embroidery and can weave ancestral motifs, family heraldry, or wedding date ciphers directly into the cuffs and plackets.',
  },
];

export default function LetsTalkPage() {
  const [activeTab, setActiveTab] = useState<'commission' | 'quick'>('commission');

  // Bespoke Brief State
  const [selectedOccasion, setSelectedOccasion] = useState(OCCASIONS[0].id);
  const [selectedSilhouette, setSelectedSilhouette] = useState(SILHOUETTES[0].id);
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0].id);
  
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('Addis Ababa (Atelier Fitting)');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [height, setHeight] = useState('');
  const [notes, setNotes] = useState('');

  // Quick Inquiry Form State
  const [quickName, setQuickName] = useState('');
  const [quickContact, setQuickContact] = useState('');
  const [quickSubject, setQuickSubject] = useState('Bespoke Atelier Inquiry');
  const [quickMessage, setQuickMessage] = useState('');

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const ticketId = `LAYIS-${Math.floor(100000 + Math.random() * 900000)}`;

  const generateWhatsAppUrl = (isQuick = false) => {
    let text = '';
    if (isQuick) {
      text = `Hello LAYIS Atelier! 👋
I would like to inquire about: *${quickSubject}*

Name: ${quickName || 'Patron'}
Contact: ${quickContact || 'WhatsApp'}
Message: ${quickMessage || 'Please share more details on bespoke ordering.'}`;
    } else {
      text = `*LAYIS HAUTE COUTURE COMMISSION* [Ticket: ${ticketId}]

*Client:* ${clientName || 'Patron'}
*Phone/WhatsApp:* ${phone}
*Email:* ${email || 'N/A'}
*Location:* ${location}
*Event Date:* ${eventDate || 'Flexible'}

*Specifications:*
• Occasion: ${selectedOccasion}
• Silhouette: ${selectedSilhouette}
• Fabric: ${selectedFabric}
• Measurements: Chest ${chest || 'TBD'}, Waist ${waist || 'TBD'}, Height ${height || 'TBD'}
${notes ? `• Special Notes: ${notes}` : ''}

I would like to confirm my consultation with the master atelier.`;
    }

    return `https://wa.me/251913219711?text=${encodeURIComponent(text)}`;
  };

  const handleCommissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedTicket(ticketId);
  };

  const handleCopyTicket = () => {
    const text = `LAYIS BESPOKE BRIEF #${submittedTicket || ticketId}
Client: ${clientName || 'Patron'}
Occasion: ${selectedOccasion}
Silhouette: ${selectedSilhouette}
Fabric: ${selectedFabric}
Event Date: ${eventDate || 'Flexible'}
Atelier Hotline: +251 91 321 9711`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pb-24">
        
        {/* Page Hero Header */}
        <section className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 border-b border-[var(--border-subtle)] overflow-hidden">
          {/* Subtle Watermark Behind Header */}
          <div 
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0"
          >
            <span 
              className="font-serif-luxury text-[20vw] font-bold tracking-[0.08em] leading-none inline-block transition-colors"
              style={{ color: 'var(--watermark-color)' }}
            >
              ATELIER
            </span>
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
                Private Concierge & Custom Tailoring
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h1 className="font-serif-luxury text-4xl sm:text-6xl font-normal tracking-tight text-[var(--text-primary)]">
                  Let&apos;s Talk.
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-muted)] font-light max-w-2xl mt-2 leading-relaxed">
                  Connect directly with our master tailors in Addis Ababa. Commission an exclusive red carpet garment, schedule an atelier fitting, or discuss your upcoming celebration.
                </p>
              </div>

              {/* Direct WhatsApp Callout Pill */}
              <a
                href="https://wa.me/251913219711"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] text-white hover:bg-[#20ba59] transition-all duration-300 font-semibold text-xs uppercase tracking-wider shadow-lg hover:scale-105 self-center sm:self-auto"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Instant WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </section>

        {/* 4 Direct Contact Channels */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* WhatsApp */}
            <a
              href="https://wa.me/251913219711"
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[#25D366] transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] mb-3 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)]">
                WhatsApp VIP Chat
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light mt-1">
                +251 91 321 9711
              </p>
              <span className="text-[10px] text-[#25D366] font-medium mt-2 inline-flex items-center gap-1">
                Typical response &lt; 15 mins →
              </span>
            </a>

            {/* Direct Phone Line */}
            <a
              href="tel:+251913219711"
              className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[#D4AF37] transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-3 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)]">
                Direct Atelier Line
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light mt-1">
                +251 91 321 9711
              </p>
              <span className="text-[10px] text-[#D4AF37] font-medium mt-2 inline-flex items-center gap-1">
                Mon–Sat 9AM–7PM EAT →
              </span>
            </a>

            {/* In-Person Atelier */}
            <div className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
              <div className="w-10 h-10 rounded-full bg-[var(--badge-bg)] flex items-center justify-center text-[var(--text-primary)] mb-3">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)]">
                Addis Ababa Atelier
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light mt-1">
                Bole Sub-City, Addis Ababa
              </p>
              <span className="text-[10px] text-[var(--text-muted)] mt-2 block">
                Fittings by appointment
              </span>
            </div>

            {/* Instagram DM */}
            <a
              href="https://www.instagram.com/layis._/"
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-pink-500/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 mb-3 group-hover:scale-110 transition-transform">
                <Instagram className="w-5 h-5" />
              </div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)]">
                Official Instagram
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light mt-1">
                @layis._
              </p>
              <span className="text-[10px] text-[var(--text-muted)] mt-2 inline-flex items-center gap-1">
                Direct portfolio & DMs →
              </span>
            </a>

          </div>
        </section>

        {/* Main Interactive Form & Brief Generator Section */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left 8 Cols: The Interactive Form */}
            <div className="lg:col-span-8 bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
              
              {/* Form Navigation Tabs */}
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('commission')}
                    className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                      activeTab === 'commission'
                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    ✦ Bespoke Commission Brief
                  </button>
                  <button
                    onClick={() => setActiveTab('quick')}
                    className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                      activeTab === 'quick'
                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Quick Message
                  </button>
                </div>

                <span className="hidden sm:inline-block text-[11px] text-[var(--text-muted)] font-mono">
                  Concierge Docket Active
                </span>
              </div>

              {/* TAB 1: BESPOKE COMMISSION */}
              {activeTab === 'commission' && (
                <form onSubmit={handleCommissionSubmit} className="space-y-8">
                  
                  {/* Step 1: Occasion */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase tracking-widest font-semibold text-[var(--text-primary)] flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] flex items-center justify-center font-bold">1</span>
                        <span>Select Your Occasion</span>
                      </label>
                      <span className="text-[11px] text-[var(--text-muted)]">Ceremonial & Red Carpet</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {OCCASIONS.map((occ) => (
                        <div
                          key={occ.id}
                          onClick={() => setSelectedOccasion(occ.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            selectedOccasion === occ.id
                              ? 'border-[#D4AF37] bg-[var(--bg-input)] shadow-md ring-1 ring-[#D4AF37]'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] uppercase tracking-wider font-mono text-[#D4AF37]">
                              {occ.badge}
                            </span>
                            {selectedOccasion === occ.id && (
                              <Check className="w-4 h-4 text-[#D4AF37]" />
                            )}
                          </div>
                          <h4 className="text-xs font-semibold text-[var(--text-primary)]">
                            {occ.title}
                          </h4>
                          <p className="text-[11px] text-[var(--text-muted)] font-light mt-1 leading-relaxed">
                            {occ.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Silhouette */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase tracking-widest font-semibold text-[var(--text-primary)] flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] flex items-center justify-center font-bold">2</span>
                        <span>Desired Silhouette & Cut</span>
                      </label>
                      <span className="text-[11px] text-[var(--text-muted)]">Tailored Architecture</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SILHOUETTES.map((sil) => (
                        <div
                          key={sil.id}
                          onClick={() => setSelectedSilhouette(sil.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            selectedSilhouette === sil.id
                              ? 'border-[#D4AF37] bg-[var(--bg-input)] shadow-md ring-1 ring-[#D4AF37]'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-xs font-semibold text-[var(--text-primary)]">
                              {sil.title}
                            </h4>
                            {selectedSilhouette === sil.id && (
                              <Check className="w-4 h-4 text-[#D4AF37]" />
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--text-muted)] font-light leading-relaxed">
                            {sil.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Heritage Fabric Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase tracking-widest font-semibold text-[var(--text-primary)] flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] flex items-center justify-center font-bold">3</span>
                        <span>Heritage Fabric & Weave</span>
                      </label>
                      <span className="text-[11px] text-[var(--text-muted)]">Ancestral Dorze Pit-Looms</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {FABRICS.map((fab) => (
                        <div
                          key={fab.id}
                          onClick={() => setSelectedFabric(fab.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            selectedFabric === fab.id
                              ? 'border-[#D4AF37] bg-[var(--bg-input)] shadow-md ring-1 ring-[#D4AF37]'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-xs font-semibold text-[var(--text-primary)]">
                              {fab.name}
                            </h4>
                            {selectedFabric === fab.id && (
                              <Check className="w-4 h-4 text-[#D4AF37]" />
                            )}
                          </div>
                          <div className="text-[11px] text-[#D4AF37] font-mono">{fab.weight}</div>
                          <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{fab.origin}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Patron Contact & Measurements */}
                  <div className="space-y-4 pt-2 border-t border-[var(--border-subtle)]">
                    <label className="text-xs uppercase tracking-widest font-semibold text-[var(--text-primary)] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] flex items-center justify-center font-bold">4</span>
                      <span>Patron Details & Fitting Preferences</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Danait Zerihun"
                          className="w-full text-xs px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">WhatsApp / Phone *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+251 91 ... or +1 ..."
                          className="w-full text-xs px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="client@luxury.com"
                          className="w-full text-xs px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Event Date / Deadline</label>
                        <input
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full text-xs px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    {/* Sizing measurements inputs */}
                    <div className="pt-2">
                      <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-2">
                        Measurements / Sizing (Optional - Can be finalized during fitting)
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={chest}
                          onChange={(e) => setChest(e.target.value)}
                          placeholder="Chest (in/cm)"
                          className="text-xs px-3 py-2.5 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D4AF37]"
                        />
                        <input
                          type="text"
                          value={waist}
                          onChange={(e) => setWaist(e.target.value)}
                          placeholder="Waist (in/cm)"
                          className="text-xs px-3 py-2.5 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D4AF37]"
                        />
                        <input
                          type="text"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="Height (e.g. 5'10)"
                          className="text-xs px-3 py-2.5 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Special Styling Notes / Color Preferences</label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tell our stylists about your event, preferred gold embroidery motifs, or specific fit requirements..."
                        className="w-full text-xs px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {/* Submission Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-[var(--border-subtle)]">
                    <a
                      href={generateWhatsAppUrl(false)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider shadow-xl hover:bg-[#20ba59] transition-all hover:scale-[1.02]"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Send Commission Via WhatsApp</span>
                    </a>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[var(--border-strong)] text-[var(--text-primary)] bg-[var(--bg-input)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all font-semibold text-xs uppercase tracking-wider shadow-sm"
                    >
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span>Generate Docket Ticket</span>
                    </button>
                  </div>

                </form>
              )}

              {/* TAB 2: QUICK MESSAGE */}
              {activeTab === 'quick' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.open(generateWhatsAppUrl(true), '_blank');
                  }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-[var(--text-primary)]">
                      Quick Inquiry Concierge
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-light">
                      Have a quick question about sizing, prices, or international shipping? Send us a direct inquiry.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={quickName}
                        onChange={(e) => setQuickName(e.target.value)}
                        placeholder="Your name"
                        className="w-full text-xs px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">WhatsApp or Email *</label>
                      <input
                        type="text"
                        required
                        value={quickContact}
                        onChange={(e) => setQuickContact(e.target.value)}
                        placeholder="Phone or email"
                        className="w-full text-xs px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Subject</label>
                    <select
                      value={quickSubject}
                      onChange={(e) => setQuickSubject(e.target.value)}
                      className="w-full text-xs px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Bespoke Atelier Inquiry">Bespoke Atelier Inquiry</option>
                      <option value="Red Carpet & Gala Styling">Red Carpet & Gala Styling</option>
                      <option value="International Shipping & DHL">International Shipping & DHL</option>
                      <option value="Wedding / Melse Consultation">Wedding / Melse Consultation</option>
                      <option value="Press & Commercial Collaboration">Press & Commercial Collaboration</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Your Message *</label>
                    <textarea
                      rows={4}
                      required
                      value={quickMessage}
                      onChange={(e) => setQuickMessage(e.target.value)}
                      placeholder="Write your question or request here..."
                      className="w-full text-xs px-4 py-3 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider shadow-lg hover:bg-[#20ba59] transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Send Inquiry to Atelier WhatsApp</span>
                  </button>
                </form>
              )}

              {/* Confirmation Modal / Card if Ticket Generated */}
              {submittedTicket && (
                <div className="p-6 rounded-2xl bg-[var(--bg-input)] border border-[#D4AF37]/50 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-500 text-xs uppercase tracking-wider font-semibold">
                      <Check className="w-4 h-4" />
                      <span>Bespoke Commission Docket Generated</span>
                    </div>
                    <span className="font-mono text-xs text-[#D4AF37] font-bold">
                      #{submittedTicket}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                    Thank you, {clientName || 'Valued Patron'}. Your custom tailoring brief has been prepared. You can copy the docket or send it straight to our atelier concierge on WhatsApp.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={generateWhatsAppUrl(false)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold shadow-md hover:bg-[#20ba59]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp with Brief</span>
                    </a>

                    <button
                      onClick={handleCopyTicket}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border-strong)] text-[var(--text-primary)] text-xs uppercase tracking-wider font-semibold hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied to Clipboard' : 'Copy Brief Details'}</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right 4 Cols: Live Brief Summary & Atelier Credentials */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Live Docket Summary Card */}
              <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-strong)] space-y-5 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">
                    Live Commission Docket
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    {submittedTicket || ticketId}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] block">Occasion</span>
                    <span className="font-semibold text-[var(--text-primary)]">{selectedOccasion}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] block">Silhouette</span>
                    <span className="font-semibold text-[var(--text-primary)]">{selectedSilhouette}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] block">Fabric</span>
                    <span className="font-semibold text-[var(--text-primary)]">{selectedFabric}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] block">Est. Weaving Time</span>
                    <span className="font-mono text-[#D4AF37] font-semibold">64 – 110 Handloom Hours</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Master Tailor Review</span>
                  </span>
                  <span className="font-mono">Addis Ababa</span>
                </div>
              </div>

              {/* Atelier Details Card */}
              <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)]">
                  Atelier Visiting Hours
                </h4>
                
                <div className="space-y-2.5 text-xs text-[var(--text-muted)] font-light">
                  <div className="flex items-center justify-between">
                    <span>Monday – Friday</span>
                    <span className="font-medium text-[var(--text-primary)]">9:00 AM – 7:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-[var(--text-primary)]">10:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sunday</span>
                    <span className="text-[#D4AF37] font-medium">VIP Appointments Only</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2">
                  <div className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                    <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>Bole Sub-City, Next to Edna Mall Commercial Hub, Addis Ababa, Ethiopia</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Globe className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>Worldwide Express Delivery via DHL</span>
                  </div>
                </div>
              </div>

              {/* Gallery CTA Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1c1c1f] to-[#121214] text-white border border-[#D4AF37]/30 space-y-3">
                <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono">
                  Looking for Inspiration?
                </div>
                <h4 className="font-serif-luxury text-lg text-white">
                  Browse 62 Signature Runway Looks
                </h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Explore our complete photography archive featuring celebrity galas, avant-garde runway collections, and modern Habesha wedding ensembles.
                </p>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#D4AF37] hover:underline pt-1"
                >
                  <span>Open 62 Looks Gallery</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="max-w-4xl mx-auto px-6 sm:px-10 py-12">
          <div className="text-center space-y-2 mb-8">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[var(--text-primary)]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[var(--text-muted)] font-light">
              Everything you need to know about commissioning bespoke Ethiopian haute couture.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-card)] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-[#D4AF37] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180 text-[#D4AF37]' : 'text-[var(--text-muted)]'
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-[13px] text-[var(--text-muted)] font-light leading-relaxed border-t border-[var(--border-subtle)] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
      <BespokeAtelierModal />
      <InquiryBagDrawer />
    </div>
  );
}
