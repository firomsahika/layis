'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, 
  Sparkles, 
  ExternalLink, 
  Tv, 
  Layers, 
  HeartHandshake, 
  Scissors, 
  X,
  Images 
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function BrandManifesto() {
  const { setIsBespokeOpen } = useStore();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <section id="heritage" className="py-24 sm:py-32 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] relative overflow-hidden transition-colors duration-300">
        
        {/* Subtle background motif */}
        <div className="absolute inset-0 tibeb-pattern-subtle opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-24">
          
          {/* Top Story Block: The Shemane Looms */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Mosaic with Authentic Uploaded Product Photos */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] overflow-hidden border border-[var(--border-color)] shadow-xl bg-stone-900 group">
                  <Image
                    src="/images/Screenshot_20261004_172948_Instagram.jpg"
                    alt="Authentic Gamo handloom tailoring at LAYIS"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/85 text-[#FAF8F5] text-[9px] uppercase tracking-widest px-2 py-0.5 border border-stone-800">
                    Atelier Handloom Studio
                  </div>
                </div>
                
                <div className="p-4 bg-[var(--bg-card)] border border-[var(--border-color)]">
                  <span className="font-serif-luxury text-2xl text-[#D4AF37] block">100%</span>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    Hand-Twisted Gamo Raw Cotton
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-4 bg-black text-[#FAF8F5] border border-stone-800">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37]">The Shemane Ethos</div>
                  <div className="font-serif-luxury text-lg text-white mt-1">Preserving Heritage, Shaping Modernity</div>
                </div>

                <div className="relative aspect-[3/4] overflow-hidden border border-[var(--border-color)] shadow-xl bg-stone-900 group">
                  <Image
                    src="/images/Screenshot_20261004_173008_Instagram.jpg"
                    alt="Finished architectural cultural garment by LAYIS"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/85 text-[#FAF8F5] text-[9px] uppercase tracking-widest px-2 py-0.5 border border-stone-800">
                    Addis Ababa Atelier
                  </div>
                </div>
              </div>

            </div>

            {/* Narrative Editorial Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center gap-2">
                  <span className="w-8 h-[1.5px] bg-[#D4AF37]"></span>
                  Artisanal Heritage & Shemane Looms
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] font-light leading-tight">
                  WEAVING THE SACRED <br />
                  <span className="italic font-normal text-[#D4AF37]">INTO</span> ARCHITECTURAL SILHOUETTES.
                </h2>
              </div>

              <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed font-light">
                In Ethiopia, cloth is never merely decorative — it is genealogy, prayer, and civic dignity. At <strong className="font-medium text-[var(--text-primary)]">LAYIS</strong>, we honor the ancient master weavers (*shemane*) of Dorze and the Gamo highlands, where organic cotton is still hand-twisted on drop spindles and woven into breathable gauze upon subterranean wooden pit-looms.
              </p>

              <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-light">
                We synthesize this ancestral sacred textile knowledge with high-contrast, razor-sharp noir avant-garde tailoring: structured drop-shoulders, convertible band collars, and geometric antique gold tibeb filigree. The result is modern Ethiopian luxury that commands admiration across Paris, Milan, New York, and Addis Ababa.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border-subtle)]">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[var(--bg-card)] text-[#D4AF37] shrink-0 border border-[var(--border-color)]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)]">
                      Tibeb Weaving Art
                    </h4>
                    <p className="text-[11px] text-[var(--text-muted)] font-light mt-0.5">
                      Intricate geometric borders once reserved for royalty and clergy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[var(--bg-card)] text-[#D4AF37] shrink-0 border border-[var(--border-color)]">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)]">
                      Fair Artisan Trade
                    </h4>
                    <p className="text-[11px] text-[var(--text-muted)] font-light mt-0.5">
                      Direct patronage supporting multi-generational weaving families.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsBespokeOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors shadow-lg"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Consult with Master Weaver & Tailor</span>
                </button>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 px-5 py-3.5 border border-[var(--border-strong)] text-[var(--text-primary)] text-xs uppercase tracking-[0.2em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  <Images className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>View All 62 Looks</span>
                </Link>
              </div>

            </div>

          </div>

          {/* Section 2: Press Feature & Celebrity Endorsement */}
          <div id="press" className="pt-12 border-t border-[var(--border-subtle)] space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                Critical Acclaim & Celebrity Presence
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[var(--text-primary)]">
                As Seen on the Screen & Red Carpets of Addis Ababa
              </h3>
            </div>

            {/* Split Press Showcase with Real Garment Photography */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Press Card 1: Gammadaa Show Premiere Feature */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 flex flex-col justify-between shadow-xl relative group hover:border-[#D4AF37]/60 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#D4AF37] uppercase tracking-widest font-semibold text-[10px]">
                      <Tv className="w-3.5 h-3.5" />
                      Television Spotlight
                    </span>
                    <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider">
                      National Premiere
                    </span>
                  </div>

                  {/* Thumbnail of featured look */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900 border border-stone-800">
                    <Image
                      src="/images/Screenshot_20261004_172744_Instagram.jpg"
                      alt="LAYIS on Gammadaa Show"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button
                        onClick={() => setIsVideoModalOpen(true)}
                        className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                        aria-label="Play Gammadaa Show"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                    </div>
                  </div>

                  <div className="font-serif-luxury text-2xl text-[var(--text-primary)] leading-snug">
                    The Gammadaa Show Premiere Feature
                  </div>

                  <blockquote className="text-xs sm:text-sm text-[var(--text-secondary)] font-light italic border-l-2 border-[#D4AF37] pl-3 py-1">
                    &ldquo;LAYIS represents the bold vanguard of contemporary Ethiopian design — transforming ancestral loom techniques into avant-garde international statements.&rdquo;
                  </blockquote>

                  <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                    Spotlight interview exploring the founder’s artistic journey, the Gamo textile collective, and the rise of Ethiopian high fashion across the global diaspora.
                  </p>
                </div>

                <div className="pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--text-primary)] font-medium hover:text-[#D4AF37] transition-colors"
                  >
                    <span className="w-7 h-7 rounded-full bg-black text-[#D4AF37] border border-stone-800 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </span>
                    <span>Watch Feature Video</span>
                  </button>

                  <a
                    href="https://www.youtube.com/watch?v=IoYW1EUGh7A"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-[var(--text-muted)] hover:text-[#D4AF37] flex items-center gap-1"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Press Card 2: Danait Celebrity Endorsement */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 flex flex-col justify-between shadow-xl relative group hover:border-[#D4AF37]/60 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#D4AF37] uppercase tracking-widest font-semibold text-[10px]">
                      <Sparkles className="w-3.5 h-3.5" />
                      Celebrity Patron
                    </span>
                    <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider">
                      Red Carpet Bespoke
                    </span>
                  </div>

                  {/* Danait Real Photo Thumbnail */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900 border border-stone-800">
                    <Image
                      src="/images/Screenshot_20261004_172443_Instagram.jpg"
                      alt="Actress Danait Zerihun in custom LAYIS"
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 text-[9px] uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/40">
                      Danait Zerihun
                    </div>
                  </div>

                  <div className="font-serif-luxury text-2xl text-[var(--text-primary)] leading-snug">
                    Worn by Iconic Ethiopian Actress Danait
                  </div>

                  <blockquote className="text-xs sm:text-sm text-[var(--text-secondary)] font-light italic border-l-2 border-[#D4AF37] pl-3 py-1">
                    &ldquo;When Danait stepped out in LAYIS tailored velvet and gold tibeb, the entire Ethiopian cultural sphere recognized a new pinnacle of modern Habesha glamour.&rdquo;
                  </blockquote>

                  <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                    Custom-commissioned for premiere gala appearances, featuring our signature hourglass architectural silhouette with metallic gold tibeb trim along the cuffs and lapel.
                  </p>
                </div>

                <div className="pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <button
                    onClick={() => setIsBespokeOpen(true)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-medium hover:text-white transition-colors"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Inquire About Celebrity Edition</span>
                  </button>

                  <a
                    href="https://www.instagram.com/layis._/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-[var(--text-muted)] hover:text-[#D4AF37] flex items-center gap-1"
                  >
                    <span>@layis._ on Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Video Modal Dialog for Gammadaa Show */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="fixed inset-0 -z-10" onClick={() => setIsVideoModalOpen(false)} />
          
          <div className="relative w-full max-w-4xl bg-black border border-stone-800 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-[#0a0a0a] border-b border-stone-800 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                <span className="text-xs uppercase tracking-widest font-serif-luxury text-[#D4AF37]">
                  Gammadaa Show Premiere Spotlight
                </span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-full"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/IoYW1EUGh7A?autoplay=1"
                title="Gammadaa Show Premiere Interview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-4 bg-[#0a0a0a] flex items-center justify-between text-xs text-stone-400">
              <span>Spotlight on the rising creators of Ethiopian cultural couture</span>
              <a
                href="https://www.youtube.com/watch?v=IoYW1EUGh7A"
                target="_blank"
                rel="noreferrer"
                className="text-[#D4AF37] hover:underline"
              >
                Open directly in YouTube →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
