/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
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
      return null;
    }

    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': this.storefrontAccessToken,
      },
      body: JSON.stringify({ query: graphqlQuery, variables }),
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      throw new Error(`Shopify API error: ${res.statusText}`);
    }

    const json = await res.json();
    if (json.errors) {
      console.warn('Shopify GraphQL response notices:', json.errors);
    }
    return json.data;
  }

  private formatCart(shopifyCart: any): Cart {
    if (!shopifyCart) {
      return {
        id: 'cart_local',
        items: [],
        subtotal: { amount: 0, currencyCode: 'INR' },
        itemCount: 0,
      };
    }

    const items: CartItem[] = (shopifyCart.lines?.edges || []).map(({ node }: any) => {
      const merchandise = node.merchandise || {};
      const product = merchandise.product || {};
      return {
        id: node.id,
        productId: product.id || '',
        variantId: merchandise.id || '',
        title: product.title || 'Product',
        variantTitle: merchandise.title === 'Default Title' ? '' : merchandise.title || '',
        quantity: node.quantity,
        price: {
          amount: parseFloat(merchandise.price?.amount || '0'),
          currencyCode: merchandise.price?.currencyCode || 'INR',
        },
        image: merchandise.image?.url || '',
      };
    });

    const subtotalAmount = parseFloat(
      shopifyCart.cost?.subtotalAmount?.amount ||
      shopifyCart.cost?.totalAmount?.amount ||
      '0'
    );
    const currencyCode = shopifyCart.cost?.totalAmount?.currencyCode || 'INR';

    return {
      id: shopifyCart.id,
      items,
      subtotal: { amount: subtotalAmount, currencyCode },
      itemCount: shopifyCart.totalQuantity ?? items.reduce((acc, i) => acc + i.quantity, 0),
      checkoutUrl: shopifyCart.checkoutUrl,
    };
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
      if (!data?.products?.edges || data.products.edges.length === 0) {
        return MOCK_PRODUCTS;
      }

      return data.products.edges.map(({ node }: any): Product => ({
        id: node.id,
        handle: node.handle,
        title: node.title,
        description: node.description,
        price: {
          amount: parseFloat(node.priceRange?.minVariantPrice?.amount || '0'),
          currencyCode: node.priceRange?.minVariantPrice?.currencyCode || 'INR',
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
            amount: parseFloat(v.price?.amount || '0'),
            currencyCode: v.price?.currencyCode || 'INR',
          },
          selectedOptions: [],
        })),
      }));
    } catch (err) {
      console.warn('Failed to load Shopify products, falling back to mock catalog:', err);
      return MOCK_PRODUCTS;
    }
  }

  async getProductByHandle(handle: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find(p => p.handle === handle) || null;
  }

  async createCart(): Promise<Cart> {
    const mutation = `
      mutation CartCreate {
        cartCreate {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    try {
      const data = await this.query(mutation);
      if (data?.cartCreate?.cart) {
        return this.formatCart(data.cartCreate.cart);
      }
    } catch (err) {
      console.warn('Shopify cartCreate error:', err);
    }

    return {
      id: 'cart_local',
      items: [],
      subtotal: { amount: 0, currencyCode: 'INR' },
      itemCount: 0,
    };
  }

  async addToCart(cartId: string, item: Omit<CartItem, 'id'>): Promise<Cart> {
    const isShopifyCart = cartId && cartId.startsWith('gid://shopify/Cart/');
    const isShopifyVariant = item.variantId && item.variantId.startsWith('gid://shopify/ProductVariant/');

    if (isShopifyVariant) {
      if (!isShopifyCart) {
        const createMutation = `
          mutation CartCreate($lines: [CartLineInput!]) {
            cartCreate(input: { lines: $lines }) {
              cart {
                id
                checkoutUrl
                totalQuantity
                cost {
                  totalAmount { amount currencyCode }
                  subtotalAmount { amount currencyCode }
                }
                lines(first: 50) {
                  edges {
                    node {
                      id
                      quantity
                      cost { totalAmount { amount currencyCode } }
                      merchandise {
                        ... on ProductVariant {
                          id
                          title
                          price { amount currencyCode }
                          image { url }
                          product { id title handle }
                        }
                      }
                    }
                  }
                }
              }
              userErrors { field message }
            }
          }
        `;
        try {
          const data = await this.query(createMutation, {
            lines: [{ merchandiseId: item.variantId, quantity: item.quantity }],
          });
          if (data?.cartCreate?.cart) {
            return this.formatCart(data.cartCreate.cart);
          }
        } catch (e) {
          console.warn('Shopify addToCart/cartCreate error:', e);
        }
      } else {
        const addMutation = `
          mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
              cart {
                id
                checkoutUrl
                totalQuantity
                cost {
                  totalAmount { amount currencyCode }
                  subtotalAmount { amount currencyCode }
                }
                lines(first: 50) {
                  edges {
                    node {
                      id
                      quantity
                      cost { totalAmount { amount currencyCode } }
                      merchandise {
                        ... on ProductVariant {
                          id
                          title
                          price { amount currencyCode }
                          image { url }
                          product { id title handle }
                        }
                      }
                    }
                  }
                }
              }
              userErrors { field message }
            }
          }
        `;
        try {
          const data = await this.query(addMutation, {
            cartId,
            lines: [{ merchandiseId: item.variantId, quantity: item.quantity }],
          });
          if (data?.cartLinesAdd?.cart) {
            return this.formatCart(data.cartLinesAdd.cart);
          }
        } catch (e) {
          console.warn('Shopify cartLinesAdd error:', e);
        }
      }
    }

    // Graceful fallback if variant is mock or if Shopify inventory is locked in demo store
    return {
      id: cartId || 'cart_local',
      items: [{ ...item, id: `line_${Date.now()}` }],
      subtotal: { amount: item.price.amount * item.quantity, currencyCode: item.price.currencyCode || 'INR' },
      itemCount: item.quantity,
    };
  }

  async removeFromCart(cartId: string, lineItemId: string): Promise<Cart> {
    if (cartId?.startsWith('gid://shopify/Cart/') && lineItemId?.startsWith('gid://shopify/CartLine/')) {
      const removeMutation = `
        mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
              id
              checkoutUrl
              totalQuantity
              cost {
                totalAmount { amount currencyCode }
                subtotalAmount { amount currencyCode }
              }
              lines(first: 50) {
                edges {
                  node {
                    id
                    quantity
                    cost { totalAmount { amount currencyCode } }
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        price { amount currencyCode }
                        image { url }
                        product { id title handle }
                      }
                    }
                  }
                }
              }
            }
            userErrors { field message }
          }
        }
      `;
      try {
        const data = await this.query(removeMutation, { cartId, lineIds: [lineItemId] });
        if (data?.cartLinesRemove?.cart) {
          return this.formatCart(data.cartLinesRemove.cart);
        }
      } catch (e) {
        console.warn('Shopify cartLinesRemove error:', e);
      }
    }

    return this.createCart();
  }

  async updateCartItemQuantity(cartId: string, lineItemId: string, quantity: number): Promise<Cart> {
    if (quantity <= 0) {
      return this.removeFromCart(cartId, lineItemId);
    }

    if (cartId?.startsWith('gid://shopify/Cart/') && lineItemId?.startsWith('gid://shopify/CartLine/')) {
      const updateMutation = `
        mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
              id
              checkoutUrl
              totalQuantity
              cost {
                totalAmount { amount currencyCode }
                subtotalAmount { amount currencyCode }
              }
              lines(first: 50) {
                edges {
                  node {
                    id
                    quantity
                    cost { totalAmount { amount currencyCode } }
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        price { amount currencyCode }
                        image { url }
                        product { id title handle }
                      }
                    }
                  }
                }
              }
            }
            userErrors { field message }
          }
        }
      `;
      try {
        const data = await this.query(updateMutation, {
          cartId,
          lines: [{ id: lineItemId, quantity }],
        });
        if (data?.cartLinesUpdate?.cart) {
          return this.formatCart(data.cartLinesUpdate.cart);
        }
      } catch (e) {
        console.warn('Shopify cartLinesUpdate error:', e);
      }
    }

    return this.createCart();
  }
}
