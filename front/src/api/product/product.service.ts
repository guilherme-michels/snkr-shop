import { api } from "..";
import { Product } from "../../interfaces/ProductInterface";

interface ProductResponse {
  product: Product;
  message: string;
}

interface ProductsResponse {
  productsList: Product[];
  message: string;
}

export function addProduct(product: Omit<Product, "id">) {
  return api
    .post<ProductResponse>("/products/store", product)
    .then((res) => res.data);
}

export function editProduct(product: Product) {
  return api
    .put(`/products/${product.id}/update`, product)
    .then((res) => res.data);
}

export function getProduct(productId: string) {
  return api
    .get<ProductResponse>(`/products/${productId}/show`)
    .then((res) => res.data);
}

export function getProducts() {
  return api.get<ProductsResponse>(`/products`).then((res) => res.data);
}

export function deleteProduct(product: Product) {
  return api
    .delete<ProductResponse>(`/products/${product.id}/delete`)
    .then((res) => res.data);
}
