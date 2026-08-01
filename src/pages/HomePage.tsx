import CategoriesSection from "../components/home/CategoriesSection";
import CTASection from "../components/home/CTASection";
import FeaturesSection from "../components/home/FeaturesSection";
import HeroSection from "../components/home/HeroSection";
import styles from "./HomePage.module.css";
function HomePage() {
  return (
     <main className={styles.home}>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <CTASection />
    </main>
  );
}
export default HomePage;
