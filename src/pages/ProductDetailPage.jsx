import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import useInView from '../hooks/useInView'
import { useCatalog } from '../context/CatalogContext'
import { displayPrice } from '../lib/price'

export default function ProductDetailPage({ onCartOpen }) {
  const { slug } = useParams()
  const { products, categories, loading } = useCatalog()
  const product = products.find(p => p.slug === slug)
  const [activeImg, setActiveImg] = useState(0)
  const [activeVid, setActiveVid] = useState(0)
  const [mediaTab, setMediaTab] = useState('images')
  const [qty, setQty] = useState(1)
  const [variantId, setVariantId] = useState('')
  const [addedMsg, setAddedMsg] = useState(false)
  const [relRef, relIn] = useInView()
  const { add, buildCartKey } = useCart()

  useEffect(() => { window.scrollTo(0, 0) }, [slug])
  useEffect(() => {
    const imgs = Array.isArray(product?.images)
      ? product.images.filter(Boolean)
      : (product?.image ? [product.image] : [])
    const vids = Array.isArray(product?.videos) ? product.videos.filter(Boolean) : []
    const variants = Array.isArray(product?.variants) ? product.variants : []
    const firstVariantId = variants[0]?.id || ''

    setActiveImg(0)
    setActiveVid(0)
    setMediaTab(imgs.length ? 'images' : (vids.length ? 'video' : 'images'))
    setQty(1)
    setVariantId(firstVariantId)
  }, [slug, product?.image, product?.images, product?.videos])

  function handleAddToCart() {
    const variants = Array.isArray(product?.variants) ? product.variants : []
    const selected = variants.find((v) => v?.id === variantId) || null
    const safeVariantId = selected?.id || ''
    const safeVariantLabel = selected?.label || ''
    const variantPriceNum = Number(selected?.priceNum) || 0
    const variantPrice = typeof selected?.price === 'string' ? selected.price : null
    const variantStock = Number.isFinite(Number(selected?.stock)) ? Number(selected.stock) : null
    if (variantStock === 0) return

    const productForCart = {
      ...product,
      variantId: safeVariantId,
      variantLabel: safeVariantLabel,
      cartKey: buildCartKey({ slug: product?.slug, variantId: safeVariantId }),
      priceNum: variantPriceNum > 0 ? variantPriceNum : product?.priceNum,
      price: variantPriceNum > 0 ? (variantPrice || product?.price) : product?.price,
      variantStock,
    }

    const safeQty = selectedStock === null
      ? Math.max(1, Math.floor(Number(qty) || 1))
      : Math.min(Math.max(1, Math.floor(Number(qty) || 1)), Math.max(1, selectedStock))
    add(productForCart, safeQty)
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

  const images = Array.isArray(product.images)
    ? product.images.filter(Boolean)
    : (product.image ? [product.image] : [])
  const videos = Array.isArray(product.videos) ? product.videos.filter(Boolean) : []
  const variants = Array.isArray(product.variants) ? product.variants : []

  const related = products
    .filter(p => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4)
  const selectedVariant = variants.find((v) => v?.id === variantId) || null
  const selectedStock = selectedVariant && Number.isFinite(Number(selectedVariant.stock))
    ? Number(selectedVariant.stock)
    : null
  const shownPrice = selectedVariant?.priceNum > 0
    ? displayPrice({ ...product, priceNum: selectedVariant.priceNum, price: selectedVariant.price || product.price })
    : displayPrice(product)

  return (
    <main className="pt-20 min-h-screen">

      {/* Main detail */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            {(videos.length > 0 || images.length > 0) && (
              <div className="flex gap-2 mb-3 flex-wrap">
                {images.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setMediaTab('images')}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                      mediaTab === 'images'
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-primary'
                    }`}
                  >
                    Hình ảnh
                  </button>
                )}
                {videos.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setMediaTab('video')}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                      mediaTab === 'video'
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-primary'
                    }`}
                  >
                    Video
                  </button>
                )}
              </div>
            )}

            <div className="rounded-2xl overflow-hidden aspect-square bg-gray-50 mb-3">
              {mediaTab === 'video' && videos[activeVid] ? (
                <video
                  key={`video-${activeVid}`}
                  src={videos[activeVid]}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {mediaTab === 'images' && images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === activeImg ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {mediaTab === 'video' && videos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {videos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveVid(i)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors bg-gray-50 ${
                      i === activeVid ? 'border-primary' : 'border-transparent'
                    }`}
                    aria-label={`Chọn video ${i + 1}`}
                  >
                    <div className="w-full h-full flex items-center justify-center text-primary font-bold">
                      ▶
                    </div>
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
            <div className="text-2xl font-bold text-primary mb-4">{shownPrice}</div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

            {/* Feature list */}
            {Array.isArray(product.contents) && product.contents.length > 0 && (
              <div className="bg-primary-light rounded-xl p-5 mb-6">
                <h3 className="font-bold text-gray-700 text-sm mb-3">📋 Tính năng nổi bật</h3>
                <ul className="space-y-1.5">
                  {product.contents.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-primary mt-0.5">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick info chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.subcatLabel && (
                <span className="bg-primary-light text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                  {product.subcatLabel}
                </span>
              )}
              {typeof product.tags === 'string' && product.tags.split(',').map((t) => t.trim()).filter(Boolean).map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full capitalize">
                  {tag}
                </span>
              ))}
            </div>

            {/* Variants */}
            {variants.length > 0 && (
              <div className="mb-5">
                <label className="text-sm font-medium text-gray-700 block mb-2">Chọn loại:</label>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVariantId(v.id)}
                      disabled={Number.isFinite(Number(v.stock)) && Number(v.stock) <= 0}
                      className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                        Number.isFinite(Number(v.stock)) && Number(v.stock) <= 0
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                          : (v.id === variantId
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-primary')
                      }`}
                    >
                      {v.label}
                      {Number.isFinite(Number(v.stock)) && (
                        <span className="ml-1 font-semibold">
                          {Number(v.stock) <= 0 ? '(Hết)' : `(còn lại ${Number(v.stock)})`}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                {selectedStock === 0 && (
                  <p className="text-xs text-red-500 mt-2 font-semibold">
                    Loại sản phẩm này đang hết hàng. Vui lòng chọn loại sản phẩm khác.
                  </p>
                )}
              </div>
            )}

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3 mb-4">
              <label className="text-sm font-medium text-gray-700">Số lượng:</label>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold transition-colors text-lg">−</button>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={selectedStock === null ? undefined : Math.max(1, selectedStock)}
                  value={qty}
                  onChange={(e) => {
                    const raw = e.target.value
                    if (raw === '') return
                    const n = Math.floor(Number(raw) || 1)
                    const clamped = selectedStock === null
                      ? Math.max(1, n)
                      : Math.min(Math.max(1, n), Math.max(1, selectedStock))
                    setQty(clamped)
                  }}
                  onBlur={(e) => {
                    const raw = e.target.value
                    const n = Math.floor(Number(raw) || 1)
                    const clamped = selectedStock === null
                      ? Math.max(1, n)
                      : Math.min(Math.max(1, n), Math.max(1, selectedStock))
                    setQty(clamped)
                  }}
                  className="w-16 h-10 text-center text-sm font-bold border-x border-gray-200 outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setQty((q) => {
                    const next = q + 1
                    return selectedStock === null ? next : Math.min(next, Math.max(1, selectedStock))
                  })}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold transition-colors text-lg">+</button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                disabled={selectedStock === 0}
                className={`w-full font-bold py-3 rounded-full transition-all text-sm shadow ${
                  selectedStock === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    : (addedMsg ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-dark')
                }`}
              >
                {addedMsg ? '✓ Đã thêm vào giỏ hàng!' : '🛒 Thêm vào giỏ hàng'}
              </button>
              <div className="flex gap-3">
                <a href="https://zalo.me/0397507766" target="_blank" rel="noreferrer"
                  className="flex-1 text-center border-2 border-primary text-primary font-bold py-2.5 rounded-full hover:bg-primary-light transition-colors text-sm">
                  💬 Zalo
                </a>
                <a href="tel:0938777888"
                  className="flex-1 text-center border-2 border-gray-300 text-gray-700 font-bold py-2.5 rounded-full hover:bg-gray-50 transition-colors text-sm">
                  📞 Gọi ngay
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">✨ Thiết bị chính hãng – Bảo hành chính hãng – Hỗ trợ tận nơi</p>

            <div className="mt-5 rounded-2xl border border-primary/15 bg-primary-light p-4">
              <h3 className="text-sm font-bold text-gray-800 mb-2">QMG HVAC cam kết</h3>
              <ul className="space-y-1.5 text-xs text-gray-600 leading-relaxed">
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Cung cấp máy lạnh chính hãng, đầy đủ bảo hành từ nhà sản xuất.</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Thi công lắp đặt chuẩn kỹ thuật HVAC, đúng tiến độ và an toàn.</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Bảo trì, vệ sinh, sửa chữa tận nơi cho nhà ở, văn phòng và công trình.</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> Tư vấn giải pháp điện lạnh miễn phí trong 5–15 phút.</li>
              </ul>
              <div className="mt-3 pt-3 border-t border-primary/10 flex flex-wrap gap-3 text-xs">
                <Link to="/chinh-sach-mua-hang" className="text-primary hover:underline font-medium">
                  📋 Chính sách mua hàng
                </Link>
                <span className="text-gray-300">|</span>
                <Link to="/chinh-sach-bao-mat" className="text-gray-500 hover:text-primary hover:underline">
                  Chính sách bảo mật
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Sản phẩm liên quan</h2>
            <div ref={relRef} className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 fade-up ${relIn ? 'in-view' : ''}`}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

