import api from "./api";

export async function getProducts() {
  const response = await api.get("/products");

  return response.data.products;
}

export async function getProduct(id: number) {
  const response = await api.get(`/products/${id}`);

  return response.data;
}
