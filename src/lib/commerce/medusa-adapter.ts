/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommerceAdapter, Product, Cart, CartItem } from './types';
import { MOCK_PRODUCTS } from './mock-data';
import { medusaSdk } from './medusa-client';

export class MedusaCommerceAdapter implements CommerceAdapter {
  private publishableApiKey: string;
  private defaultRegionId: string | undefined = undefined;

  constructor() {
    this.publishableApiKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'pk_d1d4eb809e191e41c5af08410e2e8b11214cdf8876e907fe3db4ed1cbd58c5d0';
  }

  private async getRegionId(): Promise<string | undefined> {
    if (this.defaultRegionId) return this.defaultRegionId;
    try {
      const { regions } = await medusaSdk.store.region.list({ limit: 1 });
      if (regions && regions.length > 0) {
        this.defaultRegionId = regions[0].id;
        return this.defaultRegionId;
      }
    } catch {
      // Fallback if region retrieval fails
    }
    return undefined;
  }

  private mapMedusaProduct(p: any): Product {
    const firstVariant = p.variants?.[0];
    const rawPrice = firstVariant?.calculated_price?.calculated_amount ?? firstVariant?.prices?.[0]?.amount ?? 5490;
    const currency = (firstVariant?.calculated_price?.currency_code || firstVariant?.prices?.[0]?.currency_code || 'INR').toUpperCase();

    return {
      id: p.id,
      handle: p.handle,
      title: p.title,
      subtitle: p.subtitle || p.collection?.title,
      description: p.description || '',
      price: {
        amount: rawPrice,
        currencyCode: currency,
      },
      category: p.collection?.title || (p.categories?.[0]?.name) || 'Streetwear',
      tags: (p.tags || []).map((t: any) => t.value || t),
      badge: (p.metadata?.badge as string) || undefined,
      model3dUrl: (p.metadata?.model_3d_url as string) || undefined,
      images: (p.images || []).map((img: any) => ({
        url: img.url,
        altText: p.title,
      })),
      variants: (p.variants || []).map((v: any) => ({
        id: v.id,
        title: v.title,
        availableForSale: !v.inventory_quantity || v.inventory_quantity > 0,
        price: {
          amount: v.calculated_price?.calculated_amount ?? v.prices?.[0]?.amount ?? rawPrice,
          currencyCode: currency,
        },
        selectedOptions: (v.options || []).map((opt: any) => ({
          name: opt.title || 'Option',
          value: opt.value || '',
        })),
      })),
      colors: p.metadata?.colors as string[] | undefined,
      sizes: p.metadata?.sizes as string[] | undefined,
    };
  }

  private mapMedusaCart(cart: any): Cart {
    const currencyCode = (cart.currency_code || 'INR').toUpperCase();
    const items: CartItem[] = (cart.items || []).map((item: any) => {
      const unitPrice = item.unit_price ?? item.unit_total ?? item.price ?? 0;
      return {
        id: item.id,
        productId: item.product_id || item.variant?.product_id || '',
        variantId: item.variant_id || item.variant?.id || '',
        title: item.title || item.product_title || 'Item',
        variantTitle: item.variant_title || item.variant?.title || 'Standard',
        quantity: item.quantity,
        price: {
          amount: unitPrice,
          currencyCode,
        },
        image: item.thumbnail || item.variant?.product?.thumbnail,
        size: item.metadata?.size || item.variant?.title,
        color: item.metadata?.color,
      };
    });

    const subtotalAmount = cart.subtotal ?? cart.item_subtotal ?? items.reduce((sum, it) => sum + it.price.amount * it.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      id: cart.id,
      items,
      subtotal: {
        amount: subtotalAmount,
        currencyCode,
      },
      itemCount,
      checkoutUrl: '/checkout',
    };
  }

  async getProducts(options?: { limit?: number; collection?: string }): Promise<Product[]> {
    if (!this.publishableApiKey) {
      return MOCK_PRODUCTS.slice(0, options?.limit || 12);
    }

    try {
      const region_id = await this.getRegionId();
      const queryParams: any = {
        limit: options?.limit || 20,
      };

      if (region_id) {
        queryParams.region_id = region_id;
        queryParams.fields = '*variants,*variants.calculated_price,*images,*categories,*collection';
      } else {
        queryParams.fields = '*variants,*images,*categories,*collection';
      }

      const response = await medusaSdk.store.product.list(queryParams);

      if (!response?.products || response.products.length === 0) {
        return MOCK_PRODUCTS.slice(0, options?.limit || 12);
      }

      return response.products.map((p: any) => this.mapMedusaProduct(p));
    } catch {
      return MOCK_PRODUCTS.slice(0, options?.limit || 12);
    }
  }

  async getProductByHandle(handle: string): Promise<Product | null> {
    if (!this.publishableApiKey) {
      const products = await this.getProducts();
      return products.find((p) => p.handle === handle) || null;
    }

    try {
      const region_id = await this.getRegionId();
      const queryParams: any = {
        handle,
      };

      if (region_id) {
        queryParams.region_id = region_id;
        queryParams.fields = '*variants,*variants.calculated_price,*images,*categories,*collection';
      } else {
        queryParams.fields = '*variants,*images,*categories,*collection';
      }

      const response = await medusaSdk.store.product.list(queryParams);

      if (response?.products && response.products.length > 0) {
        return this.mapMedusaProduct(response.products[0]);
      }

      return null;
    } catch {
      const products = await this.getProducts();
      return products.find((p) => p.handle === handle) || null;
    }
  }

  async createCart(): Promise<Cart> {
    try {
      if (this.publishableApiKey) {
        const region_id = await this.getRegionId();
        const { cart } = await medusaSdk.store.cart.create(region_id ? { region_id } : {});
        if (cart) {
          return this.mapMedusaCart(cart);
        }
      }
    } catch {
      // Fallback to local memory cart if Medusa server is offline
    }

    return {
      id: 'medusa_cart_local_' + Math.random().toString(36).substring(7),
      items: [],
      subtotal: { amount: 0, currencyCode: 'INR' },
      itemCount: 0,
      checkoutUrl: '/checkout',
    };
  }

  async addToCart(cartId: string, item: Omit<CartItem, 'id'>): Promise<Cart> {
    try {
      if (this.publishableApiKey && cartId && !cartId.startsWith('medusa_cart_local_')) {
        const { cart } = await medusaSdk.store.cart.createLineItem(cartId, {
          variant_id: item.variantId,
          quantity: item.quantity,
          metadata: {
            size: item.size,
            color: item.color,
          },
        });
        if (cart) {
          return this.mapMedusaCart(cart);
        }
      }
    } catch {
      // Fallback
    }

    // Local fallback
    const newItem: CartItem = {
      ...item,
      id: 'medusa_item_' + Math.random().toString(36).substring(7),
    };
    return {
      id: cartId || 'medusa_cart_local_' + Math.random().toString(36).substring(7),
      items: [newItem],
      subtotal: {
        amount: item.price.amount * item.quantity,
        currencyCode: item.price.currencyCode,
      },
      itemCount: item.quantity,
      checkoutUrl: '/checkout',
    };
  }

  async removeFromCart(cartId: string, lineItemId: string): Promise<Cart> {
    try {
      if (this.publishableApiKey && cartId && !cartId.startsWith('medusa_cart_local_')) {
        const response = await medusaSdk.store.cart.deleteLineItem(cartId, lineItemId);
        const parentCart = (response as any)?.parent || response;
        if (parentCart) {
          return this.mapMedusaCart(parentCart);
        }
      }
    } catch {
      // Fallback
    }

    return this.createCart();
  }

  async updateCartItemQuantity(cartId: string, lineItemId: string, quantity: number): Promise<Cart> {
    try {
      if (this.publishableApiKey && cartId && !cartId.startsWith('medusa_cart_local_')) {
        const { cart } = await medusaSdk.store.cart.updateLineItem(cartId, lineItemId, {
          quantity,
        });
        if (cart) {
          return this.mapMedusaCart(cart);
        }
      }
    } catch {
      // Fallback
    }

    return this.createCart();
  }
}
