import Card from "../common/Card/Card";
import styles from "./FeaturesSection.module.css";

const FEATURES = [
  {
    title: "Fast Delivery",
    description: "Quick shipping to your doorstep.",
    icon: "🚚",
  },
  {
    title: "Secure Payment",
    description: "Safe and encrypted checkout.",
    icon: "🔒",
  },
  {
    title: "Quality Products",
    description: "Only trusted brands and products.",
    icon: "⭐",
  },
];

function FeaturesSection() {
  return (
    <section className={styles.section}>
      <h2>Why Choose NovaShop?</h2>

      <div className={styles.grid}>
        {FEATURES.map((feature) => (
          <Card key={feature.title} className={styles.card}>
            <span>{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;