import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import useInView from '../hooks/useInView'
import { useCatalog } from '../context/CatalogContext'

export default function CategoryPage({ category, childSlugs, parentCat, subCat }) {
  const { subcategories, products, loading } = useCatalog()
  const [activeSubcat, setActiveSubcat] = useState('all')
  const [ref, inView] = useInView()

  useEffect(() => { window.scrollTo(0, 0) }, [category])

  // Determine which products to show
  // Parent category: show products from all child brand slugs
  // Brand (sub) category: show products matching this brand slug
  const isParent = Boolean(parentCat)
  const slugsToShow = isParent
    ? (childSlugs && childSlugs.length > 0 ? childSlugs : [])
    : [category]

  const allProducts = products.filter(p => slugsToShow.includes(p.category))

  // Build subcat tabs (from product.subcat field = HP sizes etc)
  const subcats = [
    { key: 'all', label: 'Tất cả' },
    ...Object.values(
      allProducts.reduce((acc, p) => {
        if (p.subcat && !acc[p.subcat]) acc[p.subcat] = { key: p.subcat, label: p.subcatLabel || p.subcat }
        return acc
      }, {})
    ),
  ]

  // For parent view: also build brand filter tabs
  const brandTabs = isParent
    ? subcategories.filter(s => s.parentSlug === category)
    : []
  const [activeBrand, setActiveBrand] = useState('all')

  let displayed = allProducts
  if (isParent && activeBrand !== 'all') {
    displayed = displayed.filter(p => p.category === activeBrand)
  }
  if (activeSubcat !== 'all') {
    displayed = displayed.filter(p => p.subcat === activeSubcat)
  }

  const catInfo = parentCat || subCat || {}

  if (loading) return <div className="pt-20 mt-20 text-center text-2xl py-20 text-gray-500">Đang tải dữ liệu...</div>

  return (
    <main className="pt-20 min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2 text-sm text-white/70">
            <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span>›</span>
            {subCat && (
              <>
                <Link to={`/${subCat.parentSlug}`} className="hover:text-white transition-colors capitalize">
                  {subCat.parentSlug.replace(/-/g, ' ')}
                </Link>
                <span>›</span>
              </>
            )}
            <span className="text-white font-medium">{catInfo.label || category}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold">
            {catInfo.icon && <span className="mr-2">{catInfo.icon}</span>}
            {isParent ? `${catInfo.label} – Tất cả thương hiệu` : `Máy lạnh ${catInfo.label || category}`}
          </h1>
          {catInfo.description && (
            <p className="text-white/80 text-sm mt-2 max-w-xl">{catInfo.description}</p>
          )}
        </div>
      </div>

      {/* Brand filter tabs (parent view) */}
      {isParent && brandTabs.length > 0 && (
        <div className="sticky top-[62px] sm:top-[92px] bg-white z-20 border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
            <button
              onClick={() => { setActiveBrand('all'); setActiveSubcat('all') }}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeBrand === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-primary-light'
              }`}
            >
              Tất cả
            </button>
            {brandTabs.map(b => (
              <button
                key={b.slug}
                onClick={() => { setActiveBrand(b.slug); setActiveSubcat('all') }}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeBrand === b.slug ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-primary-light'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* HP/size filter tabs */}
      {/* {subcats.length > 2 && (
        <div className={`bg-white border-b border-gray-100 ${isParent && brandTabs.length > 0 ? '' : 'sticky top-[62px] sm:top-[92px] z-20 shadow-sm'}`}>
          <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
            {subcats.map(s => (
              <button
                key={s.key}
                onClick={() => setActiveSubcat(s.key)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeSubcat === s.key ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-primary-light'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )} */}

      {/* Products grid */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm">{displayed.length} sản phẩm</p>
          </div>
          <div ref={ref} className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 fade-up ${inView ? 'in-view' : ''}`}>
            {displayed.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          {displayed.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">📦</div>
              <p className="text-lg font-medium">Chưa có sản phẩm trong danh mục này</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-primary-light py-10 px-4 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy sản phẩm phù hợp?</h3>
        <p className="text-gray-500 text-sm mb-4">Liên hệ ngay để được tư vấn và báo giá theo yêu cầu riêng.</p>
        <a href="tel:0938777888"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-7 py-3 rounded-full hover:bg-primary-dark transition-colors text-sm">
          📞 Nhận báo giá miễn phí
        </a>
      </div>
    </main>
  )
}

