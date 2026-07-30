import Input from "./Input/Input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}
function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Input style={{width:"450px"}}
    placeholder="Search products..."
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
