import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { CatalogProvider } from './context/CatalogContext'
import Navbar from './components/Navbar'
import SeoHead from './components/SeoHead'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import BackToTop from './components/BackToTop'
import CartDrawer from './components/CartDrawer'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import CategoryOrService from './pages/CategoryOrService'
import CheckoutPage from './pages/CheckoutPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import PurchasePolicyPage from './pages/PurchasePolicyPage'
import AdminPage from './pages/AdminPage'
import AdminCategoriesPage from './pages/AdminCategoriesPage'
import AdminProductsPage from './pages/AdminProductsPage'

function App() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <CartProvider>
      <CatalogProvider>
        <BrowserRouter>
          <div className="font-sans bg-white text-gray-800">
            <SeoHead />
            <Navbar onCartOpen={() => setCartOpen(true)} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/thiet-ke-rieng" element={<Navigate to="/dich-vu" replace />} />
              <Route path="/san-pham/:slug" element={<ProductDetailPage onCartOpen={() => setCartOpen(true)} />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/chinh-sach-bao-mat" element={<PrivacyPolicyPage />} />
              <Route path="/chinh-sach-mua-hang" element={<PurchasePolicyPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/categories" element={<AdminCategoriesPage />} />
              <Route path="/:category" element={<CategoryOrService />} />
            </Routes>
            <Footer />
            <FloatingContact />
            <BackToTop />
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
          </div>
        </BrowserRouter>
      </CatalogProvider>
    </CartProvider>
  )
}

export default App

