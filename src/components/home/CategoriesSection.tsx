import { Link } from "react-router";
import Card from "../common/Card/Card";
import Loader from "../common/Loader";
import { useCategories } from "../../hooks/useCategories";

import styles from "./CategoriesSection.module.css";

function CategoriesSection() {
  const { data: categories = [], isPending } = useCategories();

  if (isPending) return <Loader />;

  return (
    <section className={styles.section}>
      <h2>Shop by Category</h2>

      <div className={styles.grid}>
        {categories.slice(0, 6).map((category:any) => (
          <Link
            key={category.slug}
            to={`/products?category=${category}`}
            className={styles.link}
          >
            <Card className={styles.card}>
              <h3>{category.name}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;
