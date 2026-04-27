import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import useInView from '../hooks/useInView'
import { useCatalog } from '../context/CatalogContext'

export default function ProductDetailPage({ onCartOpen }) {
  const { slug } = useParams()
  const { products, categories, loading } = useCatalog()
  const product = products.find(p => p.slug === slug)
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [addedMsg, setAddedMsg] = useState(false)
  const [relRef, relIn] = useInView()
  const { add } = useCart()

  useEffect(() => { window.scrollTo(0, 0) }, [slug])
  useEffect(() => { setActiveImg(0); setQty(1) }, [slug])

  function handleAddToCart() {
    add(product, qty)
    setAddedMsg(true)
    setTimeout(() => setAddedMsg(false), 2000)
    if (onCartOpen) onCartOpen()
  }

  if (loading) {
    return (
      <main className="pt-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-5xl mb-4">⏳</div>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Đang tải sản phẩm...</h2>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="pt-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Không tìm thấy sản phẩm</h2>
        <Link to="/" className="text-primary hover:underline text-sm">← Về trang chủ</Link>
      </main>
    )
  }

  const related = products
    .filter(p => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4)

  return (
    <main className="pt-20 min-h-screen">

      {/* Main detail */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="rounded-2xl overflow-hidden aspect-square bg-gray-50 mb-3">
              <img
                src={product.images?.[activeImg] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === activeImg ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.badge && (
              <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                {product.badge}
              </span>
            )}
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">{product.name}</h1>
            <div className="text-2xl font-bold text-primary mb-4">{product.price}</div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

            {/* Contents */}
            {product.contents && (
              <div className="bg-primary-light rounded-xl p-5 mb-6">
                <h3 className="font-bold text-gray-700 text-sm mb-3">📦 Thành Phần Quà</h3>
                <ul className="space-y-1.5">
                  {product.contents.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-primary mt-0.5">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-semibold text-gray-700 mb-0.5">Số lượng tối thiểu</div>
                <div>{product.minOrder} sản phẩm</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-semibold text-gray-700 mb-0.5">Thời gian sản xuất</div>
                <div>{product.lead}</div>
              </div>
            </div>

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3 mb-4">
              <label className="text-sm font-medium text-gray-700">Số lượng:</label>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold transition-colors text-lg">−</button>
                <span className="w-12 h-10 flex items-center justify-center text-sm font-bold border-x border-gray-200">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold transition-colors text-lg">+</button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                className={`w-full font-bold py-3 rounded-full transition-all text-sm shadow ${ addedMsg ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-dark'}`}
              >
                {addedMsg ? '✓ Đã thêm vào giỏ hàng!' : '🛒 Thêm Vào Giỏ Hàng'}
              </button>
              <div className="flex gap-3">
                <a href="https://zalo.me/0909123456" target="_blank" rel="noreferrer"
                  className="flex-1 text-center border-2 border-primary text-primary font-bold py-2.5 rounded-full hover:bg-primary-light transition-colors text-sm">
                  💬 Zalo
                </a>
                <a href="tel:0909123456"
                  className="flex-1 text-center border-2 border-gray-300 text-gray-700 font-bold py-2.5 rounded-full hover:bg-gray-50 transition-colors text-sm">
                  📞 Gọi Ngay
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">✨ Miễn phí thiết kế riêng theo thương hiệu doanh nghiệp</p>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Sản Phẩm Liên Quan</h2>
            <div ref={relRef} className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 fade-up ${relIn ? 'in-view' : ''}`}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
