import type { Product } from "../../types/Product";

type ProductCardProps = {
  product: Product;
};
function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <img src={product.thumbnail} alt={product.title} width={200} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>{product.stock} in stock</p>
    </article>
  );
}

export default ProductCard;
