import { Link } from 'react-router-dom'
import { useCatalog } from '../context/CatalogContext'
import ProductCard from '../components/ProductCard'

export default function MobileFeaturedProducts() {
  const { products, loading } = useCatalog()
  const featured = products.filter(p => p.featured).slice(0, 3)

  return (
    <section className="sm:hidden py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-500">Sản phẩm nổi bật</div>
            <h3 className="text-xl font-extrabold text-gray-800 mt-1">Gợi ý nhanh</h3>
          </div>
          <Link to="/qua-tang-doanh-nghiep" className="text-primary text-sm font-semibold hover:underline">
            Xem tất cả
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-sm text-gray-500 py-10">Đang tải sản phẩm...</div>
        ) : (
          <div className="-mx-4 px-4 flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
            {featured.map(p => (
              <div key={p.id} className="snap-start shrink-0 w-[78%]">
                <ProductCard product={p} className="shadow-sm" />
              </div>
            ))}
            {featured.length === 0 && (
              <div className="text-center text-sm text-gray-500 py-10 w-full">Chưa có sản phẩm nổi bật.</div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

