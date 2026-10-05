import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export const metadata: Metadata = {
  title: 'LAYIS | Modern Ethiopian Haute Couture & Avant-Garde Tailoring',
  description:
    'Official atelier catalog for LAYIS. Handcrafted luxury cotton shirt-jackets, avant-garde runway silhouettes, modern Habesha wedding attire, and red carpet bespoke pieces worn by celebrity Danait Zerihun. Handcrafted in Addis Ababa, Ethiopia.',
  keywords: [
    'LAYIS',
    'LAYIS Fashion',
    'Ethiopian Fashion',
    'Addis Ababa Luxury',
    'Bespoke Habesha Wedding',
    'Runway Fashion',
    'African Haute Couture',
    'High Fashion Design',
    'Danait Zerihun',
    'Luxury Shirt Jacket',
  ],
  authors: [{ name: 'LAYIS Atelier Addis Ababa' }],
  openGraph: {
    title: 'LAYIS | Modern Haute Couture & Avant-Garde Tailoring',
    description:
      'From our Addis Ababa atelier to the world — bespoke contemporary couture redefined.',
    url: 'https://layis.fashion',
    siteName: 'LAYIS',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth theme-black" data-theme="black" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Anti-flash theme script: Default brand theme is black */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('layis-theme');
                  var theme = (saved === 'white') ? 'white' : 'black';
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.classList.remove('theme-black', 'theme-white');
                  document.documentElement.classList.add('theme-' + theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'black');
                  document.documentElement.classList.add('theme-black');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased selection:bg-[#D4AF37] selection:text-black font-sans-luxury transition-colors duration-300">
        <StoreProvider>
          {children}
          <ThemeSwitcher variant="floating" />
        </StoreProvider>
      </body>
    </html>
  );
}
