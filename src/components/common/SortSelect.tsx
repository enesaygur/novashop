interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}
function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Default</option>
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="price-asc">Price (Low → High)</option>
        <option value="price-desc">Price (High → Low)</option>
        <option value="rating-asc">Rating (Low → High)</option>
    </select>
  );
}

export default SortSelect;
