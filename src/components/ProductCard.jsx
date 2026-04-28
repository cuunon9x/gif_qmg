import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { displayPrice } from '../lib/price'

export default function ProductCard({ product, className = '' }) {
  const { slug, name, image, images, badge } = product
  const primaryImage = (Array.isArray(images) && images.length ? images[0] : null) || image
  const shownPrice = displayPrice(product)
  const { add, items } = useCart()
  const [added, setAdded] = useState(false)
  const inCart = items.some(i => i.slug === slug)

  function handleAdd(e) {
    e.preventDefault()
    add(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className={`card-shimmer group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:-translate-y-1.5 transition-all duration-300 ${className}`}>
      {/* Image */}
      <Link to={`/san-pham/${slug}`} className="block relative overflow-hidden aspect-square bg-gray-50">
        <img
          src={primaryImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {badge && (
          <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
            {badge}
          </span>
        )}
        {inCart && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            ✓ Trong giỏ
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/san-pham/${slug}`}>
          <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-1 hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        <p className="text-primary font-bold text-base mb-3">{shownPrice}</p>
        <button
          onClick={handleAdd}
          className={`w-full text-center text-xs font-bold py-2 rounded-full transition-all ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          {added ? '✓ Đã Thêm' : '🛒 Thêm Vào Giỏ'}
        </button>
      </div>
    </div>
  )
}
