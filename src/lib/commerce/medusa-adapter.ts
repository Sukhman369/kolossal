import { CommerceAdapter, Product, Cart, CartItem } from './types';
import { MOCK_PRODUCTS } from './mock-data';

export class MedusaCommerceAdapter implements CommerceAdapter {
  private baseUrl: string;
  private publishableApiKey: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
    this.publishableApiKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '';
  }

  private async fetchStore(endpoint: string, options: RequestInit = {}) {
    if (!this.publishableApiKey) {
      return null;
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-publishable-api-key': this.publishableApiKey,
    };

    const res = await fetch(`${this.baseUrl}/store${endpoint}`, {
      ...options,
      headers: { ...headers, ...(options.headers as Record<string, string>) },
    });

    if (!res.ok) {
      throw new Error(`Medusa API error: ${res.statusText}`);
    }

    return res.json();
  }

  async getProducts(options?: { limit?: number }): Promise<Product[]> {
    if (!this.publishableApiKey) {
      return MOCK_PRODUCTS.slice(0, options?.limit || 10);
    }

    try {
      const data = await this.fetchStore(`/products?limit=${options?.limit || 20}`);
      if (!data?.products) return MOCK_PRODUCTS;

      return data.products.map((p: any): Product => {
        const firstVariant = p.variants?.[0];
        const rawPrice = firstVariant?.calculated_price?.calculated_amount || 150;
        const currency = firstVariant?.calculated_price?.currency_code?.toUpperCase() || 'USD';

        return {
          id: p.id,
          handle: p.handle,
          title: p.title,
          subtitle: p.subtitle,
          description: p.description || '',
          price: {
            amount: rawPrice,
            currencyCode: currency,
          },
          category: p.collection?.title || 'Collection',
          tags: (p.tags || []).map((t: any) => t.value),
          badge: p.metadata?.badge as string | undefined,
          model3dUrl: p.metadata?.model_3d_url as string | undefined,
          images: (p.images || []).map((img: any) => ({
            url: img.url,
            altText: p.title,
          })),
          variants: (p.variants || []).map((v: any) => ({
            id: v.id,
            title: v.title,
            availableForSale: !v.inventory_quantity || v.inventory_quantity > 0,
            price: {
              amount: v.calculated_price?.calculated_amount || rawPrice,
              currencyCode: currency,
            },
            selectedOptions: (v.options || []).map((opt: any) => ({
              name: opt.title || 'Option',
              value: opt.value || '',
            })),
          })),
        };
      });
    } catch {
      return MOCK_PRODUCTS;
    }
  }

  async getProductByHandle(handle: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find(p => p.handle === handle) || null;
  }

  async createCart(): Promise<Cart> {
    return {
      id: 'medusa_cart_temp',
      items: [],
      subtotal: { amount: 0, currencyCode: 'USD' },
      itemCount: 0,
      checkoutUrl: `${this.baseUrl}/checkout`,
    };
  }

  async addToCart(_cartId: string, item: Omit<CartItem, 'id'>): Promise<Cart> {
    return {
      id: 'medusa_cart_temp',
      items: [{ ...item, id: 'medusa_temp_item' }],
      subtotal: { amount: item.price.amount * item.quantity, currencyCode: item.price.currencyCode },
      itemCount: item.quantity,
    };
  }

  async removeFromCart(_cartId: string, _lineItemId: string): Promise<Cart> {
    return this.createCart();
  }

  async updateCartItemQuantity(_cartId: string, _lineItemId: string, _quantity: number): Promise<Cart> {
    return this.createCart();
  }
}
