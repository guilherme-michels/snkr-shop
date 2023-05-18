export interface Product {
  name: string;
  type: string;
  code: string;
  price: number;
  id: string;
  image: string;
}

export type AddProductPayload = Omit<Product, "id" | "image">;
