import { Link } from "react-router";
import Button from "../common/Button/Button";
import styles from "./HeroSection.module.css";

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.badge}>New Collection</span>

        <h1>Modern Shopping Experience</h1>

        <p>
          Discover quality products, fast delivery and secure shopping all in
          one place.
        </p>

        <Link to="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>

      <div className={styles.image}>
        <img
          src="https://dummyjson.com/image/600x500/eeeeee/000000?text=NovaShop"
          alt="NovaShop"
        />
      </div>
    </section>
  );
}

export default HeroSection;