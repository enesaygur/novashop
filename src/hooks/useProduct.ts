import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/api/products";

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
}
