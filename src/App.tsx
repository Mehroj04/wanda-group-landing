import Header from './components/Header'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import AccessoriesBanner from './components/AccessoriesBanner'
import Products from './components/Products'
import Accessories from './components/Accessories'
import VisualStory from './components/VisualStory'
import ProductDetails from './components/ProductDetails'
import Services from './components/Services'
import Pricing from './components/Pricing'
import Specs from './components/Specs'
import Applications from './components/Applications'
import WhyUs from './components/WhyUs'
import About from './components/About'
import Certifications from './components/Certifications'
import Gallery from './components/Gallery'
import QualityControl from './components/QualityControl'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Articles from './components/Articles'
import Contact from './components/Contact'
import Privacy from './components/Privacy'
import Footer from './components/Footer'
import StickyCTA from './components/StickyCTA'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <AccessoriesBanner />
        <Products />
        <Accessories />
        <VisualStory />
        <ProductDetails />
        <Services />
        <Pricing />
        <Specs />
        <Applications />
        <WhyUs />
        <About />
        <Gallery />
        <QualityControl />
        <Certifications />
        <Testimonials />
        <FAQ />
        <Articles />
        <Contact />
        <Privacy />
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
