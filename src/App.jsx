import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { CatalogProvider } from './context/CatalogContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import BackToTop from './components/BackToTop'
import CartDrawer from './components/CartDrawer'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ServicePage from './pages/ServicePage'
import CheckoutPage from './pages/CheckoutPage'
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
            <Navbar onCartOpen={() => setCartOpen(true)} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/qua-tang-doanh-nghiep" element={<CategoryPage category="qua-tang-doanh-nghiep" />} />
              <Route path="/qua-tang-suc-khoe" element={<CategoryPage category="qua-tang-suc-khoe" />} />
              <Route path="/thiet-ke-rieng" element={<ServicePage />} />
              <Route path="/:category" element={<CategoryPage />} />
              <Route path="/san-pham/:slug" element={<ProductDetailPage onCartOpen={() => setCartOpen(true)} />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/categories" element={<AdminCategoriesPage />} />
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

