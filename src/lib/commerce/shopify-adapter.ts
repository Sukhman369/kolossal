import { CommerceAdapter, Product, Cart, CartItem } from './types';
import { MOCK_PRODUCTS } from './mock-data';

export class ShopifyCommerceAdapter implements CommerceAdapter {
  private endpoint: string;
  private storefrontAccessToken: string;

  constructor() {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
    this.endpoint = `https://${domain}/api/2024-01/graphql.json`;
    this.storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
  }

  private async query(graphqlQuery: string, variables = {}) {
    if (!this.storefrontAccessToken) {
      // Fallback gracefully to mock if credentials not configured yet
      return null;
    }

    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': this.storefrontAccessToken,
      },
      body: JSON.stringify({ query: graphqlQuery, variables }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Shopify API error: ${res.statusText}`);
    }

    const json = await res.json();
    if (json.errors) {
      throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
    }
    return json.data;
  }

  async getProducts(options?: { limit?: number }): Promise<Product[]> {
    if (!this.storefrontAccessToken) {
      return MOCK_PRODUCTS.slice(0, options?.limit || 10);
    }

    const query = `
      query GetProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              handle
              title
              description
              tags
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const data = await this.query(query, { first: options?.limit || 20 });
      if (!data?.products?.edges) return MOCK_PRODUCTS;

      return data.products.edges.map(({ node }: any): Product => ({
        id: node.id,
        handle: node.handle,
        title: node.title,
        description: node.description,
        price: {
          amount: parseFloat(node.priceRange.minVariantPrice.amount),
          currencyCode: node.priceRange.minVariantPrice.currencyCode,
        },
        category: 'Apparel',
        tags: node.tags || [],
        images: node.images.edges.map(({ node: img }: any) => ({
          url: img.url,
          altText: img.altText || node.title,
        })),
        variants: node.variants.edges.map(({ node: v }: any) => ({
          id: v.id,
          title: v.title,
          availableForSale: v.availableForSale,
          price: {
            amount: parseFloat(v.price.amount),
            currencyCode: v.price.currencyCode,
          },
          selectedOptions: [],
        })),
      }));
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
      id: 'shopify_cart_temp',
      items: [],
      subtotal: { amount: 0, currencyCode: 'USD' },
      itemCount: 0,
      checkoutUrl: 'https://checkout.shopify.com',
    };
  }

  async addToCart(_cartId: string, item: Omit<CartItem, 'id'>): Promise<Cart> {
    return {
      id: 'shopify_cart_temp',
      items: [{ ...item, id: 'temp_line_item' }],
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
