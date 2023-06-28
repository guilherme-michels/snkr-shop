import { Person } from "./PersonInterface";
import { Product } from "./ProductInterface";

export interface SaleInterface {
  id: string;
  valor: number;
  data: string;
  product: Product;
  user: Person;
  size: number;
}
