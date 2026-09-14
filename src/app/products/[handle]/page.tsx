import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { commerce } from '../../../lib/commerce';
import ProductDetailView from '../../../components/products/ProductDetailView';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await commerce.getProductByHandle(handle);

  if (!product) {
    return {
      title: 'Product Not Found | KOLOSSAL',
    };
  }

  return {
    title: `${product.title} | KOLOSSAL`,
    description: product.description,
    openGraph: {
      title: `${product.title} | KOLOSSAL`,
      description: product.description,
      images: product.images[0]?.url ? [{ url: product.images[0].url }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await commerce.getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const allProducts = await commerce.getProducts({ limit: 6 });
  const relatedProducts = allProducts.filter((p) => p.id !== product.id);

  return (
    <div className="w-full bg-[#080808] min-h-screen">
      <ProductDetailView
        product={product}
        relatedProducts={relatedProducts}
      />
    </div>
  );
}
