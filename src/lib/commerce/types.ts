export interface Money {
  amount: number;
  currencyCode: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  sku?: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice?: Money;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface ProductImage {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  subtitle?: string;
  description: string;
  price: Money;
  compareAtPrice?: Money;
  tags: string[];
  category: string;
  images: ProductImage[];
  variants: ProductVariant[];
  model3dUrl?: string; // Optional 3D asset URL (.glb)
  badge?: string; // e.g., "DROP 001", "450 GSM", "LIMITED"
  colors?: string[];
  sizes?: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  quantity: number;
  price: Money;
  image?: string;
  size?: string;
  color?: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: Money;
  itemCount: number;
  checkoutUrl?: string;
}

export interface CommerceAdapter {
  getProducts(options?: { limit?: number; collection?: string }): Promise<Product[]>;
  getProductByHandle(handle: string): Promise<Product | null>;
  createCart(): Promise<Cart>;
  addToCart(cartId: string, item: Omit<CartItem, 'id'>): Promise<Cart>;
  removeFromCart(cartId: string, lineItemId: string): Promise<Cart>;
  updateCartItemQuantity(cartId: string, lineItemId: string, quantity: number): Promise<Cart>;
}
