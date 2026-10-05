export interface Product {
  id: string;
  slug: string;
  name: string;
  amharicName?: string;
  category: 'shirt-jackets' | 'ceremonial' | 'wedding' | 'celebrity';
  categoryLabel: string;
  priceUSD: number;
  origin: string;
  fabricTags: string[];
  weavingHours: number;
  artisanRegion: string;
  headline: string;
  description: string;
  details: string[];
  stylingNote: string;
  image: string;
  secondaryImages: string[];
  badge?: string;
  featured?: boolean;
  celebrityWornBy?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'layis-01',
    slug: 'signature-architectural-shirt-jacket',
    name: 'The Signature Architectural Shirt-Jacket',
    amharicName: 'አርክቴክቸራል ሸሚዝ-ጃኬት',
    category: 'shirt-jackets',
    categoryLabel: 'Iconic Shirt-Jackets',
    priceUSD: 480,
    origin: 'Handcrafted luxury textile & tailored in Addis Ababa',
    fabricTags: [
      '100% Hand-Spun Highland Cotton',
      'Signature Tibeb Border Stitching',
      'Ethical Buffalo Horn Buttons',
      'Raw Bone Selvage Finish',
    ],
    weavingHours: 64,
    artisanRegion: 'Addis Ababa Haute Couture Atelier',
    headline: 'The quintessential LAYIS silhouette bridging avant-garde tailoring and modern architectural drape.',
    description:
      'Engineered with an unstructured silhouette, relaxed drop-shoulder tailoring, and geometric antique-gold tibeb embroidery running along the placket and cuffs. Handcrafted from heavy unbleached cotton that develops a personal patina over time.',
    details: [
      'Unstructured architectural lapel with convertible band collar',
      'Concealed double-welt interior pockets for modern daily utility',
      'Hand-finished edge binding with raw natural linen thread',
      'Cut and tailored in small limited batches of 15 garments per drop',
    ],
    stylingNote: 'Pair with relaxed tailored wool trousers or the matching Raw Selvedge Pant.',
    image: '/images/Screenshot_20261004_172337_Instagram.jpg',
    secondaryImages: [
      '/images/Screenshot_20261004_172351_Instagram.jpg',
      '/images/Screenshot_20261004_172402_Instagram.jpg',
      '/images/Screenshot_20261004_172420_Instagram.jpg',
    ],
    badge: 'Iconic Signature',
    featured: true,
  },
  {
    id: 'layis-02',
    slug: 'danait-celebrity-gala-corseted-blazer',
    name: 'The "Danait" Velvet-Trimmed Gala Blazer',
    amharicName: 'ዳናይት ጋላ ብሌዘር',
    category: 'celebrity',
    categoryLabel: 'Celebrity Editions',
    priceUSD: 890,
    origin: 'Addis Ababa Haute Couture Atelier',
    fabricTags: [
      'As Seen on Danait Zerihun',
      'Gold-Thread Metallic Tibeb Weave',
      'Heavyweight Italian-Grade Raw Silk & Cotton',
      'Obsidian Satin Lapel Facings',
    ],
    weavingHours: 110,
    artisanRegion: 'Addis Ababa & Gamo Collective',
    headline: 'The exact high-profile bespoke piece commissioned for iconic Ethiopian actress & tastemaker Danait.',
    description:
      'Celebrated on red carpets and television galas across Ethiopia, this avant-garde blazer merges dramatic nipped-waist architectural structure with centuries-old gold tibeb motifs inspired by royal Solomonic vestments.',
    details: [
      'Custom boned interior waist architecture for an imperial hourglass silhouette',
      'Micro-embroidered gold filigree across sleeve vents and back vent',
      'Full silk lining with serialized atelier docket sewn into interior chest',
      'Includes bespoke fitting session with chief designer via video concierge',
    ],
    stylingNote: 'Worn by Danait with cigarette trousers and minimalist antique bronze jewelry.',
    image: '/images/Screenshot_20261004_172443_Instagram.jpg',
    secondaryImages: [
      '/images/Screenshot_20261004_172457_Instagram.jpg',
      '/images/Screenshot_20261004_172513_Instagram.jpg',
      '/images/Screenshot_20261004_172523_Instagram.jpg',
    ],
    badge: 'Worn by Danait',
    featured: true,
    celebrityWornBy: 'Danait Zerihun',
  },
  {
    id: 'layis-03',
    slug: 'solstice-monochrome-runway-vestment',
    name: 'The Solstice Monochrome Runway Vestment',
    amharicName: 'ሶልስቲስ ሞኖክሮም ቪስትመንት',
    category: 'ceremonial',
    categoryLabel: 'Avant-Garde & Runway',
    priceUSD: 620,
    origin: 'Exclusive Handloom Weave & Addis Atelier Tailoring',
    fabricTags: [
      'High-Contrast Geometric Graphic Borders',
      'Featherweight Hand-Spun Shemma Drape',
      'Avant-Garde Architectural Silhouette',
      'Natural Botanical Vegetable Dyes',
    ],
    weavingHours: 92,
    artisanRegion: 'Addis Ababa Haute Couture Atelier',
    headline: 'A masterwork of structured silhouette, dynamic geometric drape, and contemporary fashion design.',
    description:
      'Engineered with bold high-contrast color-blocked geometric bands on pristine unbleached cotton, creating striking movement for runways, red carpets, and avant-garde editorial styling.',
    details: [
      'Flowing floor-skimming tunic with high mandarin slit neckline',
      'Removable ceremonial shoulder sash (netela) with custom frayed fringe',
      'Breathable, airy hand-twisted cotton yarn suitable for warm climates',
      'Tailored to order with custom length specifications',
    ],
    stylingNote: 'Pair with tailored obsidian trousers and modern minimal leather dress footwear.',
    image: '/images/Screenshot_20261004_172534_Instagram.jpg',
    secondaryImages: [
      '/images/Screenshot_20261004_172556_Instagram.jpg',
      '/images/Screenshot_20261004_172608_Instagram.jpg',
    ],
    badge: 'Runway Masterpiece',
    featured: true,
  },
  {
    id: 'layis-04',
    slug: 'modern-habesha-imperial-wedding-ensemble',
    name: 'Imperial Habesha Wedding Groom & Bridal Tuxedo',
    amharicName: 'የዘመናዊ ሰርግ ካባ ስብስብ',
    category: 'wedding',
    categoryLabel: 'Bespoke Wedding',
    priceUSD: 1150,
    origin: 'LAYIS Haute Bespoke Salon, Bole Atlas',
    fabricTags: [
      'Metallic Gold Kaba Hand-Embroidery',
      'Pure Ethiopian Organic Silk Weave',
      'Hand-Cut Horn Buttons & Satin Peak Lapels',
      'Custom Monogramming Included',
    ],
    weavingHours: 140,
    artisanRegion: 'Bole Atelier, Addis Ababa',
    headline: 'Redefining Ethiopian matrimonial grandeur for the contemporary global couple.',
    description:
      'Combining the ceremonial nobility of the royal Ethiopian Kaba cape with the precision of Savile Row tuxedo tailoring. Each ensemble is commissioned individually, requiring over 140 hours of hand-embroidery by master artisans.',
    details: [
      'Detachable velvet ceremonial cape with hand-guided bullion wire embroidery',
      'Double-breasted smoking jacket cut from midnight obsidian handloom fabric',
      'Pleated front ceremonial shirt in superfine 200-count Ethiopian cotton',
      'Complimentary diaspora courier shipping with protective wooden travel trunk',
    ],
    stylingNote: 'Created for the modern Habesha wedding reception, Melse, and international nuptials.',
    image: '/images/Screenshot_20261004_172630_Instagram.jpg',
    secondaryImages: [
      '/images/Screenshot_20261004_172643_Instagram.jpg',
      '/images/Screenshot_20261004_172654_Instagram.jpg',
    ],
    badge: 'Bespoke Commission Only',
    featured: true,
  },
  {
    id: 'layis-05',
    slug: 'gamo-highland-raw-cotton-trench',
    name: 'Gamo Highland Oversized Duster Coat',
    amharicName: 'ጋሞ ደስተር ኮት',
    category: 'shirt-jackets',
    categoryLabel: 'Iconic Shirt-Jackets',
    priceUSD: 540,
    origin: 'Highland Gamo Weavers Cooperative',
    fabricTags: [
      'Unbleached Raw Organic Cotton',
      'Double-Warp Heavyweight Weave',
      'Antique Brass Hardware Accents',
      'Weather-Resistant Natural Wax Coating',
    ],
    weavingHours: 78,
    artisanRegion: 'Chencha & Dorze, Gamo Highlands',
    headline: 'Architectural streetwear proportioned for Addis Ababa highlands and cool international capitals.',
    description:
      'A commanding duster coat featuring extended storm flaps, oversized bellow pockets, and a signature belt finished with hand-braided tibeb trim. Wind-resistant yet thoroughly organic.',
    details: [
      'Oversized dropped shoulder silhouette with deep back pleat',
      'Self-fabric storm collar with storm latch closure',
      'Unlined interior showcasing master hand-bound bias seams',
      'Dyed naturally using local mountain clays and acacia gum',
    ],
    stylingNote: 'Layer over a high-neck knit or wear open over an unbuttoned LAYIS shirt-jacket.',
    image: '/images/Screenshot_20261004_172706_Instagram.jpg',
    secondaryImages: [
      '/images/Screenshot_20261004_172713_Instagram.jpg',
      '/images/Screenshot_20261004_172726_Instagram.jpg',
    ],
    badge: 'Autumn Capsule Drop',
    featured: false,
  },
  {
    id: 'layis-06',
    slug: 'bole-midnight-kimono-jacket-gold-tibeb',
    name: 'Bole Midnight Kimono-Jacket',
    amharicName: 'ቦሌ ኪሞኖ ጃኬት',
    category: 'shirt-jackets',
    categoryLabel: 'Iconic Shirt-Jackets',
    priceUSD: 495,
    origin: 'Addis Ababa Flagship Workshop',
    fabricTags: [
      'Deep Obsidian Black Cotton Twill',
      'Intricate Gold Filigree Tibeb Lapels',
      'Internal Kimono Waist Tie Closure',
      'Ventilated Armhole Eyelets',
    ],
    weavingHours: 58,
    artisanRegion: 'Addis Ababa Atelier',
    headline: 'East-African avant-garde tailoring meeting minimalist Japanese wrap construction.',
    description:
      'Designed for effortless transition from morning creative meetings in Bole to private gallery vernissages. Features clean wrap front geometry bordered by 8 centimeters of radiant gold-thread tibeb geometric motifs.',
    details: [
      'Versatile fastening: wear tied as a tailored blazer or open as a light jacket',
      'Deep ergonomic kimono pockets with reinforced bar tacking',
      'Breathable pre-washed cotton with tactile slub texture',
      'Designed and hand-cut in our central Addis studio',
    ],
    stylingNote: 'Pairs impeccably with monochromatic black streetwear or tailored dress pants.',
    image: '/images/Screenshot_20261004_172744_Instagram.jpg',
    secondaryImages: [
      '/images/Screenshot_20261004_172754_Instagram.jpg',
      '/images/Screenshot_20261004_172835_Instagram.jpg',
    ],
    badge: 'Bestseller',
    featured: true,
  },
  {
    id: 'layis-07',
    slug: 'shemane-heritage-handloom-tuxedo',
    name: 'Shemane Heritage Raw-Silk Wedding Tuxedo',
    amharicName: 'የሸማኔ ሰርግ ቱክሲዶ',
    category: 'wedding',
    categoryLabel: 'Bespoke Wedding',
    priceUSD: 1280,
    origin: 'Master Guild of Shemane, Southern Ethiopia',
    fabricTags: [
      '100% Ethiopian Hand-Spun Wild Silk',
      'Satin Silk Shawl Collar',
      'Custom Engraved Gold Cuffs',
      'Personalized Family Crest Monogram',
    ],
    weavingHours: 135,
    artisanRegion: 'Addis Ababa Haute Couture Atelier',
    headline: 'A once-in-a-lifetime garment for the distinguished groom in Ethiopia and across the diaspora.',
    description:
      'Woven from rare indigenous wild silk harvested from the high-canopy forests of Southwestern Ethiopia. The fabric exhibits a subtle organic sheen that captures evening candlelight with unparalleled warmth.',
    details: [
      'Hand-canvassed chest piece for structured comfort that molds to your physique',
      'Traditional motif running along the satin trouser braid',
      'Hand-stitched silk buttonholes and mother-of-pearl buttons',
      'Includes emergency alteration voucher valid in London, DC, Atlanta, or Addis',
    ],
    stylingNote: 'Complete with the LAYIS Silk Netela Scarf draped over the left shoulder.',
    image: '/images/Screenshot_20261004_172847_Instagram.jpg',
    secondaryImages: [
      '/images/Screenshot_20261004_172856_Instagram.jpg',
      '/images/Screenshot_20261004_172906_Instagram.jpg',
    ],
    badge: 'Bespoke Commission Only',
    featured: false,
  },
  {
    id: 'layis-08',
    slug: 'architectural-high-neck-vestment',
    name: 'The Architectural High-Neck Vestment',
    amharicName: 'ከፍተኛ አንገት አርክቴክቸራል ካባ',
    category: 'ceremonial',
    categoryLabel: 'Avant-Garde & Runway',
    priceUSD: 590,
    origin: 'Addis Ababa Haute Couture Atelier',
    fabricTags: [
      'Geometric Linear Bullion Embellishment',
      'Fine 2-Ply Combed Shemma Weave',
      'Concealed Asymmetrical Horn Placket',
      'Signature Black & Crimson Trim',
    ],
    weavingHours: 85,
    artisanRegion: 'Addis Ababa Atelier Collective',
    headline: 'A bold statement in architectural collar geometry, minimalist drape, and runway silhouette.',
    description:
      'Engineered with a standing sculptural collar and an asymmetrical drape offering a sharp, modern runway-ready silhouette with exquisite tailoring.',
    details: [
      'Asymmetrical concealed closure with hand-stitched loop fasteners',
      'Breathable cotton gauze underlay for effortless comfort during editorial appearances',
      'High side slits for fluid walking movement and pocket accessibility',
      'Certified authentic couture craftsmanship signed by master tailor',
    ],
    stylingNote: 'Wear with pristine white linen trousers and artisanal leather sandals.',
    image: '/images/Screenshot_20261004_172915_Instagram.jpg',
    secondaryImages: [
      '/images/Screenshot_20261004_172924_Instagram.jpg',
      '/images/Screenshot_20261004_172939_Instagram.jpg',
    ],
    badge: 'Runway Edition',
    featured: false,
  },
];
