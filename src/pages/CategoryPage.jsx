import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCategoryBySlug } from '../data/categories'
import { getProductsByCategory } from '../data/products'
import ProductCard from '../components/ProductCard'
import useInView from '../hooks/useInView'

export default function CategoryPage({ category: categoryProp }) {
  const { category: categoryParam } = useParams()
  const category = categoryProp ?? categoryParam
  const cat = getCategoryBySlug(category)
  const allProducts = getProductsByCategory(category)
  const [activeSubcat, setActiveSubcat] = useState('all')
  const [ref, inView] = useInView()

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0) }, [category])

  // Build subcat tabs
  const subcats = [
    { key: 'all', label: 'Tất Cả' },
    ...Object.values(
      allProducts.reduce((acc, p) => {
        if (!acc[p.subcat]) acc[p.subcat] = { key: p.subcat, label: p.subcatLabel }
        return acc
      }, {})
    ),
  ]

  const displayed = activeSubcat === 'all' ? allProducts : allProducts.filter(p => p.subcat === activeSubcat)

  if (!cat) return <div className="pt-20 mt-20 text-center text-4xl py-20 text-gray-500">Danh mục không tìm thấy.</div>

  return (
    <main className="pt-20 min-h-screen">

      {/* Category hero */}
      <div className="relative h-52 md:h-72 overflow-hidden">
        <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-70`} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <span className="text-5xl mb-2">{cat.icon}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold">{cat.label}</h1>
          <p className="text-white/80 text-sm mt-2 max-w-lg">{cat.description}</p>
        </div>
      </div>

      {/* Filter tabs */}
      {subcats.length > 2 && (
        <div className="sticky top-[62px] sm:top-[92px] bg-white z-20 border-b border-gray-100 shadow-sm">
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
      )}

      {/* Products grid */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm">{displayed.length} sản phẩm</p>
          </div>
          <div ref={ref} className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 fade-up ${inView ? 'in-view' : ''}`}>
            {displayed.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-primary-light py-10 px-4 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy sản phẩm phù hợp?</h3>
        <p className="text-gray-500 text-sm mb-4">Liên hệ ngay để được tư vấn & báo giá theo yêu cầu riêng.</p>
        <a href="tel:0909123456"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-7 py-3 rounded-full hover:bg-primary-dark transition-colors text-sm">
          📞 Gọi Tư Vấn Ngay
        </a>
      </div>
    </main>
  )
}
