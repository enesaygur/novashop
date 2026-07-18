import api from "./api";

export async function getProduction() {
  const response = await api.get("/products");

  return response.data.products;
}
