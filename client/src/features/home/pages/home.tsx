import BottomGradient from "../../../components/bottom-gradient";
import GridPattern from "../../../components/grid-pattern";
import TopGradient from "../../../components/top-gradient";
import HomeNavbar from "../components/home-navbar";
import AboutSection from "../components/sections/about-section";
import ContactSection from "../components/sections/contact-section";
import HeroSection from "../components/sections/hero-section";
import ProductsSection from "../components/sections/products-section";
import TestimonialsSection from "../components/sections/testimonials-section";
import TrustedHospitals from "../components/sections/trusted-hospitals";
import WhyChooseAfmax from "../components/sections/why-choose-afmax";

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
