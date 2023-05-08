import { api } from "..";
import { Product } from "../../interfaces/ProductInterface";

export function addProduct(product: Omit<Product, "id">) {
  return api.post("/products/store", product).then((res) => res.data);
}

export function editProduct(product: Product) {
  return api
    .put(`/products/${product.id}/update`, product)
    .then((res) => res.data);
}

export function getProduct(productId: string) {
  return api.get(`/products/${productId}/show`).then((res) => res.data);
}

export function getProducts() {
  return api.get<Product[]>(`/products/all`).then((res) => res.data);
}

export function deleteProduct(productId: String) {
  return api.delete(`/products/${productId}/delete`).then((res) => res.data);
}
