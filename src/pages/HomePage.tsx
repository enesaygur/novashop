import styles from "./HomePage.module.css";
function HomePage() {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <h1>Welcome to Novashop</h1>
        <p>Discover the best products at the best prices</p>
      </section>

      <section className={styles.featured}>
        <h2>Featured Products</h2>
      </section>

      <section className={styles.categories}>
        <h2>Categories</h2>
      </section>

      <section className={styles.newsletter}>
        <h2>Newsletter</h2>
      </section>
    </main>
  );
}
export default HomePage;
