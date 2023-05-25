import { api } from "..";
import { CartItem } from "../../interfaces/CartItem";
import {
  AddProductPayload,
  EditProductPayload,
  Product,
} from "../../interfaces/ProductInterface";

export async function addProduct(payload: AddProductPayload, imageFile: File) {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("type", payload.type);
  formData.append("code", payload.code);
  formData.append("description", payload.description);
  formData.append("price", String(payload.price));
  formData.append("imageFile", imageFile);
  return api
    .post("/products/store", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}

export async function editProduct(
  payload: EditProductPayload,
  imageFile?: File | null
) {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("type", payload.type);
  formData.append("code", payload.code);
  formData.append("description", payload.description);
  formData.append("price", String(payload.price));

  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return api
    .put(`/products/${payload.id}/update`, formData, config)
    .then((res) => res.data);
}

export function getProduct(productId: string) {
  return api.get(`/products/${productId}/show`).then((res) => res.data);
}

export function getProducts() {
  return api.get(`/products`).then((res) => res.data);
}

export function deleteProduct(productId: string) {
  return api.delete(`/products/${productId}/delete`).then((res) => res.data);
}

export function addSizes(productId: string, size: number) {
  return api.post(`/shoe-sizes`, { productId, size }).then((res) => res.data);
}

export function removeSizes(productId: string, size: number) {
  return api.delete(`/shoe-sizes/${productId}/${size}`).then((res) => res.data);
}

export function getProductSizes(productId: string) {
  return api.get(`/shoe-sizes/${productId}`).then((res) => res.data);
}

export function getBestSeller() {
  return api.get(`/products/best-sellers`).then((res) => res.data);
}

export function setBestSeller(productId: string) {
  return api
    .put(`/products/${productId}/set-best-seller`)
    .then((res) => res.data);
}

export function unSetBestSeller(productId: string) {
  return api
    .put(`/products/${productId}/unset-best-seller`)
    .then((res) => res.data);
}

export function getImage(image: string): Promise<Blob> {
  return api
    .get(`/file/${image}`, {
      responseType: "blob",
    })
    .then((res) => res.data);
}

export function addSales(products: CartItem[]) {
  return api.post("/person/finish-buy", { products }).then((res) => res.data);
}

export function getWeekSales() {
  return api.get("/sales/week-sales").then((res) => res.data);
}

export function getMonthSales() {
  return api.get("/sales/week-sales").then((res) => res.data);
}
