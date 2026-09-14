import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_01',
    handle: 'kolossal-monolith-heavyweight-hoodie',
    title: 'Monolith Heavyweight Hoodie',
    subtitle: '500 GSM Double-Faced French Terry',
    description: 'Constructed from custom-milled 500 GSM organic cotton with architectural boxy drape, dropped shoulders, seamless cuffs, and subtle debossed tonal branding at the nape.',
    price: { amount: 185, currencyCode: 'USD' },
    compareAtPrice: { amount: 220, currencyCode: 'USD' },
    badge: 'HEAVYWEIGHT 500GSM',
    category: 'Hoodies',
    tags: ['Drop 001', 'Core', 'Oversized'],
    colors: ['Obsidian Black', 'Raw Bone', 'Cement Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
        altText: 'Monolith Heavyweight Hoodie in Obsidian Black',
      },
      {
        url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop',
        altText: 'Back detail of Monolith Hoodie',
      }
    ],
    variants: [
      {
        id: 'var_01_m',
        title: 'Obsidian Black / M',
        availableForSale: true,
        price: { amount: 185, currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Color', value: 'Obsidian Black' },
          { name: 'Size', value: 'M' }
        ]
      },
      {
        id: 'var_01_l',
        title: 'Obsidian Black / L',
        availableForSale: true,
        price: { amount: 185, currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Color', value: 'Obsidian Black' },
          { name: 'Size', value: 'L' }
        ]
      }
    ]
  },
  {
    id: 'prod_02',
    handle: 'tactical-down-oversized-puffer',
    title: 'Tactical Matte Puffer Jacket',
    subtitle: '90/10 White Goose Down // Waterproof Shell',
    description: 'High-volume silhouette featuring a magnetic storm flap closure, concealed zip utility harness pockets, and matte ripstop Japanese nylon with water-repellent finish.',
    price: { amount: 395, currencyCode: 'USD' },
    badge: 'LIMITED 150 PCS',
    category: 'Outerwear',
    tags: ['Drop 001', 'Outerwear', 'Insulated'],
    colors: ['Matte Pitch', 'Steel Glaze'],
    sizes: ['S', 'M', 'L'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop',
        altText: 'Tactical Matte Puffer Jacket',
      }
    ],
    variants: [
      {
        id: 'var_02_m',
        title: 'Matte Pitch / M',
        availableForSale: true,
        price: { amount: 395, currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Color', value: 'Matte Pitch' },
          { name: 'Size', value: 'M' }
        ]
      }
    ]
  },
  {
    id: 'prod_03',
    handle: 'architectural-wide-pleated-cargo',
    title: 'Architectural Pleated Cargo Pant',
    subtitle: 'Italian Technical Gabardine',
    description: 'Double-pleated front with 3D origami cargo bellows, adjustable bungee hems for switching between wide straight-leg and stacked taper, finished with custom gunmetal hardware.',
    price: { amount: 240, currencyCode: 'USD' },
    compareAtPrice: { amount: 275, currencyCode: 'USD' },
    badge: 'NEW ARRIVAL',
    category: 'Pants',
    tags: ['Bottoms', 'Technical', 'Wide Cut'],
    colors: ['Charcoal Ash', 'Deep Olive'],
    sizes: ['30', '32', '34', '36'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop',
        altText: 'Architectural Pleated Cargo Pant',
      }
    ],
    variants: [
      {
        id: 'var_03_32',
        title: 'Charcoal Ash / 32',
        availableForSale: true,
        price: { amount: 240, currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Color', value: 'Charcoal Ash' },
          { name: 'Size', value: '32' }
        ]
      }
    ]
  },
  {
    id: 'prod_04',
    handle: 'sculpted-monogram-tee',
    title: 'Sculpted Boxy Drop-Tee',
    subtitle: '300 GSM Combed Ring-Spun Cotton',
    description: 'Extreme drop-shoulder cut engineered with reinforced high-density rib collar that retains its shape over continuous wear. Thick, structured drape without stiffness.',
    price: { amount: 95, currencyCode: 'USD' },
    badge: 'RESTOCKED',
    category: 'Tees',
    tags: ['Drop 001', 'Core', 'Essentials'],
    colors: ['Chalk White', 'Obsidian Black', 'Washed Clay'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
        altText: 'Sculpted Boxy Drop-Tee in Chalk White',
      }
    ],
    variants: [
      {
        id: 'var_04_m',
        title: 'Chalk White / M',
        availableForSale: true,
        price: { amount: 95, currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Color', value: 'Chalk White' },
          { name: 'Size', value: 'M' }
        ]
      }
    ]
  },
  {
    id: 'prod_05',
    handle: 'monolith-oversized-wool-overcoat',
    title: 'Monolith Oversized Trench Coat',
    subtitle: '100% Virgin Wool Melange',
    description: 'Floor-grazing silhouette with strong padded shoulders, concealed horn buttons, exaggerated lapels, and detachable leather utility key ring.',
    price: { amount: 580, currencyCode: 'USD' },
    badge: 'RUNWAY EDITION',
    category: 'Outerwear',
    tags: ['Outerwear', 'Streetwear', 'Runway'],
    colors: ['Obsidian Black'],
    sizes: ['48', '50', '52'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop',
        altText: 'Monolith Oversized Trench Coat',
      }
    ],
    variants: [
      {
        id: 'var_05_50',
        title: 'Obsidian Black / 50',
        availableForSale: true,
        price: { amount: 580, currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Color', value: 'Obsidian Black' },
          { name: 'Size', value: '50' }
        ]
      }
    ]
  },
  {
    id: 'prod_06',
    handle: 'kolossal-sterling-chain',
    title: 'Brutalist Monogram Signet Chain',
    subtitle: 'Solid 925 Sterling Silver // Oxidized Finish',
    description: 'Custom industrial curb links interlocked with a heavy sculptural Kolossal lock mechanism. Hand-finished in Industrial Area, Chandigarh, India with micro-hallmarking.',
    price: { amount: 290, currencyCode: 'USD' },
    badge: 'HANDCRAFTED',
    category: 'Accessories',
    tags: ['Jewelry', 'Sterling Silver', 'Accessories'],
    colors: ['Oxidized Silver'],
    sizes: ['50cm', '60cm'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
        altText: 'Brutalist Monogram Signet Chain',
      }
    ],
    variants: [
      {
        id: 'var_06_50',
        title: 'Oxidized Silver / 50cm',
        availableForSale: true,
        price: { amount: 290, currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Color', value: 'Oxidized Silver' },
          { name: 'Size', value: '50cm' }
        ]
      }
    ]
  }
];
