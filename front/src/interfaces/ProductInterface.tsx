export interface Product {
  name: string;
  type: string;
  code: string;
  description: string;
  price: number;
  id: string;
  image: string;
  bestSeller?: boolean;
}

export type AddProductPayload = Omit<Product, "id" | "image">;
export type EditProductPayload = Omit<Product, "image">;
