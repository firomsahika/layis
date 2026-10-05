'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BespokeAtelierModal from '@/components/BespokeAtelierModal';
import InquiryBagDrawer from '@/components/InquiryBagDrawer';
import { GALLERY_ITEMS, GalleryItem } from '@/data/galleryImages';
import { useStore } from '@/context/StoreContext';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Maximize2, 
  Send, 
  Clock, 
  MapPin, 
  Layers, 
  Grid, 
  Film, 
  Scissors, 
  Share2,
  Check,
  Search,
  SlidersHorizontal,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkle,
  Camera,
  ArrowUpRight
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Complete Archive', count: 62 },
  { id: 'shirt-jackets', label: 'Shirt-Jackets' },
  { id: 'ceremonial', label: 'Avant-Garde & Runway' },
  { id: 'wedding', label: 'Habesha Wedding' },
  { id: 'celebrity', label: 'Danait Editions', badge: 'Celebrity' },
  { id: 'runway', label: 'Runway Drops' },
  { id: 'textiles', label: 'Shemane Weaves' },
];

export default function GalleryPage() {
  const { setIsBespokeOpen } = useStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'hours-desc' | 'hours-asc' | 'celebrity'>('default');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'lookbook' | 'runway-stream'>('grid');
  const [monochromeMode, setMonochromeMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  // Cine-Lookbook Autoplay Slideshow State
  const [isPlaying, setIsPlaying] = useState(false);
  const [lookbookIndex, setLookbookIndex] = useState(0);

  // Filtered and Sorted items
  const filteredItems = useMemo(() => {
    let items = GALLERY_ITEMS;

    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.provenance.toLowerCase().includes(q) ||
          item.origin.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'hours-desc') {
      return [...items].sort((a, b) => b.hours - a.hours);
    }
    if (sortBy === 'hours-asc') {
      return [...items].sort((a, b) => a.hours - b.hours);
    }
    if (sortBy === 'celebrity') {
      return [...items].sort((a, b) => (b.isCelebrity ? 1 : 0) - (a.isCelebrity ? 1 : 0));
    }

    return items;
  }, [activeCategory, searchQuery, sortBy]);

  // Current Lightbox Index
  const currentLightboxIndex = selectedItem
    ? filteredItems.findIndex((it) => it.id === selectedItem.id)
    : -1;

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomLevel(1);
    if (currentLightboxIndex >= 0 && currentLightboxIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[currentLightboxIndex + 1]);
    } else if (filteredItems.length > 0) {
      setSelectedItem(filteredItems[0]);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomLevel(1);
    if (currentLightboxIndex > 0) {
      setSelectedItem(filteredItems[currentLightboxIndex - 1]);
    } else if (filteredItems.length > 0) {
      setSelectedItem(filteredItems[filteredItems.length - 1]);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedItem(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, currentLightboxIndex, filteredItems]);

  // Autoplay timer for Cine-Lookbook mode
  useEffect(() => {
    if (viewMode !== 'lookbook' || !isPlaying || filteredItems.length === 0) return;
    const interval = setInterval(() => {
      setLookbookIndex((prev) => (prev + 1) % filteredItems.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [viewMode, isPlaying, filteredItems.length]);

  const activeLookbookItem = filteredItems[lookbookIndex] || filteredItems[0] || GALLERY_ITEMS[0];

  const handleWhatsAppInquiry = (item: GalleryItem) => {
    const text = encodeURIComponent(
      `Hello LAYIS Atelier (+251 91 321 9711), I am inquiring about Archive Look [${item.id}]: *${item.title}* from your official gallery catalog.\n\nCategory: ${item.categoryLabel}\nProvenance: ${item.provenance}\nLoom Hours: ${item.hours} hours\nOrigin: ${item.origin}\n\nPlease advise if this silhouette or fabric can be tailored for me.`
    );
    window.open(`https://wa.me/251913219711?text=${text}`, '_blank');
  };

  const handleShareLook = (item: GalleryItem) => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/gallery?look=${item.id}` : '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] transition-colors duration-300">
      <Navbar />

      {/* Hero Exhibition Header matching reference design */}
      <section className="relative pt-12 pb-10 sm:pt-20 sm:pb-16 bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden border-b border-[var(--border-subtle)] transition-colors duration-300">
        
        {/* Giant Faint Brand Watermark LAYIS */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
          <span 
            className="font-serif-luxury text-[22vw] font-bold tracking-[0.08em] leading-none inline-block transition-colors"
            style={{ color: 'var(--watermark-color)' }}
          >
            LAYIS
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)] animate-pulse"></span>
              <span>Curated Product Exhibition</span>
              <span className="opacity-40">•</span>
              <span>62 Authentic Garments</span>
            </div>

            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-3">
              <span>Official Photography: @layis._</span>
              <span className="opacity-40">|</span>
              <span className="text-[var(--text-primary)] font-medium">Addis Ababa Atelier</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-light tracking-tight leading-[1.06]">
                THE LIVING ATELIER <br />
                <span className="italic font-normal text-[var(--text-muted)]">ARCHIVE COLLECTION</span> & MOTION RUNWAY.
              </h1>
              <p className="max-w-2xl text-[var(--text-muted)] text-xs sm:text-sm font-light leading-relaxed">
                An exhaustive retrospective of modern Ethiopian high fashion. Explore avant-garde runway silhouettes, iconic tailored shirt-jackets, and red carpet bespoke pieces worn by celebrity tastemaker Danait Zerihun.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4">
              <div className="p-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl text-xs space-y-1 shadow-md">
                <div className="text-[10px] uppercase tracking-widest text-[var(--text-primary)] font-semibold flex items-center gap-1.5">
                  <Sparkle className="w-3 h-3 text-[var(--accent-gold)]" />
                  <span>Atelier Authenticity Guarantee</span>
                </div>
                <div className="text-[var(--text-muted)] font-light text-[11px]">
                  Every look shown is hand-cut, loomed, and tailored by LAYIS master artisans in Ethiopia.
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsBespokeOpen(true)}
                  className="px-6 py-2.5 rounded-full border border-[var(--border-strong)] text-[var(--text-primary)] text-xs uppercase tracking-[0.16em] font-medium bg-[var(--pill-bg)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all flex items-center gap-2 shadow-lg"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Commission from Archive</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Live Continuous Motion Filmstrip Bar */}
        <div className="mt-10 pt-4 border-t border-[var(--border-subtle)] overflow-hidden">
          <div className="animate-runway-marquee gap-3 py-1">
            {[...GALLERY_ITEMS, ...GALLERY_ITEMS].slice(0, 36).map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedItem(item)}
                className="group relative w-20 h-28 sm:w-24 sm:h-32 shrink-0 overflow-hidden rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] cursor-pointer transition-all duration-300 shadow-md"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="100px"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                <span className="absolute bottom-1 left-1 text-[7.5px] uppercase font-mono text-stone-200 bg-black/80 px-1 py-0.2 rounded-xs">
                  #{item.id.replace('layis-img-', '')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter and View Mode Control Bar with Pill Shapes matching reference */}
      <section className="sticky top-20 z-30 bg-[var(--bg-glass)] backdrop-blur-xl border-b border-[var(--border-subtle)] py-4 transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Filter Pills matching reference design */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all whitespace-nowrap shrink-0 rounded-full ${
                      isActive
                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold shadow-lg'
                        : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{cat.label}</span>
                      {cat.badge && (
                        <span className="text-[8.5px] bg-[var(--badge-bg)] text-[var(--text-primary)] px-1.5 py-0.2 rounded-full font-mono border border-[var(--border-subtle)]">
                          {cat.badge}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Controls & Monochrome Mode */}
            <div className="flex items-center justify-between w-full md:w-auto gap-3 shrink-0 text-xs">
              
              {/* Monochrome Print Toggle Pill */}
              <button
                onClick={() => setMonochromeMode(!monochromeMode)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border transition-all text-[11px] uppercase tracking-wider ${
                  monochromeMode
                    ? 'border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold shadow-md'
                    : 'border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Toggle Haute Couture Black & White Print filter"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Noir Print {monochromeMode ? 'ON' : 'OFF'}</span>
              </button>

              {/* View Switchers in Pill Group */}
              <div className="flex items-center border border-[var(--border-strong)] bg-[var(--bg-card)] rounded-full p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                  title="Architectural Grid Mode"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('lookbook')}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === 'lookbook'
                      ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                  title="Cine-Lookbook Slideshow Mode"
                >
                  <Film className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('runway-stream')}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === 'runway-stream'
                      ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                  title="Dual-Row Continuous Motion Filmstrip Mode"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* Search & Sort Sub-bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by look, fabric, silhouette..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-8 py-2 bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] focus:border-[var(--text-primary)] focus:outline-none rounded-full placeholder:text-[var(--text-muted)] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <span className="font-mono text-[11px] text-[var(--text-muted)]">
                {filteredItems.length} of {GALLERY_ITEMS.length} Artifacts
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] text-[11px] px-3 py-1.5 rounded-full focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                >
                  <option value="default">Atelier Curated</option>
                  <option value="celebrity">Danait & Celebrity First</option>
                  <option value="hours-desc">Loom Hours (Highest First)</option>
                  <option value="hours-asc">Loom Hours (Fastest First)</option>
                </select>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Gallery Display */}
      <section className="py-12 sm:py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          
          {/* VIEW MODE 1: ARCHITECTURAL MASONRY GRID with Rounded Cards matching reference */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setZoomLevel(1);
                    setSelectedItem(item);
                  }}
                  className={`group relative bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:border-[var(--border-strong)] transition-all duration-500 flex flex-col ${
                    monochromeMode ? 'filter-monochrome' : ''
                  }`}
                >
                  {/* Photo Container */}
                  <div className={`relative ${item.aspect} w-full bg-[var(--bg-secondary)] overflow-hidden`}>
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-95 transition-opacity duration-300" />

                    {/* Top Status Tags matching reference pill style */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-[0.18em] bg-black/80 backdrop-blur-xs text-stone-200 px-2.5 py-0.5 rounded-full border border-white/10 font-medium">
                        {item.categoryLabel}
                      </span>

                      {item.isCelebrity && (
                        <span className="text-[9px] uppercase tracking-widest bg-white text-black px-2 py-0.5 rounded-full font-bold shadow-md">
                          Danait
                        </span>
                      )}
                    </div>

                    {/* Hover Magnify Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom Caption Inside Card */}
                    <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                      <span className="text-[9px] uppercase tracking-widest text-stone-300 block font-mono">
                        #{item.id}
                      </span>
                      <h3 className="font-serif-luxury text-base text-white leading-snug line-clamp-1">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="p-3.5 bg-[var(--bg-card)] border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[var(--text-primary)]" />
                      <span>{item.hours}h Loom</span>
                    </span>
                    <span className="truncate max-w-[140px] text-[var(--text-primary)] font-medium">
                      {item.origin}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* VIEW MODE 2: CINE-LOOKBOOK MOTION CAROUSEL with Reference Design Rounded Style */}
          {viewMode === 'lookbook' && (
            <div className="max-w-5xl mx-auto space-y-6">
              
              {/* Autoplay & Navigation Bar */}
              <div className="flex items-center justify-between bg-[var(--bg-card)] border border-[var(--border-subtle)] px-6 py-3.5 rounded-full shadow-lg">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-9 h-9 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shadow-md"
                    title={isPlaying ? 'Pause presentation' : 'Play presentation'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)]">
                      {isPlaying ? 'Cinematic Runway Flowing' : 'Cinematic Lookbook Paused'}
                    </span>
                    <div className="text-[10px] text-[var(--text-muted)]">
                      Look {lookbookIndex + 1} of {filteredItems.length}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLookbookIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1))}
                    className="w-8 h-8 rounded-full border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] flex items-center justify-center transition-colors"
                    title="Previous garment"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setLookbookIndex((prev) => (prev + 1) % filteredItems.length)}
                    className="w-8 h-8 rounded-full border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] flex items-center justify-center transition-colors"
                    title="Next garment"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Featured Large Slide Card matching reference rounded cards */}
              {activeLookbookItem && (
                <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[34px] p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
                  <div
                    className={`relative aspect-[3/4] w-full md:w-1/2 rounded-[28px] overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-subtle)] cursor-pointer group shadow-2xl ${
                      monochromeMode ? 'filter-monochrome' : ''
                    }`}
                    onClick={() => {
                      setZoomLevel(1);
                      setSelectedItem(activeLookbookItem);
                    }}
                  >
                    <Image
                      src={activeLookbookItem.src}
                      alt={activeLookbookItem.title}
                      fill
                      priority
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity" />
                    
                    <div className="absolute bottom-4 right-4 bg-white p-2.5 text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    <div className="absolute top-4 left-4">
                      <span className="bg-black/80 backdrop-blur-xs text-white border border-white/10 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium">
                        {activeLookbookItem.categoryLabel}
                      </span>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 space-y-5 text-left">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] font-semibold font-mono">
                        Archive Specimen #{activeLookbookItem.id}
                      </span>
                      {activeLookbookItem.isCelebrity && (
                        <span className="text-[9px] uppercase tracking-widest bg-[var(--text-primary)] text-[var(--bg-primary)] px-2.5 py-0.5 rounded-full font-bold">
                          Danait Red Carpet
                        </span>
                      )}
                    </div>

                    <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[var(--text-primary)] leading-tight">
                      {activeLookbookItem.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                      Hand-tailored cultural garment featuring artisanal subterranean pit-loom weaving, signature drop-shoulder architecture, and authentic Ethiopian horn fasteners.
                    </p>

                    <div className="p-4 bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl text-xs space-y-2">
                      <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
                        <Layers className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                        <span><strong className="text-[var(--text-primary)]">Textile:</strong> {activeLookbookItem.provenance}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
                        <MapPin className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                        <span><strong className="text-[var(--text-primary)]">Provenance:</strong> {activeLookbookItem.origin}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
                        <Clock className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                        <span><strong className="text-[var(--text-primary)]">Artisan Work:</strong> {activeLookbookItem.hours} Weaving & Tailoring Hours</span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => handleWhatsAppInquiry(activeLookbookItem)}
                        className="px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs uppercase tracking-[0.18em] font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Inquire This Piece</span>
                      </button>

                      <button
                        onClick={() => {
                          setZoomLevel(1);
                          setSelectedItem(activeLookbookItem);
                        }}
                        className="px-5 py-3 rounded-full border border-[var(--border-strong)] text-xs uppercase tracking-wider text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
                      >
                        Inspect Fullscreen
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* Scrubber Strip at Bottom */}
              <div className="overflow-x-auto pb-2 flex gap-2">
                {filteredItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setLookbookIndex(idx)}
                    className={`relative w-16 h-20 shrink-0 overflow-hidden rounded-xl border transition-all ${
                      lookbookIndex === idx
                        ? 'border-white ring-2 ring-white/50'
                        : 'border-white/10 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* VIEW MODE 3: DUAL-ROW CONTINUOUS RUNWAY MOTION FILMSTRIP */}
          {viewMode === 'runway-stream' && (
            <div className="space-y-8 py-4">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)] font-semibold">
                  Dual-Direction Continuous Runway
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[var(--text-primary)]">
                  The Full 62-Look Living Marquee
                </h3>
                <p className="text-xs text-[var(--text-muted)] font-light">
                  Hover over any garment to pause runway motion and inspect high-resolution tailoring details.
                </p>
              </div>

              {/* Row 1: Forward Marquee */}
              <div className="overflow-hidden relative py-2">
                <div className="animate-runway-marquee gap-4">
                  {[...filteredItems, ...filteredItems].map((item, idx) => (
                    <div
                      key={`row1-${idx}`}
                      onClick={() => {
                        setZoomLevel(1);
                        setSelectedItem(item);
                      }}
                      className={`group relative w-48 sm:w-56 h-72 shrink-0 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl hover:border-[var(--border-strong)] overflow-hidden cursor-pointer shadow-xl transition-all duration-300 ${
                        monochromeMode ? 'filter-monochrome' : ''
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="240px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-95 transition-opacity" />
                      
                      <div className="absolute top-2.5 left-2.5">
                        <span className="text-[8.5px] uppercase tracking-widest bg-black/80 backdrop-blur-xs text-stone-200 px-2 py-0.5 rounded-full border border-white/10">
                          #{item.id}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-[9px] uppercase tracking-wider text-stone-300">
                          {item.hours}h Loom
                        </div>
                        <h4 className="font-serif-luxury text-sm line-clamp-1 text-white">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Reverse Marquee */}
              <div className="overflow-hidden relative py-2">
                <div className="animate-runway-marquee-reverse gap-4">
                  {[...filteredItems.slice().reverse(), ...filteredItems.slice().reverse()].map((item, idx) => (
                    <div
                      key={`row2-${idx}`}
                      onClick={() => {
                        setZoomLevel(1);
                        setSelectedItem(item);
                      }}
                      className={`group relative w-48 sm:w-56 h-72 shrink-0 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl hover:border-[var(--border-strong)] overflow-hidden cursor-pointer shadow-xl transition-all duration-300 ${
                        monochromeMode ? 'filter-monochrome' : ''
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="240px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-95 transition-opacity" />
                      
                      <div className="absolute top-2.5 left-2.5">
                        <span className="text-[8.5px] uppercase tracking-widest bg-black/80 backdrop-blur-xs text-stone-200 px-2 py-0.5 rounded-full border border-white/10">
                          #{item.id}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-[9px] uppercase tracking-wider text-stone-300">
                          {item.provenance}
                        </div>
                        <h4 className="font-serif-luxury text-sm line-clamp-1 text-white">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* Interactive Lightbox Modal with Zoom, Pan & Inquiries matching reference rounded styling */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          {/* Top Control Bar */}
          <div className="absolute top-5 left-6 right-6 z-30 flex items-center justify-between text-white pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto bg-[var(--bg-card)] text-[var(--text-primary)] px-4 py-1.5 rounded-full border border-[var(--border-strong)] shadow-lg">
              <span className="text-xs uppercase tracking-widest font-medium">
                Look {currentLightboxIndex + 1} of {filteredItems.length}
              </span>
              <span className="opacity-40">•</span>
              <span className="text-xs font-mono text-[var(--text-muted)]">#{selectedItem.id}</span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Zoom Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomLevel((z) => (z < 2.5 ? z + 0.5 : 1));
                }}
                className="w-10 h-10 rounded-full bg-[var(--bg-card)] hover:bg-[var(--text-primary)] text-[var(--text-primary)] hover:text-[var(--bg-primary)] border border-[var(--border-strong)] flex items-center justify-center transition-colors shadow-lg"
                title={`Zoom: ${zoomLevel}x`}
              >
                {zoomLevel > 1 ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>

              {/* Share Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShareLook(selectedItem);
                }}
                className="w-10 h-10 rounded-full bg-[var(--bg-card)] hover:bg-[var(--text-primary)] text-[var(--text-primary)] hover:text-[var(--bg-primary)] border border-[var(--border-strong)] flex items-center justify-center transition-colors shadow-lg"
                title="Copy share link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="w-10 h-10 rounded-full bg-[var(--bg-card)] hover:bg-[var(--text-primary)] text-[var(--text-primary)] hover:text-[var(--bg-primary)] border border-[var(--border-strong)] flex items-center justify-center transition-colors shadow-lg"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Left / Right Nav Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-[var(--bg-card)] hover:bg-[var(--text-primary)] text-[var(--text-primary)] hover:text-[var(--bg-primary)] rounded-full transition-colors border border-[var(--border-strong)] hidden sm:flex items-center justify-center shadow-2xl"
            aria-label="Previous Garment"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-[var(--bg-card)] hover:bg-[var(--text-primary)] text-[var(--text-primary)] hover:text-[var(--bg-primary)] rounded-full transition-colors border border-[var(--border-strong)] hidden sm:flex items-center justify-center shadow-2xl"
            aria-label="Next Garment"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Modal Container matching reference rounded-3xl design */}
          <div 
            className="relative w-full max-w-4xl bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-[32px] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row transition-colors text-[var(--text-primary)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Side with Zoom */}
            <div className="relative md:w-3/5 aspect-[3/4] md:aspect-auto bg-[var(--bg-secondary)] min-h-[380px] md:min-h-[580px] overflow-hidden flex items-center justify-center">
              <div 
                className="relative w-full h-full transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  fill
                  priority
                  className={`object-contain ${monochromeMode ? 'filter-monochrome' : ''}`}
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>

              {zoomLevel > 1 && (
                <button
                  onClick={() => setZoomLevel(1)}
                  className="absolute bottom-4 left-4 bg-black/80 px-3 py-1.5 text-[10px] text-white border border-white/20 rounded-full flex items-center gap-1.5 shadow-lg"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Zoom (1x)</span>
                </button>
              )}
            </div>

            {/* Information Side */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-primary)] font-medium bg-[var(--badge-bg)] px-3 py-0.5 rounded-full border border-[var(--border-subtle)]">
                    {selectedItem.categoryLabel}
                  </span>
                  <span className="font-mono text-[var(--text-muted)] text-xs">
                    Look {currentLightboxIndex + 1} of {filteredItems.length}
                  </span>
                </div>

                <div>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[var(--text-primary)] leading-tight">
                    {selectedItem.title}
                  </h2>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mt-1 font-mono">
                    Serial: #{selectedItem.id} • Official Archive Look
                  </div>
                </div>

                <div className="p-4 bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl text-xs space-y-2">
                  <div className="flex items-start gap-2 text-[var(--text-secondary)]">
                    <Layers className="w-3.5 h-3.5 text-[var(--text-muted)] mt-0.5 shrink-0" />
                    <div>
                      <strong className="font-medium text-[var(--text-primary)]">Textile:</strong> {selectedItem.provenance}
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-[var(--text-secondary)]">
                    <MapPin className="w-3.5 h-3.5 text-[var(--text-muted)] mt-0.5 shrink-0" />
                    <div>
                      <strong className="font-medium text-[var(--text-primary)]">Artisan Guild:</strong> {selectedItem.origin}
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-[var(--text-secondary)]">
                    <Clock className="w-3.5 h-3.5 text-[var(--text-muted)] mt-0.5 shrink-0" />
                    <div>
                      <strong className="font-medium text-[var(--text-primary)]">Loom & Cut:</strong> {selectedItem.hours} Handcraft Hours
                    </div>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] text-xs font-light leading-relaxed">
                  Commission this exact piece or request custom adaptations in sleeve length, lapel width, or ceremonial color palette through our chief atelier tailor.
                </p>

                {/* Scrubber Ribbon in Lightbox */}
                <div className="pt-2 border-t border-[var(--border-subtle)]">
                  <span className="text-[9px] uppercase tracking-widest text-[var(--text-muted)] block mb-2">
                    Browse Other Archive Pieces
                  </span>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {filteredItems.map((it) => (
                      <button
                        key={it.id}
                        onClick={() => {
                          setZoomLevel(1);
                          setSelectedItem(it);
                        }}
                        className={`relative w-12 h-14 shrink-0 overflow-hidden rounded-lg border transition-all ${
                          selectedItem.id === it.id
                            ? 'border-[var(--text-primary)] ring-2 ring-[var(--text-primary)]/50'
                            : 'border-[var(--border-subtle)] opacity-50 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={it.src}
                          alt={it.title}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions with Rounded Pill Buttons matching reference */}
              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2.5">
                <button
                  onClick={() => handleWhatsAppInquiry(selectedItem)}
                  className="w-full py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs uppercase tracking-[0.18em] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-xl"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Inquire via WhatsApp (+251 91 321 9711)</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedItem(null);
                    setIsBespokeOpen(true);
                  }}
                  className="w-full py-2.5 rounded-full border border-[var(--border-strong)] text-[var(--text-primary)] text-xs uppercase tracking-wider font-medium hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors flex items-center justify-center gap-2"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Book Custom Fitting for this Look</span>
                </button>

                {/* Mobile Next/Prev buttons */}
                <div className="flex items-center justify-between pt-2 text-xs text-[var(--text-muted)] sm:hidden">
                  <button onClick={handlePrev} className="underline text-[var(--text-primary)]">
                    ← Previous Look
                  </button>
                  <button onClick={handleNext} className="underline text-[var(--text-primary)]">
                    Next Look →
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      <Footer />
      <BespokeAtelierModal />
      <InquiryBagDrawer />
    </main>
  );
}
