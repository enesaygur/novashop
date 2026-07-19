import type { Category } from "../../types/Category";

type CategoryFilterProps = {
  categories: Category[];
  selectedCategory: string;
  onChange: (category: string) => void;
};
function CategoryFilter({
  categories,
  selectedCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <select value={selectedCategory} onChange={(e) => onChange(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category.slug} value={category.slug}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
