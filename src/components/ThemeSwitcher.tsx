'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Moon, Sun } from 'lucide-react';

interface ThemeSwitcherProps {
  variant?: 'navbar' | 'floating' | 'mobile';
}

export default function ThemeSwitcher({ variant = 'navbar' }: ThemeSwitcherProps) {
  const { theme, toggleTheme, setTheme } = useStore();

  const isBlack = theme === 'black';

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center">
        <div className="flex items-center p-1 rounded-full backdrop-blur-xl border border-[var(--border-strong)] bg-[var(--bg-card)]/90 shadow-2xl transition-all">
          <button
            onClick={() => setTheme('black')}
            aria-label="Switch to Black Theme"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold transition-all duration-300 ${
              isBlack
                ? 'bg-black text-[#D4AF37] border border-[#D4AF37]/40 shadow-md'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Black</span>
          </button>
          <button
            onClick={() => setTheme('white')}
            aria-label="Switch to White Theme"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold transition-all duration-300 ${
              !isBlack
                ? 'bg-white text-zinc-900 border border-zinc-200 shadow-md'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-[#BFA15F]" />
            <span>White</span>
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className="flex items-center justify-between p-3.5 border rounded-2xl transition-colors border-[var(--border-subtle)] bg-[var(--bg-card)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--bg-input)] border border-[var(--border-strong)]">
            {isBlack ? (
              <Moon className="w-4 h-4 text-[#D4AF37]" />
            ) : (
              <Sun className="w-4 h-4 text-[#BFA15F]" />
            )}
          </div>
          <div className="text-left">
            <div className="text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)]">
              Theme: {isBlack ? 'Black (Default)' : 'White'}
            </div>
            <div className="text-[10px] text-[var(--text-muted)]">
              Haute Couture Palette
            </div>
          </div>
        </div>

        <div className="flex items-center p-1 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-full">
          <button
            onClick={() => setTheme('black')}
            className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full transition-all ${
              isBlack
                ? 'bg-black text-[#D4AF37] border border-[#D4AF37]/40 shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Black
          </button>
          <button
            onClick={() => setTheme('white')}
            className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full transition-all ${
              !isBlack
                ? 'bg-white text-zinc-950 font-bold shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            White
          </button>
        </div>
      </div>
    );
  }

  // Refined professional segmented navbar button
  return (
    <div className="flex items-center">
      <div 
        role="group"
        aria-label="Theme mode selector"
        className="flex items-center p-1 rounded-full border border-[var(--border-strong)] bg-[var(--bg-input)]/90 backdrop-blur-md shadow-xs transition-all duration-300"
      >
        <button
          onClick={() => setTheme('black')}
          aria-label="Select Black theme"
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold transition-all duration-300 ${
            isBlack
              ? 'bg-[#000000] text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
          title="Black Theme (Default)"
        >
          <Moon className={`w-3 h-3 ${isBlack ? 'text-[#D4AF37]' : 'text-current'} transition-transform duration-300`} />
          <span className="hidden sm:inline">Black</span>
        </button>

        <button
          onClick={() => setTheme('white')}
          aria-label="Select White theme"
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-semibold transition-all duration-300 ${
            !isBlack
              ? 'bg-[#FFFFFF] text-zinc-950 font-bold border border-zinc-300 shadow-sm'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
          title="White Theme"
        >
          <Sun className={`w-3 h-3 ${!isBlack ? 'text-[#BFA15F]' : 'text-current'} transition-transform duration-300`} />
          <span className="hidden sm:inline">White</span>
        </button>
      </div>
    </div>
  );
}
