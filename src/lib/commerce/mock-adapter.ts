import { CommerceAdapter, Product, Cart, CartItem } from './types';
import { MOCK_PRODUCTS } from './mock-data';

let memoryCart: Cart = {
  id: 'cart_mock_default',
  items: [],
  subtotal: { amount: 0, currencyCode: 'USD' },
  itemCount: 0,
  checkoutUrl: 'https://checkout.kolossal.com/mock-session'
};

function recalculateCart(cart: Cart): Cart {
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalAmount = cart.items.reduce((sum, item) => sum + item.price.amount * item.quantity, 0);
  return {
    ...cart,
    itemCount,
    subtotal: {
      amount: subtotalAmount,
      currencyCode: cart.items[0]?.price.currencyCode || 'USD'
    }
  };
}

export class MockCommerceAdapter implements CommerceAdapter {
  async getProducts(options?: { limit?: number; category?: string }): Promise<Product[]> {
    let products = [...MOCK_PRODUCTS];
    if (options?.category) {
      products = products.filter(p => p.category.toLowerCase() === options.category?.toLowerCase());
    }
    if (options?.limit) {
      products = products.slice(0, options.limit);
    }
    return products;
  }

  async getProductByHandle(handle: string): Promise<Product | null> {
    const product = MOCK_PRODUCTS.find(p => p.handle === handle);
    return product || null;
  }

  async createCart(): Promise<Cart> {
    return memoryCart;
  }

  async addToCart(_cartId: string, item: Omit<CartItem, 'id'>): Promise<Cart> {
    const existingIndex = memoryCart.items.findIndex(
      i => i.variantId === item.variantId
    );

    if (existingIndex > -1) {
      memoryCart.items[existingIndex].quantity += item.quantity;
    } else {
      memoryCart.items.push({
        ...item,
        id: `item_${Date.now()}_${Math.random().toString(36).substring(7)}`
      });
    }

    memoryCart = recalculateCart(memoryCart);
    return memoryCart;
  }

  async removeFromCart(_cartId: string, lineItemId: string): Promise<Cart> {
    memoryCart.items = memoryCart.items.filter(item => item.id !== lineItemId);
    memoryCart = recalculateCart(memoryCart);
    return memoryCart;
  }

  async updateCartItemQuantity(_cartId: string, lineItemId: string, quantity: number): Promise<Cart> {
    if (quantity <= 0) {
      return this.removeFromCart(_cartId, lineItemId);
    }
    const item = memoryCart.items.find(i => i.id === lineItemId);
    if (item) {
      item.quantity = quantity;
    }
    memoryCart = recalculateCart(memoryCart);
    return memoryCart;
  }
}
