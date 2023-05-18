import { api } from "..";
import { AddProductPayload, Product } from "../../interfaces/ProductInterface";

export async function addProduct(payload: AddProductPayload, imageFile: File) {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("type", payload.type);
  formData.append("code", payload.code);
  formData.append("price", String(payload.price));
  formData.append("imageFile", imageFile);
  console.log("formdata", Array.from(formData.entries()));
  return api
    .post("/products/store", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
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
  return api.get(`/products`).then((res) => res.data);
}

export function deleteProduct(productId: String) {
  return api.delete(`/products/${productId}/delete`).then((res) => res.data);
}
