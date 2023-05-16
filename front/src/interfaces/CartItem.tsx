import { Product } from "./ProductInterface";

export interface CartItem {
  quantity: number;
  productId: string;
  cartId: string;
  product: Product;
  id: string;
}
