import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/api/products";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
