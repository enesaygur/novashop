import { Link } from "react-router";
import Button from "../common/Button/Button";

import styles from "./CTASection.module.css";

function CTASection() {
  return (
    <section className={styles.cta}>
      <h2>Ready to start shopping?</h2>

      <p>Browse our collection and find your next favorite product.</p>

      <Link to="/products">
        <Button>Shop Now</Button>
      </Link>
    </section>
  );
}

export default CTASection;