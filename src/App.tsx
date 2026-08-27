import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import FactoryPage from './pages/FactoryPage'
import CertificationsPage from './pages/CertificationsPage'
import OemPage from './pages/OemPage'
import MarketsPage from './pages/MarketsPage'
import ApplicationsPage from './pages/ApplicationsPage'
import FaqPage from './pages/FaqPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductDetailPage />} />
          <Route path="factory" element={<FactoryPage />} />
          <Route path="certifications" element={<CertificationsPage />} />
          <Route path="oem" element={<OemPage />} />
          <Route path="markets" element={<MarketsPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
