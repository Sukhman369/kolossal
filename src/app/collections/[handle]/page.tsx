import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { commerce, Product } from '../../../lib/commerce';
import ProductCard from '../../../components/products/ProductCard';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

const COLLECTION_INFO: Record<string, { title: string; subtitle: string; description: string }> = {
  all: {
    title: 'All Styles',
    subtitle: 'Drop 001 Complete Archive',
    description: 'The full architectural collection: heavyweight hoodies, tailored outerwear, pleated trousers, and sterling silver.',
  },
  outerwear: {
    title: 'Outerwear',
    subtitle: 'High-Volume Down & Technical Wool',
    description: 'Engineered for sub-zero climates with Japanese waterproof ripstop and 90/10 goose down insulation.',
  },
  hoodies: {
    title: 'Heavyweight Hoodies',
    subtitle: '500 GSM French Terry Architecture',
    description: 'Custom milled double-faced organic cotton with structural non-collapsing boxy drape and drop shoulders.',
  },
  pants: {
    title: 'Tailored Pants',
    subtitle: 'Origami Cargo & Gabardine Pleats',
    description: 'Double-pleated waistbands with 3D articulated bellows and adjustable bungee conversion cuffs.',
  },
  tees: {
    title: 'Sculpted Tees',
    subtitle: '300 GSM Combed Ring-Spun Cotton',
    description: 'High-density ribbed collars and reinforced boxy drape that maintains architectural form.',
  },
  accessories: {
    title: 'Hardware & Jewelry',
    subtitle: 'Solid 925 Sterling Silver',
    description: 'Industrial curb chains and oxidized monogram signet rings hand-finished in Milan.',
  },
};

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const info = COLLECTION_INFO[handle.toLowerCase()];

  if (!info) {
    return {
      title: 'Collection Not Found | KOLOSSAL',
    };
  }

  return {
    title: `${info.title} | KOLOSSAL`,
    description: info.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const cleanHandle = handle.toLowerCase();
  const info = COLLECTION_INFO[cleanHandle];

  if (!info) {
    notFound();
  }

  const allProducts = await commerce.getProducts();
  
  let products: Product[];
  if (cleanHandle === 'all') {
    products = allProducts;
  } else if (cleanHandle === 'outerwear') {
    products = allProducts.filter(p => p.category.toLowerCase() === 'outerwear');
  } else if (cleanHandle === 'hoodies') {
    products = allProducts.filter(p => p.category.toLowerCase() === 'hoodies');
  } else if (cleanHandle === 'pants') {
    products = allProducts.filter(p => p.category.toLowerCase() === 'pants');
  } else if (cleanHandle === 'tees') {
    products = allProducts.filter(p => p.category.toLowerCase() === 'tees');
  } else if (cleanHandle === 'accessories') {
    products = allProducts.filter(p => p.category.toLowerCase() === 'accessories');
  } else {
    products = allProducts.filter(p => p.category.toLowerCase() === cleanHandle);
  }

  return (
    <div className="pt-28 pb-24 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-neutral-300">{info.title}</span>
      </nav>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-10 mb-12 gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500">
            {info.subtitle}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
            {info.title}
          </h1>
          <p className="text-xs sm:text-sm font-light text-neutral-400 max-w-xl leading-relaxed">
            {info.description}
          </p>
        </div>

        {/* Total styles count and filter indicator */}
        <div className="flex items-center space-x-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{products.length} {products.length === 1 ? 'Style' : 'Styles'} Available</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="py-24 text-center space-y-4">
          <p className="text-sm font-mono uppercase tracking-widest text-neutral-500">
            No styles currently available in this category
          </p>
          <Link
            href="/collections"
            className="inline-block px-6 py-3 border border-white/20 text-xs font-mono uppercase tracking-widest text-white rounded-full hover:bg-white/10"
          >
            Explore Other Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
