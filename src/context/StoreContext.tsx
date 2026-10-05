'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { CurrencyCode, formatPrice } from '@/data/currencies';
import { Product } from '@/data/products';

export interface BagItem {
  product: Product;
  size: string;
  notes?: string;
  quantity: number;
}

export interface BespokeBrief {
  occasion: string;
  silhouette: string;
  fabric: string;
  measurements: {
    chest: string;
    waist: string;
    height: string;
    shoulder: string;
  };
  eventDate: string;
  location: string;
  clientName: string;
  contactMethod: string;
  contactValue: string;
  notes?: string;
  ticketId?: string;
}

interface StoreContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  format: (usd: number) => string;
  
  // Bag / Inquiry Drawer
  bag: BagItem[];
  addToBag: (product: Product, size: string, notes?: string) => void;
  removeFromBag: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  clearBag: () => void;
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
  bagCount: number;
  totalUSD: number;
  
  // Modals
  inspectingProduct: Product | null;
  setInspectingProduct: (product: Product | null) => void;
  isBespokeOpen: boolean;
  setIsBespokeOpen: (open: boolean) => void;
  
  // Theme System (Brand default is Black)
  theme: 'black' | 'white';
  setTheme: (theme: 'black' | 'white') => void;
  toggleTheme: () => void;

  // Concierge helpers
  generateBagWhatsAppUrl: () => string;
  generateBespokeWhatsAppUrl: (brief: BespokeBrief) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CONCIERGE_PHONE = '251913219711'; // +251 91 321 9711

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<'black' | 'white'>('black');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [bag, setBag] = useState<BagItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [inspectingProduct, setInspectingProduct] = useState<Product | null>(null);
  const [isBespokeOpen, setIsBespokeOpen] = useState(false);

  // Sync theme with DOM and localStorage (default: black)
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('layis-theme') as 'black' | 'white' | null;
      if (savedTheme === 'white' || savedTheme === 'black') {
        setThemeState(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.documentElement.classList.remove('theme-black', 'theme-white');
        document.documentElement.classList.add(`theme-${savedTheme}`);
      } else {
        // Default brand is black
        document.documentElement.setAttribute('data-theme', 'black');
        document.documentElement.classList.remove('theme-black', 'theme-white');
        document.documentElement.classList.add('theme-black');
      }
    } catch {
      // localStorage may not be accessible in all environments
    }
  }, []);

  const setTheme = (newTheme: 'black' | 'white') => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('layis-theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      document.documentElement.classList.remove('theme-black', 'theme-white');
      document.documentElement.classList.add(`theme-${newTheme}`);
    } catch {
      // ignore
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'black' ? 'white' : 'black');
  };

  const format = useMemo(() => {
    return (usd: number) => formatPrice(usd, currency);
  }, [currency]);

  const addToBag = (product: Product, size: string, notes = '') => {
    setBag((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1, notes: notes || item.notes }
            : item
        );
      }
      return [...prev, { product, size, notes, quantity: 1 }];
    });
    setIsBagOpen(true);
  };

  const removeFromBag = (productId: string, size: string) => {
    setBag((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    setBag((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as BagItem[];
    });
  };

  const clearBag = () => setBag([]);

  const bagCount = useMemo(() => {
    return bag.reduce((sum, item) => sum + item.quantity, 0);
  }, [bag]);

  const totalUSD = useMemo(() => {
    return bag.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
  }, [bag]);

  const generateBagWhatsAppUrl = () => {
    if (bag.length === 0) {
      const defaultMsg = encodeURIComponent(
        `Hello LAYIS Concierge (+251 91 321 9711), I would like to inquire about your bespoke collection and arrange an atelier consultation in Addis Ababa / worldwide shipping.`
      );
      return `https://wa.me/${CONCIERGE_PHONE}?text=${defaultMsg}`;
    }

    const itemsSummary = bag
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.product.name}* (Qty: ${item.quantity}, Size: ${item.size})${
            item.notes ? `\n   Note: "${item.notes}"` : ''
          }\n   Price: ${format(item.product.priceUSD * item.quantity)} (${format(item.product.priceUSD)} each)`
      )
      .join('\n\n');

    const message = `*LAYIS ATELIER INQUIRY / COMMISSION DOCKET*
----------------------------------------
Addis Ababa Flagship Concierge (+251 91 321 9711)

*Selected Pieces:*
${itemsSummary}

----------------------------------------
*Estimated Total:* ${format(totalUSD)} (Currency: ${currency})
*Fulfillment Preference:* Domestic (Telebirr / CBE / Addis Studio) or International Diaspora (DHL / FedEx)

Please confirm fabric availability and atelier tailoring schedule.`;

    return `https://wa.me/${CONCIERGE_PHONE}?text=${encodeURIComponent(message)}`;
  };

  const generateBespokeWhatsAppUrl = (brief: BespokeBrief) => {
    const message = `*LAYIS BESPOKE COMMISSION BRIEF [${brief.ticketId || '#LAYIS-BESPOKE'}]*
----------------------------------------
*Client:* ${brief.clientName || 'Valued Patron'}
*Occasion:* ${brief.occasion}
*Silhouette:* ${brief.silhouette}
*Fabric & Weave:* ${brief.fabric}
*Event Date / Deadline:* ${brief.eventDate || 'Flexible'}
*Delivery Destination:* ${brief.location}

*Measurements Provided:*
- Chest: ${brief.measurements.chest || 'To be measured'}
- Waist: ${brief.measurements.waist || 'To be measured'}
- Height / Inseam: ${brief.measurements.height || 'To be measured'}
- Shoulder Breadth: ${brief.measurements.shoulder || 'To be measured'}

*Tailoring Notes / Special Requests:*
${brief.notes || 'None provided'}

----------------------------------------
Please confirm the initial consultation slot with chief designer at LAYIS Addis Ababa Atelier.`;

    return `https://wa.me/${CONCIERGE_PHONE}?text=${encodeURIComponent(message)}`;
  };

  return (
    <StoreContext.Provider
      value={{
        currency,
        setCurrency,
        format,
        bag,
        addToBag,
        removeFromBag,
        updateQuantity,
        clearBag,
        isBagOpen,
        setIsBagOpen,
        bagCount,
        totalUSD,
        theme,
        setTheme,
        toggleTheme,
        inspectingProduct,
        setInspectingProduct,
        isBespokeOpen,
        setIsBespokeOpen,
        generateBagWhatsAppUrl,
        generateBespokeWhatsAppUrl,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
