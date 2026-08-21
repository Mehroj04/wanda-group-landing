import Header from './components/Header'
import Hero from './components/Hero'
import AccessoriesBanner from './components/AccessoriesBanner'
import Products from './components/Products'
import Specs from './components/Specs'
import Applications from './components/Applications'
import WhyUs from './components/WhyUs'
import About from './components/About'
import Gallery from './components/Gallery'
import QualityControl from './components/QualityControl'
import FAQ from './components/FAQ'
import Articles from './components/Articles'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AccessoriesBanner />
        <Products />
        <Specs />
        <Applications />
        <WhyUs />
        <About />
        <Gallery />
        <QualityControl />
        <FAQ />
        <Articles />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
