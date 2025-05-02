import BottomGradient from "../../components/bottom-gradient";
import GridPattern from "../../components/grid-pattern";
import TopGradient from "../../components/top-gradient";
import HomeNavbar from "./components/home-navbar";
import AboutSection from "./sections/about-section";
import ContactSection from "./sections/contact-section";
import HeroSection from "./sections/hero-section";
import ProductsSection from "./sections/products-section";
import TestimonialsSection from "./sections/testimonials-section";
import TrustedHospitals from "./sections/trusted-hospitals";
import WhyChooseAfmax from "./sections/why-choose-afmax";

function Home() {
  return (
    <div>
      <GridPattern />
      <TopGradient />
      <BottomGradient />

      <HomeNavbar />

      <main>
        <HeroSection />
        <TrustedHospitals />
        <WhyChooseAfmax />
        <AboutSection />
        <ProductsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default Home;
