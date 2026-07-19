import type { Product } from "../types/Product";

type UseFilterProductsProps = {
  products: Product[];
  search: string;
  category: string;
  sort: string;
};
export function useFilteredProducts({
  products,
  search,
  category,
  sort,
}: UseFilterProductsProps) {
  const filteredProducts = products?.filter((product: Product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "name-asc":
        return a.title.localeCompare(b.title);

      case "name-desc":
        return b.title.localeCompare(a.title);

      case "price-asc":
        return a.price - b.price;

      case "price-desc":
        return b.price - a.price;

      case "rating-asc":
        return a.rating - b.rating;

      default:
        return 0;
    }
  });
}
